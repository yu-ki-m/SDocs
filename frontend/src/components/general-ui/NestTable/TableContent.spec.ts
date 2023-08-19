/**
 * @vitest-environment jsdom
 */

import TableContent, {
    RecordContent,
    CellContent,
    TableContentModule,
    CELL_TYPE,
    TableContentOptions
} from './TableContent'
import { describe, it, expect, vi } from 'vitest'
import { Uuid } from '../../../components/Uuid'
import { BrowserLogger } from '../../BrowserLogger/index'
import { MESSAGE_TableContent } from './message'

describe('コンストラクター', () => {
    it('初期値が設定されていること', () => {
        // * Arrange
        const uuid = new Uuid()
        const tableContentModule = new TableContentModule(uuid)
        const tableContentOptions = new TableContentOptions(true, true, true, true)
        const defaultRecord = new RecordContent(uuid.getUniquId(), 0, true, false, [
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'A0'),
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'B0'),
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'C0')
        ])

        // * Act
        const targetTableContent = new TableContent(
            'tableId',
            'TestTableTitle',
            [defaultRecord],
            tableContentModule,
            tableContentOptions
        )

        // * Assert
        expect(targetTableContent.tableTitle).toBe('TestTableTitle')
        expect(targetTableContent.id).toBe('tableId')
        expect(targetTableContent.tableContentOptions.showRecordIdOption).toBe(tableContentOptions.showRecordIdOption)
        expect(targetTableContent.tableContentOptions.showRecordOption).toBe(tableContentOptions.showRecordOption)
        expect(targetTableContent.tableContentOptions.showRowOption).toBe(tableContentOptions.showRowOption)
        expect(targetTableContent.tableContentOptions.showTableContentIdOption).toBe(
            tableContentOptions.showTableContentIdOption
        )
        expect(targetTableContent.records.length).toBe(1)
        expect(targetTableContent.records[0].id).toBe(defaultRecord.id)
        expect(targetTableContent.records[0].indent).toBe(defaultRecord.indent)
        expect(targetTableContent.records[0].isHeader).toBe(defaultRecord.isHeader)
        expect(targetTableContent.records[0].isTitleOnly).toBe(defaultRecord.isTitleOnly)
        expect(targetTableContent.records[0].cells.length).toBe(3)
        expect(targetTableContent.records[0].cells[0].id).toBe(defaultRecord.cells[0].id)
        expect(targetTableContent.records[0].cells[0].content).toBe(defaultRecord.cells[0].content)
        expect(targetTableContent.records[0].cells[1].id).toBe(defaultRecord.cells[1].id)
        expect(targetTableContent.records[0].cells[1].content).toBe(defaultRecord.cells[1].content)
        expect(targetTableContent.records[0].cells[2].id).toBe(defaultRecord.cells[2].id)
        expect(targetTableContent.records[0].cells[2].content).toBe(defaultRecord.cells[2].content)
    })
})

describe('parseToStringFromTableContent', () => {
    it('tableContentModuleを除いてJSON文字列が生成されること', () => {
        // * Arrange
        const uuid = new Uuid()
        const targetRecord0 = new RecordContent('1行_UUID', 0, true, false, [
            new CellContent('1行1列_UUID', CELL_TYPE.QUILL, ''),
            new CellContent('1行2列_UUID', CELL_TYPE.QUILL, ''),
            new CellContent('1行3列_UUID', CELL_TYPE.QUILL, '')
        ])
        const targetRecord1 = new RecordContent('2行_UUID', 0, false, false, [
            new CellContent('2行1列_UUID', CELL_TYPE.QUILL, ''),
            new CellContent('2行2列_UUID', CELL_TYPE.QUILL, ''),
            new CellContent('2行3列_UUID', CELL_TYPE.QUILL, '')
        ])
        const targetRecord2 = new RecordContent('3行_UUID', 1, false, false, [
            new CellContent('3行1列_UUID', CELL_TYPE.QUILL, ''),
            new CellContent('3行2列_UUID', CELL_TYPE.QUILL, ''),
            new CellContent('3行3列_UUID', CELL_TYPE.QUILL, '')
        ])
        const targetRecord3 = new RecordContent('4行_UUID', 1, false, false, [
            new CellContent('4行1列_UUID', CELL_TYPE.QUILL, ''),
            new CellContent('4行2列_UUID', CELL_TYPE.QUILL, ''),
            new CellContent('4行3列_UUID', CELL_TYPE.QUILL, '')
        ])
        const targetTableContents = new TableContent(
            'テーブル_UUID',
            '',
            [],
            new TableContentModule(uuid),
            new TableContentOptions(true, true, true, true)
        )
        targetTableContents.records.push(targetRecord0)
        targetTableContents.records.push(targetRecord1)
        targetTableContents.records.push(targetRecord2)
        targetTableContents.records.push(targetRecord3)

        // 期待結果の生成
        const expectResult = JSON.parse(JSON.stringify(targetTableContents))
        delete expectResult.tableContentModule

        // * Act
        const actualString = TableContent.parseToStringFromTableContent(targetTableContents)

        // * Assert
        expect(actualString).toEqual(JSON.stringify(expectResult))
    })
})
describe('parseToTableContentFromString', () => {
    it('JSON文字列の値がインスタンスに適用されること', () => {
        // * Arrange

        const uuid = new Uuid()
        vi.spyOn(uuid, 'getUniquId').mockImplementation(() => {
            throw new Error('本テストではgetUniquIdは使用されない')
        })
        const record0 = new RecordContent('1行_UUID', 0, true, false, [
            new CellContent('1行1列_UUID', CELL_TYPE.QUILL, ''),
            new CellContent('1行2列_UUID', CELL_TYPE.QUILL, ''),
            new CellContent('1行3列_UUID', CELL_TYPE.QUILL, '')
        ])
        const record1 = new RecordContent('2行_UUID', 0, false, false, [
            new CellContent('2行1列_UUID', CELL_TYPE.QUILL, ''),
            new CellContent('2行2列_UUID', CELL_TYPE.QUILL, ''),
            new CellContent('2行3列_UUID', CELL_TYPE.QUILL, '')
        ])
        const record2 = new RecordContent('3行_UUID', 1, false, false, [
            new CellContent('3行1列_UUID', CELL_TYPE.QUILL, ''),
            new CellContent('3行2列_UUID', CELL_TYPE.QUILL, ''),
            new CellContent('3行3列_UUID', CELL_TYPE.QUILL, '')
        ])
        const record3 = new RecordContent('4行_UUID', 1, false, false, [
            new CellContent('4行1列_UUID', CELL_TYPE.QUILL, ''),
            new CellContent('4行2列_UUID', CELL_TYPE.QUILL, ''),
            new CellContent('4行3列_UUID', CELL_TYPE.QUILL, '')
        ])
        const expectTableContents = new TableContent(
            'テーブル_UUID',
            '',
            [],
            new TableContentModule(uuid),
            new TableContentOptions(true, true, true, true)
        )
        expectTableContents.records.push(record0)
        expectTableContents.records.push(record1)
        expectTableContents.records.push(record2)
        expectTableContents.records.push(record3)

        // テスト用文字列の生成
        const testData = JSON.parse(JSON.stringify(expectTableContents))
        delete testData.tableContentModule
        const testStringData: string = JSON.stringify(testData)

        // * Act
        const actualTableContents = TableContent.parseToTableContentFromString(
            testStringData,
            new TableContentModule(uuid)
        )

        // * Assert
        expect(actualTableContents.id).toEqual(expectTableContents.id)
        expect(actualTableContents.tableTitle).toEqual(expectTableContents.tableTitle)
        expect(actualTableContents.records).toEqual(expectTableContents.records)
        expect(actualTableContents.tableContentModule).toEqual(expectTableContents.tableContentModule)
        expect(actualTableContents.tableContentOptions).toEqual(expectTableContents.tableContentOptions)
    })
})

