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
                if (target.getAttribute("elementType") == "flow")
                {
                    if (target.nextElementSibling)
                    {
                        target.nextElementSibling.className = "DisplayMove";
                    }
                    if (target.previousElementSibling)
                    {
                        target.previousElementSibling.className = "DisplayMove";
                    }

                    App.GetApp().Instance.Flows.forEach(function(flow){
                        if (flow.Id != target.getAttribute("flowId")){
                            let up:HTMLElement= <HTMLElement>document.getElementById(`GXUp_${flow.Id}`);
                            up.className = "HiddenMove";

                            let down:HTMLElement= <HTMLElement>document.getElementById(`GXDown_${flow.Id}`);
                            down.className = "HiddenMove";
                        }
                    });
                }
                
                ev.dataTransfer.dropEffect = "none";
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
        let flowId:string = <string> target.getAttribute("flowId");
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

        let flowId:string = <string>target.getAttribute("flowId");
        let targetElement = <HTMLElement>document.getElementById(flowId);        

        let moveType:MoveType = MoveType.Up;
        if (target.getAttribute("moveType") == "Down"){
            moveType = MoveType.Down;
            targetElement.after(element);
        }            
        else
            targetElement.before(element);
         
        let sourceName:string = App.GetApp().Instance.GetFlowName(element.id);
        let targetName:string = App.GetApp().Instance.GetFlowName(flowId);  
        
        let up:HTMLElement= <HTMLElement>document.getElementById(`GXUp_${flowId}`);
        let down:HTMLElement= <HTMLElement>document.getElementById(`GXDown_${flowId}`);
        up.className = down.className = "HiddenMove";        
        App.GetApp().Instance.MoveFlows(sourceName, targetName, moveType);

        console.warn(`Moving ${sourceName}. MoveType: ${moveType.toString()}`)
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
            ev.dataTransfer.dropEffect = "move";

    if (ev.target)
    {
        let target:HTMLElement = <HTMLElement>ev.target;
        target.className = "MoveElementActive";        
    }
}

function unSetMoveActive(ev: DragEvent)
{
    ev.preventDefault();

    if (ev.target)
    {
        let target:HTMLElement = <HTMLElement>ev.target;
        target.className = "MoveElement";        
    }
}

function hideMoveOptions(ev: DragEvent)
{
    ev.preventDefault();


}

window.ondragend = function(ev:DragEvent)
{
    App.GetApp().Instance.Flows.forEach(function(flow){
        let up:HTMLElement= <HTMLElement>document.getElementById(`GXUp_${flow.Id}`);
        up.className = "HiddenMove";

        let down:HTMLElement= <HTMLElement>document.getElementById(`GXDown_${flow.Id}`);
        down.className = "HiddenMove";
    });
}

enum MoveType{
    Up,
    Down
}