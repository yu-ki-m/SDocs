/**
 * @vitest-environment jsdom
 */
import Editor, { PropsInterface } from './index.vue'
import { describe, it, expect, vi, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { StubTemplateSummariesRepository } from '../../components/sdocs/TemplateSummary.Repository/StubTemplateSummaryRepository'
import { StubTemplateContentsRepository } from '../../components/sdocs/TemplateContents.Repository/StubTemplateContentsRepository'
import { TemplateContents, TemplateContentsInterface } from '../../components/sdocs/TemplateContents'

import { MockRouterWrapper } from '../../components/page-props/RouterWrapper/MockRouterWrapper'
import { MockWindowWrapper } from '../../components/page-props/WindowWrapper/MockWindowWrapper'
import { RepositoryFactory } from '../../components/page-props/RepositoryFactory'
import { PageProps } from '../../components/page-props/PageProps'
import QuillEditor from '../../components/general-ui/RichEditor/QuillEditor/index.vue'
import { TemplateSummary, TemplateSummaryInterface } from '../../components/sdocs/TemplateSummary'

describe('コンポーネント', () => {
    afterEach(() => {
        vi.restoreAllMocks()
    })

    const setup = () => {
        // 実行結果格納用
        const mockWindowWrapperInstance = new MockWindowWrapper()
        const stubTemplateSummariesRepository: StubTemplateSummariesRepository = new StubTemplateSummariesRepository()
        const stubTemplateContentsRepository: StubTemplateContentsRepository = new StubTemplateContentsRepository()
        const mockRouterWrapper = new MockRouterWrapper()
        const repositoryFactory = new RepositoryFactory(stubTemplateSummariesRepository, stubTemplateContentsRepository)

        const pageProps = new PageProps(mockWindowWrapperInstance, repositoryFactory, mockRouterWrapper)

        // モック化したWindowWrapperを、propsとして渡す
        const props: PropsInterface = {
            pageProps: pageProps
        }

        return {
            props,
            mockWindowWrapperInstance,
            stubTemplateSummariesRepository,
            stubTemplateContentsRepository,
            mockRouterWrapper
        }
    }

    const setupForMount = (
        stubTemplateSummariesRepository: StubTemplateSummariesRepository,
        stubTemplateContentsRepository: StubTemplateContentsRepository,
        mockRouterWrapper: MockRouterWrapper
    ) => {
        mockRouterWrapper.getQuery_returnValue = { template: 'templateSummaryId-1-searchKey' }
        const expectTemplateSummary: TemplateSummaryInterface = new TemplateSummary(
            'templateSummaryId-1',
            'templateSummaryViewName-1',
            'templateSummaryDescribe-1',
            [{ tagViewName: 'TagViewName-1' }]
        )
        stubTemplateSummariesRepository.get_returnValue = expectTemplateSummary

        const expectTemplateContentsList: TemplateContentsInterface[] = [
            new TemplateContents('templateSummaryId-1', 'templateContentsId-1', 1, 'quill', 'templateContents-1'),
            new TemplateContents('templateSummaryId-1', 'templateContentsId-2', 2, 'quill', 'templateContents-2')
        ]
        stubTemplateContentsRepository.get_returnValue = expectTemplateContentsList
    }

    describe('メイン', () => {
        afterEach(() => {
            vi.restoreAllMocks()
        })
        it.concurrent('repositoryから渡された初期基本情報が画面に表示されていること', async () => {
            // * Arrange
            const { props, stubTemplateSummariesRepository, stubTemplateContentsRepository, mockRouterWrapper } =
                setup()
            setupForMount(stubTemplateSummariesRepository, stubTemplateContentsRepository, mockRouterWrapper)

            // * Act
            const wrapper = mount(Editor, { props })
            await new Promise((resolve) => setTimeout(resolve, 1000))

            // * Assert
            expect(stubTemplateSummariesRepository.get_actualId).toBe('templateSummaryId-1-searchKey')
            expect((wrapper.find('main label>input[id="editor_docs-name"]').element as HTMLInputElement).value).toBe(
                'templateSummaryViewName-1'
            )
            expect((wrapper.find('main label>input[id="editor_docs-version"]').element as HTMLInputElement).value).toBe(
                '1.00'
            )
            expect((wrapper.find('main label>input[id="editor_docs-id"]').element as HTMLInputElement).value).toBe(
                'templateSummaryId-1'
            )
        })

        it.concurrent('repositoryから渡された初期コンテンツが画面に表示されていること', async () => {
            // * Arrange
            const { props, stubTemplateSummariesRepository, stubTemplateContentsRepository, mockRouterWrapper } =
                setup()
            setupForMount(stubTemplateSummariesRepository, stubTemplateContentsRepository, mockRouterWrapper)

            // * Act
            const wrapper = mount(Editor, { props })
            await new Promise((resolve) => setTimeout(resolve, 1000))

            // * Assert
            expect(wrapper.html()).toContain('templateContents-1')
            expect(wrapper.html()).toContain('templateContents-2')
        })

        it.concurrent('リッチエディタが表示されていること', async () => {
            // * Arrange
            const { props, stubTemplateSummariesRepository, stubTemplateContentsRepository, mockRouterWrapper } =
                setup()
            setupForMount(stubTemplateSummariesRepository, stubTemplateContentsRepository, mockRouterWrapper)

            // * Act
            const wrapper = mount(Editor, { props })
            await new Promise((resolve) => setTimeout(resolve, 1000))

            // * Assert
            expect(wrapper.find('[data-gid="f492fcdd-5fbd-4cde-9f8f-624c7fc8a57d"]').exists()).toBe(true)
        })

        it.concurrent(
            'QuillEditorのemit(input)で渡した値が、EditorのtemplateContentsStateに反映されていること',
            async () => {
                // * Arrange
                const { props, stubTemplateSummariesRepository, stubTemplateContentsRepository, mockRouterWrapper } =
                    setup()
                setupForMount(stubTemplateSummariesRepository, stubTemplateContentsRepository, mockRouterWrapper)
                const wrapper = mount(Editor, { props })
                await new Promise((resolve) => setTimeout(resolve, 1000))

                // * Act
                // QuillEditorのemit(input)を発火
                wrapper.findAllComponents(QuillEditor).at(0)?.vm.$emit('input', 'quillEditorEmitTestValue')
                await new Promise((resolve) => setTimeout(resolve, 1000))

                // * Assert
                // inputを発火したQuillEditorの値が、Editorのdataに反映されていること
                // eslint-disable-next-line
                // @ts-ignore vueではtemplateContentsが存在するが、typescriptでは存在しないことになっている
                expect(wrapper.vm.templateContentsState.contents.at(0).content).toContain('quillEditorEmitTestValue')
            }
        )

        it.concurrent('Add Rich Textボタンが表示されていること', async () => {
            // * Arrange
            const { props, stubTemplateSummariesRepository, stubTemplateContentsRepository, mockRouterWrapper } =
                setup()
            setupForMount(stubTemplateSummariesRepository, stubTemplateContentsRepository, mockRouterWrapper)

            // * Act
            const wrapper = mount(Editor, { props })
            await new Promise((resolve) => setTimeout(resolve, 1000))

            // * Assert
            expect(wrapper.find('button[id="add-rich-editor"]').html()).toContain('Add Rich Text')
        })
        it.concurrent('Add Rich Textボタンをクリックすると、エディタが増えること', async () => {
            // * Arrange
            const { props, stubTemplateSummariesRepository, stubTemplateContentsRepository, mockRouterWrapper } =
                setup()
            setupForMount(stubTemplateSummariesRepository, stubTemplateContentsRepository, mockRouterWrapper)
            const wrapper = mount(Editor, { props })

            const defaultEditorCount: number = wrapper.findAll(
                'div[data-gid="721126e3-b797-4bbd-a86f-8a3b725ed24e"]'
            ).length

            // * Act
            await wrapper.find('button[id="add-rich-editor"]').trigger('click')
            await new Promise((resolve) => setTimeout(resolve, 1000))
            // * Assert
            const clickedEditorCount: number = wrapper.findAll(
                'div[data-gid="721126e3-b797-4bbd-a86f-8a3b725ed24e"]'
            ).length

            expect(clickedEditorCount - defaultEditorCount).toBe(1)
        })
        it.concurrent('リッチエディタを削除ボタンが表示されていること', async () => {
            // * Arrange
            const { props, stubTemplateSummariesRepository, stubTemplateContentsRepository, mockRouterWrapper } =
                setup()
            setupForMount(stubTemplateSummariesRepository, stubTemplateContentsRepository, mockRouterWrapper)

            // * Act
            const wrapper = mount(Editor, { props })
            await new Promise((resolve) => setTimeout(resolve, 1000))

            // * Assert
            expect(wrapper.find('button[data-gid="258bf263-baf8-4437-a9b7-9cbbbd9a8397"]').html()).toContain('×')
        })
        it('リッチエディタの削除ボタンをクリックすると、エディタが減ること', async () => {
            // * Arrange
            const { props, stubTemplateSummariesRepository, stubTemplateContentsRepository, mockRouterWrapper } =
                setup()
            setupForMount(stubTemplateSummariesRepository, stubTemplateContentsRepository, mockRouterWrapper)
            const wrapper = mount(Editor, { props })
            await new Promise((resolve) => setTimeout(resolve, 1000))

            await wrapper.find('button[id="add-rich-editor"]').trigger('click') // 実行前に減らすためのエディタを追加
            await new Promise((resolve) => setTimeout(resolve, 1000))

            const defaultEditorCount: number = wrapper.findAll(
                'div[data-gid="721126e3-b797-4bbd-a86f-8a3b725ed24e"]'
            ).length
            const addedIndex = defaultEditorCount - 1

            // * Act
            ;[...wrapper.findAll('button[data-gid="258bf263-baf8-4437-a9b7-9cbbbd9a8397"]')]
                .at(addedIndex)
                ?.trigger('click')

            // * Assert
            await new Promise((resolve) => setTimeout(resolve, 1000))
            const clickedEditorCount: number = wrapper.findAll(
                'div[data-gid="721126e3-b797-4bbd-a86f-8a3b725ed24e"]'
            ).length

            expect(clickedEditorCount).toBe(2)
            expect(defaultEditorCount).toBe(3)
            expect(clickedEditorCount - defaultEditorCount).toBe(-1)
        })

        it.concurrent('Add Nest Tableが表示されていること', async () => {
            // * Arrange
            const { props, stubTemplateSummariesRepository, stubTemplateContentsRepository, mockRouterWrapper } =
                setup()
            setupForMount(stubTemplateSummariesRepository, stubTemplateContentsRepository, mockRouterWrapper)

            // * Act
            const wrapper = mount(Editor, { props })
            await new Promise((resolve) => setTimeout(resolve, 1000))

            // * Assert
            expect(wrapper.find('button[id="add-nest-table"]').html()).toContain('Add Nest Table')
        })
        it.concurrent('Add Nest Tableボタンをクリックすると、Nest Tableが増えること', async () => {
            // * Arrange
            const { props, stubTemplateSummariesRepository, stubTemplateContentsRepository, mockRouterWrapper } =
                setup()
            setupForMount(stubTemplateSummariesRepository, stubTemplateContentsRepository, mockRouterWrapper)
            const wrapper = mount(Editor, { props })
            await new Promise((resolve) => setTimeout(resolve, 1000))
            const defaultEditorCount: number = wrapper.findAll(
                'div[data-gid="318c638b-54a2-4698-88cc-f577cacbc355"]'
            ).length

            // * Act
            await wrapper.find('button[id="add-nest-table"]').trigger('click')

            // * Assert
            await new Promise((resolve) => setTimeout(resolve, 1000))
            const clickedEditorCount: number = wrapper.findAll(
                'div[data-gid="318c638b-54a2-4698-88cc-f577cacbc355"]'
            ).length
            expect(clickedEditorCount - defaultEditorCount).toBe(1)
        })
        it.concurrent('Nest Tableの削除ボタンをクリックすると、Nest Tableが減ること', async () => {
            // * Arrange
            const { props, stubTemplateSummariesRepository, stubTemplateContentsRepository, mockRouterWrapper } =
                setup()
            setupForMount(stubTemplateSummariesRepository, stubTemplateContentsRepository, mockRouterWrapper)
            const wrapper = mount(Editor, { props })
            await new Promise((resolve) => setTimeout(resolve, 1000))

            await wrapper.find('button[id="add-nest-table"]').trigger('click')
            const defaultEditorCount: number = wrapper.findAll(
                'div[data-gid="318c638b-54a2-4698-88cc-f577cacbc355"]'
            ).length

            // * Act
            await wrapper.find('button[data-gid="341952cb-58ad-4da8-a628-e06bbbd0a133"]').trigger('click')
            await new Promise((resolve) => setTimeout(resolve, 1000))

            // * Assert
            const clickedEditorCount: number = wrapper.findAll(
                'div[data-gid="318c638b-54a2-4698-88cc-f577cacbc355"]'
            ).length
            expect(clickedEditorCount - defaultEditorCount).toBe(-1)
        })

        // TODO: Nest Table関連のメソッドの処理呼び出しのテストを追加すること
    })
})
