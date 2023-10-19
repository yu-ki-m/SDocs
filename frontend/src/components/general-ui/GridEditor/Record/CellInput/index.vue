<script setup lang="ts">
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.bubble.css'

/** コンポーネントのProps型定義 */
export interface PropsInterface {
    value: string
    readonly: boolean
    daynamicId: string
}
const props = defineProps<PropsInterface>()

/** コンポーネントのEmit型定義 */
const emits = defineEmits<{ (e: 'input', value: string): void }>()
const inputValue = (value: string) => {
    if (value == undefined) {
        return
    }

    emits('input', value)
}

const costomToolbar = [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block', 'code'],
    [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
    [{ script: 'sub' }, { script: 'super' }],
    [{ indent: '-1' }, { indent: '+1' }],
    [{ direction: 'rtl' }],
    [{ size: ['small', false, 'large', 'huge'] }],
    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],
    ['link', 'video', 'image'],
    ['clean']
]
</script>

<template>
    <QuillEditor
        data-gid="6f279d0f-92eb-46ae-9cc9-7c6fc4c62b41"
        :daynamic-id="props.daynamicId"
        :read-only="props.readonly"
        :placeholder="''"
        :theme="'bubble'"
        :content="props.value"
        :content-type="'html'"
        :toolbar="costomToolbar"
        @update:content="inputValue"
    >
    </QuillEditor>
</template>

<style>
.ql-tooltip {
    min-width: 1100px !important;
}
.ql-editor > iframe.ql-video {
    min-height: 350px;
    height: auto;
    width: auto;
}
.ql-editor {
    min-height: 0px !important;
    padding-top: 0px !important;
    padding-bottom: 0px !important;
    padding-right: 0px !important;
    padding-left: 0px !important;
    word-break: break-all;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column; /* 子要素をflexboxにより縦方向に揃える */
    justify-content: center; /* 子要素をflexboxにより中央に配置する */
}
.ql-tooltip {
    z-index: 1;
}

.ql-tooltip-editor input::placeholder {
    color: #444;
}
.ql-container.ql-bubble:not(.ql-disabled) a {
    word-break: break-all;
    white-space: normal;
}
.ql-tooltip-editor::before {
    position: absolute;
    content: 'URL';
    transform: translateX(20px);
}

.ql-bubble .ql-toolbar button.ql-code {
    box-shadow: inset 0 0 10px 1px rgb(129, 129, 129);
    border-radius: 10%;
}

.ql-bubble .ql-tooltip {
    border-radius: 10px !important;
}

.ql-container.ql-bubble:not(.ql-disabled) a::before {
    display: none; /* リンクの吹き出しを消す */
}
.ql-container.ql-bubble:not(.ql-disabled) a::after {
    display: none; /* リンクの吹き出しを消す */
}

.ql-container a {
    pointer-events: pointer;
    cursor: pointer;
}
</style>
