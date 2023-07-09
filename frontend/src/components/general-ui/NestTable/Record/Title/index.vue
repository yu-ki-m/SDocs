<script setup lang="ts">
export interface PropsInterface{}
</script>

<template>
    <!-- タイトル部 -->
    <div :class="style.title" >
            <slot name="rowOptions"></slot>
             <slot name="default"></slot>
    </div>
    <div :class="style.titleBorder"></div>
</template>

<style module="style">

.title{
    display:flex; 
    flex:1;
    flex-direction: column; 
    width: auto; 
    border-top:1px solid var(--primary-gray-700); 
    border-left:1px solid var(--primary-gray-700);
    padding-left:0.3rem;
}
.titleBorder{
    width:0px;
    border-left:1px solid var(--primary-gray-700); 
    background-color: var(--primary-gray-700);
}
.title:focus-within{
    box-shadow: inset 0 0 0.5rem var(--primary-gray-800);
}

</style>