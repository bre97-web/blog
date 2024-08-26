<template>
    <label class="slider-box">
        <p class="md-typescale-title-medium">{{ props.title }}</p>
        <md-slider :value=props.defaultValue :min="props.min" :max="props.max" labeled @input="handleInput"></md-slider>
    </label>
</template>

<script setup lang="ts">
import type { MdSlider } from '@material/web/slider/slider';

const props = defineProps<{
    min: number
    max: number
    defaultValue: number
    title: 'hue' | 'chroma' | 'tone'
}>()

const emits = defineEmits<{
    change: [Partial<{hue: number, chroma: number, tone: number}>]
}>()

const handleInput = (e: Event) => {
    emits('change', {
        [props.title]: (e.target as MdSlider).value,
    })
}
</script>

<style scoped>
.slider-box {
    @apply relative;

    &>p {
        @apply px-4;
    }
}
</style>
