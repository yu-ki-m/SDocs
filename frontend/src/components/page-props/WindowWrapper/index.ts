export interface WindowWrapperInterface{
    toTopNewTab:()=>WindowProxy|null;
}

export class WindowWrapper implements WindowWrapperInterface{

    toTopNewTab(){
        window.open("/","_blank")
        return null;
    }
}