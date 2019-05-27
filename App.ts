class App
{    
    public Instance:Instance;
    private static m_App:App;

    public static GetApp():App
    {
        if (this.m_App == null)
        {
            this.m_App = new App();
        }
        return this.m_App;
    }
    private constructor()
    {   
        this.Instance = new Instance();
        this.Initialize();   
    }

    private Initialize():void
    {        
        this.AttachEvents();
    }

    private AttachEvents():void
    {
        EventHandler.InitializeEventsAttachment();
    }
}

var app:App;

window.onload = function()
{
    var mainLogConsole = console.log;
    console.log = function(message) 
    {
        if (window.external.Log)
        {
            window.external.Log(message);
        }        
        mainLogConsole.apply(console, [message]);
    }

    var mainErrorConsole = console.error;
    console.error = function(message)
    {
        if (window.external.LogError)
        {
            window.external.LogError(message);
        }
        mainErrorConsole.apply(console, [message]);
    }

    var mainWarnConsole = console.warn
    console.warn = function(message)
    {
        if (window.external.LogWarning)
        {
            window.external.LogWarning(message);
        }
        mainErrorConsole.apply(console, [message]);
    }

    app = App.GetApp();
}