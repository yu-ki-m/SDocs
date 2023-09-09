<script setup lang="ts">
import exportButton from './exportJSONButton.svg'
export interface PropsInterface {
    filename: string
    data: string
}

const props = defineProps<PropsInterface>()

// TODO 整理が必要, テストも必要

const fileDownload = (fileName: string, content: string, document: Document) => {
    let downLoadLink = document.createElement('a')
    downLoadLink.download = fileName
    downLoadLink.href = URL.createObjectURL(new Blob([content], { type: 'text.plain' }))
    downLoadLink.dataset.downloadurl = ['text/plain', downLoadLink.download, downLoadLink.href].join(':')
    downLoadLink.click()
}
const exportJson = (filename: string, data: string) => {
    // TODO テストが必要
    setTimeout(() => {
        fileDownload(`${filename === '' ? 'export' : filename}.json`, data, document)
    }, 10)
}
</script>

<template>
    <button
        title="export json"
        style="color: var(--primary-white); display: flex"
        @click="exportJson(props.filename, props.data)"
    >
        <img alt="export json" style="width: 1.4rem; height: 1.4rem" :src="exportButton" />
    </button>
</template>
