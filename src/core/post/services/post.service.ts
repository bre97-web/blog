
import { getCollection, type ContentEntryMap } from "astro:content"

type TContent = {
    displayName: string
    collectionName: keyof ContentEntryMap
    baseUrl: `/${string}`
    posts: any
}

class CPostService {
    protected readonly Contents: Array<TContent> = [
        {
            baseUrl: '/blog',
            collectionName: 'blog',
            displayName: 'Blogs',
            posts: []
        },
        {
            baseUrl: '/angular-framework',
            collectionName: 'angular-framework',
            displayName: 'Angular Framework',
            posts: []
        },
        
    ]

    constructor() {
        this.Contents.map(async (series) => {
            series.posts = await getCollection(series.collectionName)
        })
    }


    public getCollections() {
        return this.Contents.map(series => series.collectionName)
    }

    public getAllPosts() {
        return this.Contents.map(series => series.posts).reduce((prePosts, curPosts) => [...prePosts, ...curPosts], [])
    }

    public getContents() {
        return this.Contents
    }

}

export class PostService {
    private static instance: CPostService | null = null

    public static getInstance() {
        if(this.instance === null) {
            this.instance = new CPostService()
        }
        return this.instance
    }
}
