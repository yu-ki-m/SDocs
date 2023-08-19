<script setup lang="ts">
import CellInput from './Record/CellInput/index.vue'
import TitleFrame from './TitleInput/TitleEditorFrame/index.vue'
import TitleInput from './TitleInput/TitleEditor/index.vue'

import Record from './Record/index.vue'
import Title from './Record/Title/index.vue'
import Data from './Record/Data/index.vue'
import { ref, onMounted, Ref } from 'vue'
import TableContent, { TableContentModule, TableContentOptions, CellContent } from './TableContent'
import { Uuid } from '../../../components/Uuid'
import Indent from './Record/Indent/index.vue'
import { debounce } from './NestTableDebounce'

/** コンポーネントのProps定義 */
export interface PropsInterface {
    value: string
}
const props = defineProps<PropsInterface>()

/** コンポーネントのEmit型定義 */
const emits = defineEmits<(e: 'input', value: string) => void>()
const inputValue = debounce((value: TableContent) => {
    if (value == undefined) {
        return
    }
    emits('input', JSON.stringify(value))
}, 300)

let uuid = new Uuid()
const tableContentModule = new TableContentModule(uuid)
const tableContentOptions = new TableContentOptions(true, true, true, true)
let tableContents: Ref<TableContent> = ref<TableContent>(
    new TableContent(uuid.getUniquId(), '', [], tableContentModule, tableContentOptions)
)

onMounted(async () => {
    let arg: TableContent | null = null
    if (props.value == undefined) {
        return
    }
    if (props.value != '') {
        arg = JSON.parse(props.value) as TableContent
        tableContents.value.id = arg.id
        tableContents.value.tableTitle = arg.tableTitle
        tableContents.value.records = arg.records
        tableContents.value.tableContentOptions = arg.tableContentOptions
    } else {
        tableContents.value.id = uuid.getUniquId()
        tableContents.value.tableTitle = ''
        tableContents.value.records = []
        tableContents.value.tableContentOptions = new TableContentOptions(true, true, true, true)
        tableContents.value.initRecords()
    }

    tableContents.value = { ...tableContents.value }
})
const updateTitleCellInput = (targetCell: CellContent, updateString: string) => {
    targetCell.content = updateString
    tableContents.value = { ...tableContents.value }
    inputValue(tableContents.value)
}
const updateDataCellInput = (targetCell: CellContent, updateString: string) => {
    targetCell.content = updateString
    tableContents.value = { ...tableContents.value }
    inputValue(tableContents.value)
}

const addRecord = (insertPostion: number) => {
    tableContents.value.addRecord(insertPostion)
    tableContents.value = { ...tableContents.value }
    inputValue(tableContents.value)
}

const addIndentAble = (changePostion: number) => {
    return tableContents.value.addIndentAble(changePostion)
}

const addIndent = (changePostion: number) => {
    tableContents.value.addIndent(changePostion)
    tableContents.value = { ...tableContents.value }
    inputValue(tableContents.value)
}
const reduceIndent = (changePostion: number) => {
    tableContents.value.reduceIndent(changePostion)
    tableContents.value = { ...tableContents.value }
    inputValue(tableContents.value)
}

const deleteRecord = (deletePostion: number) => {
    tableContents.value.deleteRecord(deletePostion)
    tableContents.value = { ...tableContents.value }
    inputValue(tableContents.value)
}

const changeTitleOnly = (changePostion: number) => {
    tableContents.value.changeTitleOnly(changePostion)
    tableContents.value = { ...tableContents.value }
    inputValue(tableContents.value)
}

const addRow = (insertPostion: number) => {
    tableContents.value.addRow(insertPostion)
    tableContents.value = { ...tableContents.value }
    inputValue(tableContents.value)
}

const deleteRow = (deletePostion: number) => {
    tableContents.value.deleteRow(deletePostion)
    tableContents.value = { ...tableContents.value }
    inputValue(tableContents.value)
}

const titleChange = (value: string) => {
    tableContents.value.tableTitle = value
    tableContents.value = { ...tableContents.value }
    inputValue(tableContents.value)
}

const replacePositionRow = (replacePostion: number, replaceTargetPostion: number) => {
    tableContents.value.replacePositionRow(replacePostion, replaceTargetPostion)
    tableContents.value = { ...tableContents.value }
    inputValue(tableContents.value)
}

