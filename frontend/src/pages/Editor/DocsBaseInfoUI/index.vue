<script setup lang="ts">
import { DocsBaseInfoInterface } from './EmitTypes';

/**
 * コンポーネントのProps型定義
 */
export interface PropsInterface {
    docsName      : string
    docsVersion   : string
    docsId        : string
}
const props = defineProps<PropsInterface>();

const emits = defineEmits<{(e: 'input', value?:DocsBaseInfoInterface): void}>()

const inputUpdateDocsName = (event:Event)=>{
    let docsNameTmp = (event.target as HTMLInputElement).value
    let docsBaseInfoTmp:DocsBaseInfoInterface = { ...props }
    docsBaseInfoTmp.docsName = docsNameTmp
    emits('input',docsBaseInfoTmp );
}

const inputUpdateDocsVersion = (event:Event)=>{
    let docsVersionTmp = (event.target as HTMLInputElement).value
    let docsBaseInfoTmp:DocsBaseInfoInterface = { ...props }
    docsBaseInfoTmp.docsVersion = docsVersionTmp
    emits('input',docsBaseInfoTmp );
}
const inputUpdateDocsId = (event:Event)=>{  
    let docsIdTmp = (event.target as HTMLInputElement).value
    let docsBaseInfoTmp:DocsBaseInfoInterface = { ...props }
    docsBaseInfoTmp.docsId = docsIdTmp
    emits('input',docsBaseInfoTmp );
}


</script>

<template>
    <div :class="style.baseInfoFrame">
        <div :class="style.baseInfo" >
            <label >
                <input :value="docsName" @input="inputUpdateDocsName($event)" 
                    id="editor_docs-name" placeholder="docs name" title="docs name"/>  
            </label>
            <label>
                <input :value="docsVersion" @input="inputUpdateDocsVersion($event)" 
                    id="editor_docs-version" placeholder="docs version" title="docs version"/>  
            </label>
            <label>
                <input :value="docsId" @input="inputUpdateDocsId($event)" 
                    id="editor_docs-id" placeholder="docs id" title="docs id"/>
            </label>
        </div>
    </div>
</template>
    

<style module="style">

.baseInfoFrame{
    display:flex;
    flex-direction: column;
    flex: 1 ;
    height:1rem;

}
.baseInfo{
    position:fixed;
    width:100vw;

    display:flex;
    flex-direction: row;
    background-color: var(--primary-gray-900);
    flex: 1 ;
    z-index: 100;


}

.baseInfo>label>input{
    --border-width:1px;
    display:flex;
    background-color: var(--primary-gray-300);
    outline:none;
    padding: 0;
    margin: 0;
    border: solid var(--border-width) var(--primary-gray-400);
    color: var(--primary-gray-800);
    min-width: 1rem;

}

.baseInfo>label:nth-child(1){
    display: flex;
    flex: 3 ;
    min-width: 1rem;
}
.baseInfo>label:nth-child(2){
    display: flex;
    flex: 1 ;
    max-width: 7rem;
    min-width: 1rem;
}
.baseInfo>label:nth-child(3){
    display: flex;
    flex: 2 ;
    min-width: 1rem;
}

.baseInfo>label>input{
    display: flex;
    flex: 1 ;
}


@media print {
    .baseInfoFrame{
        display:none;
    }
}
</style>