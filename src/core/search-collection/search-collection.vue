<template>
    <SearchInput></SearchInput>
    <SearchResult
        v-if="res !== null"
        :collection="res"
    ></SearchResult>
</template>

<script setup lang="ts">
import { useStore } from '@nanostores/vue';
import { ref, watch } from 'vue';
import { SearchCollectionService } from './search-collection.service';
import SearchInput from './search-input.vue';
import SearchResult from './search-result.vue';

const inputValueStore = useStore(SearchCollectionService.inputValue)

const props = defineProps<{
    collection: Array<any>
}>()

const res = ref<null | Array<any>>(null)

watch(() => inputValueStore.value, (value) => {
    res.value = props.collection.filter(e => e.body.includes(value))
})
</script>
