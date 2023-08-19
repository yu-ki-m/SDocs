/**
 * @vitest-environment jsdom
 */

import { TemplateContentState, TemplateContentsState } from './index'
import { describe, it, expect } from 'vitest'
import { StubUuid } from '../../../components/Uuid/StubUuid'

describe('TemplateContentsState.constructor', () => {
    it('コンストラクタの値渡しを確認', () => {
        // * Arrange
        // なし

        // * Act
        const result = new TemplateContentsState([
            new TemplateContentState({ id: 'id-1', contentType: 'content-type-1', content: 'content-1' }),
            new TemplateContentState({ id: 'id-2', contentType: 'content-type-2', content: 'content-2' })
        ])
        // * Assert
        expect(result.contents[0].id).toEqual('id-1')
        expect(result.contents[0].contentType).toEqual('content-type-1')
        expect(result.contents[0].content).toEqual('content-1')
        expect(result.contents[1].id).toEqual('id-2')
        expect(result.contents[1].contentType).toEqual('content-type-2')
        expect(result.contents[1].content).toEqual('content-2')
    })
})
describe('TemplateContentsState.updateContent', () => {
    it('指定されたIDのcontentが更新されていること', () => {
        // * Arrange
        const target = new TemplateContentsState([
            new TemplateContentState({ id: 'id-1', contentType: 'content-type-1', content: 'content-1' }),
            new TemplateContentState({ id: 'id-2', contentType: 'content-type-2', content: 'content-2' })
        ])
        // * Act
        target.updateContent('id-1', 'content-1-updated')

        // * Assert
        expect(target.contents[0].id).toEqual('id-1')
        expect(target.contents[0].contentType).toEqual('content-type-1')
        expect(target.contents[0].content).toEqual('content-1-updated')
        expect(target.contents[1].id).toEqual('id-2')
        expect(target.contents[1].contentType).toEqual('content-type-2')
        expect(target.contents[1].content).toEqual('content-2')
    })
})

describe('TemplateContentsState.deleteContent', () => {
    it('指定されたindexがcontentsから削除されていること', () => {
        // * Arrange
        const target = new TemplateContentsState([
            new TemplateContentState({ id: 'id-1', contentType: 'content-type-1', content: 'content-1' }),
            new TemplateContentState({ id: 'id-2', contentType: 'content-type-2', content: 'content-2' }),
            new TemplateContentState({ id: 'id-3', contentType: 'content-type-3', content: 'content-3' })
        ])
        // * Act
        target.deleteContent(1)
        // * Assert
        expect(target.contents.length).toEqual(2)
        expect(target.contents[0].id).toEqual('id-1')
        expect(target.contents[0].contentType).toEqual('content-type-1')
        expect(target.contents[0].content).toEqual('content-1')
        expect(target.contents[1].id).toEqual('id-3')
        expect(target.contents[1].contentType).toEqual('content-type-3')
        expect(target.contents[1].content).toEqual('content-3')
    })
})

describe(`TemplateContentsState.addContentsRichEditor`, () => {
    it('contentsにTemplateContent(Quill)が追加されていること', () => {
        // * Arrange
        // Uuidのモック化
        const stubUuid = new StubUuid()
        stubUuid.getUniquId_returnValue = 'test-uuid'

        // ターゲットの作成
        const target = new TemplateContentsState([
            new TemplateContentState({ id: 'id-1', contentType: 'content-type-1', content: 'content-1' }),
            new TemplateContentState({ id: 'id-2', contentType: 'content-type-2', content: 'content-2' })
        ])
        // * Act
        target.addContentsRichEditor(stubUuid)
        // * Assert
        expect(target.contents.length).toEqual(3)
        expect(target.contents[0].id).toEqual('id-1')
        expect(target.contents[0].contentType).toEqual('content-type-1')
        expect(target.contents[0].content).toEqual('content-1')
        expect(target.contents[1].id).toEqual('id-2')
        expect(target.contents[1].contentType).toEqual('content-type-2')
        expect(target.contents[1].content).toEqual('content-2')
        expect(target.contents[2].id).toEqual('test-uuid')
        expect(target.contents[2].contentType).toEqual('quill')
        expect(target.contents[2].content).toEqual('')
    })
})

describe('TemplateContentsState.addContentsNestTable', () => {
    it('contentsにTemplateContent(NestTable)が追加されていること', () => {
        // * Arrange
        // Uuidのモック化
        const stubUuid = new StubUuid()
        stubUuid.getUniquId_returnValue = 'test-uuid'

        // ターゲットの作成
        const target = new TemplateContentsState([
            new TemplateContentState({ id: 'id-1', contentType: 'content-type-1', content: 'content-1' }),
            new TemplateContentState({ id: 'id-2', contentType: 'content-type-2', content: 'content-2' })
        ])
        // * Act
        target.addContentsNestTable(stubUuid)
        // * Assert
        expect(target.contents.length).toEqual(3)
        expect(target.contents[0].id).toEqual('id-1')
        expect(target.contents[0].contentType).toEqual('content-type-1')
        expect(target.contents[0].content).toEqual('content-1')
        expect(target.contents[1].id).toEqual('id-2')
        expect(target.contents[1].contentType).toEqual('content-type-2')
        expect(target.contents[1].content).toEqual('content-2')
        expect(target.contents[2].id).toEqual('test-uuid')
        expect(target.contents[2].contentType).toEqual('nest-table')
        expect(target.contents[2].content).toEqual('')
    })
})

describe('TemplateContentsState.moveIndex', () => {
    it('contentsのindexが移動していること', () => {
        // * Arrange
        // Uuidのモック化
        const stubUuid = new StubUuid()
        stubUuid.getUniquId_returnValue = 'test-uuid'

        // ターゲットの作成
        const target = new TemplateContentsState([
            new TemplateContentState({ id: 'id-1', contentType: 'content-type-1', content: 'content-1' }),
            new TemplateContentState({ id: 'id-2', contentType: 'content-type-2', content: 'content-2' }),
            new TemplateContentState({ id: 'id-3', contentType: 'content-type-3', content: 'content-3' })
        ])
        // * Act
        target.moveIndex(0, 2)
        // * Assert
        expect(target.contents.length).toEqual(3)
        expect(target.contents[0].id).toEqual('id-2')
        expect(target.contents[0].contentType).toEqual('content-type-2')
        expect(target.contents[0].content).toEqual('content-2')
        expect(target.contents[1].id).toEqual('id-3')
        expect(target.contents[1].contentType).toEqual('content-type-3')
        expect(target.contents[1].content).toEqual('content-3')
        expect(target.contents[2].id).toEqual('id-1')
        expect(target.contents[2].contentType).toEqual('content-type-1')
        expect(target.contents[2].content).toEqual('content-1')
    })
})
