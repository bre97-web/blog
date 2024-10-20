import { Hct, SchemeFidelity, hexFromArgb } from "@material/material-color-utilities"
import { persistentMap } from "@nanostores/persistent"
import { Strings } from "../../shared/strings"
import { MaterialColors } from './material-color'

export type TSourceColorHctRawObject = {
    hue: number
    chroma: number
    tone: number
}
export type TContrastLevel = -1 | 0 | 0.5 | 1

export enum EContrastLevel {
    Low = -1,
    Default = 0,
    Medium = 0.5,
    High = 1,
}

export interface IThemeConfiguration {
    getSourceColorHex: () => string
    getSourceColorHct: () => Hct
    getStyleText: () => string
}

abstract class ACThemeConfigurationState {
    private sourceColorHctRawObject: TSourceColorHctRawObject = {
        hue: 135,
        chroma: 75,
        tone: 50
    }
    private isDark: boolean = false
    private contrastLevel: TContrastLevel = EContrastLevel.Default

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

abstract class ACPersistentThemeConfigurationState extends ACThemeConfigurationState {
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

class CThemeConfigurationService extends ACPersistentThemeConfigurationState implements IThemeConfiguration {
    public getSourceColorHex() {
        return hexFromArgb(Hct.from(this.getSourceColorHctRawObject().hue, this.getSourceColorHctRawObject().chroma, this.getSourceColorHctRawObject().tone).toInt())
    }
    public getSourceColorHct() {
        return Hct.from(this.getSourceColorHctRawObject().hue, this.getSourceColorHctRawObject().chroma, this.getSourceColorHctRawObject().tone)
    }
    public getStyleText(selector: string = ':root', tokenPrefix: string = 'md-sys-color') {
        const scheme = new SchemeFidelity(this.getSourceColorHct(), this.getIsDark(), this.getContrastLevel())
        const theme: Record<string, string> = {}
        for (const [key, value] of Object.entries(MaterialColors)) {
            theme[key] = hexFromArgb(value.getArgb(scheme))
        }

        return `${selector} {${Object
            .entries(theme)
            .map(e => `--${tokenPrefix}-${Strings.toKebabCase(e[0])}: ${e[1]};`)
            .reduce((l, c) => l + c)}}`
    }
}

export class ThemeConfigurationService {
    private static instance: CThemeConfigurationService | null = null

    private constructor() { }

    public static getInstance() {
        if (this.instance === null) {
            this.instance = new CThemeConfigurationService()
        }
        return this.instance
    }
}
