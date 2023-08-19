<script setup lang="ts">
import CellInput from './Record/CellInput/index.vue';
import TitleFrame from './TitleInput/TitleEditorFrame/index.vue';
import TitleInput from './TitleInput/TitleEditor/index.vue';

import Record from './Record/index.vue';
import Title from './Record/Title/index.vue';
import Data from './Record/Data/index.vue';
import {ref,onMounted} from 'vue';
import TableContent, { RecordContent , CellContent, TableContentModule, TableContentOptions} from './TableContent';
import { Uuid } from '../../../lib/Uuid';
import { CELL_TYPE } from '../NestTable/TableContent';

import Indent from './Record/Indent/index.vue'

export interface PropsInterface{}

let uuid = new Uuid();
const tableContentModule = new TableContentModule(uuid);
        const tableContentOptions = new TableContentOptions(true,true,true,true);
let tableContents = ref<TableContent>(new TableContent(uuid.getUniquId(),"",[],tableContentModule,tableContentOptions)); 
    
onMounted( async ()=>{
    let newRecord0 = new RecordContent(uuid.getUniquId(),0,true,false,[new CellContent(uuid.getUniquId(),CELL_TYPE.QUILL,""),new CellContent(uuid.getUniquId(),CELL_TYPE.QUILL,""),new CellContent(uuid.getUniquId(),CELL_TYPE.QUILL,"")]);
    let newRecord1 = new RecordContent(uuid.getUniquId(),0,false,false,[new CellContent(uuid.getUniquId(),CELL_TYPE.QUILL,""),new CellContent(uuid.getUniquId(),CELL_TYPE.QUILL,""),new CellContent(uuid.getUniquId(),CELL_TYPE.QUILL,"")]);
    tableContents.value.records.push(newRecord0);
    tableContents.value.records.push(newRecord1);
    tableContents.value.addRecord(tableContents.value.records.length-1);
    tableContents.value.addRecord(tableContents.value.records.length-1);
    tableContents.value.records[2].indent=1;
    tableContents.value.records[3].indent=1;

});

const addRecord = (insertPostion:number)=>{
    tableContents.value.addRecord(insertPostion);
    tableContents.value = {...tableContents.value};
}

const addIndentAble = (changePostion:number)=>{
    return tableContents.value.addIndentAble(changePostion);
}

const addIndent = (changePostion:number)=>{
    tableContents.value.addIndent(changePostion);
    tableContents.value = {...tableContents.value};
}
const reduceIndent = (changePostion:number)=>{
    tableContents.value.reduceIndent(changePostion);
    tableContents.value = {...tableContents.value};
}

const deleteRecord = (deletePostion:number)=>{
    tableContents.value.deleteRecord(deletePostion);
    tableContents.value = {...tableContents.value};
}

const changeTitleOnly = (changePostion:number)=>{
    tableContents.value.changeTitleOnly(changePostion);
    tableContents.value = {...tableContents.value};
}

const addRow = (insertPostion:number)=>{
    tableContents.value.addRow(insertPostion);
    tableContents.value = {...tableContents.value};
}

const deleteRow = (deletePostion:number)=>{
    tableContents.value.deleteRow(deletePostion)
    tableContents.value = {...tableContents.value};
}

const titleChange = (value:string)=>{
    tableContents.value.tableTitle = value;
    tableContents.value = {...tableContents.value};
}

const replacePositionRow = (replacePostion:number,replaceTargetPostion:number)=>{
    tableContents.value.replacePositionRow(replacePostion,replaceTargetPostion);
    tableContents.value = {...tableContents.value};
}

const replacePositionRecord = ( replacePostion:number,replaceTargetPostion:number)=>{
    tableContents.value.replacePositionRecord( replacePostion,replaceTargetPostion);
    tableContents.value = {...tableContents.value};
}

const copyToClipBoard = (text:string)=>{

    if(document.body.style?.webkitUserSelect != undefined || document?.execCommand != undefined){
        // 空div 生成
        let tmp = document.createElement("div");
        // 選択用のタグ生成
        let pre = document.createElement('pre');
        // 親要素のCSSで user-select: none だとコピーできないので書き換える
        pre.style.webkitUserSelect = 'auto';
        pre.style.userSelect = 'auto';
        tmp.appendChild(pre).textContent = text;
        // 要素を画面外へ
        var s = tmp.style;
        s.position = 'fixed';
        s.right = '200%';
        // body に追加
        document.body.appendChild(tmp);
        // 要素を選択
        document.getSelection()?.selectAllChildren(tmp);
        // クリップボードにコピー
        document.execCommand("copy");
        // 要素削除
        document.body.removeChild(tmp);
    }else{
        navigator.clipboard.writeText(text)　 // ※httpsの場合のみ可能
    }

    return;
}