describe('initRecords', () => {
    // テスト対象に渡すUUIDモジュールのモックデータを準備
    const uuid = new Uuid()
    let calledCount = 0

    vi.spyOn(uuid, 'getUniquId').mockImplementation(() => {
        const returnUuidList = [
            '1行_UUID',
            '1行1列_UUID',
            '1行2列_UUID',
            '1行3列_UUID',
            '2行_UUID',
            '2行1列_UUID',
            '2行2列_UUID',
            '2行3列_UUID',
            '3行_UUID',
            '3行1列_UUID',
            '3行2列_UUID',
            '3行3列_UUID',
            '4行_UUID',
            '4行1列_UUID',
            '4行2列_UUID',
            '4行3列_UUID',
            'テーブル_UUID'
        ]
        if (calledCount >= returnUuidList.length) {
            throw new Error('uuid.getUniquIdが想定回数以上呼び出されました。')
        }
        const returnUuid = returnUuidList[calledCount++]
        return returnUuid
    })

    it('sampleの初期レコードが適用されること', () => {
        // * Arrange

        // 期待結果のデータを生成
        const uuidForTest = new Uuid()
        const actualRecord0 = new RecordContent('1行_UUID', 0, true, false, [
            new CellContent('1行1列_UUID', CELL_TYPE.QUILL, ''),
            new CellContent('1行2列_UUID', CELL_TYPE.QUILL, ''),
            new CellContent('1行3列_UUID', CELL_TYPE.QUILL, '')
        ])
        const actualRecord1 = new RecordContent('2行_UUID', 0, false, false, [
            new CellContent('2行1列_UUID', CELL_TYPE.QUILL, ''),
            new CellContent('2行2列_UUID', CELL_TYPE.QUILL, ''),
            new CellContent('2行3列_UUID', CELL_TYPE.QUILL, '')
        ])
        const actualRecord2 = new RecordContent('3行_UUID', 1, false, false, [
            new CellContent('3行1列_UUID', CELL_TYPE.QUILL, ''),
            new CellContent('3行2列_UUID', CELL_TYPE.QUILL, ''),
            new CellContent('3行3列_UUID', CELL_TYPE.QUILL, '')
        ])
        const actualRecord3 = new RecordContent('4行_UUID', 1, false, false, [
            new CellContent('4行1列_UUID', CELL_TYPE.QUILL, ''),
            new CellContent('4行2列_UUID', CELL_TYPE.QUILL, ''),
            new CellContent('4行3列_UUID', CELL_TYPE.QUILL, '')
        ])
        const actualTableContents = new TableContent(
            'テーブル_UUID',
            '',
            [],
            new TableContentModule(uuidForTest),
            new TableContentOptions(true, true, true, true)
        )
        actualTableContents.records.push(actualRecord0)
        actualTableContents.records.push(actualRecord1)
        actualTableContents.records.push(actualRecord2)
        actualTableContents.records.push(actualRecord3)

        const tableContentModule = new TableContentModule(uuid)
        const tableContentOptions = new TableContentOptions(true, true, true, true)
        const tableContents = new TableContent('テーブル_UUID', '', [], tableContentModule, tableContentOptions)

        // * Act
        tableContents.initRecords()

        // * Assert
        expect(JSON.stringify(tableContents)).toEqual(JSON.stringify(actualTableContents))
    })
})
describe('addRecord', () => {
    const uuid = new Uuid()
    const defaultRecord0 = new RecordContent(uuid.getUniquId(), 0, true, false, [
        new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'A1'),
        new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'B1'),
        new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'C1')
    ])
    const defaultRecord1 = new RecordContent(uuid.getUniquId(), 1, false, false, [
        new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'A2'),
        new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'B2'),
        new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'C2')
    ])
    const defaultRecord2 = new RecordContent(uuid.getUniquId(), 2, false, false, [
        new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'A3'),
        new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'B3'),
        new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'C3')
    ])

    it('0行目の次に行が追加されること', () => {
        // * Arrange
        const uuid = new Uuid()
        const tableContentModule = new TableContentModule(uuid)
        const tableContentOptions = new TableContentOptions(true, true, true, true)
        const targetTableContent = new TableContent(
            'tableId',
            'TestTableTitle',
            [defaultRecord0, defaultRecord1, defaultRecord2],
            tableContentModule,
            tableContentOptions
        )

        // * Act
        targetTableContent.addRecord(0)

        // * Assert
        expect(targetTableContent.records.length).toBe(4)
        expect(targetTableContent.records[0]).toBe(defaultRecord0)
        expect(targetTableContent.records[1].indent).toBe(defaultRecord0.indent)
        expect(targetTableContent.records[1].isHeader).toBe(false)
        expect(targetTableContent.records[1].isTitleOnly).toBe(false)
        expect(targetTableContent.records[1].cells[0].id.length).toBeGreaterThanOrEqual(1)
        expect(targetTableContent.records[1].cells[0].content).toBe('')
        expect(targetTableContent.records[1].cells[1].id.length).toBeGreaterThanOrEqual(1)
        expect(targetTableContent.records[1].cells[1].content).toBe('')
        expect(targetTableContent.records[1].cells[2].id.length).toBeGreaterThanOrEqual(1)
        expect(targetTableContent.records[1].cells[2].content).toBe('')
    })
    it('1行目の次に行が追加されること', () => {
        // * Arrange
        const uuid = new Uuid()
        const tableContentModule = new TableContentModule(uuid)
        const tableContentOptions = new TableContentOptions(true, true, true, true)
        const targetTableContent = new TableContent(
            'tableId',
            'TestTableTitle',
            [defaultRecord0, defaultRecord1, defaultRecord2],
            tableContentModule,
            tableContentOptions
        )

        // * Act
        targetTableContent.addRecord(1)

        // * Assert

        expect(targetTableContent.records.length).toBe(4)
        expect(targetTableContent.records[2].indent).toBe(defaultRecord1.indent)
        expect(targetTableContent.records[2].isHeader).toBeFalsy()
        expect(targetTableContent.records[2].isTitleOnly).toBeFalsy()
        expect(targetTableContent.records[2].cells[0].id.length).toBeGreaterThanOrEqual(1)
        expect(targetTableContent.records[2].cells[0].content).toBe('')
        expect(targetTableContent.records[2].cells[1].id.length).toBeGreaterThanOrEqual(1)
        expect(targetTableContent.records[2].cells[1].content).toBe('')
        expect(targetTableContent.records[2].cells[2].id.length).toBeGreaterThanOrEqual(1)
        expect(targetTableContent.records[2].cells[2].content).toBe('')
    })
})

