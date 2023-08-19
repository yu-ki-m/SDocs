<script setup lang="ts">
export interface PropsInterface {
    isHeader?: boolean
}
const props = defineProps<PropsInterface>()
</script>
<template>
    <div :class="style.recordContainer">
        <div :class="style.record">
            <slot name="options"></slot>
            <div :class="[style.cells, props.isHeader ? style.isHeader : '']">
                <slot name="indent"></slot>
                <slot name="default"></slot>
            </div>
        </div>
    </div>
</template>

<style module="style">
.recordContainer {
    display: flex;
    width: 100%;
}
.record {
    display: flex;
    flex-direction: row;
    width: 100%;
}
.cells {
    display: flex;
    flex-direction: row;
    width: 100%;
}
.isHeader {
    background-color: var(--primary-gray-850);
    print-color-adjust: exact;
    -webkit-print-color-adjust: exact;
}
</style>
