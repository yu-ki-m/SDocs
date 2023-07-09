/**
 * @vitest-environment jsdom
 */

import NestTable,{ PropsInterface } from "./index.vue";
import { describe, it, expect, vi,afterEach } from "vitest";
import { mount, shallowMount,VueWrapper } from "@vue/test-utils";

describe("コンポーネント", () => {
  // TODO テスト項目を考える
    describe("メイン", () => {

        it("", async () => {
            // * Arrange
            const props: PropsInterface = {}
            // * Act
            const wrapper = mount(NestTable, { props }); 

            // * Assert
            expect(wrapper.find("[data-gid='318c638b-54a2-4698-88cc-f577cacbc355']").exists()).toBe(true);
        });
       
    });
});


