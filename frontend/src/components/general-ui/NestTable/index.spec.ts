/**
 * @vitest-environment jsdom
 */

import NestTable, { PropsInterface } from './index.vue'
import { describe, it, expect } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import TableContent, {
    RecordContent,
    CellContent,
    TableContentModule,
    CELL_TYPE,
    TableContentOptions
} from './TableContent'
import { Uuid } from '../../../components/Uuid'

describe('コンポーネント', () => {
    // TODO テスト項目を考える
    describe('メイン', () => {
        it('test', async () => {
            // * Arrange
            const uuid = new Uuid()
            const tableContentModule = new TableContentModule(uuid)
            const tableContentOptions = new TableContentOptions(true, true, true, true)
            const defaultRecord = new RecordContent(uuid.getUniquId(), 0, true, false, [
                new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'A0'),
                new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'B0'),
                new CellContent(uuid.getUniquId(), CELL_TYPE.QUILL, 'C0')
            ])
            const tableContent = new TableContent(
                'tableId',
                'TestTableTitle',
                [defaultRecord],
                tableContentModule,
                tableContentOptions
            )
            const props: PropsInterface = {
                value: JSON.stringify(tableContent)
            }

            // * Act
            const wrapper: VueWrapper<PropsInterface> = mount(NestTable, { props })

            // * Assert
            expect(wrapper.find("[data-gid='318c638b-54a2-4698-88cc-f577cacbc355']").exists()).toBe(true)
        })
    })
})
