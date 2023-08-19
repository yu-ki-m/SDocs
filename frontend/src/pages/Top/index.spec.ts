/**
 * @vitest-environment jsdom
 */


import Top from "./index.vue";
import { PropsInterface } from "./index.vue";
import { describe, it, expect } from "vitest";
import { mount,  VueWrapper} from "@vue/test-utils";
import { StubTemplateSummariesRepository } from "../../components/TemplateSummary.Repository/StubTemplateSummariesRepository";
import { TemplateSummary } from "../../components/TemplateSummary.Entity";
import { templateSummariesA } from "../../__tests__/__fixtures__/TemplateSummary";
import { MockRouterWrapper } from "../../components/page-props/RouterWrapper/MockRouterWrapper";
import { MockWindowWrapper } from "../../components/page-props/WindowWrapper/MockWindowWrapper";
import { RepositoryFactory } from "../../components/page-props/RepositoryFactory";
import { PageProps } from '../../components/page-props/PageProps'


describe("表示", () => {
  function setup() {
    // 実行結果格納用
    const mockWindowWrapperInstance = new MockWindowWrapper();
    const stubTemplateSummariesRepository: StubTemplateSummariesRepository = new StubTemplateSummariesRepository();
    const mockRouterWrapper = new MockRouterWrapper();
    const repositoryFactory = new RepositoryFactory(stubTemplateSummariesRepository);

    const pageProps = new PageProps(mockWindowWrapperInstance, repositoryFactory,mockRouterWrapper)

    // モック化したWindowWrapperを、propsとして渡す
    let props: PropsInterface = {
      pageProps: pageProps,
    };

    return {
      props,
      mockWindowWrapperInstance,
      stubTemplateSummariesRepository,
      mockRouterWrapper,
    };
  }
  describe("ヘッダー", () => {
    it("ヘッダーコンポーネントの表示確認", async () => {

      // * Arrange
      const { props } = setup();

      // * Act
      const wrapper = await mount(Top, { props }); 

      // * Assert
      expect(wrapper.find("header").exists()).toBe(true);
    });
  });

  describe("メイン", () => {
    it("メイン領域が表示されている", async () => {

      // * Arrange
      const { props } = setup();

      // * Act
      const wrapper = mount(Top, { props });

      // * Assert
      expect(wrapper.find("main").exists()).toBe(true);
    });

    it("テンプレート一覧に含まれているDocsサマリーの一覧が表示される", async () => {

      // * Arrange
      const { props, stubTemplateSummariesRepository } = setup();

      const templateSummaries: TemplateSummary[] = structuredClone(templateSummariesA);
      stubTemplateSummariesRepository.getAll_returnValue = templateSummaries;

      // * Act
      const wrapper = mount(Top, { props });

      // * Assert
      await wrapper.vm.$nextTick();
      await wrapper.vm.$nextTick();
      expect(wrapper.find('main div[id="template-summaries"]').html()).toContain("Empty Docs");
      expect(wrapper.find('main div[id="template-summaries"]').html()).toContain("Docs２");
      expect(wrapper.find('main div[id="template-summaries"]').html()).toContain("Docs３");
      expect(wrapper.find('main div[id="template-summaries"]').html()).toContain("Docs４");
      expect(wrapper.find('main div[id="template-summaries"]').html()).toContain("Docs５");
    });

    it("テンプレートに解説が表示されている", async () => {

      // * Arrange
      const { props, stubTemplateSummariesRepository } = setup();
      const templateSummaries: TemplateSummary[] = structuredClone(templateSummariesA);
      stubTemplateSummariesRepository.getAll_returnValue = templateSummaries;

      // * Act
      const wrapper = mount(Top, { props });

      // * Assert
      await wrapper.vm.$nextTick();
      await wrapper.vm.$nextTick();
      expect(wrapper.find('main div[id="template-summaries"]').html()).toContain("説明１");
      expect(wrapper.find('main div[id="template-summaries"]').html()).toContain("説明２");
      expect(wrapper.find('main div[id="template-summaries"]').html()).toContain("説明３");
      expect(wrapper.find('main div[id="template-summaries"]').html()).toContain("説明４");
      expect(wrapper.find('main div[id="template-summaries"]').html()).toContain("説明５");
    });

    it("テンプレートにタグが表示されている", async () => {

      // * Arrange
      const { props, stubTemplateSummariesRepository } = setup();
      const templateSummaries: TemplateSummary[] = structuredClone(templateSummariesA);
      stubTemplateSummariesRepository.getAll_returnValue = templateSummaries;

      // * Act
      const wrapper:VueWrapper = mount(Top, { props });

      // * Assert
      await wrapper.vm.$nextTick();
      await wrapper.vm.$nextTick();
      expect(wrapper.find('main div[id="template-summaries"]').html()).toContain("タグ１.１");
      expect(wrapper.find('main div[id="template-summaries"]').html()).toContain("タグ１.２");
      expect(wrapper.find('main div[id="template-summaries"]').html()).toContain("タグ２.１");
      expect(wrapper.find('main div[id="template-summaries"]').html()).toContain("タグ２.２");
      expect(wrapper.find('main div[id="template-summaries"]').html()).toContain("タグ３.１");
      expect(wrapper.find('main div[id="template-summaries"]').html()).toContain("タグ３.２");
      expect(wrapper.find('main div[id="template-summaries"]').html()).toContain("タグ４.１");
      expect(wrapper.find('main div[id="template-summaries"]').html()).toContain("タグ４.２");
      expect(wrapper.find('main div[id="template-summaries"]').html()).toContain("タグ５.１");
      expect(wrapper.find('main div[id="template-summaries"]').html()).toContain("タグ５.２");
    });

    it("テンプレートサマリーをクリックすると遷移先パス(/editor)とURLパラメータ(?templete=<id>)を渡す", async () => {

      // * Arrange
      const { props, mockRouterWrapper, stubTemplateSummariesRepository } = setup();

      const templateSummaries: TemplateSummary[] = structuredClone(templateSummariesA);
      stubTemplateSummariesRepository.getAll_returnValue = templateSummaries;

      // 初期画面表示 
      let wrapper:VueWrapper = mount(Top, { props });
      await wrapper.vm.$nextTick();
      await wrapper.vm.$nextTick();

      // * Act
      await wrapper.find('[id="template-summaries"]').findAll("a")[0].trigger("click");

      // * Assert
      expect(mockRouterWrapper.calledToEditorPage).toBe(true);
      expect(mockRouterWrapper.toEditorPage_actualTemplate).toEqual("279f24d3-3a27-4376-8ced-9dd9398adc86");

    });
  });
});
