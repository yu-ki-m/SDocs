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
    border-right: solid 1px rgba(0, 0, 0, 0);
}

.cell:hover {
    box-shadow: inset 0 0 0.5rem var(--primary-gray-800);
}

.cell:focus-within {
    box-shadow: inset 0 0 0.5rem var(--primary-gray-800);
}

/* 他の親コンポーネントに影響を及ぼすので暫定 */
div:hover > div > div > div:has(> .cell) .cell:last-child {
    border-right: solid 0px rgba(0, 0, 0, 0);
}
div:hover > div > div > div:has(> .cell) .cell {
    border-right: solid 1px var(--primary-gray-800);
}
div:focus-within > div > div > div:has(> .cell) .cell:last-child {
    border-right: solid 0px rgba(0, 0, 0, 0);
}
div:focus-within > div > div > div:has(> .cell) .cell {
    border-right: solid 1px var(--primary-gray-800);
}
</style>
