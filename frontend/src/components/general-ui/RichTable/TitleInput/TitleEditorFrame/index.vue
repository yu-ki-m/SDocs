<script setup lang="ts"></script>

<template>
    <caption :class="style.editorFrame">
        <slot name="default"></slot>
    </caption>
</template>

<style module="style">
.editorFrame {
    background-color: var(--primary-navy-white-900);
    transition: box-shadow 0.3s ease-in-out;
    padding-left: 0.2rem;
    border-radius: 0.3rem;
}
.editorFrame:focus-within {
    box-shadow: inset 0 0 0.5rem var(--primary-gray-800);
}
.editorFrame:hover {
    box-shadow: inset 0 0 0.5rem var(--primary-gray-800);
}
</style>
