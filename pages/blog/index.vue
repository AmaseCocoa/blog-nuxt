<template>
    <div class="md:ml-4 md:mr-4 mt-2 width-page">
        <h1 class="font-bold text-xl">投稿一覧</h1>
        <hr class="mb-2" />
        <ContentQuery v-slot="{ data: allPosts }" :path="$route.path">
            <div v-for="n in paginatedPosts(allPosts)" :key="n._path"
                class="shadow-lg px-6 py-6 ml-4 mr-4 rounded-lg bg-white hover:bg-gray-100 mb-4">
                <nuxt-link :to="n._path" class="font-bold text-xl mb-5">{{ n.title }}</nuxt-link>
                <hr class="mb-4">
                <ContentRenderer :value="n" v-if="n.excerpt">
                    <ContentRendererMarkdown :value="n.excerpt" />
                </ContentRenderer>
                <div class="flex justify-right mt-2 items-center text-sm">
                    <a class="text-blue-600 m-1 px-2 py-1 bg-blue-100 rounded-lg">
                        <LucideCalendarClock :size="20" />
                    </a>
                    <p>{{ $formatDate(n.date) }}</p>
                </div>
            </div>

            <div class="flex justify-center mt-4">
                <button @click="prevPage" :disabled="currentPage === 1"
                    class="px-4 py-2 mx-1 bg-gray-300 rounded">前へ</button>
                <span v-for="page in pagesToShow(allPosts)" :key="page">
                    <button @click="goToPage(page)"
                        :class="{ 'bg-blue-500 text-white': currentPage === page, 'bg-gray-300': currentPage !== page }"
                        class="px-4 py-2 mx-1 rounded">
                        {{ page }}
                    </button>
                </span>
                <button @click="nextPage" :disabled="currentPage === totalPages(allPosts)"
                    class="px-4 py-2 mx-1 bg-gray-300 rounded">次へ</button>
            </div>
        </ContentQuery>
    </div>
</template>

<script setup lang="js">
import { computed } from '#imports';
import { ref } from 'vue';

const postsPerPage = 5;
const currentPage = ref(1);

const paginatedPosts = (allPosts) => {
    if (!allPosts) return [];
    const start = (currentPage.value - 1) * postsPerPage;
    const end = start + postsPerPage;
    return allPosts.slice(start, end);
};

const totalPages = (allPosts) => {
    if (!allPosts) return 1;
    return Math.ceil(allPosts.length / postsPerPage);
};

const pagesToShow = (allPosts) => {
    const total = totalPages(allPosts);
    const start = Math.max(1, currentPage.value - 2);
    const end = Math.min(total, currentPage.value + 2);
    const pages = [];
    for (let i = start; i <= end; i++) {
        pages.push(i);
    }
    return pages;
};

const prevPage = () => {
    if (currentPage.value > 1) currentPage.value--;
};

const nextPage = () => {
    if (currentPage.value < totalPages()) currentPage.value++;
};

const goToPage = (page) => {
    if (page >= 1 && page <= totalPages()) {
        currentPage.value = page;
    }
};

const router = useRouter();

const currentPath = computed(
    () => `https://amase.xyz${router.currentRoute.value.path}`
);

useHead(
    {
        titleTemplate: null,
        title: "投稿一覧",
        meta: [
            { hid: 'description', name: 'description', content: "投稿一覧" },
            { hid: 'og:type', property: 'og:type', content: 'article' },
            { hid: 'og:title', property: 'og:title', content: "投稿一覧" },
            { hid: 'og:description', property: 'og:description', content: "投稿一覧" },
            { hid: 'og:url', property: 'og:url', content: currentPath },
        ],
    }
)
</script>