describe('addIndentAble', () => {
    it(' 0行目(ヘッダ)はインデントが追加できないこと ', () => {
        // * Arrange
        const uuid = new Uuid()
        const tableContentModule = new TableContentModule(uuid)
        const tableContentOptions = new TableContentOptions(true, true, true, true)
        const defaultRecord = new RecordContent(uuid.getUniquId(), 0, true, false, [
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'A0'),
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'B0'),
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'C0')
        ])
        const targetTableContent = new TableContent(
            'tableId',
            'TestTableTitle',
            [defaultRecord],
            tableContentModule,
            tableContentOptions
        )

        // * Act
        const result = targetTableContent.addIndentAble(0)

        // * Assert
        expect(result).toBe(false)
    })
    it(' 1行目(ボディのトップ)もインデントが追加できないこと ', () => {
        // * Arrange
        const uuid = new Uuid()
        const tableContentModule = new TableContentModule(uuid)
        const tableContentOptions = new TableContentOptions(true, true, true, true)
        const headerRecord = new RecordContent(uuid.getUniquId(), 0, true, false, [
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'A0'),
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'B0'),
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'C0')
        ])
        const newRecord1 = new RecordContent(uuid.getUniquId(), 0, false, false, [
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'A1'),
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'B1'),
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'C1')
        ])
        const targetTableContent = new TableContent(
            'tableId',
            'TestTableTitle',
            [headerRecord, newRecord1],
            tableContentModule,
            tableContentOptions
        )

        // * Act
        const result = targetTableContent.addIndentAble(1)

        // * Assert
        expect(result).toBe(false)
    })

    it(' ボディの2行目以降はインデントが1度は追加できること ', () => {
        // * Arrange
        const uuid = new Uuid()
        const tableContentModule = new TableContentModule(uuid)
        const tableContentOptions = new TableContentOptions(true, true, true, true)
        const headerRecord = new RecordContent(uuid.getUniquId(), 0, true, false, [
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'A0'),
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'B0'),
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'C0')
        ])
        const newRecordList: RecordContent[] = [headerRecord]
        for (let i = 1; i < 3; i++) {
            newRecordList.push(
                new RecordContent(uuid.getUniquId(), 0, false, false, [
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'A' + i),
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'B' + i),
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'C' + i)
                ])
            )
        }

        const targetTableContent = new TableContent(
            'tableId',
            'TestTableTitle',
            newRecordList,
            tableContentModule,
            tableContentOptions
        )

        // * Act
        const result = targetTableContent.addIndentAble(2)

        // * Assert
        expect(result).toBe(true)
    })
    it('直前の行に対してカレント行のインデント数が2以上のギャップがある場合は、追加できないこと', () => {
        // * Arrange
        const uuid = new Uuid()
        const tableContentModule = new TableContentModule(uuid)
        const tableContentOptions = new TableContentOptions(true, true, true, true)
        const newRecord0 = new RecordContent(uuid.getUniquId(), 0, true, false, [
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'A0'),
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'B0'),
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'C0')
        ])
        const newRecordList: RecordContent[] = [newRecord0]
        for (let i = 1; i < 4; i++) {
            newRecordList.push(
                new RecordContent(uuid.getUniquId(), 0, false, false, [
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'A' + i),
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'B' + i),
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'C' + i)
                ])
            )
        }
        newRecordList[3].indent = 1

        const targetTableContent = new TableContent(
            'tableId',
            'TestTableTitle',
            newRecordList,
            tableContentModule,
            tableContentOptions
        )

        // * Act
        const result = targetTableContent.addIndentAble(3)

        // * Assert
        expect(result).toBe(false)
    })
    it('インデントが15を超えた場合、追加できないこと', () => {
        // * Arrange
        const uuid = new Uuid()
        const tableContentModule = new TableContentModule(uuid)
        const tableContentOptions = new TableContentOptions(true, true, true, true)
        const headerRecord = new RecordContent(uuid.getUniquId(), 0, true, false, [
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'A0'),
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'B0'),
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'C0')
        ])
        const newRecordList: RecordContent[] = [headerRecord]
        for (let i = 1; i <= 17; i++) {
            newRecordList.push(
                new RecordContent(uuid.getUniquId(), i - 1, false, false, [
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'A' + i),
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'B' + i),
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'C' + i)
                ])
            )
        }
        newRecordList.push(
            new RecordContent(uuid.getUniquId(), 15, true, false, [
                new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'A16'),
                new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'B16'),
                new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'C16')
            ])
        )
        const targetTableContent = new TableContent(
            'tableId',
            'TestTableTitle',
            newRecordList,
            tableContentModule,
            tableContentOptions
        )

        // * Act
        const result = targetTableContent.addIndentAble(18)

        // * Assert
        expect(result).toBeFalsy()
    })
})

describe('reduceIndent', () => {
    it('インデントが１つ減ること', () => {
        // * Arrange
        const uuid = new Uuid()
        const tableContentModule = new TableContentModule(uuid)
        const tableContentOptions = new TableContentOptions(true, true, true, true)
        const headerRecord = new RecordContent(uuid.getUniquId(), 0, true, false, [
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'A0'),
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'B0'),
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'C0')
        ])
        const newRecordList: RecordContent[] = [headerRecord]
        for (let i = 1; i <= 3; i++) {
            newRecordList.push(
                new RecordContent(uuid.getUniquId(), i - 1, false, false, [
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'A' + i),
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'B' + i),
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'C' + i)
                ])
            )
        }
        newRecordList[2].indent = 2

        const targetTableContent = new TableContent(
            'tableId',
            'TestTableTitle',
            newRecordList,
            tableContentModule,
            tableContentOptions
        )
        const changeRecordPostion = 2
        // * Act
        targetTableContent.reduceIndent(changeRecordPostion)

        // * Assert
        expect(targetTableContent.records[2].indent).toBe(1)
    })

    it('インデントが0未満にならないこと', () => {
        // * Arrange
        const uuid = new Uuid()
        const tableContentModule = new TableContentModule(uuid)
        const tableContentOptions = new TableContentOptions(true, true, true, true)
        const headerRecord = new RecordContent(uuid.getUniquId(), 0, true, false, [
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'A0'),
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'B0'),
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'C0')
        ])
        const newRecordList: RecordContent[] = [headerRecord]
        for (let i = 1; i <= 3; i++) {
            newRecordList.push(
                new RecordContent(uuid.getUniquId(), 0, false, false, [
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'A' + i),
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'B' + i),
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'C' + i)
                ])
            )
        }

        const targetTableContent = new TableContent(
            'tableId',
            'TestTableTitle',
            newRecordList,
            tableContentModule,
            tableContentOptions
        )

        const changeRecordPostion = 2
        targetTableContent.records[changeRecordPostion].indent = 0
        // * Act
        targetTableContent.reduceIndent(changeRecordPostion)

        // * Assert
        expect(targetTableContent.records[changeRecordPostion].indent).toBe(0)
    })

    it('自身に子要素があれば、子要素も含めてインデントを減らすこと', () => {
        // * Arrange
        const uuid = new Uuid()
        const tableContentModule = new TableContentModule(uuid)
        const tableContentOptions = new TableContentOptions(true, true, true, true)
        const headerRecord = new RecordContent(uuid.getUniquId(), 0, true, false, [
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'A0'),
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'B0'),
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'C0')
        ])
        const newRecordList: RecordContent[] = [headerRecord]
        for (let i = 1; i <= 5; i++) {
            newRecordList.push(
                new RecordContent(uuid.getUniquId(), i - 1, false, false, [
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'A' + i),
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'B' + i),
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'C' + i)
                ])
            )
        }

        const targetTableContent = new TableContent(
            'tableId',
            'TestTableTitle',
            newRecordList,
            tableContentModule,
            tableContentOptions
        )
        const changeRecordPostion = 2
        targetTableContent.records[changeRecordPostion].indent = 1
        targetTableContent.records[changeRecordPostion + 1].indent = 2
        targetTableContent.records[changeRecordPostion + 2].indent = 3

        // * Act
        targetTableContent.reduceIndent(changeRecordPostion)

        // * Assert
        expect(targetTableContent.records[changeRecordPostion + 1].indent).toBe(1)
        expect(targetTableContent.records[changeRecordPostion + 2].indent).toBe(2)
    })
})

