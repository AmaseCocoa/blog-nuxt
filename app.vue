<script setup>
const route = useRoute();
</script>

<template>
  <div class="layout flex overflow-hidden">
    <aside class="mr-4 hidden md:inline-block bg-blue-200 shadow-lg px-8 py-8 h-screen scrollable scroll-hidden">
      <NuxtImg
        src="https://misskey.rest/proxy/avatar.webp?url=https%3A%2F%2Fs3.amskey.one%2Famsc%2Fmisskey-rest%2Fe2a1e18d-0e58-4d8b-af29-7916a4364974.png&avatar=1"
        class="rounded-full m-auto" width="100" height="100" />
      <h1 class="mt-2 text-lg font-bold text-center">AmaseCocoa</h1>
      <hr class="bg-blue-500 rounded-lg mb-2">
      <p class="text-center">すぐにデザインを変えるよ (やりすぎなので抑えます)</p>
      <div class="flex justify-center mt-2">
        <a class="text-blue-600 hover:text-blue-800 m-1 px-2 py-1 bg-blue-100 rounded-lg"
          href="https://github.com/AmaseCocoa" target="_blank">
          <LucideGithub :size="20" />
        </a>
        <a class="text-blue-600 hover:text-blue-800 m-1 px-2 py-1 bg-blue-100 rounded-lg"
          href="https://misskey.io/@cocoa_vrc" target="_blank">
          <img src="assets/svg/misskey-line-logo.svg" width="20" height="20">
        </a>
        <a class="text-blue-600 hover:text-blue-800 m-1 px-2 py-1 bg-blue-100 rounded-lg"
          href="https://misskey.rest/@AmaseCocoa" target="_blank">
          <img src="assets/svg/misskey-line-logo.svg" width="20" height="20">
        </a>
      </div>
      <form id="cse-search-box" action="https://google.com/cse" class="flex space-y-2">
        <input type="hidden" name="cx" value="c109c459dca9d4093" />
        <input type="hidden" name="ie" value="UTF-8" />
        <div class="relative">
          <input type="text" name="q" size="31" placeholder="Googleカスタム検索"
            class="p-2 pr-10 border border-gray-300 rounded w-full" />
            <div class="absolute inset-y-0 right-0 flex items-center pr-3">
              <button type="submit">
                <LucideSearch :size="20" />
              </button>
            </div>
        </div>
      </form>
      <div class="flex justify-center mt-2 flex-col">
        <h1 class="font-bold text-lg">Routes</h1>
        <hr class="mb-2">
        <NuxtLink to="/" class="text-black m-1 px-4 py-3 bg-blue-100 rounded-lg"
          :class="{ 'bg-blue-300': route.path == '/' }">Home</NuxtLink>
        <NuxtLink to="/works" class="text-black m-1 px-4 py-3 bg-blue-100 rounded-lg"
          :class="{ 'bg-blue-300': route.path == '/works' }">My Works</NuxtLink>
        <NuxtLink to="/blog" class="text-black m-1 px-4 py-3 bg-blue-100 rounded-lg"
          :class="{ 'bg-blue-300': route.path.startsWith('/blog') }">Blog</NuxtLink>
      </div>
      <ContentDoc>
        <template #not-found></template>
        <template #empty></template>
        <template v-slot="{ doc: page }">
          <div class="flex justify-center mt-2 flex-col" v-if="page.body.toc.links.length > 0">
            <h1 class="font-bold text-lg">Toc</h1>
            <hr class="mb-2">
            <ul class="tocul">
              <li v-for="link of page.body.toc.links" :key="link.id" class="mb-2 tocli">
                <a :href="`#${link.id}`" class="text-blue-600 hover:text-blue-800 m-1 px-2 py-1">{{ link.text }}</a>
                <ul class="tocul">
                  <li v-for="link1 of link.children" :key="link1.id" class="tocli">
                    <a :href="`#${link1.id}`" class="text-blue-600 hover:text-blue-800mt-1 ml-2 m-1 px-2 py-1">{{
                      link1.text }}</a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </template>
      </ContentDoc>

    </aside>
    <main class="scrollable mt-4 mr-2 flex-1 width-page">
      <NuxtPage />
    </main>
    <div class="fixed bottom-0 left-0 w-full bg-white border-t border-gray-300 ">
      <div class="flex md:hidden justify-around p-2 py-4">
        <NuxtLink href="/" class="flex flex-col items-center">
          <span class="text-xs">Home</span>
        </NuxtLink>
        <NuxtLink href="/works" class="flex flex-col items-center">
          <span class="text-xs">My Works</span>
        </NuxtLink>
        <NuxtLink href="/blog" class="flex flex-col items-center">
          <span class="text-xs">Blog</span>
        </NuxtLink>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  computed: {
    isBlogRoute() {
      if (this.$route.path.startsWith('/blog')) {
        return true
      }
      return false
    }
  }
}
</script>