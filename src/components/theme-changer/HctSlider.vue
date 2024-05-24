<template>
    <label class="slider-box">
        <p class="md-typescale-title-medium">{{ props.title }}</p>
        <md-slider :value=props.defaultValue :min="props.min" :max="props.max" labeled @input="handleInput"></md-slider>
    </label>
</template>

<script setup lang="ts">
import type { MdSlider } from '@material/web/all';
import { defineProps } from 'vue'
import type { ThemeConfigurationType } from '../../stores/themeStore';

const props = defineProps<{
    min: number
    max: number
    defaultValue: number
    title: 'hue' | 'chroma' | 'tone'
}>()

const emits = defineEmits<{
    change: [Partial<Pick<ThemeConfigurationType, 'sourceColorHct'>>]
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