</script>
<template>
    <div :class="style.container" data-gid="318c638b-54a2-4698-88cc-f577cacbc355">
        <div :class="style.table"  >
            <TitleFrame >
                <TitleInput :value="tableContents.tableTitle" @input="(value:string)=>{titleChange(value)}"/>
            </TitleFrame>
            <Record v-for="recordContent,recordIndex in tableContents.records" :key="recordContent.id" :indent="recordContent.indent"  :is-header="recordContent.isHeader">
                <template #options>
                    <div  :class="style.option">
                        <div  :class="style.optionContainer">
                            <button v-if="!recordContent.isHeader&&tableContents.tableContentOptions.showRecordOption" @click="(e)=>{deleteRecord(recordIndex)}" tabindex="-1" >×</button>
                            <button v-if="!recordContent.isHeader&&tableContents.tableContentOptions.showRecordOption" @click="(e)=>{changeTitleOnly(recordIndex)}"  tabindex="-1" >➠</button>
                            <button v-if="!recordContent.isHeader&&tableContents.tableContentOptions.showRecordOption" @click="(e)=>{reduceIndent(recordIndex)}" tabindex="-1" >◁</button>
                            <button v-if="!recordContent.isHeader&&tableContents.tableContentOptions.showRecordOption" :disabled="!addIndentAble(recordIndex)" :style="!addIndentAble(recordIndex)?{backgroundColor: 'var(--primary-gray-700)'}:{}" @click="(e)=>{addIndent(recordIndex)}" tabindex="-1"  >▷</button>
                            <button v-if="!recordContent.isHeader&&tableContents.tableContentOptions.showRecordOption" @click="(e)=>{replacePositionRecord(recordIndex,recordIndex+1)}" tabindex="-1"  >▼</button>
                            <button v-if="!recordContent.isHeader&&tableContents.tableContentOptions.showRecordOption" @click="(e)=>{replacePositionRecord(recordIndex,recordIndex-1)}" tabindex="-1"  >▲</button>
                            <button v-if="tableContents.tableContentOptions.showRecordOption" @click="(e)=>{addRecord(recordIndex)}"  tabindex="-1" >＋</button>
                            <button v-if="!recordContent.isHeader&&tableContents.tableContentOptions.showRecordIdOption" @click="copyToClipBoard(recordContent.id)" :title="'Copy Record ID: '+recordContent.id">ID</button>
                            <button v-if=" recordContent.isHeader&&tableContents.tableContentOptions.showTableContentIdOption" @click="copyToClipBoard(tableContents.id)" :title="'Copy Table ID: '+ tableContents.id">ID</button>
                        </div>
                    </div>
                </template>
                <template #indent>
                    <Indent :indent="recordContent.indent"  ></Indent>
                </template>
                
                <template v-for="cell,cellIndex in recordContent.cells" :key="cell.id">
                    <Title v-if="cellIndex==0" >
                        <template #rowOptions v-if="recordIndex==0">
                            <div :class="style.rowOption">
                                <div  :class="style.rowOptionContainer">
                                    <button v-if="tableContents.tableContentOptions.showRowOption" @click="deleteRow(cellIndex)" tabindex="-1" >×</button>
                                    <button v-if="tableContents.tableContentOptions.showRowOption" @click="addRow(cellIndex)" tabindex="-1" >＋</button>
                                    <button v-if="tableContents.tableContentOptions.showRowOption" @click="replacePositionRow(cellIndex,cellIndex+1)" tabindex="-1"  >▶</button>
                                </div>
                            </div>
                        </template>
                        <CellInput :value="cell.content" @input="(value:string)=>{cell.content = value; tableContents = {...tableContents};}">
                        </CellInput>
                    </Title>
                    <template v-else>
                        <Data :dataLength="recordContent.cells.length-1" v-if="!recordContent.isTitleOnly">
                            <template  #rowOptions v-if="recordIndex==0">
                                <div :class="style.rowOption">
                                    <div  :class="style.rowOptionContainer">
                                        <button v-if="tableContents.tableContentOptions.showRowOption" @click="deleteRow(cellIndex)" tabindex="-1" >×</button>
                                        <button v-if="tableContents.tableContentOptions.showRowOption" @click="addRow(cellIndex)" tabindex="-1" >＋</button>
                                        <button v-if="tableContents.tableContentOptions.showRowOption" @click="replacePositionRow(cellIndex,cellIndex-1)" tabindex="-1" >◀</button>
                                        <button v-if="tableContents.tableContentOptions.showRowOption" @click="replacePositionRow(cellIndex,cellIndex+1)" tabindex="-1" >▶</button>
                                    </div>
                                </div>
                            </template>
                            <CellInput :value="cell.content" @input="(value:string)=>{
                                cell.content = value;
                                tableContents = {...tableContents};
                            }"/>
                        </Data>
                    </template>
                </template>
            </Record>
        </div >
    </div>
</template>
<style >



</style>
<style module="style">


.container{
    display: flex;
    flex-direction: row;
    width: 100%;
}
.table{
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid var(--primary-gray-700);
    width: 100%;
}


.option{
    width:0rem;
}
.optionContainer{
    display: flex;
    justify-content: flex-end;
    width:9.6rem;/* 1rem*8 + 0.2rem*8 */
    transform: translateX(-9.6rem);/* 1rem*8 + 0.2rem*8 */
    opacity: 0;
    cursor: pointer;
    transition: opacity 0.3s ease;
    gap: 0.2rem;

}
.optionContainer button{
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--primary-gray-900);
    border-radius: 0.2rem;
    width:1rem;
    height: 1rem;
    font-size: 0.5rem;
    color: var(--primary-gray-500);
}
.optionContainer:hover{
    opacity:1; 
}


.rowOption{
    display: flex;
    justify-content: flex-end;
    height: 0px;
}
.rowOptionContainer:hover{
    opacity:1; 
}
.rowOptionContainer{
    display: flex;
    justify-content: flex-end;
    opacity: 0;
    transform: translateY(-1.1rem);
    transition: opacity 0.3s ease;
    gap: 0.2rem;
    height:1.1rem;
}
.rowOption button{
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--primary-gray-900);
    border-radius: 0.2rem;
    width:1rem;
    height: 1rem;
    font-size: 0.5rem;
    color: var(--primary-gray-500);
    cursor: pointer;
}



</style>