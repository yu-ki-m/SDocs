<script setup lang="ts">
import { DocsBaseInfoInterface } from './EmitTypes'
import UpdateIdButton from './UpdateIdButton/index.vue'
/**
 * コンポーネントのProps型定義
 */
export interface PropsInterface {
    docsName: string
    docsVersion: string
    docsId: string
}
const props = defineProps<PropsInterface>()

const emits = defineEmits<{ (e: 'input', value: DocsBaseInfoInterface): void }>()

const inputUpdateDocsName = (event: Event) => {
    let docsNameTmp = (event.target as HTMLInputElement).value
    let docsBaseInfoTmp: DocsBaseInfoInterface = { ...props }
    docsBaseInfoTmp.docsName = docsNameTmp
    emits('input', docsBaseInfoTmp)
}

const inputUpdateDocsVersion = (event: Event) => {
    let docsVersionTmp = (event.target as HTMLInputElement).value
    let docsBaseInfoTmp: DocsBaseInfoInterface = { ...props }
    docsBaseInfoTmp.docsVersion = docsVersionTmp
    emits('input', docsBaseInfoTmp)
}
const inputUpdateDocsId = (event: Event) => {
    let docsIdTmp = (event.target as HTMLInputElement).value
    let docsBaseInfoTmp: DocsBaseInfoInterface = { ...props }
    docsBaseInfoTmp.docsId = docsIdTmp
    emits('input', docsBaseInfoTmp)
}

const inputUpdateDocsIdButton = (docsIdTmp: string) => {
    let docsBaseInfoTmp: DocsBaseInfoInterface = { ...props }
    docsBaseInfoTmp.docsId = docsIdTmp
    emits('input', docsBaseInfoTmp)
}
</script>

<template>
    <div :class="style.baseInfoFrame">
        <div :class="style.baseInfo">
            <label>
                <input
                    id="editor_docs-name"
                    placeholder="docs name"
                    title="docs name"
                    :value="docsName"
                    @input="inputUpdateDocsName($event)"
                />
            </label>
            <label>
                <input
                    id="editor_docs-version"
                    placeholder="docs version"
                    title="docs version"
                    :value="docsVersion"
                    @input="inputUpdateDocsVersion($event)"
                />
            </label>
            <label>
                <UpdateIdButton
                    @input="
                        (docsIdTmp: string) => {
                            inputUpdateDocsIdButton(docsIdTmp)
                        }
                    "
                ></UpdateIdButton>
                <input
                    id="editor_docs-id"
                    placeholder="docs id"
                    title="docs id"
                    :value="docsId"
                    @input="inputUpdateDocsId($event)"
                />
            </label>
        </div>
    </div>
</template>

<style module="style">
.baseInfoFrame {
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 1rem;
}
.baseInfo {
    position: fixed;
    width: 100vw;

    display: flex;
    flex-direction: row;
    background-color: var(--primary-gray-900);
    flex: 1;
    z-index: 10;
}

.baseInfo > label {
    --border-width: 1px;
    display: flex;
    border: solid var(--border-width) var(--primary-gray-400);
}
.baseInfo > label > input {
    display: flex;
    background-color: var(--primary-gray-300);
    outline: none;
    padding: 0 0.5rem;
    margin: 0;
    color: var(--primary-gray-800);
    min-width: 1rem;
}

.baseInfo > label:nth-child(1) {
    display: flex;
    flex: 3;
    min-width: 1rem;
}
.baseInfo > label:nth-child(2) {
    display: flex;
    flex: 1;
    max-width: 7rem;
    min-width: 1rem;
}
.baseInfo > label:nth-child(3) {
    display: flex;
    flex: 2;
    min-width: 1rem;
}

.baseInfo > label > input {
    display: flex;
    flex: 1;
}

@media print {
    .baseInfoFrame {
        display: none;
    }
}
</style>
