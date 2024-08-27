<template>
    <div class="search-input">
        <md-icon class="search-icon">search</md-icon>
        <input
            class="search-input text-body-medium"
            placeholder="Type here to search"
            @input="onSearchInput"
        />
    </div>
</template>

<script setup lang="ts">
import { SearchCollectionService } from "./search-collection.service";

const onSearchInput = (e: Event) => {
    const value = (e.target as HTMLInputElement).value;
    SearchCollectionService.inputValue.set(value);
    console.log('up');

}
</script>

<style scoped>
div.search-input {
    border-radius: 9999px;
    height: 48px;
    background-color: var(--md-sys-color-surface-container);
    position: relative;
    display: grid;
    align-items: center;
    padding-left: 8px;
    padding-right: 16px;
    grid-template-rows: 1fr;
    grid-template-columns: 48px 1fr;

    &>.search-icon {
        color: var(--md-sys-color-on-surface-variant);
        justify-self: center;
    }

    &>input.search-input {
        border-radius: inherit;
        appearance: none;
        outline: none;
        border: none;
        background-color: unset;
        height: 100%;
        display: block;
        color: var(--md-sys-color-on-surface);
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
    }

    &:focus,
    &:focus-within {
        background-color: var(--md-sys-color-surface-container-high);
    }
}
</style>