describe('deleteRecord', () => {
    it('指定されたポジションのレコードが削除されること', () => {
        // * Arrange
        const uuid = new Uuid()
        const tableContentModule = new TableContentModule(uuid)
        const tableContentOptions = new TableContentOptions(true, true, true, true)
        const headerRecord = new RecordContent(uuid.getUniquId(), 0, true, false, [
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'A0'),
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'B0'),
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'C0')
        ])
        const newRecordList: RecordContent[] = [headerRecord]
        for (let i = 1; i <= 2; i++) {
            newRecordList.push(
                new RecordContent(uuid.getUniquId(), 0, false, false, [
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'A' + i),
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'B' + i),
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'C' + i)
                ])
            )
        }
        const targetTableContent = new TableContent(
            'tableId',
            'TestTableTitle',
            newRecordList,
            tableContentModule,
            tableContentOptions
        )

        const beforeRecordCount = targetTableContent.records.length

        // * Act
        targetTableContent.deleteRecord(2)

        // * Assert
        expect(targetTableContent.records.length).toBe(beforeRecordCount - 1)
    })

    it('ヘッダー行は削除されないこと', () => {
        // * Arrange

        let actualWarnMesaage = ''
        vi.spyOn(BrowserLogger, 'warn').mockImplementation((message: string) => {
            actualWarnMesaage = message
        })

        const uuid = new Uuid()
        const tableContentModule = new TableContentModule(uuid)
        const tableContentOptions = new TableContentOptions(true, true, true, true)
        const headerRecord = new RecordContent(uuid.getUniquId(), 0, true, false, [
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'A0'),
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'B0'),
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'C0')
        ])
        const newRecordList: RecordContent[] = [headerRecord]
        for (let i = 1; i <= 2; i++) {
            newRecordList.push(
                new RecordContent(uuid.getUniquId(), 0, false, false, [
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'A' + i),
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'B' + i),
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'C' + i)
                ])
            )
        }

        const targetTableContent = new TableContent(
            'tableId',
            'TestTableTitle',
            newRecordList,
            tableContentModule,
            tableContentOptions
        )

        const beforeRecordCount = targetTableContent.records.length
        const maxIndex = targetTableContent.records.length - 1

        // * Act
        targetTableContent.deleteRecord(0)

        // * Assert
        expect(targetTableContent.records.length).toBe(beforeRecordCount)
        expect(actualWarnMesaage).toBe(MESSAGE_TableContent.DELETE_RECORD_OUT_OF_RANGE(0, maxIndex))
    })

    it('末尾を超えるインデックスを削除しようとすると警告のコンソールが表示されること', () => {
        // * Arrange

        let actualWarnMesaage = ''
        vi.spyOn(BrowserLogger, 'warn').mockImplementation((message: string) => {
            actualWarnMesaage = message
        })

        const uuid = new Uuid()
        const tableContentModule = new TableContentModule(uuid)
        const tableContentOptions = new TableContentOptions(true, true, true, true)
        const headerRecord = new RecordContent(uuid.getUniquId(), 0, true, false, [
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'A0'),
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'B0'),
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'C0')
        ])
        const newRecordList: RecordContent[] = [headerRecord]
        for (let i = 1; i <= 2; i++) {
            newRecordList.push(
                new RecordContent(uuid.getUniquId(), 0, false, false, [
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'A' + i),
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'B' + i),
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'C' + i)
                ])
            )
        }

        const targetTableContent = new TableContent(
            'tableId',
            'TestTableTitle',
            newRecordList,
            tableContentModule,
            tableContentOptions
        )

        const beforeRecordCount = targetTableContent.records.length
        const maxIndex = targetTableContent.records.length - 1

        // * Act
        targetTableContent.deleteRecord(maxIndex + 1)

        // * Assert
        expect(targetTableContent.records.length).toBe(beforeRecordCount)
        expect(actualWarnMesaage).toBe(MESSAGE_TableContent.DELETE_RECORD_OUT_OF_RANGE(maxIndex + 1, maxIndex))
    })

    it('指定されたポジションのレコードの下に、インデントが２つ以上ギャップがあるレコードがあれば、そのレコードのインデントを減らすこと', () => {
        // * Arrange
        const uuid = new Uuid()
        const tableContentModule = new TableContentModule(uuid)
        const tableContentOptions = new TableContentOptions(true, true, true, true)
        const headerRecord = new RecordContent(uuid.getUniquId(), 0, true, false, [
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'A0'),
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'B0'),
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'C0')
        ])
        const newRecordList: RecordContent[] = [headerRecord]
        for (let i = 1; i <= 10; i++) {
            newRecordList.push(
                new RecordContent(uuid.getUniquId(), 0, false, false, [
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'A' + i),
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'B' + i),
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'C' + i)
                ])
            )
        }
        newRecordList[2].indent = 1
        newRecordList[3].indent = 2
        newRecordList[4].indent = 3
        newRecordList[5].indent = 3
        newRecordList[6].indent = 3

        const targetTableContent = new TableContent(
            'tableId',
            'TestTableTitle',
            newRecordList,
            tableContentModule,
            tableContentOptions
        )
        const beforeRecordIndent = targetTableContent.records[3].indent
        // * Act
        targetTableContent.deleteRecord(3)

        // * Assert
        expect(targetTableContent.records[3].indent).toBe(beforeRecordIndent)
        expect(targetTableContent.records[4].indent).toBe(beforeRecordIndent)
        expect(targetTableContent.records[5].indent).toBe(beforeRecordIndent)
    })

    it('指定されたポジションのレコードの下に、インデントが２つ以上ギャップがないレコードがあれば、そのレコードのインデントは減らさないこと', () => {
        // * Arrange
        const uuid = new Uuid()
        const tableContentModule = new TableContentModule(uuid)
        const tableContentOptions = new TableContentOptions(true, true, true, true)
        const headerRecord = new RecordContent(uuid.getUniquId(), 0, true, false, [
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'A0'),
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'B0'),
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'C0')
        ])
        const newRecordList: RecordContent[] = [headerRecord]
        for (let i = 1; i <= 10; i++) {
            newRecordList.push(
                new RecordContent(uuid.getUniquId(), 0, false, false, [
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'A' + i),
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'B' + i),
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'C' + i)
                ])
            )
        }
        newRecordList[2].indent = 1
        newRecordList[3].indent = 2
        newRecordList[4].indent = 3
        newRecordList[5].indent = 3
        newRecordList[6].indent = 3
        newRecordList[7].indent = 2 // 確認対象
        newRecordList[8].indent = 3 // 確認対象
        newRecordList[9].indent = 3 // 確認対象

        const targetTableContent = new TableContent(
            'tableId',
            'TestTableTitle',
            newRecordList,
            tableContentModule,
            tableContentOptions
        )

        // * Act
        targetTableContent.deleteRecord(3)

        // * Assert
        expect(targetTableContent.records[6].indent).toBe(2)
        expect(targetTableContent.records[7].indent).toBe(3)
        expect(targetTableContent.records[8].indent).toBe(3)
    })

    it('指定されたレコードの直下と直上のレコードに２つ以上ギャップがなければ、何もしないこと', () => {
        // * Arrange
        const uuid = new Uuid()
        const tableContentModule = new TableContentModule(uuid)
        const tableContentOptions = new TableContentOptions(true, true, true, true)
        const headerRecord = new RecordContent(uuid.getUniquId(), 0, true, false, [
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'A0'),
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'B0'),
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'C0')
        ])
        const newRecordList: RecordContent[] = [headerRecord]
        for (let i = 1; i <= 10; i++) {
            newRecordList.push(
                new RecordContent(uuid.getUniquId(), 0, false, false, [
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'A' + i),
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'B' + i),
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'C' + i)
                ])
            )
        }
        newRecordList[2].indent = 1
        newRecordList[3].indent = 2
        newRecordList[4].indent = 3
        newRecordList[5].indent = 2
        newRecordList[6].indent = 3
        newRecordList[7].indent = 3

        const targetTableContent = new TableContent(
            'tableId',
            'TestTableTitle',
            newRecordList,
            tableContentModule,
            tableContentOptions
        )

        // * Act
        targetTableContent.deleteRecord(5)

        // * Assert
        expect(targetTableContent.records[5].indent).toBe(3)
        expect(targetTableContent.records[6].indent).toBe(3)
    })

    it('末尾のレコードが削除されること', () => {
        // * Arrange
        const uuid = new Uuid()
        const tableContentModule = new TableContentModule(uuid)
        const tableContentOptions = new TableContentOptions(true, true, true, true)
        const headerRecord = new RecordContent(uuid.getUniquId(), 0, true, false, [
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'A0'),
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'B0'),
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'C0')
        ])
        const newRecordList: RecordContent[] = [headerRecord]
        for (let i = 1; i <= 2; i++) {
            newRecordList.push(
                new RecordContent(uuid.getUniquId(), 0, false, false, [
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'A' + i),
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'B' + i),
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'C' + i)
                ])
            )
        }

        const targetTableContent = new TableContent(
            'tableId',
            'TestTableTitle',
            newRecordList,
            tableContentModule,
            tableContentOptions
        )

        // * Act
        targetTableContent.deleteRecord(2)

        // * Assert
        expect(targetTableContent.records.length).toBe(2)
    })
})

