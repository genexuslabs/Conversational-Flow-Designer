export interface IConversationalElement
{
    SetItem(index:number, value:string, collectionType:CollectionType)
    DeleteItem(index:number, collectionType:CollectionType);
}

export enum CollectionType
{
    TriggerMessages,
    AskMessages,
    OnErrorMessages,
    ResponseMessages
}