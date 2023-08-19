/**
 * @vitest-environment jsdom
 */

import RichEditor,{ PropsInterface }  from "./index.vue";

import { describe, it, expect, } from "vitest";
import { mount } from "@vue/test-utils";

describe("表示", () => {

    it("初期表示", async () => {
        
        // * Arrange
        let props: PropsInterface = {
            value:"<p>test content for quill Wrapper</p>"
        }
        // * Act
        const wrapper =  mount(RichEditor, { props } );  

        // * Assert
        expect( (wrapper.element as HTMLDivElement).querySelector('.ql-editor')?.innerHTML ).toContain("<p>test content for quill Wrapper</p>");
    });

    it("emitの確認", async () => {
            // * Arrange
            let props: PropsInterface = { value:""}
            const wrapper =  mount(RichEditor, { props } );  
            // * Act
            wrapper.getCurrentComponent().emit('input', "<p>update content</p>");

            // * Assert
            let emitValue:string|undefined = wrapper.emitted<string[]>('input')?.pop()?.pop() ;
            expect(emitValue).toBe("<p>update content</p>");
    });
});