describe('changeTitleOnly', () => {
    it('タイトル部横全表示状態が有効となること', () => {
        // * Arrange
        const uuid = new Uuid()
        const tableContentModule = new TableContentModule(uuid)
        const tableContentOptions = new TableContentOptions(true, true, true, true)
        const headerRecord = new RecordContent(uuid.getUniquId(), 0, true, false, [
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'A0'),
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'B0'),
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'C0')
        ])
        const newRecordList: RecordContent[] = [headerRecord]
        for (let i = 1; i <= 2; i++) {
            newRecordList.push(
                new RecordContent(uuid.getUniquId(), 0, false, false, [
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'A' + i),
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'B' + i),
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'C' + i)
                ])
            )
        }
        const targetTableContent = new TableContent(
            'tableId',
            'TestTableTitle',
            newRecordList,
            tableContentModule,
            tableContentOptions
        )
        targetTableContent.records[2].isTitleOnly = false

        // * Act
        targetTableContent.changeTitleOnly(2)

        // * Assert
        expect(targetTableContent.records[2].isTitleOnly).toBe(true)
    })
    it('タイトル部横全表示状態が有効状態で呼び出されると、無効になること', () => {
        const uuid = new Uuid()
        const tableContentModule = new TableContentModule(uuid)
        const tableContentOptions = new TableContentOptions(true, true, true, true)

        // * Arrange
        const headerRecord = new RecordContent(uuid.getUniquId(), 0, true, false, [
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'A0'),
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'B0'),
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'C0')
        ])
        const newRecordList: RecordContent[] = [headerRecord]
        for (let i = 1; i <= 2; i++) {
            newRecordList.push(
                new RecordContent(uuid.getUniquId(), 0, false, false, [
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'A' + i),
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'B' + i),
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'C' + i)
                ])
            )
        }
        const targetTableContent = new TableContent(
            'tableId',
            'TestTableTitle',
            newRecordList,
            tableContentModule,
            tableContentOptions
        )
        targetTableContent.records[2].isTitleOnly = true

        // * Act
        targetTableContent.changeTitleOnly(2)

        // * Assert
        expect(targetTableContent.records[2].isTitleOnly).toBe(false)
    })
})

describe('deleteRow', () => {
    it('指定された列(インデックス1)が1つ減ること', () => {
        const uuid = new Uuid()
        const tableContentModule = new TableContentModule(uuid)
        const tableContentOptions = new TableContentOptions(true, true, true, true)

        // * Arrange
        const headerRecord = new RecordContent(uuid.getUniquId(), 0, true, false, [
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'A0'),
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'B0'),
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'C0')
        ])
        const newRecordList: RecordContent[] = [headerRecord]
        for (let i = 1; i <= 2; i++) {
            newRecordList.push(
                new RecordContent(uuid.getUniquId(), 0, false, false, [
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'A' + i),
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'B' + i),
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'C' + i)
                ])
            )
        }
        const targetTableContent = new TableContent(
            'tableId',
            'TestTableTitle',
            newRecordList,
            tableContentModule,
            tableContentOptions
        )

        // * Act
        targetTableContent.deleteRow(1)

        // * Assert
        targetTableContent.records.forEach((record, index) => {
            expect(record.cells.length).toBe(2)
            expect(record.cells[0].content).toBe('A' + index)
            expect(record.cells[1].content).toBe('C' + index)
        })
    })

    it('列が1行のみである場合、減らないこと', () => {
        const uuid = new Uuid()
        const tableContentModule = new TableContentModule(uuid)
        const tableContentOptions = new TableContentOptions(true, true, true, true)

        // * Arrange
        const headerRecord = new RecordContent(uuid.getUniquId(), 0, true, false, [
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'A0')
        ])
        const newRecordList: RecordContent[] = [headerRecord]
        for (let i = 1; i <= 2; i++) {
            newRecordList.push(
                new RecordContent(uuid.getUniquId(), 0, false, false, [
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'A' + i)
                ])
            )
        }
        const targetTableContent = new TableContent(
            'tableId',
            'TestTableTitle',
            newRecordList,
            tableContentModule,
            tableContentOptions
        )

        // * Act
        targetTableContent.deleteRow(0)

        // * Assert
        targetTableContent.records.forEach((record, index) => {
            expect(record.cells.length).toBe(1)
            expect(record.cells[0].content).toBe('A' + index)
        })
    })
    it('範囲外の列が指定された場合、警告をコンソールに表示し無視する', () => {
        // * Arrange
        const uuid = new Uuid()
        const tableContentModule = new TableContentModule(uuid)
        const tableContentOptions = new TableContentOptions(true, true, true, true)

        let actualWarnMesaage = ''
        vi.spyOn(BrowserLogger, 'warn').mockImplementation((message: string) => {
            actualWarnMesaage = message
        })

        const headerRecord = new RecordContent(uuid.getUniquId(), 0, true, false, [
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'A0'),
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'B0'),
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'C0')
        ])
        const newRecordList: RecordContent[] = [headerRecord]
        for (let i = 1; i <= 2; i++) {
            newRecordList.push(
                new RecordContent(uuid.getUniquId(), 0, false, false, [
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'A' + i),
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'B' + i),
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'C' + i)
                ])
            )
        }

        const targetTableContent = new TableContent(
            'tableId',
            'TestTableTitle',
            newRecordList,
            tableContentModule,
            tableContentOptions
        )

        const overLength = targetTableContent.records.length
        const maxIndex = targetTableContent.records.length - 1

        const expectWarnMessage: string = MESSAGE_TableContent.DELETE_ROW_OUT_OF_RANGE(overLength, maxIndex)

        // * Act
        targetTableContent.deleteRow(overLength)

        // * Assert
        targetTableContent.records.forEach((record, index) => {
            expect(record.cells.length).toBe(3)
            expect(record.cells[0].content).toBe('A' + index)
            expect(record.cells[1].content).toBe('B' + index)
            expect(record.cells[2].content).toBe('C' + index)
        })
        expect(actualWarnMesaage).toBe(expectWarnMessage)
    })
})

