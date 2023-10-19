<script setup lang="ts"></script>

<template>
    <div :class="style.editorFrame">
        <slot name="default"></slot>
    </div>
</template>

<style module="style">
.editorFrame {
    display: flex;
    flex-direction: column;
    flex: 1;
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
