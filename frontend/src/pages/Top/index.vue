<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { TemplateSummary } from '../../components/sdocs/TemplateSummary'
import { PagePropsInterface } from '../../components/page-props/PageProps'

import MainLayout from '../../components/general-ui/MainLayout/index.vue'

/** コンポーネントのProps型定義 */
export interface PropsInterface {
    pageProps: PagePropsInterface
}
const props = defineProps<PropsInterface>()

/** テンプレートサマリの一覧 */
const templateSummaries = ref<TemplateSummary[]>([])

/** テンプレートサマリの一覧の初期化 */
onMounted(async () => {
    let templateSummariesResult: TemplateSummary[] = []
    templateSummariesResult = await props.pageProps.repositoryFactory.templateSummaryRepository.getAll()
    templateSummariesResult.forEach((templateSummary: TemplateSummary) => {
        templateSummaries.value.push(templateSummary)
    })
})

/** Editorページへ移動 */
const toEditorPage = (templateId: string) => {
    props.pageProps.routerWrapper.toEditorPage(templateId)
}
</script>

<template>
    <MainLayout :router-wrapper="pageProps.routerWrapper" :window-wrapper="pageProps.windowWrapper">
        <template #default>
            <main id="top-page" :class="style.main">
                <div id="template-summaries" :class="style.templateSummaries">
                    <div
                        v-for="templateSummary in templateSummaries"
                        :key="templateSummary.templateId"
                        :class="style.templateSummary"
                    >
                        <a
                            @click="
                                () => {
                                    toEditorPage(templateSummary.templateId)
                                }
                            "
                        >
                            <div :class="style.templateTitle">{{ templateSummary.viewName }}</div>
                            <div :class="style.templateDescribe">{{ templateSummary.describe }}</div>
                            <div :class="style.templateTags">
                                <div
                                    v-for="tag in templateSummary.tags"
                                    :key="tag.tagViewName"
                                    :class="style.templateTag"
                                >
                                    {{ tag.tagViewName }}
                                </div>
                            </div>
                        </a>
                    </div>
                </div>
            </main>
        </template>
    </MainLayout>
</template>

<style module="style">
.main {
    display: flex;
    min-height: calc(100vh - var(--header-height));
    width: 100%;
}
.templateSummaries {
    --padding-top: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: var(--padding-top);
    min-height: calc(100% - var(--padding-top));
    width: 100%;
    gap: 1rem;
}
.templateSummary {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    color: var(--primary-gray-400);
    width: 50%;
    min-height: 8rem;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: box-shadow 0.5s;
    box-shadow: 0rem 0rem 0.3rem 0rem var(--primary-gray-700);
}
.templateSummary:hover {
    box-shadow: 0rem 0rem 1rem 0rem var(--primary-gray-700);
}
.templateTitle {
    font-size: 1rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
}
.templateDescribe {
    font-size: 1rem;
    display: flex;
    padding-left: 1rem;
    margin-bottom: 0.5rem;
    min-height: 4rem;
}
.templateTags {
    display: flex;
    font-size: 0.8rem;
    padding-left: 1rem;
    align-items: flex-end;
}
.templateTag {
    border: solid 1px var(--primary-gray-600);
    padding: 0.1rem 0.2rem;
    margin-right: 0.5rem;
    transition: background-color 0.5s;
}
</style>
