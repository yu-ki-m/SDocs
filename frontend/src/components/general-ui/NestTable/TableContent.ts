import { Uuid } from '../../../components/Uuid'
import { BrowserLogger } from '../../BrowserLogger/index'
import { MESSAGE_TableContent } from './message'
export type CellType = 'Quill'
export class CELL_TYPE {
    static readonly QUILL: CellType = 'Quill'
}

export class CellContent {
    id: string
    cellType: CellType
    content: string
    constructor(id: string, cellType: CellType, content: string) {
        this.id = id
        this.cellType = cellType
        this.content = content
    }
}
export class RecordContent {
    id: string
    indent: number
    isHeader: boolean
    isTitleOnly: boolean
    cells: CellContent[]
    constructor(id: string, indent: number, isHeader: boolean, isTitleOnly: boolean, cells: CellContent[]) {
        this.id = id
        this.indent = indent
        this.isHeader = isHeader
        this.isTitleOnly = isTitleOnly
        this.cells = cells
    }
}

export class TableContentModule {
    constructor(public uuid: Uuid) {}
}

export class TableContentOptions {
    constructor(
        public showTableContentIdOption: boolean,
        public showRecordIdOption: boolean,
        public showRecordOption: boolean,
        public showRowOption: boolean
    ) {}
}

export default class TableContent {
    constructor(
        public id: string,
        public tableTitle: string,
        public records: RecordContent[],
        public tableContentModule: TableContentModule,
        public tableContentOptions: TableContentOptions
    ) {}

    static parseToStringFromTableContent = (tableContents: TableContent): string => {
        const instance = JSON.parse(JSON.stringify(tableContents))
        delete instance.tableContentModule
        return JSON.stringify(instance)
    }
    static parseToTableContentFromString = (
        jsonString: string,
        tableContentModule: TableContentModule
    ): TableContent => {
        const instance = JSON.parse(jsonString)
        return new TableContent(
            instance.id,
            instance.tableTitle,
            instance.records.map((record: RecordContent) => {
                return new RecordContent(
                    record.id,
                    record.indent,
                    record.isHeader,
                    record.isTitleOnly,
                    record.cells.map((cellContent: CellContent) => {
                        return new CellContent(cellContent.id, cellContent.cellType, cellContent.content)
                    })
                )
            }),
            tableContentModule,
            instance.tableContentOptions
        )
    }

    initRecords = () => {
        const newRecord0 = new RecordContent(this.tableContentModule.uuid.getUniquId(), 0, true, false, [
            new CellContent(this.tableContentModule.uuid.getUniquId(), CELL_TYPE.QUILL, ''),
            new CellContent(this.tableContentModule.uuid.getUniquId(), CELL_TYPE.QUILL, ''),
            new CellContent(this.tableContentModule.uuid.getUniquId(), CELL_TYPE.QUILL, '')
        ])
        const newRecord1 = new RecordContent(this.tableContentModule.uuid.getUniquId(), 0, false, false, [
            new CellContent(this.tableContentModule.uuid.getUniquId(), CELL_TYPE.QUILL, ''),
            new CellContent(this.tableContentModule.uuid.getUniquId(), CELL_TYPE.QUILL, ''),
            new CellContent(this.tableContentModule.uuid.getUniquId(), CELL_TYPE.QUILL, '')
        ])
        const newRecord2 = new RecordContent(this.tableContentModule.uuid.getUniquId(), 1, false, false, [
            new CellContent(this.tableContentModule.uuid.getUniquId(), CELL_TYPE.QUILL, ''),
            new CellContent(this.tableContentModule.uuid.getUniquId(), CELL_TYPE.QUILL, ''),
            new CellContent(this.tableContentModule.uuid.getUniquId(), CELL_TYPE.QUILL, '')
        ])
        const newRecord3 = new RecordContent(this.tableContentModule.uuid.getUniquId(), 1, false, false, [
            new CellContent(this.tableContentModule.uuid.getUniquId(), CELL_TYPE.QUILL, ''),
            new CellContent(this.tableContentModule.uuid.getUniquId(), CELL_TYPE.QUILL, ''),
            new CellContent(this.tableContentModule.uuid.getUniquId(), CELL_TYPE.QUILL, '')
        ])
        this.records.push(newRecord0)
        this.records.push(newRecord1)
        this.records.push(newRecord2)
        this.records.push(newRecord3)
    }

