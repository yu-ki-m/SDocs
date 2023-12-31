<script setup lang="ts">
import { ref, onMounted, Ref } from 'vue'
import { LocationQuery } from 'vue-router'
import { DocsBaseInfoInterface } from './DocsBaseInfoUI/EmitTypes'
import { TemplateContentState, TemplateContentsState } from './TemplateContentsModel' // TODO: ここは
import { TemplateContentsInterface } from '../../components/sdocs/TemplateContents'
import ContentsContainerLayout from './ContentsContainerLayout/index.vue'
import NestTable from '../../components/general-ui/NestTable/index.vue'
import RichTable from '../../components/general-ui/RichTable/index.vue'
import GridEditor from '../../components/general-ui/GridEditor/index.vue'
import FlexGridEditor from '../../components/general-ui/FlexGridEditor/index.vue'
import PageBreakLine from '../../components/general-ui/PageBreakLine/index.vue'

import RichEditorRecordLayout from '../../components/general-ui/RichEditorRecordLayout/index.vue'
import { Uuid, UuidInterface } from '../../components/Uuid'
import { PageProps } from '../../components/page-props//PageProps'

import MainLayout from '../../components/general-ui/MainLayout/index.vue'
import DocsBaseInfo from './DocsBaseInfoUI/index.vue'
import QuillEditor from '../../components/general-ui/RichEditor/QuillEditor/index.vue'
import EditorFrame from '../../components/general-ui/RichEditor/EditorFrame/index.vue'
import DocsBaseInfoModel, { DocsBaseInfoModelInterface } from './DocsBaseInfoModel'

import { TemplateSummaryInterface } from '../../components/sdocs/TemplateSummary'
import ExportHtmlButton from './ExportHtmlButton/index.vue'
import ExportSvgButton from './ExportSvgButton/index.vue'
import ExportJsonButton from './ExportJsonButton/index.vue'
import FileImport from '../../assets/fileImport.svg'

/** コンポーネントのProps型定義 */
export interface PropsInterface {
    pageProps: PageProps
}
const props = defineProps<PropsInterface>()

const uuidCreator: UuidInterface = new Uuid()

/** 基本情報 */
const docsBaseInfoModel: Ref<DocsBaseInfoModelInterface> = ref<DocsBaseInfoModelInterface>(
    new DocsBaseInfoModel({ docsName: '', docsVersion: '', docsId: '' })
)
/** 基本情報の初期化 */
onMounted(async () => {
    let query: LocationQuery = props.pageProps.routerWrapper.getQuery()
    let templateId: string = query.template as string
    const templateSummary: TemplateSummaryInterface =
        await props.pageProps.repositoryFactory.templateSummaryRepository.get(templateId)

    docsBaseInfoModel.value.init({
        docsName: templateSummary.viewName,
        docsVersion: '1.00',
        docsId: templateSummary.templateId
    })
})
/** 基本情報の更新 */
const inputDocsBaseInfo = (value: DocsBaseInfoInterface | undefined) => {
    if (value) {
        docsBaseInfoModel.value.allUpdate({
            docsName: value.docsName,
            docsVersion: value.docsVersion,
            docsId: value.docsId
        })
        // docsBaseInfoModel.value = { ...docsBaseInfoModel.value }
    }
}

/** テンプレートの内容群 */
const templateContentsState = ref<TemplateContentsState>(
    new TemplateContentsState([
        new TemplateContentState({ id: uuidCreator.getUniquId(), contentType: 'quill', content: '' })
    ])
)

/** テンプレートの内容群初期化 */
onMounted(async () => {
    let query: LocationQuery = props.pageProps.routerWrapper.getQuery()
    let templateId: string = query.template as string
    const getTemplateContents: TemplateContentsInterface[] =
        await props.pageProps.repositoryFactory.templateContentsRepository.get(templateId)
    templateContentsState.value.contents = getTemplateContents.map((templateContent: TemplateContentsInterface) => {
        return new TemplateContentState({
            id: templateContent.template_content_id,
            contentType: templateContent.content_type,
            content: templateContent.contents
        })
    })
    templateContentsState.value = { ...templateContentsState.value }
})

