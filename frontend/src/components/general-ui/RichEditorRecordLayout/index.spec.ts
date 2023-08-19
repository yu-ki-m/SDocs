/**
 * @vitest-environment jsdom
 */
/* eslint vue/one-component-per-file: 0 */
import EditorFrame from './index.vue'
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'

describe('表示', () => {
    it('slotsのdefaultに渡されたコンポーネントが表示されていること', async () => {
        // * Arrange
        const TestComponent = defineComponent({
            template: `
          <div>TestValues</div>
        `
        })
        const TestButtonComponent = defineComponent({
            template: `
          <div>TestButtonValues</div>
        `
        })

        // * Act

        const wrapper = mount(EditorFrame, { slots: { default: TestComponent, button: TestButtonComponent } })

        // * Assert
        expect(wrapper.html()).toContain('<div>TestValues</div>')
        expect(wrapper.html()).toContain('<div>TestButtonValues</div>')
    })
})
