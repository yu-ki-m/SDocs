<script setup lang="ts">
import { computed } from 'vue'

export interface PropsInterface {
    isLoading: boolean
    left: number
    top: number
}

const props = defineProps<PropsInterface>()

// 算出プロパティの参照
const styles = computed(() => {
    return {
        left: props.left,
        top: props.top
    }
})
</script>

<template>
    <transition name="loading-fade">
        <div v-if="props.isLoading">
            <div :class="[$style['overlay-area']]" :style="styles">
                <div class="loading-container">
                    <div class="loading"></div>
                    <div id="loading-text">generate html</div>
                </div>
            </div>
        </div>
    </transition>
</template>

<style module="$style">
.overlay-area {
    display: grid;
    position: absolute;
    height: 100vh;
    width: 100vw;
    background-color: rgba(59, 59, 59, 0.9);
    opacity: 1;
    z-index: 999;
    align-items: center;
    justify-items: center;
}
</style>
<style scoped>
@keyframes rotate-loading {
    0% {
        transform: rotate(0deg);
        -ms-transform: rotate(0deg);
        -webkit-transform: rotate(0deg);
        -o-transform: rotate(0deg);
        -moz-transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
        -ms-transform: rotate(360deg);
        -webkit-transform: rotate(360deg);
        -o-transform: rotate(360deg);
        -moz-transform: rotate(360deg);
    }
}

@-moz-keyframes rotate-loading {
    0% {
        transform: rotate(0deg);
        -ms-transform: rotate(0deg);
        -webkit-transform: rotate(0deg);
        -o-transform: rotate(0deg);
        -moz-transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
        -ms-transform: rotate(360deg);
        -webkit-transform: rotate(360deg);
        -o-transform: rotate(360deg);
        -moz-transform: rotate(360deg);
    }
}

@-webkit-keyframes rotate-loading {
    0% {
        transform: rotate(0deg);
        -ms-transform: rotate(0deg);
        -webkit-transform: rotate(0deg);
        -o-transform: rotate(0deg);
        -moz-transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
        -ms-transform: rotate(360deg);
        -webkit-transform: rotate(360deg);
        -o-transform: rotate(360deg);
        -moz-transform: rotate(360deg);
    }
}

@-o-keyframes rotate-loading {
    0% {
        transform: rotate(0deg);
        -ms-transform: rotate(0deg);
        -webkit-transform: rotate(0deg);
        -o-transform: rotate(0deg);
        -moz-transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
        -ms-transform: rotate(360deg);
        -webkit-transform: rotate(360deg);
        -o-transform: rotate(360deg);
        -moz-transform: rotate(360deg);
    }
}

@keyframes rotate-loading {
    0% {
        transform: rotate(0deg);
        -ms-transform: rotate(0deg);
        -webkit-transform: rotate(0deg);
        -o-transform: rotate(0deg);
        -moz-transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
        -ms-transform: rotate(360deg);
        -webkit-transform: rotate(360deg);
        -o-transform: rotate(360deg);
        -moz-transform: rotate(360deg);
    }
}

@-moz-keyframes rotate-loading {
    0% {
        transform: rotate(0deg);
        -ms-transform: rotate(0deg);
        -webkit-transform: rotate(0deg);
        -o-transform: rotate(0deg);
        -moz-transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
        -ms-transform: rotate(360deg);
        -webkit-transform: rotate(360deg);
        -o-transform: rotate(360deg);
        -moz-transform: rotate(360deg);
    }
}

@-webkit-keyframes rotate-loading {
    0% {
        transform: rotate(0deg);
        -ms-transform: rotate(0deg);
        -webkit-transform: rotate(0deg);
        -o-transform: rotate(0deg);
        -moz-transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
        -ms-transform: rotate(360deg);
        -webkit-transform: rotate(360deg);
        -o-transform: rotate(360deg);
        -moz-transform: rotate(360deg);
    }
}

@-o-keyframes rotate-loading {
    0% {
        transform: rotate(0deg);
        -ms-transform: rotate(0deg);
        -webkit-transform: rotate(0deg);
        -o-transform: rotate(0deg);
        -moz-transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
        -ms-transform: rotate(360deg);
        -webkit-transform: rotate(360deg);
        -o-transform: rotate(360deg);
        -moz-transform: rotate(360deg);
    }
}

@keyframes loading-text-opacity {
    0% {
        opacity: 0;
    }
    20% {
        opacity: 0;
    }
    50% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}

@-moz-keyframes loading-text-opacity {
    0% {
        opacity: 0;
    }
    20% {
        opacity: 0;
    }
    50% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}

@-webkit-keyframes loading-text-opacity {
    0% {
        opacity: 0;
    }
    20% {
        opacity: 0;
    }
    50% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}

@-o-keyframes loading-text-opacity {
    0% {
        opacity: 0;
    }
    20% {
        opacity: 0;
    }
    50% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}
.loading-container,
.loading {
    height: 100px;
    position: relative;
    width: 100px;
    border-radius: 100%;
}

.loading-container {
    margin: 40px auto;
}

.loading {
    border: 2px solid transparent;
    border-color: transparent #fff transparent #fff;
    -moz-animation: rotate-loading 1.5s linear 0s infinite normal;
    -moz-transform-origin: 50% 50%;
    -o-animation: rotate-loading 1.5s linear 0s infinite normal;
    -o-transform-origin: 50% 50%;
    -webkit-animation: rotate-loading 1.5s linear 0s infinite normal;
    -webkit-transform-origin: 50% 50%;
    animation: rotate-loading 1.5s linear 0s infinite normal;
    transform-origin: 50% 50%;
}

.loading-container:hover .loading {
    border-color: transparent #e45635 transparent #e45635;
}
.loading-container:hover .loading,
.loading-container .loading {
    -webkit-transition: all 0.5s ease-in-out;
    -moz-transition: all 0.5s ease-in-out;
    -ms-transition: all 0.5s ease-in-out;
    -o-transition: all 0.5s ease-in-out;
    transition: all 0.5s ease-in-out;
}

#loading-text {
    -moz-animation: loading-text-opacity 2s linear 0s infinite normal;
    -o-animation: loading-text-opacity 2s linear 0s infinite normal;
    -webkit-animation: loading-text-opacity 2s linear 0s infinite normal;
    animation: loading-text-opacity 2s linear 0s infinite normal;
    color: #ffffff;
    font-family: 'Helvetica Neue, ' Helvetica ', ' 'arial';
    font-size: 10px;
    font-weight: bold;
    margin-top: 45px;
    opacity: 0;
    position: absolute;
    text-align: center;
    text-transform: uppercase;
    top: 0;
    width: 100px;
}
</style>
<style scoped>
.loading-fade-enter {
    /* 現れるときの最初の状態 */
    opacity: 1;
}
.loading-fade-enter-active {
    /* 現れるときのトランジションの状態 */
    transition: opacity 0.1s;
}
.loading-fade-enter-to {
    /* 現れるときの最後の状態 */
    opacity: 1;
}

.loading-fade-leave {
    /* 消えるときの最初の状態 */
    opacity: 1;
}
.loading-fade-leave-active {
    /* 消えるときのトランジションの状態 */
    animation: fade-out-animation 2s;
}

.loading-fade-leave-to {
    /* 消えるときのの最後の状態 */
    opacity: 0;
}

@keyframes fade-out-animation {
    0% {
        opacity: 1;
    }

    70% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}
</style>