const updateContent = (contentUnitId: string, value: string) => {
    templateContentsState.value.contents = templateContentsState.value.updateContent(
        templateContentsState.value.contents,
        contentUnitId,
        value
    )
    templateContentsState.value = { ...templateContentsState.value }
}
const deleteContent = (contentUnitIndex: number) => {
    templateContentsState.value.contents = templateContentsState.value.deleteContent(
        templateContentsState.value.contents,
        contentUnitIndex
    )
    templateContentsState.value = { ...templateContentsState.value }
}
const clickAddRichEditor = () => {
    templateContentsState.value.contents = templateContentsState.value.addContentsRichEditor(
        templateContentsState.value.contents,
        uuidCreator
    )
    templateContentsState.value = { ...templateContentsState.value }
}
const clickAddNestTable = () => {
    templateContentsState.value.contents = templateContentsState.value.addContentsNestTable(
        templateContentsState.value.contents,
        uuidCreator
    )
    templateContentsState.value = { ...templateContentsState.value }
}

const clickAddRichTable = () => {
    templateContentsState.value.contents = templateContentsState.value.addContentsRichTable(
        templateContentsState.value.contents,
        uuidCreator
    )
    templateContentsState.value = { ...templateContentsState.value }
}
const clickAddGridEditor = () => {
    templateContentsState.value.contents = templateContentsState.value.addContentsGridEditor(
        templateContentsState.value.contents,
        uuidCreator
    )
    templateContentsState.value = { ...templateContentsState.value }
}

const clickAddFlexGridEditor = () => {
    templateContentsState.value.contents = templateContentsState.value.addContentsFlexGridEditor(
        templateContentsState.value.contents,
        uuidCreator
    )
    templateContentsState.value = { ...templateContentsState.value }
}
const clickAddPageBreakLine = () => {
    templateContentsState.value.contents = templateContentsState.value.addContentsPageBreakLine(
        templateContentsState.value.contents,
        uuidCreator
    )
    templateContentsState.value = { ...templateContentsState.value }
}

// TODO テストを記載する
const fileImport = (e: Event) => {
    const files = (e.target as HTMLInputElement).files
    if (files) {
        const file = files[0]
        const reader = new FileReader()
        reader.onload = () => {
            const fileContentsStr: string = reader.result as string
            let json = {} as { docsBaseInfo: DocsBaseInfoModelInterface; templateContents: TemplateContentsState }
            try {
                json = JSON.parse(fileContentsStr)
            } catch {
                // <sdocs>で囲われた部分を取得する
                const jsonStr = fileContentsStr.match(/<sdocs>(.*)<\/sdocs>/s)?.[1]
                if (!jsonStr) return
                json = JSON.parse(jsonStr)
            }

            // ここからはデータに適用する処理
            docsBaseInfoModel.value.docsName = json.docsBaseInfo.docsName
            docsBaseInfoModel.value.docsVersion = json.docsBaseInfo.docsVersion
            docsBaseInfoModel.value.docsId = json.docsBaseInfo.docsId

            templateContentsState.value.contents = json.templateContents.contents.map(
                (templateContent: TemplateContentState) => {
                    return new TemplateContentState({
                        id: templateContent.id,
                        contentType: templateContent.contentType,
                        content: templateContent.content
                    })
                }
            )
            //docsBaseInfoModel.value = { ...docsBaseInfoModel.value } // NG
            templateContentsState.value = { ...templateContentsState.value }
        }
        reader.readAsText(file)
    }
    // input type="file"のファイルをクリアする
    ;(e.target as HTMLInputElement).value = ''
}

// Drag& Drop関連
const draggable = ref<boolean>(false)
const dragFromIndex = ref<number | null>(null)
const operationNameForDrop = ref<string | null>(null)
const saveFromIndex = (index: number, operationName: string) => {
    dragFromIndex.value = index
    operationNameForDrop.value = operationName
}
const draggableToFalse = () => {
    draggable.value = false
}
const draggableToTrue = () => {
    setTimeout(() => {
        draggable.value = true
    }, 500)
}

