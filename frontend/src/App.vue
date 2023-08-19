<script setup lang="ts">

import { RepositoryFactory, RepositoryFactoryInterface } from "./components/page-props/RepositoryFactory";
import { TemplateSummariesRepository, TemplateSummariesRepositoryInterface } from "./components/TemplateSummary.Repository";
import { WindowWrapper } from "./components/page-props/WindowWrapper"
import { RouterWrapper, RouterWrapperInterface } from './components/page-props/RouterWrapper'
import { PageProps ,PagePropsInterface} from "./components/page-props/PageProps";
import  HttpClient, { HttpInterface } from './components/http/HttpClient/index'
import axios from 'axios'
import Env, { ENV_KEY } from './lib/EnvMananger'


const windowWrapper = new WindowWrapper();
const env = new Env(import.meta.env);

const axiosObject =  axios.create({
  baseURL: env.get(ENV_KEY.VITE_SERVER_BASE_URL),
  headers: {"Content-type": "application/json",},
});

const httpClient:HttpInterface = new HttpClient(axiosObject);

const templateSummariesRepository:TemplateSummariesRepositoryInterface =  new TemplateSummariesRepository(httpClient)
const repositoryFactory:RepositoryFactoryInterface = new RepositoryFactory(templateSummariesRepository);
const routerWrapper:RouterWrapperInterface = new RouterWrapper();

const pageProps:PagePropsInterface = new PageProps(windowWrapper,repositoryFactory,routerWrapper);

</script>

<template>
  <div :class="style.main">
    <router-view :pageProps="pageProps"/>
  </div>
</template>

<style module="style">
.main {
    display:flex;
    flex-flow: column;
}
</style>
