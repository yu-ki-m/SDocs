/**
 * @vitest-environment jsdom
 */

import Data from "./index.vue"
import { describe, it, expect } from "vitest";
import { mount,VueWrapper } from "@vue/test-utils";


import { defineComponent, defineSlots } from 'vue'


describe("表示", () => {

    it("slotsのdefaulとに渡されたコンポーネントが表示されていること", async () => {

      // * Arrange 
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
      // @ts-ignore 
      const wrapper = mount( Data, {props:{dataLength : 10}, slots:{ default: DefaultComponent,rowOptions: RowOptions } } );

      // * Assert
      expect(wrapper.html()).toContain("<div>TestValuesDefault</div>");
      expect(wrapper.html()).toContain("<div>TestValuesRowOptions</div>");
    });
});
