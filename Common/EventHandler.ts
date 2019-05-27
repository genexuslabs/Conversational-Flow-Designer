class EventHandler
{
    public static InitializeEventsAttachment():void
    {
        FlowEventsHandling.InitializeFlowEventsHandling();
    }

    public static AttachEvent(controlId:string, event:string, componentType:ComponentElements, controlType:ControlTypes)
    {                
        if (componentType == ComponentElements.FlowElement)
        {
            FlowEventsHandling.AttachFlowEvent(controlId, event, controlType);
        }    
    }    
}

class FlowEventsHandling
{
    public static InitializeFlowEventsHandling()
    {
        let addFlowElementBtn = document.getElementById(Controls.AddFlowElement);
        if (addFlowElementBtn != null)
        {
            addFlowElementBtn.addEventListener("click", (e:Event) => FlowEventsHandling.AddFlowElement());
        }
    }

    public static AddFlowElement():void
    {           
        let flow:FlowElement = new FlowElement("New Flow");
        App.GetApp().Instance.AddFlow(flow);
        FlowRender.Renderize(flow, RenderingOptions.Summary);
        if (window.external.AddFlow != undefined)
        {
            window.external.AddFlow();
        }
    }

    public static AttachFlowEvent(controlId:string, event:string, controlType:ControlTypes)
    {        
        let control = document.getElementById(controlId);
        if (control != null)
        {
            if (controlType == ControlTypes.SummaryExpandArrow)
            {                
            //    control.addEventListener(event, (e:Event) => FlowRender.RenderizeFlowBoxed());
            }   
          /*  if (controlType == ControlTypes.SummaryDraggable)
            {           
                control.addEventListener(event, (e:Event) => this.DragElement(e));
            }       */  
        }  
    }    
}

function changingFlowName(event:Event){
    if (event.currentTarget)
    {
        let element:HTMLInputElement = <HTMLInputElement>event.currentTarget;
        let parent:HTMLElement = element;
        let flowId:string = getFlowId(parent);

        let flowName:string = App.GetApp().Instance.GetFlowName(flowId);
        if (element.value)
        {
            App.GetApp().Instance.ModifyFlowName(flowName, element.value);
        }        
    }       
}

function changingFlowTriggerSummary(event:Event){
    if (event.currentTarget)
    {
        let element:HTMLInputElement = <HTMLInputElement>event.currentTarget;
        let parent:HTMLElement = element;
        let flowId:string = getFlowId(parent);

        let flowName:string = App.GetApp().Instance.GetFlowName(flowId);
        if (element.value)
        {
            App.GetApp().Instance.ModifyFlowTriggerSummary(flowName, element.value);
        }        
    }       
}

function selectConversationalObject(event:Event)
{    
    if (event.currentTarget)
    {        
        let element:HTMLElement = <HTMLElement>event.currentTarget;
        let flowId:string = <string>element.getAttribute(Attributes.FlowId);
        let flowName:string = App.GetApp().Instance.GetFlowName(flowId);
        App.GetApp().Instance.SelectConversationalObject(flowName);
    }
}

function getFlowId(element:HTMLElement):string
{
    let iterate:Boolean = true;
    while(iterate)
    {
        if (element.parentElement != null && element.parentElement.id != Controls.FlowsContainer)
        {                
            element = element.parentElement;
            iterate = false;
        }                       
    }

    return element.id;
}