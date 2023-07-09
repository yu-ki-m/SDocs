/**
 * @vitest-environment jsdom
 */

import MainLayout,{ PropsInterface } from "../MainLayout/index.vue"
import { describe, it, expect, } from "vitest";
import { mount } from "@vue/test-utils";
import logo from "./../../assets/logo.svg";

import { MockWindowWrapper } from "../../../components/page-props/WindowWrapper/MockWindowWrapper";
import { StubTemplateSummariesRepository } from "../../TemplateSummary.Repository/StubTemplateSummariesRepository";
import { MockRouterWrapper } from "../../../components/page-props/RouterWrapper/MockRouterWrapper";
import { defineComponent } from 'vue'


describe("表示", () => {
  function setup() {
    // 実行結果格納用
    const mockWindowWrapperInstance = new MockWindowWrapper();
    const stubTemplateSummariesRepository: StubTemplateSummariesRepository = new StubTemplateSummariesRepository();
    const mockRouterWrapper = new MockRouterWrapper();

    // モック化したWindowWrapperを、propsとして渡す
    let props: PropsInterface = {
        routerWrapper: mockRouterWrapper,
        windowWrapper: mockWindowWrapperInstance,
    };

    return {
        props,
        mockWindowWrapperInstance,
        stubTemplateSummariesRepository,
        mockRouterWrapper,
    };
  }
  describe("ヘッダー", () => {
    it("ヘッダー文字が表示されるコト", async () => {

      /*************** Arrange ****************/
      const { props } = setup();

      /***************   Act   ****************/

      const wrapper = mount(
        MainLayout, 
        {  props,slots:{ default: "" } }
      );

      /*************** Assert ****************/
      expect(wrapper.html()).toContain("SDocs");
    });

    it("ロゴが表示されるコト", async () => {

      /*************** Arrange ****************/
      const { props } = setup();

      /***************   Act   ****************/
      
      const wrapper = mount(
        MainLayout, 
        {  props,slots:{ default: "" } }
      );

      /*************** Assert ****************/
      expect(wrapper.html()).toContain(logo);
      expect(wrapper.find("[name='toTop']")).toBeTruthy();
    });

    it("ロゴをクリックするとTOPに遷移する", async () => {

      /*************** Arrange ****************/
      const { props, mockRouterWrapper } = setup();

      /***************   Act   ****************/
      
      const wrapper =  mount(
        MainLayout, 
        {  props,slots:{ default: "" } }
      );
      await wrapper.find("[id='header_top-icon']").trigger("click");

      /*************** Assert ****************/
      expect(mockRouterWrapper.calledToTopPage).toBe(true);
    });
    it("新しいタブを表示するボタンが表示される", async () => {

      /*************** Arrange ****************/
      const { props } = setup();

      /***************   Act   ****************/
      
      const wrapper = mount(
        MainLayout, 
        { props,slots:{ default: "" } }
      )

      /*************** Assert ****************/
      expect(wrapper.find("[name='toTopNewTab']").attributes('title')).toBe('新しいタブで開く')
      expect(wrapper.find("[name='toTopNewTab']")).toBeTruthy();
    });

    it("新しいタブを表示するボタンがクリックされる", async () => {

      /*************** Arrange ****************/
      const { props, mockWindowWrapperInstance } = setup();

      /***************   Act   ****************/
      
      mount(
        MainLayout, 
        { props,slots:{ default: "" } }
      ).find("[id='header_top-new-tab']").trigger("click");

      /*************** Assert ****************/
      expect(mockWindowWrapperInstance.calledToTopNewTab).toBe(true);
    });

    it("slotsのdefaultに渡されたコンポーネントが表示されていること", async () => {

      /*************** Arrange ****************/
      const { props } = setup();
      const TestComponent = defineComponent({
        template: `
          <div>TestValues</div>
        `
      })
      /***************   Act   ****************/
      
      const wrapper = mount(
        MainLayout,
        {  props,slots:{ default: TestComponent } }
      );

      /*************** Assert ****************/
      expect(wrapper.html()).toContain("<div>TestValues</div>");
    });
  });
});
