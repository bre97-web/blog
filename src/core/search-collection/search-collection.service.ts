import { atom } from "nanostores";
import type { TBlog } from "src/content/config";

const RegexSpecialSymbols = "[$&+,:;=?@#|'<>.^*()%!-]"

export class SearchCollectionService {
    public static readonly inputValue = atom('')

    public static findPostByBody(searchText: string, collection: Array<TBlog>) {
        return collection.filter(e => e.body.includes(searchText));
    }

    public static findPostByFileName(fileName: string, collection: Array<TBlog>) {
        return collection.filter(e => e.id.includes(fileName));
    }

    public static findPostByCollectionName(collectionName: string, collection: Array<TBlog>) {
        return collection.filter(e => e.data.collection.includes(collectionName));
    }
    public static findPostByTitle(searchText: string, collection: Array<TBlog>) {
        return collection.filter(e => e.data.title.includes(searchText));
    }
    public static findPostByDescription(searchText: string, collection: Array<TBlog>) {
        return collection.filter(e => e.data.description.includes(searchText));
    }
}
