<template>
    <ul class="result-list">
        <template v-for="blog in props.collection">
            <a
                class="blog"
                :href="`/post/${blog.slug}/`"
            >
                <h1 class="title text-title-medium line-clamp-1">{{ blog.data.title }}</h1>
                <p class="description text-body-medium line-clamp-2">{{ blog.data.description }}</p>
                <md-ripple></md-ripple>
            </a>
        </template>
    </ul>
</template>

<script setup lang="ts">

const props = defineProps<{
    collection: Array<any>
}>()

</script>

<style scoped>
ul.result-list {
    background-color: var(--md-sys-color-surface-container);
    border-radius: 28px;
    padding: 16px;
    display: grid;
    grid-template-columns: 1fr;
    gap: 16px;

    @media (min-width: 600px) {
        grid-template-columns: 1fr 1fr;
    }

    @media (min-width: 840px) {
        grid-template-columns: 1fr 1fr 1fr;
    }

    &>.blog {
        position: relative;
        padding: 16px;
        border-radius: 16px;
        background-color: var(--md-sys-color-surface-container-lowest);
    }
}
</style>
