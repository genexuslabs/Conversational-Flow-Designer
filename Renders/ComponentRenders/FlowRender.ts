class FlowRender implements Render
{    
    public static Renderize(componentElement:any, renderingOptions:RenderingOptions):void
    {
        let flow:FlowElement = componentElement;
        if (renderingOptions == RenderingOptions.Summary)
            this.RenderizeSummary(flow);   
    }   

    private static RenderizeSummary(flow:FlowElement):void
    {
        var flowsContainer = document.getElementById(Controls.FlowsContainer);
        if (flowsContainer != null)
        {
            let arrowId:string = `ExpandSummary${flow.FormatName()}`;

            flowsContainer.innerHTML +=             
            `<div id="${flow.Id}">           
                <div id="GXUp_${flow.Id}" elementType="moveFlow" flowId="${flow.Id}" class="HiddenMove" ><span flowId="${flow.Id}" moveType="Up" class="MoveElement" ondrop="drop(event)" ondragover="setMoveActive(event)" ondragleave="unSetMoveActive(event)">    +   </span></div>
                <div elementType="flow" flowId="${flow.Id}" class="SummaryFlowBase SummaryFlowElement" draggable="true" ondragstart="drag(event)" ondragover="allowDrop(event)">
                    <input id ="${FlowElementHelpers.GetFlowInputNameHTMLId(flow.FormatName())}" type="text" class="SummaryFlowName" value="${flow.Name}" onchange="changingFlowName(event)"/>
                    <div id="${arrowId}" name="${flow.FormatName()}$" class="SummaryDownArrow" onclick="expandSummaryFlow(event)"></div>
                    <div id="${FlowElementHelpers.GetConversationalObjectHTMLId(flow.FormatName())}" flowId="${flow.Id}" class="SummaryConversationalObject" onclick="selectConversationalObject(event)">${FlowElementHelpers.GetConversationalObjectText(flow.GetSummaryConversationalObject())}</div>                
                    <input id="${FlowElementHelpers.GetFlowInputTriggerHTMLId(flow.FormatName())}" type="text" class="SummaryTriggerMessage" value="${flow.GetSummaryTriggerMessage()}" onchange="changingFlowTriggerSummary(event)" size="45%"/>                
                </div>
                <div id="GXDown_${flow.Id}" elementType="moveFlow" flowId="${flow.Id}" class="HiddenMove" ><span flowId="${flow.Id}" moveType="Down" class="MoveElement" ondrop="drop(event)" ondragover="setMoveActive(event)" ondragleave="unSetMoveActive(event)">   +   </span></div>
            </div>`;          
        }
        else
        {
            console.log(`FlowRender - ${Controls.FlowsContainer} not found.`);
        } 
    }

    public static RenderizeFlowBoxed(flow:FlowElement):void
    {
        alert(flow.Name);
    }

    static RefreshConversationalObject(flow: FlowElement) {
        let element:HTMLElement =  <HTMLElement>document.getElementById(FlowElementHelpers.GetConversationalObjectHTMLId(flow.FormatName()));
        element.innerHTML = FlowElementHelpers.GetConversationalObjectText(flow.ConversationalObject);
    }
}

function expandSummaryFlow(ev: Event)
{
    if (ev.target != null)
    {
        let element:HTMLElement = <HTMLElement>ev.target
        console.log(element.id)
        let flowId = element.attributes.getNamedItem(Attributes.Name);
        if (flowId != null)
        {
            let flowElement:FlowElement = app.Instance.GetFlow(flowId.value);
            FlowRender.RenderizeFlowBoxed(flowElement);
        }                        
    }
}