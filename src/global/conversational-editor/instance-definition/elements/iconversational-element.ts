export interface ConversationalElement {
  SetItem(index: number, value: string, collectionType: CollectionType);
  DeleteItem(index: number, collectionType: CollectionType);
  GetParentName(): string;
  GetName(): string;
}

export enum CollectionType {
  TriggerMessages,
  AskMessages,
  OnErrorMessages,
  ResponseMessages
}
