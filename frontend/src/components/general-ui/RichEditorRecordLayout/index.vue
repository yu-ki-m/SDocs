<script setup lang="ts"></script>

<template>
    <div :class="style.richEditorRecord">
        <slot name="default"></slot>
        <slot name="button"></slot>
    </div>
</template>

<style module="style">
.richEditorRecord {
    display: flex;
}
.richEditorRecord > button {
    width: 1rem;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
}
.richEditorRecord:hover > button {
    opacity: 1;
}
</style>