const replacePositionRecord = (replacePostion: number, replaceTargetPostion: number) => {
    tableContents.value.replacePositionRecord(replacePostion, replaceTargetPostion)
    tableContents.value = { ...tableContents.value }
    inputValue(tableContents.value)
}

const copyToClipBoard = (text: string) => {
    if (document.body.style?.webkitUserSelect != undefined || document?.execCommand != undefined) {
        // 空div 生成
        let tmp = document.createElement('div')
        // 選択用のタグ生成
        let pre = document.createElement('pre')
        // 親要素のCSSで user-select: none だとコピーできないので書き換える
        pre.style.webkitUserSelect = 'auto'
        pre.style.userSelect = 'auto'
        tmp.appendChild(pre).textContent = text
        // 要素を画面外へ
        let s = tmp.style
        s.position = 'fixed'
        s.right = '200%'
        // body に追加
        document.body.appendChild(tmp)
        // 要素を選択
        document.getSelection()?.selectAllChildren(tmp)
        // クリップボードにコピー
        document.execCommand('copy')
        // 要素削除
        document.body.removeChild(tmp)
    } else {
        navigator.clipboard.writeText(text) // ※httpsの場合のみ可能
    }
    return
}
</script>
<template>
    <div :class="style.container" data-gid="318c638b-54a2-4698-88cc-f577cacbc355">
        <div :class="style.table">
            <TitleFrame>
                <TitleInput
                    :value="tableContents.tableTitle"
                    @input="
                        (value: string) => {
                            titleChange(value)
                        }
                    "
                />
            </TitleFrame>
            <Record
                v-for="(recordContent, recordIndex) in tableContents.records"
                :key="recordContent.id"
                :indent="recordContent.indent"
                :is-header="recordContent.isHeader"
            >
                <template #options>
                    <div :class="style.option">
                        <div :class="style.optionContainer">
                            <button
                                v-if="!recordContent.isHeader && tableContents.tableContentOptions.showRecordOption"
                                tabindex="-1"
                                @click="
                                    (e) => {
                                        deleteRecord(recordIndex)
                                    }
                                "
                            >
                                ×
                            </button>
                            <button
                                v-if="!recordContent.isHeader && tableContents.tableContentOptions.showRecordOption"
                                tabindex="-1"
                                @click="
                                    (e) => {
                                        changeTitleOnly(recordIndex)
                                    }
                                "
                            >
                                ➠
                            </button>
                            <button
                                v-if="!recordContent.isHeader && tableContents.tableContentOptions.showRecordOption"
                                tabindex="-1"
                                @click="
                                    (e) => {
                                        reduceIndent(recordIndex)
                                    }
                                "
                            >
                                ◁
                            </button>
                            <button
                                v-if="!recordContent.isHeader && tableContents.tableContentOptions.showRecordOption"
                                :disabled="!addIndentAble(recordIndex)"
                                :style="
                                    !addIndentAble(recordIndex) ? { backgroundColor: 'var(--primary-gray-700)' } : {}
                                "
                                tabindex="-1"
                                @click="
                                    (e) => {
                                        addIndent(recordIndex)
                                    }
                                "
                            >
                                ▷
                            </button>
                            <button
                                v-if="!recordContent.isHeader && tableContents.tableContentOptions.showRecordOption"
                                tabindex="-1"
                                @click="
                                    (e) => {
                                        replacePositionRecord(recordIndex, recordIndex + 1)
                                    }
                                "
                            >
                                ▼
                            </button>
                            <button
                                v-if="!recordContent.isHeader && tableContents.tableContentOptions.showRecordOption"
                                tabindex="-1"
                                @click="
                                    (e) => {
                                        replacePositionRecord(recordIndex, recordIndex - 1)
                                    }
                                "
                            >
                                ▲
                            </button>
                            <button
                                v-if="tableContents.tableContentOptions.showRecordOption"
                                tabindex="-1"
                                @click="
                                    (e) => {
                                        addRecord(recordIndex)
                                    }
                                "
                            >
                                ＋
                            </button>
                            <button
                                v-if="!recordContent.isHeader && tableContents.tableContentOptions.showRecordIdOption"
                                :title="'Copy Record ID: ' + recordContent.id"
                                @click="copyToClipBoard(recordContent.id)"
                            >
                                ID
                            </button>
                            <button
                                v-if="
                                    recordContent.isHeader && tableContents.tableContentOptions.showTableContentIdOption
                                "
                                :title="'Copy Table ID: ' + tableContents.id"
                                @click="copyToClipBoard(tableContents.id)"
                            >
                                ID
                            </button>
                        </div>
                    </div>
                </template>
                <template #indent>
                    <Indent :indent="recordContent.indent"></Indent>
                </template>

                <template v-for="(cell, cellIndex) in recordContent.cells" :key="cell.id">
                    <Title v-if="cellIndex == 0">
                        <template v-if="recordIndex == 0" #rowOptions>
                            <div :class="style.rowOption">
                                <div :class="style.rowOptionContainer">
                                    <button
                                        v-if="tableContents.tableContentOptions.showRowOption"
                                        tabindex="-1"
                                        @click="deleteRow(cellIndex)"
                                    >
                                        ×
                                    </button>
                                    <button
                                        v-if="tableContents.tableContentOptions.showRowOption"
                                        tabindex="-1"
                                        @click="addRow(cellIndex)"
                                    >
                                        ＋
                                    </button>
                                    <button
                                        v-if="tableContents.tableContentOptions.showRowOption"
                                        tabindex="-1"
                                        @click="replacePositionRow(cellIndex, cellIndex + 1)"
                                    >
                                        ▶
                                    </button>
                                </div>
                            </div>
                        </template>
                        <CellInput
                            :value="cell.content"
                            @input="
                                (value: string) => {
                                    updateTitleCellInput(cell, value)
                                }
                            "
                        >
                        </CellInput>
                    </Title>
                    <template v-else>
                        <Data v-if="!recordContent.isTitleOnly" :data-length="recordContent.cells.length - 1">
                            <template v-if="recordIndex == 0" #rowOptions>
                                <div :class="style.rowOption">
                                    <div :class="style.rowOptionContainer">
                                        <button
                                            v-if="tableContents.tableContentOptions.showRowOption"
                                            tabindex="-1"
                                            @click="deleteRow(cellIndex)"
                                        >
                                            ×
                                        </button>
                                        <button
                                            v-if="tableContents.tableContentOptions.showRowOption"
                                            tabindex="-1"
                                            @click="addRow(cellIndex)"
                                        >
                                            ＋
                                        </button>
                                        <button
                                            v-if="tableContents.tableContentOptions.showRowOption"
                                            tabindex="-1"
                                            @click="replacePositionRow(cellIndex, cellIndex - 1)"
                                        >
                                            ◀
                                        </button>
                                        <button
                                            v-if="tableContents.tableContentOptions.showRowOption"
                                            tabindex="-1"
                                            @click="replacePositionRow(cellIndex, cellIndex + 1)"
                                        >
                                            ▶
                                        </button>
                                    </div>
                                </div>
                            </template>
                            <CellInput
                                :value="cell.content"
                                @input="
                                    (value: string) => {
                                        updateDataCellInput(cell, value)
                                    }
                                "
                            />
                        </Data>
                    </template>
                </template>
            </Record>
        </div>
    </div>
