export class StringCollectionHelper {
  private static InternalFormatCollection(value: Array<string>): string {
    let messages = "";
    value.forEach(function(msg) {
      messages += msg + ";";
    });
    return messages;
  }

  private static EditAndFormatCollection(
    collection: Array<string>,
    index: number,
    value: string
  ): string {
    collection[index] = value;
    return this.InternalFormatCollection(collection);
  }

  private static RemoveAndFormatCollection(
    collection: Array<string>,
    index: number
  ): string {
    collection.splice(index, 0);
    return this.InternalFormatCollection(collection);
  }

  public static FormatCollection(
    collection: Array<string>,
    index: number,
    value: string,
    remove: boolean
  ): string {
    if (remove) return this.RemoveAndFormatCollection(collection, index);
    return this.EditAndFormatCollection(collection, index, value);
  }
}
