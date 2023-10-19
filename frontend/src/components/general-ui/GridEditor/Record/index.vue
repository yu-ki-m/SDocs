<template>
    <div :class="style.recordContainer">
        <div :class="style.record">
            <slot name="options"></slot>
            <div :class="[style.cells]">
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
</style>
