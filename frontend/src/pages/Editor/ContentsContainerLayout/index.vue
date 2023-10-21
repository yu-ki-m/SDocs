<script setup lang="ts"></script>

<template>
    <div :class="style.contentsContainer">
        <div :class="style.contentsEditor">
            <slot name="default"></slot>
        </div>
    </div>
</template>

<style module="style">
.contentsContainer {
    display: flex;
    justify-content: center;
}
.contentsEditor {
    display: flex;
    flex-direction: column;
    width: 66rem;
    padding-top: 3rem;
}
</style>
