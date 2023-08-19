<script setup lang="ts">
import logo from './../../../assets/logo.svg'
import newTab from './../../../assets/newTab.svg'
import { WindowWrapperInterface } from '../../page-props/WindowWrapper'
import { RouterWrapperInterface } from '../../page-props/RouterWrapper'

export interface PropsInterface {
    routerWrapper: RouterWrapperInterface
    windowWrapper: WindowWrapperInterface
}

const props = defineProps<PropsInterface>()
</script>

<template>
    <header :class="style.headerContainer">
        <div :class="style.header">
            <div :class="style.headerLeft">
                <a
                    id="header_top-icon"
                    @click="
                        (event) => {
                            props.routerWrapper.toTopPage()
                        }
                    "
                >
                    <img name="toTop" :class="style.logo" :src="logo" alt="Top" />
                </a>
                <div :class="style.logoCharacters">SDocs</div>
            </div>
            <div :class="style.headerRight">
                <a
                    id="header_top-new-tab"
                    @click="
                        (event) => {
                            props.windowWrapper.toTopNewTab()
                        }
                    "
                >
                    <img name="toTopNewTab" title="新しいタブで開く" :class="style.newTab" :src="newTab" alt="newTab" />
                </a>
            </div>
            <div style="color: white"></div>
        </div>
    </header>
    <slot name="default"></slot>
</template>

<style module="style">
.headerContainer {
    height: 4rem; /* ヘッダー横幅Fit */
}
.header {
    position: fixed; /* ヘッダー横幅Fit */
    height: 4rem;
    padding-right: 1rem;
    width: 100vw;
    display: grid;
    grid-template:
        'header-left    header-center   header-right' auto
        / 30vw auto 30vw;
    background-color: var(--primary-gray-100);
    align-items: center;
    z-index: 100;
}
.headerLeft {
    grid-area: header-left;
    display: flex;
}
.headerRight {
    grid-area: header-right;
    display: flex;
    height: var(--header-height);
    justify-content: flex-end;
}

.newTab {
    width: 1.2rem;
    height: 1.2rem;
    cursor: pointer;
}
.logo {
    width: 3rem;
    height: 3rem;
    cursor: pointer;
}
.logoCharacters {
    display: flex;
    color: var(--primary-gray-800);
    align-items: center;
    padding: 0 0.5rem;
}

@media print {
    .headerContainer {
        display: none;
    }
}
</style>
