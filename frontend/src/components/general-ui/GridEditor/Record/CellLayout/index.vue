<script setup lang="ts">
export interface PropsInterface {
    recordIndex: number
}
const props = defineProps<PropsInterface>()
</script>
<template>
    <div :class="style.cell">
        <template v-if="props.recordIndex == 0">
            <slot name="rowOptions"></slot>
        </template>
        <slot name="default"></slot>
    </div>
</template>

<style module="style">
.cell {
    display: flex;
    flex-direction: column;
    width: 100%;
    transition: box-shadow 0.2s ease-in-out;
}
.cell:hover {
    box-shadow: inset 0 0 0.5rem var(--primary-gray-800);
}

.cell:focus-within {
    box-shadow: inset 0 0 0.5rem var(--primary-gray-800);
}
</style>
