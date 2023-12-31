/**
 * @vitest-environment jsdom
 */

import Data from './index.vue'
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import { defineComponent } from 'vue'

describe('表示', () => {
    it('slotsのdefaulとに渡されたコンポーネントが表示されていること', async () => {
        // * Arrange
        /* eslint vue/one-component-per-file:0 */
        const DefaultComponent = defineComponent({
            template: `
          <div>TestValuesDefault</div>
        `
        })
        const RowOptions = defineComponent({
            template: `
          <div>TestValuesRowOptions</div>
        `
        })

        // * Act
        const wrapper = mount(Data, {
            props: { dataLength: 10 },
            slots: { default: DefaultComponent, rowOptions: RowOptions }
        })

        // * Assert
        expect(wrapper.html()).toContain('<div>TestValuesDefault</div>')
        expect(wrapper.html()).toContain('<div>TestValuesRowOptions</div>')
    })
})
