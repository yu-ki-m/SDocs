<script setup lang="ts">
import { Uuid } from '../../../../components/Uuid/index'
import exportButton from './updateIdIcon.svg'

const emits = defineEmits<(e: 'input', value: string) => void>()

const clickButton = () => {
    emits('input', new Uuid().getUniquId())
}
</script>

<template>
    <button :class="style.button" title="Update ID" @click="clickButton()">
        <img alt="Update ID" :class="style.buttonImage" :src="exportButton" />
    </button>
</template>
<style module="style">
.button {
    background-color: var(--primary-gray-300);
    display: flex;
    place-items: center;
    transition: background-color 0.2s ease-in-out;
}
.buttonImage {
    width: 1.4rem;
    height: 1.2rem;
}
</style>
```