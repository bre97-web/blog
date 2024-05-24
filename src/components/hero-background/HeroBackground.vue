<template>
    <ul ref="containerRef" class="grid-background" id="hero-background" :style="containerRefStyles">
        <li v-for="e of configuration.to" :key="e"></li>
    </ul>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { randomNumberGenerator } from '../../utils/numbers'


const containerRef = ref<HTMLElement | null>(null)
// const currentBlockPosition = ref(0)
const containerRefStyles = computed(() => ({

}))

const configuration = {
    timer: null as number | NodeJS.Timeout | null,
    intervalTime: 25,
    from: 0,
    to: 12 * 12,
}
onMounted(() => {
    configuration.timer = setInterval(() => {
        const color = [
            '--md-sys-color-surface-container',
            '--md-sys-color-inverse-surface',
            '--md-sys-color-error-container',
            '--md-sys-color-tertiary-container',
            '--md-sys-color-secondary-container',
            '--md-sys-color-primary-container'
        ][randomNumberGenerator(0, 6)]

        const position = randomNumberGenerator(configuration.from, configuration.to)

        containerRef.value?.children.item(position)?.setAttribute('style', `background: var(${color});`)
    }, configuration.intervalTime)
})
onBeforeUnmount(() => {
    if (configuration.timer) {
        clearInterval(configuration.timer)
    }
})

</script>

<style scoped>
ul.grid-background {
    content: '';
    @apply absolute inset-0 -z-[1] overflow-clip pointer-events-none w-full h-full grid opacity-5;
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: repeat(12, 1fr);

    &>li {
        @apply block w-auto h-full bg-[--md-sys-color-surface-container] aspect-square -z-[1];
        transition-property: background;
        transition-duration: 100ms;
        transition-timing-function: ease-in-out;
    }
}
</style>
