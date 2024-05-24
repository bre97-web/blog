import { map } from "nanostores"

export type NavigationConfigurationType = {
    isOpen: boolean
    currentUrl: string
}

export const navigationConfiguration = map<NavigationConfigurationType>({
    isOpen: false,
    currentUrl: "/"
})

export const changeNavigationConfiguration = (configuration: Partial<NavigationConfigurationType>) => {
    navigationConfiguration.set({
        ...navigationConfiguration.get(),
        ...configuration
    })
}