const moveItem = (targetIndex: number) => {
    if (dragFromIndex.value === null) return
    if (operationNameForDrop.value === null) return
    if (operationNameForDrop.value === 'moveAnyItem') {
        templateContentsState.value.contents = templateContentsState.value.moveIndex(
            templateContentsState.value.contents,
            dragFromIndex.value,
            targetIndex
        )
    } else if (operationNameForDrop.value === 'new-rich-editor') {
        templateContentsState.value.contents = templateContentsState.value.insertNewContentsRichEditor(
            templateContentsState.value.contents,
            targetIndex,
            uuidCreator
        )
    } else if (operationNameForDrop.value === 'new-nest-table') {
        templateContentsState.value.contents = templateContentsState.value.insertNewContentsNestTable(
            templateContentsState.value.contents,
            targetIndex,
            uuidCreator
        )
    } else if (operationNameForDrop.value === 'new-rich-table') {
        templateContentsState.value.contents = templateContentsState.value.insertNewContentsRichTable(
            templateContentsState.value.contents,
            targetIndex,
            uuidCreator
        )
    } else if (operationNameForDrop.value === 'new-grid-editor') {
        templateContentsState.value.contents = templateContentsState.value.insertNewContentsGridEditor(
            templateContentsState.value.contents,
            targetIndex,
            uuidCreator
        )
    } else if (operationNameForDrop.value === 'new-flex-grid-editor') {
        templateContentsState.value.contents = templateContentsState.value.insertNewContentsFlexGridEditor(
            templateContentsState.value.contents,
            targetIndex,
            uuidCreator
        )
    } else if (operationNameForDrop.value === 'page-break-line') {
        templateContentsState.value.contents = templateContentsState.value.insertPageBreakLine(
            templateContentsState.value.contents,
            targetIndex,
            uuidCreator
        )
    }
    templateContentsState.value = { ...templateContentsState.value }
}
</script>

