import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'
admin.initializeApp();


export const getArticles = functions.https.onRequest(async (request, response) => {
    const db = admin.firestore()
    const headers = (request.headers? request.headers : {})
    const token = (headers.authorization ? headers.authorization : "")
    const docs = await db.collection("tokens").where("token", "==", token).get()
    if(docs.docs.length < 1) {
        response.status(401).json({error: "unauthorized"})
    }
    const NewsAPI = require('newsapi');
    const NewsAPIKey = functions.config().newsapi.key
    const newsapi = new NewsAPI(NewsAPIKey);

    // const categories = ['business','entertainment','general','health','science','sports','technology']
    const categories = ['business','health']
    const articlePromises = categories.map((category)=>getArticle(newsapi, category))
    const articles = await Promise.all(articlePromises);

    const OpenAI = require('openai-api');
    const openaiKey = functions.config().openai.key
    const openai = new OpenAI(openaiKey)

    const articleWithSummaryPromises = articles.map((article) => (article ? getArticleStub(openai, article) : null))
    const articlesWithSummary = await Promise.all(articleWithSummaryPromises)

    const axios = require('axios').default;
    const url = "https://us-central1-cse437project.cloudfunctions.net/recieveNewHeadlines"
    const addResponse = await axios.post(url, {articles: articlesWithSummary})
    
    response.json({
        addedArticles: articlesWithSummary,
        addResponse: addResponse
    })
});

const getArticleStub = async (openai: any, article: IAPIArticle) => {
    const tagReg = /(<.*?>)/
    const bracketReg = /([.*?])/
    const title = article.title
    const description = article.description
    const content = (article.content ? article.content : "").replace("\r","").replace("\n","").replace(tagReg,"").replace(bracketReg,"")
    const staticPrompt = promptPrepends.join("")
    var dynamicPrompt = "Title: " + title + "\n"
    dynamicPrompt += "Description: " + description + "\n"
    dynamicPrompt += "Content: " + content + "\n\n"
    dynamicPrompt += "Key Information:\n1"
    const prompt = staticPrompt + dynamicPrompt
    const maxTokens = Math.round(prompt.length/4) + 60; 

    try {
        const response = await openai.complete({
            engine: 'davinci',
            prompt: prompt,
            maxTokens: maxTokens,
            temperature: 0.9,
            topP: 1,
            presencePenalty: 0,
            frequencyPenalty: 0,
            bestOf: 1,
            n: 1,
            stream: false,
            stop: ['###'] // stop model from generating fake articles
        })
        const choices = (response.data.choices ? response.data.choices as any[] : [])
        const choice = (choices.length > 0 ? choices[0] : null)
        const summary = (choice ? choice.text : "")

        article.summary = "What you need to know:\n1" + summary

        return article
    } catch (error) { 
        console.log(error)
        article.summary = ""
        return article
    }
}

interface IAPIArticle {
    source: {
        id: string,
        name: string
    },
    author: string,
    title: string,
    description: string,
    url: string,
    urlToImage: string,
    publishedAt: string,
    category?: string,
    content?: string,
    summary?: string
}

const getArticle = async (newsapi: any, category: string) => {
    const response = await newsapi.v2.topHeadlines({
        category: category,
        language: 'en',
        country: 'us'
      })
    
    const articles = (response.articles ? response.articles as IAPIArticle[] : [])
    const filteredArticles = articles.sort((a, b) => {
        const aContentLength = (a.content ? a.content.length : 0)
        const bContentLength = (b.content ? b.content.length : 0)
        return bContentLength - aContentLength
    })
    const article = (filteredArticles.length > 0 ? filteredArticles[0] : null)
    if (article) {
        article.category = category;
    }
    return article
}

const promptPrepends = [
    "Generate a list of Key Information based on a news article's Title, Description, and Content:\n\n",
    "Title:  Stocks Drop Despite Improved Jobs Data\n",
    "Description: Fall in jobless claims points to further recovery in labor market, but technology stocks send major indexes lower\n",
    "Content: US. stocks remained under pressure on Thursday after fresh data indicated further recovery in the labor market. The S&P 500 fell 0.8%, while the Nasdaq Composite shed 1.2% a day after the tech…\n",
    "Key Information:\n1. Stock market is down this week\n2. Unemployment claims fell, indicating market recovery\n3. Underperforming Tech stocks sent major indexes down\n4. S&P fell 0.8%, Nasdaq down 1.2%\n",
    "###\n",
    "Title: Demi Lovato's 'Dancing with the Devil' on YouTube helps her confront her demons in real time.\n",
    "Description: In a new docuseries and album, Demi Lovato opens up about sobriety, identity and starting over.\n",
    "Content: Demi Lovato holds up a small bottle of coconut oil containing a mix of musky scents tobacco, vanilla and Palo Santo with crystals at the bottom This ones my more masculine scent, she explains.\n\n",
    "Key Information:\n1. Demi Lovato opens up about sobriety, identity, and starting over in her new work\n2. 'Dancing with the devil' is helping her cope with her problems\n3. Demi shows off her skincare products\n",
    "###\n"
]