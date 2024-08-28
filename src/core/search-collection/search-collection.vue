<template>
    <div
        class="search-collection"
        :class="{ 'open': showResultPanel }"
    >
        <SearchInput></SearchInput>

        <template v-if="showResultPanel">
            <SearchResult
                v-if="hasResult"
                :collection="res"
                @blogClick="onBlogClick($event)"
            ></SearchResult>
            <div v-else>
                <p>Could not found blog.</p>
            </div>
        </template>

    </div>
</template>

<script setup lang="ts">
import { useStore } from '@nanostores/vue';
import { navigate } from 'astro/virtual-modules/transitions-router.js';
import { computed, ref, watch } from 'vue';
import type { TBlog } from "../../content/config";
import { SearchCollectionService } from './search-collection.service';
// @ts-ignore
import SearchInput from './search-input.vue';
// @ts-ignore
import SearchResult from './search-result.vue';


const props = defineProps<{
    collection: Array<TBlog>
    baseUrl: string
}>()

/**
 * 首次進入不顯示搜索結果面板
 */
const showResultPanel = ref(false)

/**
 * The value of Search-Input component's
 */
const inputValueStore = useStore(SearchCollectionService.inputValue)

const res = ref<null | Array<TBlog>>(null)
const hasResult = computed(() => res.value !== null && res.value.length !== 0)

watch(() => inputValueStore.value, (value) => {
    if (value !== '' || value.length !== 0 || value !== null) {
        res.value = [...new Set([
            ...SearchCollectionService.findPostByBody(value, props.collection),
            ...SearchCollectionService.findPostByFileName(value, props.collection),
            ...SearchCollectionService.findPostByCollectionName(value, props.collection),
            ...SearchCollectionService.findPostByTitle(value, props.collection),
            ...SearchCollectionService.findPostByDescription(value, props.collection),
        ]).values()]
        showResultPanel.value = true
    } else {
        res.value = null
    }
})

const onBlogClick = (blog: TBlog) => {
    navigate(`${props.baseUrl}${blog.slug}/`)
}
</script>

<style scoped>
.search-collection {
    margin-bottom: 16px;
    height: fit-content;
    border-radius: 28px;

    &.open {
        --search-input-background-color: var(--md-sys-color-surface-bright);
        --search-input-focus-background-color: var(--md-sys-color-surface-bright);
        background-color: var(--md-sys-color-surface-container);
        padding: 16px;
    }

    &.open> :not([hidden])~ :not([hidden]) {
        --space-y-reverse: 0;
        margin-top: calc(32px * calc(1 - var(--space-y-reverse)));
        margin-bottom: calc(32px * var(--space-y-reverse));
    }
}
</style>
