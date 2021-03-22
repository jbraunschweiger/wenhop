import wiki from 'wikijs';

export const getRocketImage = async (name: string) => {
    const page = await wiki().page(name);
    const imageURL = await page.mainImage();
    return imageURL
}

export const getRocketInfobox = async (name: string) => {
    const page = await wiki().page(name);
    const info = await page.fullInfo() as any
    return info.general
}

export const getRocketTabs = async (name: string) => {
    const page = await wiki().page(name);
    const info = await page.content() as any
    var tabs = info as {title: string, content: string, items: any[]}[]
    const summary = await page.summary();
    tabs.unshift({
        title: "Overview",
        content: summary,
        items: []
    })
    return tabs;
}