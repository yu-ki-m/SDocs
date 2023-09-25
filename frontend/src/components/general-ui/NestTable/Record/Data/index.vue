<script setup lang="ts">
export interface PropsInterface {
    dataLength: number
}
const props = defineProps<PropsInterface>()
</script>
<template>
    <!-- データ部 -->
    <div :class="style.data" :style="{ width: (props.dataLength != 0 ? 35 / props.dataLength : 0) + 'rem' }">
        <slot name="rowOptions"></slot>
        <slot name="default"></slot>
    </div>
    <div :class="style.dataBorder"></div>
</template>

<style module="style">
.data {
    display: flex;
    flex-direction: column;
    /* width:14rem; */
    border-top: 1px solid var(--primary-gray-700);
    padding-left: 0.3rem;
}

.dataBorder {
    width: 0px;
    border-left: 1px solid var(--primary-gray-700);
    background-color: var(--primary-gray-700);
}
.data:focus-within {
    box-shadow: inset 0 0 0.5rem var(--primary-gray-800);
}
</style>
