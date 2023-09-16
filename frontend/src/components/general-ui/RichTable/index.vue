<script setup lang="ts">
import { ref, onMounted, Ref } from 'vue'
import CellInput from './CellInput/index.vue'
import TableContent, { TableContentModule, CellContent } from './TableContent'
import { Uuid } from '../../../components/Uuid'
import { debounce } from './RichTableDebounce'

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

let tableContents: Ref<TableContent> = ref<TableContent>(new TableContent(uuid.getUniquId(), [], tableContentModule))

onMounted(async () => {
    let arg: TableContent | null = null
    if (props.value == undefined) {
        return
    }
    if (props.value != '') {
        arg = JSON.parse(props.value) as TableContent
        tableContents.value.id = arg.id
        tableContents.value.records = arg.records
    } else {
        tableContents.value.id = uuid.getUniquId()
        tableContents.value.records = []
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
</script>
<template>
    <table role="table" class="rich-table">
        <tr
            v-for="(recordContent, recordIndex) in tableContents.records"
            :key="recordContent.id"
            role="record"
            class="record"
        >
            <td class="cell_option">
                <div class="cell_option_inner">
                    <button
                        class="add-button"
                        tabindex="-1"
                        @click="
                            (e) => {
                                addRecord(recordIndex)
                            }
                        "
                    >
                        +
                    </button>
                </div>
            </td>
            <td
                v-for="cell in recordContent.cells"
                :key="cell.id"
                class="cell"
                :style="{
                    backgroundColor: recordContent.isHeader ? 'var(--primary-gray-800)' : ''
                }"
            >
                <CellInput
                    class="cell_inner"
                    :value="cell.content"
                    @input="
                        (value: string) => {
                            updateDataCellInput(cell, value)
                        }
                    "
                >
                </CellInput>
            </td>
            <td class="cell_option">
                <div class="cell_option_inner">
                    <button
                        class="delete-button"
                        tabindex="-1"
                        @click="
                            (e) => {
                                deleteRecord(recordIndex)
                            }
                        "
                    >
                        ×
                    </button>
                </div>
            </td>
        </tr>
        <tr class="record">
            <td><!-- add button area --></td>
            <td v-for="(cell, cellIndex) in tableContents.records.at(0)?.cells" :key="cell.id" class="record_option">
                <div class="record_option_inner">
                    <button class="add-button" tabindex="-1" @click="addRow(cellIndex)">+</button>
                    <button class="delete-button" tabindex="-1" @click="deleteRow(cellIndex)">×</button>
                </div>
            </td>
        </tr>
    </table>
</template>

<style scoped>
.cell {
    border: solid 1px var(--primary-gray-700);
    min-width: 1.5rem;
}
.cell_option {
    border: none;
    color: var(--primary-gray-700);
}
.cell_option_inner {
    display: flex;
    gap: 0.1rem;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: opacity 0.3s ease;
}
.cell_option_inner:hover {
    opacity: 1;
}

.record_option {
    border: none;
    color: var(--primary-gray-700);
}
.record_option_inner {
    display: flex;
    gap: 0.1rem;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: opacity 0.3s ease;
}
.record_option_inner:hover {
    opacity: 1;
}

.add-button {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background-color: var(--primary-gray-700);
    color: var(--primary-gray-900);
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
}

.delete-button {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background-color: var(--primary-red-white-200);
    color: var(--primary-gray-900);
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
}
</style>

<style>
.rich-table .ql-bubble {
    display: flex;
}
</style>