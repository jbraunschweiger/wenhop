import FB from 'firebase'

export interface IPrototype {
    name: string,
    staticFire: FB.firestore.Timestamp,
    flight: FB.firestore.Timestamp,
    createdAt: Date
}