</template>
<style module="style">
.container {
    display: flex;
    flex-direction: row;
    width: 100%;
}
.table {
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid var(--primary-gray-700);
    width: 100%;
}

.option {
    width: 0rem;
}
.optionContainer {
    display: flex;
    justify-content: flex-end;
    width: 9.6rem; /* 1rem*8 + 0.2rem*8 */
    transform: translateX(-9.6rem); /* 1rem*8 + 0.2rem*8 */
    opacity: 0;
    cursor: pointer;
    transition: opacity 0.3s ease;
    gap: 0.2rem;
}
.optionContainer button {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--primary-gray-900);
    border-radius: 0.2rem;
    width: 1rem;
    height: 1rem;
    font-size: 0.5rem;
    color: var(--primary-gray-500);
}
.optionContainer:hover {
    opacity: 1;
}

.rowOption {
    display: flex;
    justify-content: flex-end;
    height: 0px;
}
.rowOptionContainer:hover {
    opacity: 1;
}
.rowOptionContainer {
    display: flex;
    justify-content: flex-end;
    opacity: 0;
    transform: translateY(-1.1rem);
    transition: opacity 0.3s ease;
    gap: 0.2rem;
    height: 1.1rem;
}
.rowOption button {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--primary-gray-900);
    border-radius: 0.2rem;
    width: 1rem;
    height: 1rem;
    font-size: 0.5rem;
    color: var(--primary-gray-500);
    cursor: pointer;
}
</style>