    addRecord = (insertPostion: number) => {
        // 挿入元を引用しディープコピー
        const newRecord: RecordContent = structuredClone(this.records[insertPostion])
        // コピー新規作成したレコードを初期化
        newRecord.id = this.tableContentModule.uuid.getUniquId()
        newRecord.indent = this.records[insertPostion].indent
        newRecord.isHeader = false
        newRecord.isTitleOnly = false
        newRecord.cells = newRecord.cells.map((cellContent: CellContent) => {
            cellContent.id = this.tableContentModule.uuid.getUniquId()
            cellContent.content = ''
            return cellContent
        })
        this.records.splice(insertPostion + 1, 0, newRecord)
    }

    addIndentAble = (changePostion: number) => {
        if (changePostion <= 1) {
            return false
        }
        if (this.records[changePostion].indent - this.records[changePostion - 1].indent >= 1) {
            return false
        }
        if (this.records[changePostion].indent >= 15) {
            return false
        }
        return true
    }
    addIndent = (changePostion: number) => {
        //インデントが１行上のレコードとのギャップが2以上であればインデント追加は無効
        if (!this.addIndentAble(changePostion)) {
            return
        }

        if (this.records[changePostion].indent <= 15) {
            this.records[changePostion].indent++
        }
    }
    reduceIndent = (changePostion: number) => {
        if (this.records[changePostion].indent != 0) {
            // 自身に子要素があれば、子要素も含めてインデントを減らす
            if (this.records.length > changePostion) {
                for (let i: number = changePostion + 1; i < this.records.length; i++) {
                    if (this.records[changePostion].indent >= this.records[i].indent) {
                        break
                    }
                    this.records[i].indent--
                }
            }

            this.records[changePostion].indent--
        }
    }

    deleteRecord = (deletePostion: number) => {
        if (deletePostion <= 0 || deletePostion >= this.records.length) {
            BrowserLogger.warn(MESSAGE_TableContent.DELETE_RECORD_OUT_OF_RANGE(deletePostion, this.records.length - 1))
            return
        }

        const upperRecordPosition = deletePostion - 1
        const lowerRecordPosition = deletePostion + 1

        if (lowerRecordPosition < this.records.length) {
            if (this.records[lowerRecordPosition].indent - this.records[upperRecordPosition].indent >= 1) {
                for (let i: number = lowerRecordPosition; i < this.records.length; i++) {
                    if (this.records[deletePostion].indent >= this.records[i].indent) {
                        break
                    }
                    this.records[i].indent--
                }
            }
        }
        this.records.splice(deletePostion, 1)
    }

    changeTitleOnly = (changePostion: number) => {
        this.records[changePostion].isTitleOnly = !this.records[changePostion].isTitleOnly
    }
    addRow = (insertPostion: number) => {
        this.records.forEach((recordContent: RecordContent) => {
            if (recordContent.cells.length < 10) {
                recordContent.cells.splice(
                    insertPostion + 1,
                    0,
                    new CellContent(this.tableContentModule.uuid.getUniquId(), CELL_TYPE.QUILL, '')
                )
            }
        })
    }

    deleteRow = (deletePostion: number) => {
        this.records.forEach((recordContent: RecordContent) => {
            if (recordContent.cells.length <= deletePostion) {
                const maxIndex = recordContent.cells.length - 1
                BrowserLogger.warn(MESSAGE_TableContent.DELETE_ROW_OUT_OF_RANGE(deletePostion, maxIndex))
                return
            }
            if (recordContent.cells.length > 1) {
                recordContent.cells.splice(deletePostion, 1)
            }
        })
    }

    replacePositionRow = (replacePostion: number, replaceTargetPostion: number) => {
        if (replaceTargetPostion < 0 || replaceTargetPostion >= this.records[0].cells.length) {
            return
        }
        this.records.forEach((recordContent: RecordContent) => {
            const temp = recordContent.cells[replacePostion]
            recordContent.cells[replacePostion] = recordContent.cells[replaceTargetPostion]
            recordContent.cells[replaceTargetPostion] = temp
        })
    }

    replacePositionRecord = (replacePostion: number, replaceTargetPostion: number) => {
        if (replaceTargetPostion < 1 || replaceTargetPostion >= this.records.length) {
            return
        }
        if (replacePostion < 1 || replacePostion >= this.records.length) {
            return
        }
        const temp = this.records[replacePostion]
        this.records[replacePostion] = this.records[replaceTargetPostion]
        this.records[replaceTargetPostion] = temp

        //インデント値は交換
        const indentTemp = this.records[replacePostion].indent
        this.records[replacePostion].indent = this.records[replaceTargetPostion].indent
        this.records[replaceTargetPostion].indent = indentTemp
    }
}
