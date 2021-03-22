import Firebase from '../../firebase'
import {IPrototype} from '../../types'

export const getPrototypes = async (firebase: Firebase) => {
    const db = firebase.db

    const result = await db.collection("prototypes").orderBy("createdAt", "desc").limit(10).get();

    const prototypes: IPrototype[] = result.docs.map((doc) => {
        return doc.data() as IPrototype
    })

    return prototypes
}