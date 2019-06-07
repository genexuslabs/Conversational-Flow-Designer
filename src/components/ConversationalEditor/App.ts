import { Instance } from "./instanceDefinition/Instance.js";

export class App
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
    }
}