<template>
    <MainLayout :router-wrapper="pageProps.routerWrapper" :window-wrapper="pageProps.windowWrapper">
        <div id="editor-page" :class="style.mainContainer">
            <nav :class="style.nav">
                <div :class="style.navContainer">
                    <!-- TODO テストを追加する-->
                    <ExportHtmlButton
                        :filename="docsBaseInfoModel.docsName"
                        :target-id="'export-target'"
                        :save-json-data="
                            JSON.stringify(
                                { docsBaseInfo: docsBaseInfoModel, templateContents: templateContentsState },
                                null,
                                '    '
                            )
                        "
                    />
                    <!-- TODO テストを追加する-->
                    <ExportJsonButton
                        :filename="docsBaseInfoModel.docsName"
                        :data="
                            JSON.stringify(
                                { docsBaseInfo: docsBaseInfoModel, templateContents: templateContentsState },
                                null,
                                '    '
                            )
                        "
                    />

                    <ExportSvgButton
                        :filename="docsBaseInfoModel.docsName"
                        :target-id="'export-target'"
                        :save-json-data="
                            JSON.stringify(
                                { docsBaseInfo: docsBaseInfoModel, templateContents: templateContentsState },
                                null,
                                '    '
                            )
                        "
                    ></ExportSvgButton>
                    <div style="display: flex; align-items: center">
                        <label title="import json or html file " style="width: 1.2rem; height: 1.2rem; cursor: pointer">
                            <img :src="FileImport" alt="file import" />
                            <input
                                style="display: none"
                                type="file"
                                accept="application/json, text/html"
                                @change="
                                    (e: Event) => {
                                        fileImport(e)
                                    }
                                "
                            />
                        </label>
                    </div>
                </div>
            </nav>
            <nav :class="style.editNav">
                <div :class="style.editNavInner">
                    <div
                        title="Rich Text"
                        :draggable="true"
                        :class="style.documentItem"
                        @dragstart="
                            () => {
                                saveFromIndex(-1, 'new-rich-editor')
                            }
                        "
                    >
                        <span>T</span>
                    </div>
                    <div
                        title="Nest Table"
                        :draggable="true"
                        :class="style.documentItem"
                        @dragstart="
                            () => {
                                saveFromIndex(-1, 'new-nest-table')
                            }
                        "
                    >
                        <span>NT</span>
                    </div>
                    <div
                        title="Rich Table"
                        :draggable="true"
                        :class="style.documentItem"
                        @dragstart="
                            () => {
                                saveFromIndex(-1, 'new-rich-table')
                            }
                        "
                    >
                        <span>RT</span>
                    </div>
                    <div
                        title="Grid Editor"
                        :draggable="true"
                        :class="style.documentItem"
                        @dragstart="
                            () => {
                                saveFromIndex(-1, 'new-grid-editor')
                            }
                        "
                    >
                        <span>GE</span>
                    </div>
                    <div
                        title="Flex Grid Editor"
                        :draggable="true"
                        :class="style.documentItem"
                        @dragstart="
                            () => {
                                saveFromIndex(-1, 'new-flex-grid-editor')
                            }
                        "
                    >
                        <span>FG</span>
                    </div>
                    <div
                        title="Page Break Line"
                        :draggable="true"
                        :class="style.documentItem"
                        @dragstart="
                            () => {
                                saveFromIndex(-1, 'page-break-line')
                            }
                        "
                    >
                        <span>PB</span>
                    </div>
                </div>
            </nav>
            <DocsBaseInfo
                :docs-name="docsBaseInfoModel.docsName"
                :docs-version="docsBaseInfoModel.docsVersion"
                :docs-id="docsBaseInfoModel.docsId"
                @input="
                    (e: DocsBaseInfoInterface) => {
                        inputDocsBaseInfo({ docsName: e.docsName, docsVersion: e.docsVersion, docsId: e.docsId })
                    }
                "
            ></DocsBaseInfo>
            <main :class="style.main">
                <ContentsContainerLayout>
                    <div id="export-target" :class="style.exportTarget">
                        <div
                            v-for="(contentUnit, index) in templateContentsState.contents"
                            :key="contentUnit.id"
                            :draggable="draggable"
                            data-gid="721126e3-b797-4bbd-a86f-8a3b725ed24e"
                            @mousedown="draggableToTrue()"
                            @mouseup="draggableToFalse()"
                            @dragstart="
                                () => {
                                    saveFromIndex(index, 'moveAnyItem')
                                }
                            "
                            @drop="
                                () => {
                                    moveItem(index)
                                    draggableToFalse()
                                }
                            "
                            @dragover.prevent
                        >
                            <template v-if="contentUnit.contentType == 'quill'">
                                <RichEditorRecordLayout>
                                    <EditorFrame>
                                        <QuillEditor
                                            :value="contentUnit.content"
                                            :readonly="false"
                                            @input="
                                                (value: string) => {
                                                    updateContent(contentUnit.id, value)
                                                }
                                            "
                                        />
                                    </EditorFrame>
                                    <template #button>
                                        <button
                                            data-gid="258bf263-baf8-4437-a9b7-9cbbbd9a8397"
                                            title="削除"
                                            @click="deleteContent(index)"
                                        >
                                            ×
                                        </button>
                                    </template>
                                </RichEditorRecordLayout>
                            </template>
                            <template v-else-if="contentUnit.contentType == 'nest-table'">
                                <div :class="style.nestTable">
                                    <NestTable
                                        :value="contentUnit.content"
                                        :readonly="false"
                                        @input="
                                            (value: string) => {
                                                updateContent(contentUnit.id, value)
                                            }
                                        "
                                    ></NestTable>
                                    <div :class="style.nestTableRightOption">
                                        <button
                                            :class="style.nestTableDelete"
                                            data-gid="341952cb-58ad-4da8-a628-e06bbbd0a133"
                                            title="削除"
                                            @click="deleteContent(index)"
                                        >
                                            ×
                                        </button>
                                    </div>
                                </div>
                            </template>
                            <template v-else-if="contentUnit.contentType == 'rich-table'">
                                <div :class="style.richTable">
                                    <RichTable
                                        :value="contentUnit.content"
                                        :readonly="false"
                                        @input="
                                            (value: string) => {
                                                updateContent(contentUnit.id, value)
                                            }
                                        "
                                    >
                                    </RichTable>
                                    <div :class="style.richTableRightOption">
                                        <button
                                            :class="style.richTableDelete"
                                            data-gid="e1502be2-1997-4561-b1ba-ee852f56eb49"
                                            title="削除"
                                            @click="deleteContent(index)"
                                        >
                                            ×
                                        </button>
                                    </div>
                                </div>
                            </template>

                            <template v-else-if="contentUnit.contentType == 'grid-editor'">
                                <div :class="style.gridEditor">
                                    <GridEditor
                                        :value="contentUnit.content"
                                        :readonly="false"
                                        @input="
                                            (value: string) => {
                                                updateContent(contentUnit.id, value)
                                            }
                                        "
                                    >
                                    </GridEditor>
                                    <div :class="style.gridEditorRightOption">
                                        <button
                                            :class="style.gridEditorDelete"
                                            data-gid="54ed5d53-7f16-4e67-9de3-73f462b49340"
                                            title="削除"
                                            @click="deleteContent(index)"
                                        >
                                            ×
                                        </button>
                                    </div>
                                </div>
                            </template>

                            <template v-else-if="contentUnit.contentType == 'flex-grid-editor'">
                                <div :class="style.gridEditor">
                                    <FlexGridEditor
                                        :value="contentUnit.content"
                                        :readonly="false"
                                        @input="
                                            (value: string) => {
                                                updateContent(contentUnit.id, value)
                                            }
                                        "
                                    >
                                    </FlexGridEditor>
                                    <div :class="style.gridEditorRightOption">
                                        <button
                                            :class="style.gridEditorDelete"
                                            data-gid="68493cc0-a201-4610-8e43-5b908ccbd275"
                                            title="削除"
                                            @click="deleteContent(index)"
                                        >
                                            ×
                                        </button>
                                    </div>
                                </div>
                            </template>
                            <template v-else-if="contentUnit.contentType == 'page-break-line'">
                                <div :class="[style.pageBreakLineArea, style.gridEditor]">
                                    <PageBreakLine></PageBreakLine>
                                    <div :class="style.gridEditorRightOption">
                                        <button
                                            :class="style.gridEditorDelete"
                                            data-gid="67885974-9caa-4999-acfc-19a6ec76df59"
                                            title="削除"
                                            @click="deleteContent(index)"
                                        >
                                            ×
                                        </button>
                                    </div>
                                </div>
                            </template>
                        </div>
                    </div>
                    <div
                        :class="style.editorOption"
                        @drop="
                            () => {
                                moveItem(templateContentsState.contents.length)
                            }
                        "
                        @dragover.prevent
                    >
                        <button id="add-rich-editor" type="button" @click="clickAddRichEditor">Add Rich Text</button>
                        <button id="add-nest-table" type="button" @click="clickAddNestTable">Add Nest Table</button>
                        <button id="add-rich-table" type="button" @click="clickAddRichTable">Add Rich Table</button>
                        <button id="add-grid-editor" type="button" @click="clickAddGridEditor">Add Grid Editor</button>
                        <button id="add-flex-grid-editor" type="button" @click="clickAddFlexGridEditor">Add FlexGrid Editor</button>
                        <button id="add-page-break-line" type="button" @click="clickAddPageBreakLine">Add Page Break Line</button>
                    </div>
                </ContentsContainerLayout>
            </main>
        </div>
    </MainLayout>
