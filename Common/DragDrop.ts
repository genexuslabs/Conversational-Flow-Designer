var dragStartPosition:number;
var sourceElement:HTMLElement;

function allowDrop(ev : DragEvent) {
    ev.preventDefault();
    if (ev.dataTransfer != null)
    {
        if (ev.target != null)
        {                
            let target:HTMLElement = <HTMLElement>ev.target;;
            if (target != sourceElement){
                if (target.getAttribute(Attributes.ElementType) == AttributeValues.Flow)
                {
                    if (target.nextElementSibling)
                    {
                        target.nextElementSibling.className = StyleClasses.DisplayMove;
                    }
                    if (target.previousElementSibling)
                    {
                        target.previousElementSibling.className = StyleClasses.DisplayMove;
                    }

                    App.GetApp().Instance.Flows.forEach(function(flow){
                        if (flow.Id != target.getAttribute(Attributes.FlowId)){
                            let up:HTMLElement= <HTMLElement>document.getElementById(`${DragDropHelpers.UpPrefix}${flow.Id}`);
                            up.className = StyleClasses.HiddenMove;

                            let down:HTMLElement= <HTMLElement>document.getElementById(`${DragDropHelpers.DownPrefix}${flow.Id}`);
                            down.className = StyleClasses.HiddenMove;
                        }
                    });
                }
                
                ev.dataTransfer.dropEffect = DragDropHelpers.NoneEffect;
            }            
        }        
    }        
}
  
function drag(ev : DragEvent) 
{
    if (ev.target != null && ev.dataTransfer != null)
    {
        let target:HTMLElement = <HTMLElement>ev.target;
        sourceElement = target;
        target.style.opacity = "1.0";
        let flowId:string = <string> target.getAttribute(Attributes.FlowId);
        ev.dataTransfer.setData("text", flowId);
        dragStartPosition = ev.clientY;
    }
}
  
function drop(ev : DragEvent) 
{
    ev.preventDefault();    
    if (ev.dataTransfer != null && ev.target != null)
    {
        let sourceId = ev.dataTransfer.getData("text");
        let element:HTMLElement = <HTMLElement>document.getElementById(sourceId);
        let target:HTMLElement = <HTMLElement>ev.target

        let flowId:string = <string>target.getAttribute(Attributes.FlowId);
        let targetElement = <HTMLElement>document.getElementById(flowId);        

        let moveType:MoveType = MoveType.Up;
        if (target.getAttribute(Attributes.MoveType) == DragDropHelpers.MoveDown){
            moveType = MoveType.Down;
            targetElement.after(element);
        }            
        else
            targetElement.before(element);
         
        let sourceName:string = App.GetApp().Instance.GetFlowName(element.id);
        let targetName:string = App.GetApp().Instance.GetFlowName(flowId);  
        
        let up:HTMLElement= <HTMLElement>document.getElementById(`${DragDropHelpers.UpPrefix}${flowId}`);
        let down:HTMLElement= <HTMLElement>document.getElementById(`${DragDropHelpers.DownPrefix}${flowId}`);
        up.className = down.className = StyleClasses.HiddenMove;        
        App.GetApp().Instance.MoveFlows(sourceName, targetName, moveType);
    }  
}

function dragenter(ev : DragEvent) 
{
   ev.preventDefault();
}

function setMoveActive(ev: DragEvent)
{
    ev.preventDefault();

    if (ev.dataTransfer)
            ev.dataTransfer.dropEffect = DragDropHelpers.MoveEffect;

    if (ev.target)
    {
        let target:HTMLElement = <HTMLElement>ev.target;
        target.className = StyleClasses.MoveElementActive;        
    }
}

function unSetMoveActive(ev: DragEvent)
{
    ev.preventDefault();

    if (ev.target)
    {
        let target:HTMLElement = <HTMLElement>ev.target;
        target.className = StyleClasses.MoveElement;
    }
}

function hideMoveOptions(ev: DragEvent)
{
    ev.preventDefault();
}

window.ondragend = function(ev:DragEvent)
{
    App.GetApp().Instance.Flows.forEach(function(flow){
        let up:HTMLElement= <HTMLElement>document.getElementById(`${DragDropHelpers.UpPrefix}${flow.Id}`);
        up.className = StyleClasses.HiddenMove;

        let down:HTMLElement= <HTMLElement>document.getElementById(`${DragDropHelpers.DownPrefix}${flow.Id}`);
        down.className = StyleClasses.HiddenMove;
    });
}

enum MoveType{
    Up,
    Down
}