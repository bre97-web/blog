<template>
    <span
        class="hct-picker"
        id="hct-picker-window-wrapper"
        transition:name="hct-picker"
        transition:persist
    >
        <md-icon-button
            id="hct-picker-window-toggle-button"
            @click="handleClicked"
            aria-labelledby="#hct-picker-window-wrapper"
            aria-label="Open HCT theme picker"
        >
            <md-icon>palette</md-icon>
        </md-icon-button>
        <md-menu
            id="hct-picker-window"
            anchor="hct-picker-window-toggle-button"
            ref="menuRef"
        >

            <div class="current-color-box primary"></div>

            <div class="hct-picker-sliders">
                <HctSliderPreview
                    :disabled="true"
                    :block="360"
                    :hct="{ hue: 0, chroma: 75, tone: 50 }"
                    :is-dark="themeState.isDark"
                    :contrast-level="themeState.contrastLevel"
                >
                    <HctSlider
                        @change="handleSliderChanged"
                        :default-value="themeState.sourceColorHctRawObject.hue"
                        :title="'hue'"
                        :min="0"
                        :max="360"
                    ></HctSlider>
                </HctSliderPreview>

                <HctSliderPreview
                    :dep="themeState.sourceColorHctRawObject.hue"
                    :block="150"
                    :hct="{ ...themeState.sourceColorHctRawObject, tone: 50 }"
                    :is-dark="themeState.isDark"
                    :contrast-level="themeState.contrastLevel"
                >
                    <HctSlider
                        @change="handleSliderChanged"
                        :default-value="themeState.sourceColorHctRawObject.chroma"
                        :title="'chroma'"
                        :min="0"
                        :max="150"
                    ></HctSlider>
                </HctSliderPreview>

                <HctSliderPreview
                    :dep="themeState.sourceColorHctRawObject.hue"
                    :block="100"
                    :hct="{ ...themeState.sourceColorHctRawObject, chroma: 75 }"
                    :is-dark="themeState.isDark"
                    :contrast-level="themeState.contrastLevel"
                >
                    <HctSlider
                        @change="handleSliderChanged"
                        :default-value="themeState.sourceColorHctRawObject.tone"
                        :title="'tone'"
                        :min="0"
                        :max="100"
                    ></HctSlider>
                </HctSliderPreview>
            </div>

        </md-menu>
    </span>
</template>

<script setup lang="ts">
import type { MdIconButton } from '@material/web/iconbutton/icon-button'
import { MdMenu } from '@material/web/menu/menu'
import { useStore } from '@nanostores/vue'
import { ref } from 'vue'
import HctSlider from './HctSlider.vue'
import HctSliderPreview from './HctSliderPreview.vue'
import { type TSourceColorHctRawObject, ThemeConfigurationService } from './theme-configuration.service'

const menuRef = ref<MdMenu | null>(null)
const handleClicked = () => {
    toggleMenu()
}
const toggleMenu = () => {
    if (menuRef.value?.open) {
        menuRef.value.close()
    } else {
        menuRef.value?.show()
    }
}


const themeState = useStore(ThemeConfigurationService.getInstance().getAtom())
const handleSliderChanged = (hctRawObjectOptions: Partial<TSourceColorHctRawObject>) => {
    ThemeConfigurationService.getInstance().setSourceColorRawObject(() => hctRawObjectOptions)
}
</script>

<style scoped>
.hct-picker {
    @apply relative;

    & .current-color-box {
        @apply h-[44px] w-[44px] rounded-full mx-auto my-4;
    }

    & .hct-picker-sliders {
        @apply space-y-4 mb-4;
    }

}
</style>