</template>

<style module="style">
.mainContainer {
    display: flex;
    flex-direction: column;
}
.nav {
    display: flex;
    min-height: 1.5rem;
}

@media print {
    .nav {
        display: none;
    }
}
.navContainer {
    position: fixed;
    background-color: var(--primary-gray-200);
    min-height: 1.5rem;
    width: 100vw;
    z-index: 1000;
    display: flex;
    justify-items: center;
    padding: 0 0.5rem;
}

/* サイズ調整:START */
.exportTarget {
    zoom: 100%;
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;
}
@media screen and (max-width: 80.125rem) {
    .exportTarget {
        zoom: 90%;
        padding-left: 3rem;
        padding-right: 3rem;
    }
    .editorOption {
        zoom: 90%;
    }
}
@media screen and (max-width: 72.1125rem) {
    .exportTarget {
        zoom: 80%;
        padding-left: 4rem;
        padding-right: 4rem;
    }
    .editorOption {
        zoom: 80%;
    }
}
@media screen and (max-width: 64.1rem) {
    .exportTarget {
        zoom: 70%;
        padding-left: 5rem;
        padding-right: 5rem;
    }
    .editorOption {
        zoom: 70%;
    }
}
@media screen and (max-width: 56.0875rem) {
    .exportTarget {
        zoom: 60%;
        padding-left: 6rem;
        padding-right: 6rem;
    }
    .editorOption {
        zoom: 60%;
    }
}
@media screen and (max-width: 48.075rem) {
    .exportTarget {
        zoom: 50%;
        padding-left: 7rem;
        padding-right: 7rem;
    }
    .editorOption {
        zoom: 50%;
    }
}
@media screen and (max-width: 40.0625rem) {
    .exportTarget {
        zoom: 40%;
        padding-left: 8rem;
        padding-right: 8rem;
    }
    .editorOption {
        zoom: 50%;
    }
}
@media screen and (max-width: 32.05rem) {
    .exportTarget {
        zoom: 30%;
        padding-left: 9rem;
        padding-right: 9rem;
    }
    .editorOption {
        zoom: 30%;
    }
}
/* サイズ調整:END */

