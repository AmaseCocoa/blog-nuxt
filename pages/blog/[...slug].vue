<template>
  <ContentDoc>
    <template #not-found>
      <div class="flex flex-col h-full items-center px-6 py-6 ml-4 mr-4 rounded-lg bg-white mb-4 text-center">
        <h1 class="text-2xl font-bold">404</h1>
        <p class="mb-2">お探しのページは見つかりませんでした</p>
        <NuxtLink to="/" class="m-1 px-2 py-1 text-blue-600 hover:text-blue-800 bg-blue-100 rounded-lg">トップに戻る</NuxtLink>
      </div>
    </template>
    <template #empty>
      <div class="shadow-lg px-6 py-6 ml-4 mr-4 rounded-lg bg-white mb-4 text-center">
        <p class="mb-2"></p>
      </div>
    </template>
    <template v-slot="{ doc: page }">
      <div class="flex flex-col width-page">
        <article class="shadow-lg px-6 py-6 ml-4 mr-4 rounded-lg bg-white mb-4">
          <div class="mb-2">
            <div v-if="page.thumbnail" class="mb-4">
              <NuxtImg :src="page.thumbnail" :alt="`Thumbnail for ${page.title}`" class="w-full h-auto rounded-lg" />
            </div>
            <h1 class="font-bold text-2xl mb-5">{{ page.title }}</h1>
            <div class="flex items-center" v-if="page.tags && page.tags.length >= 1">
              <div v-for="tag of page.tags" :key="tag"
                class="mr-1 text-sm font-medium text-blue-600 hover:text-blue-800 m-1 px-2 py-1 bg-blue-100 rounded-lg">
                <NuxtLink :to="`/tags/${tag}`">{{ tag }}</NuxtLink>
              </div>
            </div>
            <div class="flex justify-right mt-2 items-center">
              <a class="text-blue-600 m-1 px-2 py-1 bg-blue-100 rounded-lg">
                <LucideCalendarClock :size="20" />
              </a>
              <p class="font-bold">{{ $formatDate(page.date) }}</p>
            </div>
          </div>
          <div class="inline-block md:hidden border border-gray-300 p-4 rounded-lg bg-gray-50 mx-auto mb-4">
            <ul>
              <li>
                <h2 class="text-lg font-bold mb-4 text-center">目次</h2>
              </li>
              <li v-for="link of page.body.toc.links" :key="link.id" class="mb-1">
                <a :href="`#${link.id}`">{{ link.text }}</a>
                <ul>
                  <li v-for="link1 of link.children" :key="link1.id">
                    <a :href="`#${link1.id}`" class="ml-2">{{ link1.text }}</a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>

          <ContentRenderer :key="page._id" :value="page" class="markdown"></ContentRenderer>

        </article>
        <!--
        <div class="shadow-lg px-6 py-6 ml-4 mr-4 rounded-lg bg-white mb-4" v-if="page.enableComment">
          <LazyMkComment :host="'misskey.io'" :noteId="'9ylk4c91v5lt0bjh'" />
        </div>
        <div class="mb-4" v-else></div>
        -->
        <div class="mb-4"></div>
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
        { hid: 'description', name: 'description', content: content.excerpt },
        { hid: 'keyword', name: 'keyword', content: content.tags.join(',') },
        { hid: 'og:type', property: 'og:type', content: 'article' },
        { hid: 'og:title', property: 'og:title', content: content.title },
        { hid: 'og:description', property: 'og:description', content: content.excerpt },
        { hid: 'og:url', property: 'og:url', content: currentPath },
        { hid: 'og:image', property: 'og:image', content: content.thumbnail },
      ],
    }
)
</script>
