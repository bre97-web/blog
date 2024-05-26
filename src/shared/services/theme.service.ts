import { Hct, SchemeContent, hexFromArgb } from "@material/material-color-utilities"
import { persistentMap } from "@nanostores/persistent"
import { MaterialColors } from '../material-color'
import { Strings } from "../Strings"

export type TSourceColorHctRawObject = {
    hue: number
    chroma: number
    tone: number
}
export type TContrastLevel = -1 | 0 | 0.5 | 1

export const enum ContrastLevels {
    Low = -1,
    Default = 0,
    Medium = 0.5,
    High = 1,
}

export interface IThemeService {
    getSourceColorHex: () => string
    getSourceColorHct: () => Hct
    getStyleText: () => string
}

abstract class ACThemeState {
    private sourceColorHctRawObject: TSourceColorHctRawObject = {
        hue: 150,
        chroma: 50,
        tone: 50
    }
    private isDark: boolean = false
    private contrastLevel: TContrastLevel = ContrastLevels.Default

    public getSourceColorHctRawObject() {
        return this.sourceColorHctRawObject
    }
    public setSourceColorRawObject(callback: (e: TSourceColorHctRawObject) => Partial<TSourceColorHctRawObject>) {
        this.sourceColorHctRawObject = {
            ...this.sourceColorHctRawObject,
            ...callback(this.sourceColorHctRawObject),
        }
    }
    public getIsDark() {
        return this.isDark
    }
    public setIsDark(isDark: boolean) {
        this.isDark = isDark
    }
    public getContrastLevel() {
        return this.contrastLevel
    }
    public setContrastLevel(contrastLevel: TContrastLevel) {
        this.contrastLevel = contrastLevel
    }
}

abstract class ACPersistentThemeState extends ACThemeState {
    private themeAtom = persistentMap<{
        sourceColorHctRawObject: TSourceColorHctRawObject
        isDark: boolean
        contrastLevel: TContrastLevel
    }>('persistent-theme-service', {
        sourceColorHctRawObject: super.getSourceColorHctRawObject(),
        isDark: super.getIsDark(),
        contrastLevel: super.getContrastLevel(),
    }, {
        encode: JSON.stringify,
        decode: JSON.parse,
    })

    public override getSourceColorHctRawObject(): TSourceColorHctRawObject {
        return this.themeAtom.get().sourceColorHctRawObject
    }
    public override setSourceColorRawObject(callback: (e: TSourceColorHctRawObject) => Partial<TSourceColorHctRawObject>): void {
        this.themeAtom.setKey('sourceColorHctRawObject', {
            ...this.themeAtom.get().sourceColorHctRawObject,
            ...callback(this.themeAtom.get().sourceColorHctRawObject),
        })
    }
    public override getIsDark(): boolean {
        return this.themeAtom.get().isDark
    }
    public override setIsDark(isDark: boolean): void {
        this.themeAtom.setKey('isDark', isDark)
    }
    public override getContrastLevel(): TContrastLevel {
        return this.themeAtom.get().contrastLevel
    }
    public override setContrastLevel(contrastLevel: TContrastLevel): void {
        this.themeAtom.setKey('contrastLevel', contrastLevel)
    }

    public getAtom() {
        return this.themeAtom
    }
}

class CThemeService extends ACPersistentThemeState implements IThemeService {
    public getSourceColorHex() {
        return hexFromArgb(Hct.from(this.getSourceColorHctRawObject().hue, this.getSourceColorHctRawObject().chroma, this.getSourceColorHctRawObject().tone).toInt())
    }
    public getSourceColorHct() {
        return Hct.from(this.getSourceColorHctRawObject().hue, this.getSourceColorHctRawObject().chroma, this.getSourceColorHctRawObject().tone)
    }
    public getStyleText() {
        const scheme = new SchemeContent(this.getSourceColorHct(), this.getIsDark(), this.getContrastLevel())
        const theme: Record<string, string> = {}
        for (const [key, value] of Object.entries(MaterialColors)) {
            theme[key] = hexFromArgb(value.getArgb(scheme))
        }

        return `:root {${Object
            .entries(theme)
            .map(e => `--md-sys-color-${Strings.toKebabCase(e[0])}: ${e[1]};`)
            .reduce((l, c) => l + c)}}`
    }
}

export class ThemeService {
    private static instance: CThemeService | null = null

    private constructor() { }

    public static getInstance() {
        if (this.instance === null) {
            this.instance = new CThemeService()
        }
        return this.instance
    }
}
