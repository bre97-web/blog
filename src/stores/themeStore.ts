import { Hct, SchemeContent, MaterialDynamicColors, hexFromArgb } from "@material/material-color-utilities"
import { persistentAtom } from "@nanostores/persistent"
import { ToKebabCase } from "../utils/strings"

export type ThemeConfigurationType = {
    sourceColorHct: {
        hue: number
        chroma: number
        tone: number
    }
    isDark: boolean
    contrastLevel: number
}

export const ContrastLevels = {
    Low: -1,
    Default: 0,
    High: 1,
} as const

export const themeConfiguration = persistentAtom<ThemeConfigurationType>('themeConfiguration', {
    sourceColorHct: {
        hue: 150,
        chroma: 50,
        tone: 50
    },
    isDark: false,
    contrastLevel: ContrastLevels.Default,
}, {
    encode: JSON.stringify,
    decode: JSON.parse,
})
export const generateStyleText = () => {
    const { sourceColorHct, isDark, contrastLevel } = themeConfiguration.get()
    const { hue, chroma, tone } = sourceColorHct

    const scheme = new SchemeContent(Hct.from(hue, chroma, tone), isDark, contrastLevel)
    const theme: Record<string, string> = {}
    for (const [key, value] of Object.entries(MaterialColors)) {
        theme[key] = hexFromArgb(value.getArgb(scheme))
    }

    return `:root {${Object
        .entries(theme)
        .map(e => `--md-sys-color-${ToKebabCase(e[0])}: ${e[1]};`)
        .reduce((l, c) => l + c)}}`
}


/**
 * A Mapping of color token name to MCU HCT color function generator.
 */
const MaterialColors = {
    primaryPaletteKeyColor: MaterialDynamicColors.primaryPaletteKeyColor,
    secondaryPaletteKeyColor: MaterialDynamicColors.secondaryPaletteKeyColor,
    tertiaryPaletteKeyColor: MaterialDynamicColors.tertiaryPaletteKeyColor,
    neutralPaletteKeyColor: MaterialDynamicColors.neutralPaletteKeyColor,
    neutralVariantPaletteKeyColor:
        MaterialDynamicColors.neutralVariantPaletteKeyColor,
    background: MaterialDynamicColors.background,
    onBackground: MaterialDynamicColors.onBackground,
    surface: MaterialDynamicColors.surface,
    surfaceDim: MaterialDynamicColors.surfaceDim,
    surfaceBright: MaterialDynamicColors.surfaceBright,
    surfaceContainerLowest: MaterialDynamicColors.surfaceContainerLowest,
    surfaceContainerLow: MaterialDynamicColors.surfaceContainerLow,
    surfaceContainer: MaterialDynamicColors.surfaceContainer,
    surfaceContainerHigh: MaterialDynamicColors.surfaceContainerHigh,
    surfaceContainerHighest: MaterialDynamicColors.surfaceContainerHighest,
    onSurface: MaterialDynamicColors.onSurface,
    surfaceVariant: MaterialDynamicColors.surfaceVariant,
    onSurfaceVariant: MaterialDynamicColors.onSurfaceVariant,
    inverseSurface: MaterialDynamicColors.inverseSurface,
    inverseOnSurface: MaterialDynamicColors.inverseOnSurface,
    outline: MaterialDynamicColors.outline,
    outlineVariant: MaterialDynamicColors.outlineVariant,
    shadow: MaterialDynamicColors.shadow,
    scrim: MaterialDynamicColors.scrim,
    surfaceTint: MaterialDynamicColors.surfaceTint,
    primary: MaterialDynamicColors.primary,
    onPrimary: MaterialDynamicColors.onPrimary,
    primaryContainer: MaterialDynamicColors.primaryContainer,
    onPrimaryContainer: MaterialDynamicColors.onPrimaryContainer,
    inversePrimary: MaterialDynamicColors.inversePrimary,
    secondary: MaterialDynamicColors.secondary,
    onSecondary: MaterialDynamicColors.onSecondary,
    secondaryContainer: MaterialDynamicColors.secondaryContainer,
    onSecondaryContainer: MaterialDynamicColors.onSecondaryContainer,
    tertiary: MaterialDynamicColors.tertiary,
    onTertiary: MaterialDynamicColors.onTertiary,
    tertiaryContainer: MaterialDynamicColors.tertiaryContainer,
    onTertiaryContainer: MaterialDynamicColors.onTertiaryContainer,
    error: MaterialDynamicColors.error,
    onError: MaterialDynamicColors.onError,
    errorContainer: MaterialDynamicColors.errorContainer,
    onErrorContainer: MaterialDynamicColors.onErrorContainer,
    primaryFixed: MaterialDynamicColors.primaryFixed,
    primaryFixedDim: MaterialDynamicColors.primaryFixedDim,
    onPrimaryFixed: MaterialDynamicColors.onPrimaryFixed,
    onPrimaryFixedVariant: MaterialDynamicColors.onPrimaryFixedVariant,
    secondaryFixed: MaterialDynamicColors.secondaryFixed,
    secondaryFixedDim: MaterialDynamicColors.secondaryFixedDim,
    onSecondaryFixed: MaterialDynamicColors.onSecondaryFixed,
    onSecondaryFixedVariant: MaterialDynamicColors.onSecondaryFixedVariant,
    tertiaryFixed: MaterialDynamicColors.tertiaryFixed,
    tertiaryFixedDim: MaterialDynamicColors.tertiaryFixedDim,
    onTertiaryFixed: MaterialDynamicColors.onTertiaryFixed,
    onTertiaryFixedVariant: MaterialDynamicColors.onTertiaryFixedVariant,
} as const
export type MaterialColorsType = Record<keyof typeof MaterialColors, string>

export const changeThemeConfiguration = (options: Partial<ThemeConfigurationType>) => {
    themeConfiguration.set({
        ...themeConfiguration.get(),
        ...options
    })
}
export const changeContrastLevel = (level: number) => {
    themeConfiguration.set({
        ...themeConfiguration.get(),
        contrastLevel: level
    })
}
export const changeIsDark = (isDark: boolean) => {
    themeConfiguration.set({
        ...themeConfiguration.get(),
        isDark
    })
}
export const changeSourceColorHct = (hct: Partial<Pick<ThemeConfigurationType, 'sourceColorHct'>>) => {
    themeConfiguration.set({
        ...themeConfiguration.get(),
        sourceColorHct: {
            ...themeConfiguration.get().sourceColorHct,
            ...hct
        }
    })
}
