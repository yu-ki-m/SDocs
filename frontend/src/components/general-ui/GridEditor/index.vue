<script setup lang="ts">
import CellInput from './Record/CellInput/index.vue'

import Record from './Record/index.vue'
import CellLayout from './Record/CellLayout/index.vue'
import { ref, onMounted, Ref } from 'vue'
import TableContent, { TableContentModule, TableContentOptions, CellContent } from './TableContent'
import { Uuid } from '../../../components/Uuid'
import { debounce } from './GridEditorDebounce'

/** コンポーネントのProps定義 */
export interface PropsInterface {
    value: string
    readonly: boolean
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

const deleteRecord = (deletePostion: number) => {
    tableContents.value.deleteRecord(deletePostion)
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
</script>
<template>
    <div :class="style.container" data-gid="6e84a021-3c49-4f07-8489-e6ebfaff3fcd">
        <div :class="style.table">
            <Record v-for="(recordContent, recordIndex) in tableContents.records" :key="recordContent.id">
                <template #options>
                    <div :class="style.option">
                        <div :class="style.optionContainer">
                            <button
                                v-if="tableContents.tableContentOptions.showRecordOption"
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
                                v-if="tableContents.tableContentOptions.showRecordOption"
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
                                v-if="tableContents.tableContentOptions.showRecordOption"
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
                        </div>
                    </div>
                </template>
                <CellLayout v-for="(cell, cellIndex) in recordContent.cells" :key="cell.id" :record-index="recordIndex">
                    <template #rowOptions>
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
                        :readonly="props.readonly"
                        :daynamic-id="cell.id"
                        @input="
                            (value: string) => {
                                updateDataCellInput(cell, value)
                            }
                        "
                    />
                </CellLayout>
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
    flex: 1;
}

/* 他の子コンポーネントに影響を及ぼすので暫定 */
.table > div > div {
    border: solid 1px rgba(0, 0, 0, 0);
}
.table:hover > div > div {
    border: solid 1px var(--primary-gray-800);
}
.table:focus-within > div > div {
    border: solid 1px var(--primary-gray-800);
}
.table > div:nth-child(n + 2) > div {
    border-top: solid 0px rgba(0, 0, 0, 0);
}
.option {
    display: flex;
    width: 0rem;
}
.optionContainer {
    display: flex;
    justify-content: flex-end;
    width: 4.8rem; /* 1rem*4 + 0.2rem*4 */
    transform: translateX(-4.8rem); /* 1rem*4 + 0.2rem*4 */
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
