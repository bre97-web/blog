import { Randoms } from "../../../shared/Randoms"

export class HeroBackgroundService {
    private static readonly BackgroundColors = [
        '--md-sys-color-surface-container',
        '--md-sys-color-inverse-surface',
        '--md-sys-color-error-container',
        '--md-sys-color-tertiary-container',
        '--md-sys-color-secondary-container',
        '--md-sys-color-primary-container'
    ]

    public static getNextBackgroundColor() {
        return this.BackgroundColors[Randoms.getNumberRandomlyByRange(0, this.BackgroundColors.length - 1)]
    }
}
