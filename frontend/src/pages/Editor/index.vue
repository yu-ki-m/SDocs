<script setup lang="ts">
import {ref,onMounted,Ref} from 'vue'
import { LocationQuery } from 'vue-router'
import { Template } from "../../components/Template.Entity";
import { DocsBaseInfoInterface } from './DocsBaseInfoUI/EmitTypes'
import { TemplateContentsInterface,TemplateContents,TemplateContent } from './TemplateContentsModel'
import ContentsContainerLayout from './ContentsContainerLayout/index.vue'
import NestTable from '../../components/general-ui/NestTable/index.vue'
import RichEditorRecordLayout from '../../components/general-ui/RichEditorRecordLayout/index.vue'
import { Uuid,UuidInterface } from '../../lib/Uuid';
import { PageProps } from "../../components/page-props//PageProps";

import MainLayout from "../../components/general-ui/MainLayout/index.vue";
import DocsBaseInfo from './DocsBaseInfoUI/index.vue';
import QuillEditor from '../../components/general-ui/RichEditor/QuillEditor/index.vue'
import EditorFrame from '../../components/general-ui/RichEditor/EditorFrame/index.vue'
import DocsBaseInfoModel ,{ DocsBaseInfoModelInterface } from './DocsBaseInfoModel'


/** コンポーネントのProps型定義 */
export interface PropsInterface{
      pageProps: PageProps
}
const props = defineProps<PropsInterface>();


const uuidCreator:UuidInterface = new Uuid();

/** 基本情報 */
let docsBaseInfoModel:Ref<DocsBaseInfoModelInterface> = ref<DocsBaseInfoModelInterface>(new DocsBaseInfoModel({ docsName: "", docsVersion: "", docsId: "" }));
/** 基本情報の初期化 */
onMounted( async ()=>{
    let query:LocationQuery = props.pageProps.routerWrapper.getQuery();
    let templateId:string = query.template as string;
    const template:Template = await props.pageProps.repositoryFactory.templateSummaryRepository.get(templateId);

    docsBaseInfoModel.value.init({
            docsName: template.viewName,
            docsVersion: template.version,
            docsId: template.docsId
    })

});
/** 基本情報の更新 */
const inputDocsBaseInfo = (value:DocsBaseInfoInterface|undefined)=>{
    if(value){
        docsBaseInfoModel.value.allUpdate({
            docsName: value.docsName,
            docsVersion: value.docsVersion,
            docsId: value.docsId
        })
        docsBaseInfoModel.value = {...docsBaseInfoModel.value};
    }
}


/** テンプレートの内容群 */
let templateContents = ref<TemplateContentsInterface>(
    new TemplateContents(
        [ new TemplateContent({id:uuidCreator.getUniquId(), contentType:'quill', content:''}) ]
    )
);
const updateContent = (contentUnitId:string,value:string) => {
    templateContents.value.updateContent(contentUnitId,value);
    templateContents.value = {...templateContents.value};
};
const deleteContent = (contentUnitIndex:number)=>{
    templateContents.value.deleteContent(contentUnitIndex);
    templateContents.value = {...templateContents.value};
};
const clickAddRichEditor = ()=>{
    templateContents.value.addContentsRichEditor(uuidCreator);
    templateContents.value = {...templateContents.value};
};
const clickAddNestTable = ()=>{
    templateContents.value.addContentsNestTable(uuidCreator);
    templateContents.value = {...templateContents.value};
};


// Drag& Drop関連 
const dragFromIndex = ref<number | null>(null);
const saveFromIndex = (index: number) => { dragFromIndex.value = index }
const moveItem = (targetIndex: number) => {
    if (dragFromIndex.value === null) return
    templateContents.value.moveIndex(dragFromIndex.value, targetIndex);
    templateContents.value = {...templateContents.value};
}
</script>

<template>
    <MainLayout :router-wrapper="pageProps.routerWrapper" :window-wrapper="pageProps.windowWrapper" >
        <div :class="style.mainContainer" id="editor-page">
            <nav :class="style.nav"><div :class="style.navContainer"></div></nav>
            <main :class="style.main" >
                <DocsBaseInfo :docs-name="docsBaseInfoModel.docsName" :docs-version="docsBaseInfoModel.docsVersion" :docs-id="docsBaseInfoModel.docsId" @input="inputDocsBaseInfo"></DocsBaseInfo>
                <ContentsContainerLayout>

                    <div v-for="(contentUnit,index) in templateContents.contents" draggable="true"  @dragstart="() => saveFromIndex(index)" @drop="() => moveItem(index)" @dragover.prevent :key="contentUnit.id" data-gid="721126e3-b797-4bbd-a86f-8a3b725ed24e">
                    
                        <template v-if="contentUnit.contentType == 'quill'">
                            <RichEditorRecordLayout>
                                <EditorFrame  >
                                    <QuillEditor :value="contentUnit.content" @input="(value:string)=>{updateContent(contentUnit.id,value)}"/>
                                </EditorFrame>
                                <template #button>
                                    <button title="削除" @click="deleteContent(index)" data-gid="258bf263-baf8-4437-a9b7-9cbbbd9a8397">×</button>
                                </template>
                            </RichEditorRecordLayout>
                            
                        </template>
                        <template v-else-if="contentUnit.contentType == 'nest-table'">
                            <div :class="style.nestTable" >
                                <NestTable></NestTable>
                                <div :class="style.nestTableRightOption">
                                    <button :class="style.nestTableDelete" title="削除" @click="deleteContent(index)" data-gid="341952cb-58ad-4da8-a628-e06bbbd0a133" >×</button>
                                </div>
                            </div>
                        
                        </template>
                    </div>
                    <div :class="style.editorOption">
                        <button type="button" id="add-rich-editor" @click="clickAddRichEditor" >Add Rich Text</button>
                        <button type="button" id="add-nest-table" @click="clickAddNestTable" >Add Nest Table</button>
                    </div>

                </ContentsContainerLayout>
            </main>
        </div>
    </MainLayout>
</template>

<style module="style">
.mainContainer{
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - var(--header-height));
    background-color: var(--primary-navy-white-900);
}
.nav{
    display:flex;
    min-height:1.5rem;
}
.navContainer{
    position: fixed;
    background-color: var(--primary-gray-200);
    min-height:1.5rem;
    width: 100vw;
    z-index: 100;
}

.main{
    display:flex;
    flex-direction: column;
}

.contentsContainer{
    display: flex;
    justify-content: center;
    width:100%;
}
.contentsEditor{
    display: flex;
    flex-direction: column;
    width:66rem;
    padding-top:2rem;
}

.editorOption{
    display:flex;
    justify-content: center;
    gap:1rem;
    padding-top:3rem;
    padding-bottom:3rem;
}

@media print {
    .editorOption{
        display:none;
    }
}

.editorOption button{
    display:flex;
    background-color: var(--primary-gray-600);
    color: var(--primary-white);
    padding:0.5rem;
    border-radius: 1rem;
}


.nestTable{
    display:flex;
    padding-left:3rem;
    padding-right:3rem;
}

.nestTableRightOption{
    width:1rem;
}
.nestTableDelete{
    width:3rem;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
}
.nestTable:hover .nestTableDelete{
    opacity: 1;
}


</style>