class ComponentElement
{
    Name:string;

    constructor(name:string)
    {
        this.Name = name;
    }

    public FormatName():string
    {
        return this.Name.replace(" ", "").replace(" ", "");
    }
}

enum ComponentElements
{
    FlowElement
}