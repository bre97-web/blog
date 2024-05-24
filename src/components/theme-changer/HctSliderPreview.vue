<template>
    <div>
        <slot></slot>
        <div ref="previewRef" class="preview"></div>
    </div>
</template>

<script setup lang="ts">
import { Hct, MaterialDynamicColors, SchemeContent, hexFromArgb } from '@material/material-color-utilities'
import { onMounted, ref, watch } from 'vue'

const props = withDefaults(defineProps<{
    hct: {
        hue: number
        chroma: number
        tone: number
    }
    isDark: boolean
    contrastLevel: number
    block: 360 | 150 | 100
    disabled?: boolean
    dep?: number | null
}>(), {
    disabled: false,
    dep: null,
})

let scheme = new SchemeContent(Hct.from(props.hct.hue, props.hct.chroma, props.hct.tone), props.isDark, props.contrastLevel)
const previewRef = ref<HTMLElement | null>(null)
const updatePreview = () => {
    const u = getNewSchemeFunction()
    let style = ''
    for (let i = 0; i <= 3; i++) {
        scheme = u(i, 3)
        style += ` ${hexFromArgb(MaterialDynamicColors.primary.getArgb(scheme))} ${100 / 3 * i}%,`
    }

    previewRef.value?.setAttribute('style', `background:linear-gradient(to right, ${style.slice(0, -1)});`)
}

const getNewSchemeFunction = () => {
    if (props.block === 360) {
        return (i: number, step) => new SchemeContent(Hct.from(360 / step * i, props.hct.chroma, props.hct.tone), props.isDark, props.contrastLevel)
    } else if (props.block === 150) {
        return (i: number, step) => new SchemeContent(Hct.from(props.hct.hue, 150 / step * i, props.hct.tone), props.isDark, props.contrastLevel)
    }
    return (i: number, step) => new SchemeContent(Hct.from(props.hct.hue, props.hct.chroma, 100 / step * i), props.isDark, props.contrastLevel)
}


watch(() => props.dep, () => {
    if (props.disabled) return
    updatePreview()
})

onMounted(() => {
    updatePreview()
})

</script>

<style scoped>
.preview {
    @apply h-6 border mx-4 rounded-full;
}
</style>
