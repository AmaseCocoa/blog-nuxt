<template>
    <ContentDoc>
        <template #not-found></template>
        <template #empty></template>
        <template v-slot="{ doc: page }">
            <div class="flex flex-col width-page">
                <article class="shadow-lg px-6 py-6 ml-4 mr-4 rounded-lg bg-white mb-4">
                    <div class="mb-2">
                        <div v-if="page.thumbnail" class="mb-4">
                            <NuxtImg :src="page.thumbnail" alt="サムネイル" class="w-full h-auto rounded-lg" />
                        </div>
                        <h1 class="font-bold text-2xl mb-5">{{ page.title }}</h1>
                    </div>
                    <ContentRenderer :key="page._id" :value="page" class="markdown"></ContentRenderer>
                </article>
                <div class="shadow-lg px-6 py-6 ml-4 mr-4 rounded-lg bg-white mb-4" v-if="page.enableComment">
                    <LazyMkComment :host="'misskey.io'" :noteId="'9ylk4c91v5lt0bjh'" />
                </div>
                <div class="mb-4" v-else></div>
            </div>
        </template>
    </ContentDoc>
</template>
<script setup lang="js">
import { computed } from '#imports';
const router = useRouter();

const content = await queryContent(router.fullPath).findOne();
const currentPath = computed(
    () => `https://amase.xyz${router.currentRoute.value.path}`
);

useHead(
    {
        titleTemplate: null,
        title: content.title,
        meta: [
            { hid: 'description', name: 'description', content: '作った物たちを置いておく場所だよ' },
            { hid: 'og:type', property: 'og:type', content: 'article' },
            { hid: 'og:title', property: 'og:title', content: content.title },
            { hid: 'og:description', property: 'og:description', content: '作った物たちを置いておく場所だよ' },
            { hid: 'og:url', property: 'og:url', content: currentPath },
        ]
    }
)
</script>