/**
 * @vitest-environment jsdom
 */

import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.bubble.css'
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'

describe('表示', () => {
    it('初期表示時にデフォルトの内容を表示する', async () => {
        // * Arrange
        interface PropsInterface {
            theme: string
            content: string
            contentType: string
        }
        const expectContent = '<p>test content for quill Editor</p>'
        const quillEditorProps: PropsInterface = {
            theme: 'bubble',
            content: expectContent,
            contentType: 'html'
        }

        // * Act
        /* 型不整合の判定になるが、想定通りの値が渡される。*/
        /* QuillEditorにテストコードがないため、mountによる呼び出しを考慮していない可能性がある。*/
        // eslint-disable-next-line
        // @ts-ignore
        const wrapper = mount(QuillEditor, { props: quillEditorProps })

        // * Assert
        expect(wrapper.html()).toContain(`<div class="ql-container ql-bubble">`)
        expect(wrapper.html()).toContain(expectContent)
    })
})
