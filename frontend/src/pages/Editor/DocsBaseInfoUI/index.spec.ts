/**
 * @vitest-environment jsdom
 */

import DocsBaseInfo, { PropsInterface } from './index.vue'
import { DocsBaseInfoInterface } from './EmitTypes'
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

describe('表示', () => {
    const setup = () => {
        const props: PropsInterface = {
            docsName: '初期データのDocs名',
            docsVersion: '9.99',
            docsId: '9999-9999-9999-9999'
        }
        return {
            props
        }
    }

    describe('メイン', () => {
        it('初期表示されていること(props,slot)', async () => {
            // * Arrange
            const { props } = setup()

            // * Act
            const wrapper = mount(DocsBaseInfo, { props })

            // * Assert
            expect(wrapper.find('label>input[id="editor_docs-name"]').exists()).toBe(true)
            expect(wrapper.find('label>input[id="editor_docs-name"]').attributes('placeholder')).toBe('docs name')
            expect(wrapper.find('label>input[id="editor_docs-name"]').attributes('title')).toBe('docs name')
            expect((wrapper.find('label>input[id="editor_docs-name"]').element as HTMLInputElement).value).toBe(
                props.docsName
            )

            expect(wrapper.find('label>input[id="editor_docs-version"]').exists()).toBe(true)
            expect(wrapper.find('label>input[id="editor_docs-version"]').attributes('placeholder')).toBe('docs version')
            expect(wrapper.find('label>input[id="editor_docs-version"]').attributes('title')).toBe('docs version')
            expect((wrapper.find('label>input[id="editor_docs-version"]').element as HTMLInputElement).value).toBe(
                props.docsVersion
            )

            expect(wrapper.find('label>input[id="editor_docs-id"]').exists()).toBe(true)
            expect(wrapper.find('label>input[id="editor_docs-id"]').attributes('placeholder')).toBe('docs id')
            expect(wrapper.find('label>input[id="editor_docs-id"]').attributes('title')).toBe('docs id')
            expect((wrapper.find('label>input[id="editor_docs-id"]').element as HTMLInputElement).value).toBe(
                props.docsId
            )
        })

        it('Docs名を入力', async () => {
            // * Arrange
            const { props } = setup()
            const wrapper = mount(DocsBaseInfo, { props })
            const targetElement = wrapper.find('label>input[id="editor_docs-name"]')

            // * Act
            targetElement.setValue('変更後のDocs名')

            // * Assert
            expect((wrapper.find('label>input[id="editor_docs-name"]').element as HTMLInputElement).value).toBe(
                '変更後のDocs名'
            )

            /** emitに渡される値 */
            const emitValue: DocsBaseInfoInterface | undefined = wrapper
                .emitted<DocsBaseInfoInterface[]>('input')
                ?.pop()
                ?.pop()
            expect(emitValue?.docsName).toBe('変更後のDocs名')
        })
        it('Docsバージョンを入力', async () => {
            // * Arrange
            const { props } = setup()
            const wrapper = mount(DocsBaseInfo, { props })
            const targetElement = wrapper.find('label>input[id="editor_docs-version"]')

            // * Act
            targetElement.setValue('変更後のDocsバージョン')

            // * Assert
            expect((wrapper.find('label>input[id="editor_docs-version"]').element as HTMLInputElement).value).toBe(
                '変更後のDocsバージョン'
            )

            /** emitに渡される値 */
            const emitValue: DocsBaseInfoInterface = wrapper.emitted<any>('input')?.pop()?.pop() // eslint-disable-line

            expect(emitValue.docsVersion).toBe('変更後のDocsバージョン')
        })

        it('DocsのIDを入力', async () => {
            // * Arrange
            const { props } = setup()
            const wrapper = mount(DocsBaseInfo, { props })
            const targetElement = wrapper.find('label>input[id="editor_docs-id"]')

            // * Act
            targetElement.setValue('変更後のDocsID')

            // * Assert
            expect((wrapper.find('label>input[id="editor_docs-id"]').element as HTMLInputElement).value).toBe(
                '変更後のDocsID'
            )

            /** emitに渡される値 */
            const emitValue: DocsBaseInfoInterface | undefined = wrapper
                .emitted<DocsBaseInfoInterface[]>('input')
                ?.pop()
                ?.pop()
            expect(emitValue?.docsId).toBe('変更後のDocsID')
        })
    })
})
