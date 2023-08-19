
export class MESSAGE_TableContent {
    static readonly  DELETE_ROW_OUT_OF_RANGE= (deletePostion:number,cellLength:number)=>`out of range  deleteRow: [deletePosition:${deletePostion}] [maxIndex:${cellLength}]`;
    static readonly  DELETE_RECORD_OUT_OF_RANGE= (deletePostion:number,recordLength:number)=>`out of range  deleteRecord: [deletePosition:${deletePostion}] [maxIndex:${recordLength}]`;
}

