<script setup lang="ts">
import { RepositoryFactory, RepositoryFactoryInterface } from './components/page-props/RepositoryFactory'
import {
    TemplateSummariesRepository,
    TemplateSummariesRepositoryInterface
} from './components/sdocs/TemplateSummary.Repository'
import {
    TemplateContentsRepository,
    TemplateContentsRepositoryInterface
} from './components/sdocs/TemplateContents.Repository'
import { WindowWrapper } from './components/page-props/WindowWrapper'
import { RouterWrapper, RouterWrapperInterface } from './components/page-props/RouterWrapper'
import { PageProps, PagePropsInterface } from './components/page-props/PageProps'
import HttpClient, { HttpInterface } from './components/http/HttpClient/index'
import axios from 'axios'
import Env from './components/EnvMananger'
import { getHttpConfig } from './http.config'

const windowWrapper = new WindowWrapper()
const env = new Env(import.meta.env)
const axiosObject = axios.create(getHttpConfig(env))
const httpClient: HttpInterface = new HttpClient(axiosObject)

const templateSummariesRepository: TemplateSummariesRepositoryInterface = new TemplateSummariesRepository(httpClient)
const templateContentsRepository: TemplateContentsRepositoryInterface = new TemplateContentsRepository(httpClient)
const repositoryFactory: RepositoryFactoryInterface = new RepositoryFactory(
    templateSummariesRepository,
    templateContentsRepository
)
const routerWrapper: RouterWrapperInterface = new RouterWrapper()

const pageProps: PagePropsInterface = new PageProps(windowWrapper, repositoryFactory, routerWrapper)
</script>

<template>
    <div :class="style.main">
        <router-view :page-props="pageProps" />
    </div>
</template>

<style module="style">
.main {
    display: flex;
    flex-flow: column;
    min-height: 100vh;
    background-color: var(--primary-navy-white-900);
}
</style>
