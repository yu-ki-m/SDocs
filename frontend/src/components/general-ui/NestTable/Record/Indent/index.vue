<script setup lang="ts">
export interface PropsInterface {
    indent: number
}
const props = defineProps<PropsInterface>()
</script>
<template>
    <!-- インデント部 -->
    <div v-for="i in props.indent" :key="i" :class="style.indent"></div>
</template>

<style module="style">
.indent {
    width: 1rem;
    min-width: 1rem;
    margin: 0px;
    padding: 0px;
    border-left: 1px solid var(--primary-gray-700);
}
</style>
