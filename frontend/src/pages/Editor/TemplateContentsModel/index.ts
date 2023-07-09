
import { UuidInterface } from '../../../lib/Uuid';


/**
 * TemplateContentState
 * @param id 内容の識別子
 * @param contentType 内容のタイプ
 * @param contents 内容
 */
export type TemplateContentState = {
    id:string;
    contentType: string;
    content:string;
}
export interface TemplateContentInterface extends TemplateContentState {}
export class TemplateContent implements TemplateContentInterface{
    id: string;
    contentType: string;
    content:string;
    constructor(initValue:TemplateContentState){
        this.id = initValue.id;
        this.contentType = initValue.contentType;
        this.content = initValue.content;
    }
}

// =======================================

/**
 * TemplateContentsState
 * @param contents テンプレートのコンテンツ
 */
export type TemplateContentsState = {
    contents: TemplateContentInterface[];
}
export interface TemplateContentsInterface extends TemplateContentsState {
    updateContent: (contentUnitId: string, value: string) => void;
    deleteContent: (contentUnitIndex: number) => void;
    addContentsRichEditor: (uuidCreator:UuidInterface) => void;
    addContentsNestTable: (uuidCreator:UuidInterface) => void;
    moveIndex: (from: number, to: number) => void;
}
export class TemplateContents implements TemplateContentsInterface{
    contents: TemplateContentState[];
    constructor(contents:TemplateContentState[]){
        this.contents = contents;
    }

    updateContent = (contentUnitId:string,value:string) => {
        let contentUnitTmp = this.contents.find((content) => content.id === contentUnitId);
        if(contentUnitTmp === undefined){
            throw new Error("対象のコンテンツが存在しません");
        }
        contentUnitTmp.content = value
    }

    deleteContent = (contentUnitIndex:number)=>{
        this.contents.splice(contentUnitIndex,1);
    }

    addContentsRichEditor = (uuidCreator:UuidInterface)=>{
        let templateContent:TemplateContentInterface = new TemplateContent({id:uuidCreator.getUniquId(), contentType:'quill', content:''});
        this.contents.push(templateContent);
    }
    
    addContentsNestTable = (uuidCreator:UuidInterface)=>{
        let templateContent:TemplateContentInterface = new TemplateContent({id:uuidCreator.getUniquId(), contentType:'nest-table', content:''});
        this.contents.push(templateContent);
    }

    moveIndex = ( from: number, to: number) => {
        const arr = [...this.contents];
        const target = arr[from];
        arr.splice(from, 1);
        arr.splice(to, 0, target);
        this.contents = arr;
    }
}