describe('replacePositionRow', () => {
    it('指定された列(1↔2)が入れ替えられること', () => {
        // * Arrange
        const uuid = new Uuid()
        const tableContentModule = new TableContentModule(uuid)
        const tableContentOptions = new TableContentOptions(true, true, true, true)

        const headerRecord = new RecordContent(uuid.getUniquId(), 0, true, false, [
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'A0'),
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'B0'),
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'C0')
        ])
        const newRecordList: RecordContent[] = [headerRecord]
        for (let i = 1; i <= 3; i++) {
            newRecordList.push(
                new RecordContent(uuid.getUniquId(), 0, false, false, [
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'A' + i),
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'B' + i),
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'C' + i)
                ])
            )
        }

        const targetTableContent = new TableContent(
            'tableId',
            'TestTableTitle',
            newRecordList,
            tableContentModule,
            tableContentOptions
        )

        // * Act
        targetTableContent.replacePositionRow(1, 2)

        // * Assert
        targetTableContent.records.forEach((record, index) => {
            expect(record.cells[0].content).toBe('A' + index)
            expect(record.cells[1].content).toBe('C' + index)
            expect(record.cells[2].content).toBe('B' + index)
        })
    })
    it('指定された列が入れ替えられること', () => {
        // * Arrange
        const uuid = new Uuid()
        const tableContentModule = new TableContentModule(uuid)
        const tableContentOptions = new TableContentOptions(true, true, true, true)

        const headerRecord = new RecordContent(uuid.getUniquId(), 0, true, false, [
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'A0'),
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'B0'),
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'C0')
        ])
        const newRecordList: RecordContent[] = [headerRecord]
        for (let i = 1; i <= 3; i++) {
            newRecordList.push(
                new RecordContent(uuid.getUniquId(), 0, false, false, [
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'A' + i),
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'B' + i),
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'C' + i)
                ])
            )
        }

        const targetTableContent = new TableContent(
            'tableId',
            'TestTableTitle',
            newRecordList,
            tableContentModule,
            tableContentOptions
        )

        // * Act
        targetTableContent.replacePositionRow(1, 2)

        // * Assert
        targetTableContent.records.forEach((record, index) => {
            expect(record.cells[0].content).toBe('A' + index)
            expect(record.cells[1].content).toBe('C' + index)
            expect(record.cells[2].content).toBe('B' + index)
        })
    })
    it('0列未満の列とは入れ替えられないこと', () => {
        // * Arrange
        const uuid = new Uuid()
        const tableContentModule = new TableContentModule(uuid)
        const tableContentOptions = new TableContentOptions(true, true, true, true)

        const headerRecord = new RecordContent(uuid.getUniquId(), 0, true, false, [
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'A0'),
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'B0'),
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'C0')
        ])
        const newRecordList: RecordContent[] = [headerRecord]
        for (let i = 1; i <= 3; i++) {
            newRecordList.push(
                new RecordContent(uuid.getUniquId(), 0, false, false, [
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'A' + i),
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'B' + i),
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'C' + i)
                ])
            )
        }

        const targetTableContent = new TableContent(
            'tableId',
            'TestTableTitle',
            newRecordList,
            tableContentModule,
            tableContentOptions
        )

        // * Act
        targetTableContent.replacePositionRow(0, -1)

        // * Assert
        targetTableContent.records.forEach((record, index) => {
            expect(record.cells.length).toBe(3)
            expect(record.cells[0].content).toBe('A' + index)
            expect(record.cells[1].content).toBe('B' + index)
            expect(record.cells[2].content).toBe('C' + index)
        })
    })
    it('列末を超えた列とは入れ替えられないこと', () => {
        // * Arrange
        const uuid = new Uuid()
        const tableContentModule = new TableContentModule(uuid)
        const tableContentOptions = new TableContentOptions(true, true, true, true)

        const headerRecord = new RecordContent(uuid.getUniquId(), 0, true, false, [
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'A0'),
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'B0'),
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'C0')
        ])
        const newRecordList: RecordContent[] = [headerRecord]
        for (let i = 1; i <= 3; i++) {
            newRecordList.push(
                new RecordContent(uuid.getUniquId(), 0, false, false, [
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'A' + i),
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'B' + i),
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'C' + i)
                ])
            )
        }

        const targetTableContent = new TableContent(
            'tableId',
            'TestTableTitle',
            newRecordList,
            tableContentModule,
            tableContentOptions
        )
        const maxColumnIndex = targetTableContent.records[0].cells.length - 1

        // * Act
        targetTableContent.replacePositionRow(maxColumnIndex, maxColumnIndex + 1)

        // * Assert
        targetTableContent.records.forEach((record, index) => {
            expect(record.cells.length).toBe(3)
            expect(record.cells[0].content).toBe('A' + index)
            expect(record.cells[1].content).toBe('B' + index)
            expect(record.cells[2].content).toBe('C' + index)
        })
    })
})

