<script setup lang="ts">
import exportButton from './exportHTMLButton.svg'
import Loading from './Loading/index.vue'
import { ref, Ref } from 'vue'

export interface PropsInterface {
    filename: string
    targetId: string
}

const props = defineProps<PropsInterface>()
const isLoading: Ref<boolean> = ref(false)

// TODO 整理が必要, テストも必要
import { DomToSvg } from './DomToSvg'

const fileDownload = (fileName: string, content: string, document: Document) => {
    let downLoadLink = document.createElement('a')
    downLoadLink.download = fileName
    downLoadLink.href = URL.createObjectURL(new Blob([content], { type: 'text.plain' }))
    downLoadLink.dataset.downloadurl = ['text/plain', downLoadLink.download, downLoadLink.href].join(':')
    downLoadLink.click()
}
const parseSvg = (filename: string, targetId: string) => {
    // TODO テストが必要
    isLoading.value = true
    setTimeout(() => {
        const svgString = DomToSvg.parse(document, targetId)
        const htmlString = `
        <!DOCTYPE html>
        <html lang="ja">
            <body style="display:flex;justify-content: center;">
                ${svgString}
            </body>
        </html>
        `
        fileDownload(`${filename === '' ? 'export' : filename}.html`, htmlString, document)
        isLoading.value = false
    }, 10)
}
</script>

<template>
    <button
        title="export html"
        style="color: var(--primary-white); display: flex"
        @click="parseSvg(props.filename, props.targetId)"
    >
        <img alt="export html" style="width: 1.4rem; height: 1.4rem" :src="exportButton" />
    </button>
    <Loading :top="10" :left="0" :is-loading="isLoading"></Loading>
</template>
