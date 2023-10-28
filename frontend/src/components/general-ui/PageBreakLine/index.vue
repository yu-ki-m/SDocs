<script setup lang="ts">


</script>

<template>
    <div :class="style.pageBreakLineArea">
        <div :class="style.pageBreakLine"></div>
    </div>
</template>

<style module="style">
.pageBreakLineArea {
    height: 1.5rem;
    width: 100%;
    display: flex;
    align-items: center;
}
.pageBreakLineArea {
    break-before: page;
}
@media print {
    .pageBreakLineArea {
        opacity: 0;
    }
}
.pageBreakLine {
    width: 99%;
    height: 1px;
    border-top: 0.0875rem dashed var(--primary-gray-900);
}
</style>