describe('replacePositionRecord', () => {
    it('指定された行が入れ替えられること', () => {
        // * Arrange
        const uuid = new Uuid()
        const tableContentModule = new TableContentModule(uuid)
        const tableContentOptions = new TableContentOptions(true, true, true, true)

        const headerRecord = new RecordContent(uuid.getUniquId(), 0, true, false, [
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'A0'),
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'B0'),
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'C0')
        ])
        const newRecordList: RecordContent[] = [headerRecord]
        for (let i = 1; i <= 3; i++) {
            newRecordList.push(
                new RecordContent(uuid.getUniquId(), 0, false, false, [
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'A' + i),
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'B' + i),
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'C' + i)
                ])
            )
        }
        const expectRecord0 = newRecordList[0]
        const expectRecord1 = newRecordList[2]
        const expectRecord2 = newRecordList[1]
        const expectRecord3 = newRecordList[3]

        const targetTableContent = new TableContent(
            'tableId',
            'TestTableTitle',
            newRecordList,
            tableContentModule,
            tableContentOptions
        )

        // * Act
        targetTableContent.replacePositionRecord(1, 2)

        // * Assert
        expect(targetTableContent.records.length).toBe(4)
        expect(targetTableContent.records[0]).toBe(expectRecord0)
        expect(targetTableContent.records[1]).toBe(expectRecord1)
        expect(targetTableContent.records[2]).toBe(expectRecord2)
        expect(targetTableContent.records[3]).toBe(expectRecord3)
    })
    it('1行未満の行とは入れ替えられないこと(1↔0)', () => {
        // * Arrange
        const uuid = new Uuid()
        const tableContentModule = new TableContentModule(uuid)
        const tableContentOptions = new TableContentOptions(true, true, true, true)

        const headerRecord = new RecordContent(uuid.getUniquId(), 0, true, false, [
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'A0'),
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'B0'),
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'C0')
        ])
        const newRecordList: RecordContent[] = [headerRecord]
        for (let i = 1; i <= 3; i++) {
            newRecordList.push(
                new RecordContent(uuid.getUniquId(), 0, false, false, [
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'A' + i),
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'B' + i),
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'C' + i)
                ])
            )
        }
        const expectRecord0 = newRecordList[0]
        const expectRecord1 = newRecordList[1]
        const expectRecord2 = newRecordList[2]
        const expectRecord3 = newRecordList[3]

        const targetTableContent = new TableContent(
            'tableId',
            'TestTableTitle',
            newRecordList,
            tableContentModule,
            tableContentOptions
        )

        // * Act
        targetTableContent.replacePositionRecord(1, 0)

        // * Assert
        expect(targetTableContent.records.length).toBe(4)
        expect(targetTableContent.records[0]).toBe(expectRecord0)
        expect(targetTableContent.records[1]).toBe(expectRecord1)
        expect(targetTableContent.records[2]).toBe(expectRecord2)
        expect(targetTableContent.records[3]).toBe(expectRecord3)
    })
    it('1行未満の行とは入れ替えられないこと(0↔1)', () => {
        // * Arrange
        const uuid = new Uuid()
        const tableContentModule = new TableContentModule(uuid)
        const tableContentOptions = new TableContentOptions(true, true, true, true)

        const headerRecord = new RecordContent(uuid.getUniquId(), 0, true, false, [
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'A0'),
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'B0'),
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'C0')
        ])
        const newRecordList: RecordContent[] = [headerRecord]
        for (let i = 1; i <= 3; i++) {
            newRecordList.push(
                new RecordContent(uuid.getUniquId(), 0, false, false, [
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'A' + i),
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'B' + i),
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'C' + i)
                ])
            )
        }
        const expectRecord0 = newRecordList[0]
        const expectRecord1 = newRecordList[1]
        const expectRecord2 = newRecordList[2]
        const expectRecord3 = newRecordList[3]

        const targetTableContent = new TableContent(
            'tableId',
            'TestTableTitle',
            newRecordList,
            tableContentModule,
            tableContentOptions
        )

        // * Act
        targetTableContent.replacePositionRecord(0, 1)

        // * Assert
        expect(targetTableContent.records.length).toBe(4)
        expect(targetTableContent.records[0]).toBe(expectRecord0)
        expect(targetTableContent.records[1]).toBe(expectRecord1)
        expect(targetTableContent.records[2]).toBe(expectRecord2)
        expect(targetTableContent.records[3]).toBe(expectRecord3)
    })
    it('末尾超過の行とは入れ替えられないこと(末尾↔末尾+1)', () => {
        // * Arrange
        const uuid = new Uuid()
        const tableContentModule = new TableContentModule(uuid)
        const tableContentOptions = new TableContentOptions(true, true, true, true)

        const headerRecord = new RecordContent(uuid.getUniquId(), 0, true, false, [
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'A0'),
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'B0'),
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'C0')
        ])
        const newRecordList: RecordContent[] = [headerRecord]
        for (let i = 1; i <= 3; i++) {
            newRecordList.push(
                new RecordContent(uuid.getUniquId(), 0, false, false, [
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'A' + i),
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'B' + i),
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'C' + i)
                ])
            )
        }
        const expectRecord0 = newRecordList[0]
        const expectRecord1 = newRecordList[1]
        const expectRecord2 = newRecordList[2]
        const expectRecord3 = newRecordList[3]

        const targetTableContent = new TableContent(
            'tableId',
            'TestTableTitle',
            newRecordList,
            tableContentModule,
            tableContentOptions
        )
        const maxIndex = targetTableContent.records.length - 1

        // * Act
        targetTableContent.replacePositionRecord(maxIndex, maxIndex + 1)

        // * Assert
        expect(targetTableContent.records.length).toBe(4)
        expect(targetTableContent.records[0]).toBe(expectRecord0)
        expect(targetTableContent.records[1]).toBe(expectRecord1)
        expect(targetTableContent.records[2]).toBe(expectRecord2)
        expect(targetTableContent.records[3]).toBe(expectRecord3)
    })
    it('末尾超過の行とは入れ替えられないこと(末尾+1↔末尾)', () => {
        // * Arrange
        const uuid = new Uuid()
        const tableContentModule = new TableContentModule(uuid)
        const tableContentOptions = new TableContentOptions(true, true, true, true)

        const headerRecord = new RecordContent(uuid.getUniquId(), 0, true, false, [
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'A0'),
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'B0'),
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'C0')
        ])
        const newRecordList: RecordContent[] = [headerRecord]
        for (let i = 1; i <= 3; i++) {
            newRecordList.push(
                new RecordContent(uuid.getUniquId(), 0, false, false, [
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'A' + i),
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'B' + i),
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'C' + i)
                ])
            )
        }
        const expectRecord0 = newRecordList[0]
        const expectRecord1 = newRecordList[1]
        const expectRecord2 = newRecordList[2]
        const expectRecord3 = newRecordList[3]

        const targetTableContent = new TableContent(
            'tableId',
            'TestTableTitle',
            newRecordList,
            tableContentModule,
            tableContentOptions
        )
        const maxIndex = targetTableContent.records.length - 1

        // * Act
        targetTableContent.replacePositionRecord(maxIndex + 1, maxIndex)

        // * Assert
        expect(targetTableContent.records.length).toBe(4)
        expect(targetTableContent.records[0]).toBe(expectRecord0)
        expect(targetTableContent.records[1]).toBe(expectRecord1)
        expect(targetTableContent.records[2]).toBe(expectRecord2)
        expect(targetTableContent.records[3]).toBe(expectRecord3)
    })
})