.main {
    display: flex;
    flex-direction: column;
}

.contentsContainer {
    display: flex;
    justify-content: center;
    width: 100%;
}
.contentsEditor {
    display: flex;
    flex-direction: column;
    width: 66rem;
    padding-top: 2rem;
}

.editorOption {
    display: flex;
    justify-content: center;
    gap: 1rem;
    padding-top: 3rem;
    padding-bottom: 3rem;
}

@media print {
    .editorOption {
        display: none;
    }
}

.editorOption button {
    display: flex;
    background-color: var(--primary-gray-600);
    color: var(--primary-white);
    padding: 0.5rem;
    border-radius: 1rem;
}

.nestTable {
    display: flex;
    padding-left: 3rem;
    padding-right: 3rem;
}

.nestTableRightOption {
    width: 1rem;
}
.nestTableDelete {
    width: 3rem;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
}
.nestTable:hover .nestTableDelete {
    opacity: 1;
}

.richTable {
    display: flex;
    justify-content: center;
}

.richTableRightOption {
    width: 1rem;
}
.richTableDelete {
    width: 3rem;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
}
.richTable:hover .richTableDelete {
    opacity: 1;
}

.gridEditor {
    display: flex;
    justify-content: center;
    width: 100%;
}

.gridEditorRightOption {
    width: 1rem;
}
.gridEditorDelete {
    width: 1rem;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
}
.gridEditor:hover .gridEditorDelete {
    opacity: 1;
}

.editNav {
    position: fixed;
    display: flex;
    right: 0;
    transform: translateY(3.1rem);
    height: 100vh;
    width: 2.5rem;
    background-color: var(--primary-gray-100);
    z-index: 100;
}

@media print {
    .editNav {
        display: none;
    }
}
@media print {
    .pageBreakLineArea {
        opacity: 0;
    }
}

.editNavInner {
    display: flex;
    flex-direction: column;
    flex: 1;
    background-color: var(--primary-gray-300);
}
.documentItem {
    background-color: var(--primary-gray-400);
    height: 2.5rem;
    width: 2.5rem;
    text-align: center;
    color: var(--primary-gray-900);
    line-height: 2.5rem;
    border: none;
    cursor: grab;
    box-sizing: border-box;
    border: solid 1px var(--primary-gray-500);
}
.documentItem:active {
    cursor: grabbing;
}
</style>
