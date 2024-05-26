<template>
    <ul ref="containerRef" class="grid-background" id="hero-background">
        <li v-for="e of configuration.to" :key="e"></li>
    </ul>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { HeroBackgroundService } from '../services/hero-background.service.ts'
import { Randoms } from '../../../shared/Randoms.ts'

const containerRef = ref<HTMLElement | null>(null)

const configuration = {
    timer: null as number | NodeJS.Timeout | null,
    timeout: 25,
    from: 0,
    to: 12 * 12,
}
onMounted(() => {
    configuration.timer = setInterval(() => {
        const color = HeroBackgroundService.getNextBackgroundColor()
        const position = Randoms.getNumberRandomlyByRange(configuration.from, configuration.to)
        containerRef.value?.children.item(position)?.setAttribute('style', `background: var(${color});`)
    }, configuration.timeout)
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
