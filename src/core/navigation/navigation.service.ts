import { atom } from "nanostores"

type TLink = {
    index: number
    label: string
    iconString: string
    url: string
}

export class NavigationService {
    private static readonly links: Array<TLink> = [
        {
            index: 0,
            label: 'Home',
            iconString: 'home',
            url: `${import.meta.env.BASE_URL}/`,
        },
        {
            index: 1,
            label: 'Blog',
            iconString: 'book',
            url: `${import.meta.env.BASE_URL}/blog`,
        },
    ]

    public static getLinks() {
        return this.links
    }

    public static readonly url = atom("")
}
