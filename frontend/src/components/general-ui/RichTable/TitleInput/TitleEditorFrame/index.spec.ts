/**
 * @vitest-environment jsdom
 */

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
        // * Act

        const wrapper = mount(EditorFrame, { slots: { default: TestComponent } })

        // * Assert
        expect(wrapper.html()).toContain('<div>TestValues</div>')
    })
})