describe('addRow', () => {
    it('列を追加できること', () => {
        // * Arrange
        const uuid = new Uuid()
        const tableContentModule = new TableContentModule(uuid)
        const tableContentOptions = new TableContentOptions(true, true, true, true)
        const headerRecord = new RecordContent(uuid.getUniquId(), 0, true, false, [
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'A0'),
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'B0'),
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'C0')
        ])
        const newRecordList: RecordContent[] = [headerRecord]
        for (let i = 1; i <= 2; i++) {
            newRecordList.push(
                new RecordContent(uuid.getUniquId(), 0, false, false, [
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'A' + i),
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'B' + i),
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'C' + i)
                ])
            )
        }

        const targetTableContent = new TableContent(
            'tableId',
            'TestTableTitle',
            newRecordList,
            tableContentModule,
            tableContentOptions
        )
        const expectRowLength = targetTableContent.records[0].cells.length + 1

        // * Act
        targetTableContent.addRow(1)

        // * Assert
        targetTableContent.records.forEach((record, index) => {
            expect(record.cells.length).toBe(expectRowLength)
            expect(record.cells[0].content).toBe('A' + index)
            expect(record.cells[1].content).toBe('B' + index)
            expect(record.cells[2].content).toBe('')
            expect(record.cells[3].content).toBe('C' + index)
        })
    })
    it('末尾列へ列を追加できること', () => {
        // * Arrange
        const uuid = new Uuid()
        const tableContentModule = new TableContentModule(uuid)
        const tableContentOptions = new TableContentOptions(true, true, true, true)
        const headerRecord = new RecordContent(uuid.getUniquId(), 0, true, false, [
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'A0'),
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'B0'),
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'C0')
        ])
        const newRecordList: RecordContent[] = [headerRecord]
        for (let i = 1; i <= 2; i++) {
            newRecordList.push(
                new RecordContent(uuid.getUniquId(), 0, false, false, [
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'A' + i),
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'B' + i),
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'C' + i)
                ])
            )
        }

        const targetTableContent = new TableContent(
            'tableId',
            'TestTableTitle',
            newRecordList,
            tableContentModule,
            tableContentOptions
        )
        const expectRowLength = targetTableContent.records[0].cells.length + 1

        // * Act
        targetTableContent.addRow(3)

        // * Assert
        targetTableContent.records.forEach((record, index) => {
            expect(record.cells.length).toBe(expectRowLength)
            expect(record.cells[0].content).toBe('A' + index)
            expect(record.cells[1].content).toBe('B' + index)
            expect(record.cells[2].content).toBe('C' + index)
            expect(record.cells[3].content).toBe('')
        })
    })
    it('10列を超える列を追加できないこと', () => {
        // * Arrange
        const uuid = new Uuid()
        const tableContentModule = new TableContentModule(uuid)
        const tableContentOptions = new TableContentOptions(true, true, true, true)
        const headerRecord = new RecordContent(uuid.getUniquId(), 0, true, false, [
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'A0'),
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'B0'),
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'C0'),
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'D0'),
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'E0'),
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'F0'),
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'G0'),
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'H0'),
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'I0'),
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'J0')
        ])
        const newRecordList: RecordContent[] = [headerRecord]
        for (let i = 1; i <= 2; i++) {
            newRecordList.push(
                new RecordContent(uuid.getUniquId(), 0, false, false, [
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'A' + i),
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'B' + i),
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'C' + i),
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'D' + i),
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'E' + i),
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'F' + i),
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'G' + i),
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'H' + i),
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'I' + i),
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'J' + i)
                ])
            )
        }

        const targetTableContent = new TableContent(
            'tableId',
            'TestTableTitle',
            newRecordList,
            tableContentModule,
            tableContentOptions
        )
        const expectRowLength = targetTableContent.records[0].cells.length

        // * Act
        targetTableContent.addRow(3)

        // * Assert
        targetTableContent.records.forEach((record, index) => {
            expect(record.cells.length).toBe(expectRowLength)
            expect(record.cells[0].content).toBe('A' + index)
            expect(record.cells[1].content).toBe('B' + index)
            expect(record.cells[2].content).toBe('C' + index)
            expect(record.cells[3].content).toBe('D' + index)
            expect(record.cells[4].content).toBe('E' + index)
            expect(record.cells[5].content).toBe('F' + index)
            expect(record.cells[6].content).toBe('G' + index)
            expect(record.cells[7].content).toBe('H' + index)
            expect(record.cells[8].content).toBe('I' + index)
            expect(record.cells[9].content).toBe('J' + index)
            expect(record.cells.at(10)).toBeUndefined()
        })
    })
})

describe('addIndent', () => {
    it('インデントを追加できること', () => {
        // * Arrange
        const uuid = new Uuid()
        const tableContentModule = new TableContentModule(uuid)
        const tableContentOptions = new TableContentOptions(true, true, true, true)
        const headerRecord = new RecordContent(uuid.getUniquId(), 0, true, false, [
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'A0'),
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'B0'),
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'C0')
        ])
        const newRecordList: RecordContent[] = [headerRecord]
        for (let i = 1; i <= 2; i++) {
            newRecordList.push(
                new RecordContent(uuid.getUniquId(), 0, false, false, [
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'A' + i),
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'B' + i),
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'C' + i)
                ])
            )
        }

        const targetTableContent = new TableContent(
            'tableId',
            'TestTableTitle',
            newRecordList,
            tableContentModule,
            tableContentOptions
        )

        // * Act
        targetTableContent.addIndent(2)

        // * Assert
        expect(targetTableContent.records[2].indent).toBe(1)
    })

    it('addIndentAbleの判定がfalseの場合、インデントの追加ができないこと', () => {
        // * Arrange
        const uuid = new Uuid()
        const tableContentModule = new TableContentModule(uuid)
        const tableContentOptions = new TableContentOptions(true, true, true, true)
        const headerRecord = new RecordContent(uuid.getUniquId(), 0, true, false, [
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'A0'),
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'B0'),
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'C0')
        ])
        const newRecordList: RecordContent[] = [headerRecord]
        for (let i = 1; i <= 2; i++) {
            newRecordList.push(
                new RecordContent(uuid.getUniquId(), 0, false, false, [
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'A' + i),
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'B' + i),
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'C' + i)
                ])
            )
        }

        const targetTableContent = new TableContent(
            'tableId',
            'TestTableTitle',
            newRecordList,
            tableContentModule,
            tableContentOptions
        )

        vi.spyOn(targetTableContent, 'addIndentAble').mockImplementation((changePostion: number) => false) // eslint-disable-line @typescript-eslint/no-unused-vars

        // * Act
        targetTableContent.addIndent(2)

        // * Assert
        expect(targetTableContent.records[2].indent).toBe(0)
    })

    it('インデントが15を超える場合、インデントの追加ができないこと', () => {
        // * Arrange
        const uuid = new Uuid()
        const tableContentModule = new TableContentModule(uuid)
        const tableContentOptions = new TableContentOptions(true, true, true, true)
        const headerRecord = new RecordContent(uuid.getUniquId(), 0, true, false, [
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'A0'),
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'B0'),
            new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'C0')
        ])
        const newRecordList: RecordContent[] = [headerRecord]
        for (let i = 1; i <= 16; i++) {
            newRecordList.push(
                new RecordContent(uuid.getUniquId(), i - 1, false, false, [
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'A' + i),
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'B' + i),
                    new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'C' + i)
                ])
            )
        }
        newRecordList.push(
            new RecordContent(uuid.getUniquId(), 15, false, false, [
                new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'A17'),
                new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'B17'),
                new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'C17')
            ])
        )

        const targetTableContent = new TableContent(
            'tableId',
            'TestTableTitle',
            newRecordList,
            tableContentModule,
            tableContentOptions
        )

        // * Act
        targetTableContent.addIndent(17)

        // * Assert
        expect(targetTableContent.records[17].indent).toBe(15)
    })
})
