import { map } from "nanostores"

type Item = {
    index: number
    label: string
    iconString: string
    url: string
}

interface INavigationDarwerService {
    getItems: () => Array<Item>
}

abstract class ACNavigationDrawerState {
    protected isOpen: boolean = false

    public getIsOpen() {
        return this.isOpen
    }
    public setIsOpen(isOpen: boolean) {
        this.isOpen = isOpen
    }
}

abstract class CAPersistentNavigationDrawerState extends ACNavigationDrawerState {
    protected isOpenAtom = map<{
        isOpen: boolean
    }>({
        isOpen: false
    })

    public override getIsOpen(): boolean {
        return this.isOpenAtom.get().isOpen
    }
    public override setIsOpen(isOpen: boolean): void {
        this.isOpenAtom.setKey('isOpen', isOpen)
    }
    public getIsOpenAtom() {
        return this.isOpenAtom
    }
}

class CNavigationDrawerService extends CAPersistentNavigationDrawerState implements INavigationDarwerService {
    private items: Array<Item> = [
        {
            index: 0,
            label: 'Home',
            iconString: 'home',
            url: `${import.meta.env.BASE_URL}`,
        },
        {
            index: 0,
            label: 'Posts',
            iconString: 'home',
            url: `${import.meta.env.BASE_URL}/post-list`,
        },
    ]

    public getItems() {
        return this.items
    }

}

export class NavigationDrawerService {
    private static instance: CNavigationDrawerService | null = null

    public static getInstance() {
        if(this.instance === null) {
            this.instance = new CNavigationDrawerService()
        }
        return this.instance
    }
}
