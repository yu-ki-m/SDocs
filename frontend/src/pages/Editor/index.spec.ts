/**
 * @vitest-environment jsdom
 */

import Editor,{ PropsInterface } from "./index.vue";
import { describe, it, expect, vi,afterEach } from "vitest";
import { mount } from "@vue/test-utils";
import { StubTemplateSummariesRepository } from "../../components/TemplateSummary.Repository/StubTemplateSummariesRepository";

import { TemplateInterface, Template } from "../../components/Template.Entity";
import { MockRouterWrapper } from "../../components/page-props/RouterWrapper/MockRouterWrapper";
import { MockWindowWrapper } from "../../components/page-props/WindowWrapper/MockWindowWrapper";
import { RepositoryFactory } from "../../components/page-props/RepositoryFactory";
import { PageProps } from "../../components/page-props/PageProps";
import  QuillEditor from "../../components/general-ui/RichEditor/QuillEditor/index.vue"


describe("コンポーネント", () => {
  
    const setup = ()=>{
      // 実行結果格納用
      const mockWindowWrapperInstance = new MockWindowWrapper();
      const stubTemplateSummariesRepository: StubTemplateSummariesRepository = new StubTemplateSummariesRepository();
      const mockRouterWrapper = new MockRouterWrapper();
      const repositoryFactory = new RepositoryFactory(stubTemplateSummariesRepository);
      
      const pageProps = new PageProps(mockWindowWrapperInstance, repositoryFactory,mockRouterWrapper)

      // モック化したWindowWrapperを、propsとして渡す
      let props: PropsInterface = {
        pageProps: pageProps
      };
    
      return {
        props,
        mockWindowWrapperInstance,
        stubTemplateSummariesRepository,
        mockRouterWrapper,
      };
    }

    const setupForMount = (stubTemplateSummariesRepository:StubTemplateSummariesRepository,mockRouterWrapper:MockRouterWrapper)=>{
      mockRouterWrapper.getQuery_returnValue = {template: '任意のテンプレートID'};
      const expectEditDocsName: TemplateInterface =  new Template('任意のテンプレートID','任意のDocs','任意のVersion',"任意のタイムスタンプ","任意のID");
      stubTemplateSummariesRepository.get_returnValue = expectEditDocsName;
    }

    describe("メイン", () => {
        afterEach(() => {
          vi.restoreAllMocks()
        })
        it("repositoryから渡された初期基本情報が画面に表示されていること", async () => {
            
            // * Arrange
            const { props , stubTemplateSummariesRepository, mockRouterWrapper} = setup();
            
            mockRouterWrapper.getQuery_returnValue = {template: 'test-template-id'};
            const expectEditDocsName: TemplateInterface =  new Template('任意のID','TestのDocs','TestVersion',"","");
            stubTemplateSummariesRepository.get_returnValue = expectEditDocsName;

            // * Act
            const wrapper = mount(Editor, { props });   

            // * Assert
            await wrapper.vm.$nextTick();
            await wrapper.vm.$nextTick();
            expect(stubTemplateSummariesRepository.get_actualId).toBe("test-template-id");
            expect((wrapper.find('main label>input[id="editor_docs-name"]').element as HTMLInputElement).value).toBe("TestのDocs");
            expect((wrapper.find('main label>input[id="editor_docs-version"]').element as HTMLInputElement).value).toBe("TestVersion");
            expect((wrapper.find('main label>input[id="editor_docs-id"]').element as HTMLInputElement).value).toBe("");
        });

        it("リッチエディタが表示されていること", async () => {
            // * Arrange
            const { props , stubTemplateSummariesRepository, mockRouterWrapper} = setup();
            setupForMount(stubTemplateSummariesRepository,mockRouterWrapper);

            // * Act
            const wrapper = mount(Editor, { props }); 

            // * Assert
            expect(wrapper.find('[data-gid="f492fcdd-5fbd-4cde-9f8f-624c7fc8a57d"]').exists()).toBe(true);
        });

        it("QuillEditorのemit(input)で渡した値が、EditorのtemplateContentsに反映されていること", async () => {
            // * Arrange
            const { props , stubTemplateSummariesRepository, mockRouterWrapper} = setup();
            setupForMount(stubTemplateSummariesRepository,mockRouterWrapper);
            const wrapper = mount(Editor, { props });  
    
            // * Act
            // QuillEditorのemit(input)を発火
            wrapper.findAllComponents(QuillEditor).at(0)?.vm.$emit('input', 'quillEditorEmitTestValue');

            // * Assert
            // inputを発火したQuillEditorの値が、Editorのdataに反映されていること
            // @ts-ignore vueではtemplateContentsが存在するが、typescriptでは存在しないことになっている
            expect(wrapper.vm.templateContents.contents.at(0).content).toBe("quillEditorEmitTestValue");
        });

        it("Add Rich Textボタンが表示されていること", async () => {
            // * Arrange
            const { props , stubTemplateSummariesRepository, mockRouterWrapper} = setup();
            setupForMount(stubTemplateSummariesRepository,mockRouterWrapper);

            // * Act
            const wrapper = mount(Editor, { props });

            // * Assert
            expect(wrapper.find('button[id="add-rich-editor"]').html()).toContain('Add Rich Text');
        });
        it("Add Rich Textボタンをクリックすると、エディタが増えること", async () => {
            // * Arrange
            const { props , stubTemplateSummariesRepository, mockRouterWrapper} = setup();
            setupForMount(stubTemplateSummariesRepository,mockRouterWrapper);
            const wrapper = mount(Editor, { props });
            const defaultEditorCount:number = wrapper.findAll('div[data-gid="721126e3-b797-4bbd-a86f-8a3b725ed24e"]').length

            // * Act
            await wrapper.find('button[id="add-rich-editor"]').trigger('click');

            // * Assert
            const clickedEditorCount:number = wrapper.findAll('div[data-gid="721126e3-b797-4bbd-a86f-8a3b725ed24e"]').length
            expect(clickedEditorCount-defaultEditorCount).toBe(1);

        })
        it("リッチエディタを削除ボタンが表示されていること", async () => {
            // * Arrange
            const { props , stubTemplateSummariesRepository, mockRouterWrapper} = setup();
            setupForMount(stubTemplateSummariesRepository,mockRouterWrapper);

            // * Act
            const wrapper = mount(Editor, { props });

            // * Assert
            expect(wrapper.find('button[data-gid="258bf263-baf8-4437-a9b7-9cbbbd9a8397"]').html()).toContain('×');
        });
        it("リッチエディタを削除ボタンをクリックすると、エディタが減ること", async () => {
            // * Arrange
            const { props , stubTemplateSummariesRepository, mockRouterWrapper} = setup();
            setupForMount(stubTemplateSummariesRepository,mockRouterWrapper);
            const wrapper = mount(Editor, { props });
            await wrapper.find('button[id="add-rich-editor"]').trigger('click');// 実行前に減らすためのエディタを追加
            const defaultEditorCount:number = wrapper.findAll('div[data-gid="721126e3-b797-4bbd-a86f-8a3b725ed24e"]').length

            // * Act
            await wrapper.findAll('button[data-gid="258bf263-baf8-4437-a9b7-9cbbbd9a8397"]').at(0)?.trigger('click');
            
            // * Assert
            const clickedEditorCount:number = wrapper.findAll('div[data-gid="721126e3-b797-4bbd-a86f-8a3b725ed24e"]').length
            expect(clickedEditorCount-defaultEditorCount).toBe(-1);
        })

        it("Add Nest Tableが表示されていること", async () => {
            // * Arrange
            const { props , stubTemplateSummariesRepository, mockRouterWrapper} = setup();
            setupForMount(stubTemplateSummariesRepository,mockRouterWrapper);

            // * Act
            const wrapper = mount(Editor, { props });

            // * Assert
            expect(wrapper.find('button[id="add-nest-table"]').html()).toContain('Add Nest Table');
        });
        it("Add Nest Tableボタンをクリックすると、Nest Tableが増えること", async () => {
            // * Arrange
            const { props , stubTemplateSummariesRepository, mockRouterWrapper} = setup();
            setupForMount(stubTemplateSummariesRepository,mockRouterWrapper);
            const wrapper = mount(Editor, { props });
            const defaultEditorCount:number = wrapper.findAll('div[data-gid="318c638b-54a2-4698-88cc-f577cacbc355"]').length

            // * Act
            await wrapper.find('button[id="add-nest-table"]').trigger('click');

            // * Assert
            const clickedEditorCount:number = wrapper.findAll('div[data-gid="318c638b-54a2-4698-88cc-f577cacbc355"]').length
            expect(clickedEditorCount-defaultEditorCount).toBe(1);
        });
        it("Nest Tableの削除ボタンをクリックすると、Nest Tableが減ること", async () => {
            // * Arrange
            const { props , stubTemplateSummariesRepository, mockRouterWrapper} = setup();
            setupForMount(stubTemplateSummariesRepository,mockRouterWrapper);
            const wrapper = mount(Editor, { props });
            await wrapper.find('button[id="add-nest-table"]').trigger('click');
            const defaultEditorCount:number = wrapper.findAll('div[data-gid="318c638b-54a2-4698-88cc-f577cacbc355"]').length

            // * Act
            await wrapper.find('button[data-gid="341952cb-58ad-4da8-a628-e06bbbd0a133"]').trigger('click');

            // * Assert
            const clickedEditorCount:number = wrapper.findAll('div[data-gid="318c638b-54a2-4698-88cc-f577cacbc355"]').length
            expect(clickedEditorCount-defaultEditorCount).toBe(-1);
        });
        
        // TODO: Nest Table関連のメソッドの処理呼び出しのテストを追加すること

    });
});


