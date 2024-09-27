<template>
    <div v-if="note.replyId != null" class="flex items-start" :id="note.id">
        <img :src="note.user.avatarUrl" width="50" height="50" class="rounded-full" />
        <div class="ml-2 flex-grow">
            <div class="flex flex-col sm:flex-row text-sm items-start sm:items-center">
                <h3 v-if="note.user.name" class="mr-1">
                    <a :href="`https://${host}/@${note.user.username}`" v-if="note.user.host == null" target="_blank" rel="noopener noreferrer">
                        <MFM :text="note.user.name" :baseHost="host" />
                    </a>
                    <a :href="`https://${note.user.host}/@${note.user.username}`" v-else target="_blank" rel="noopener noreferrer">
                        <MFM :text="note.user.name" :baseHost="host" />
                    </a>
                </h3>
                <h3 v-else class="mr-1">
                    <a :href="`https://${host}/@${note.user.username}`" v-if="note.user.host == null" target="_blank" rel="noopener noreferrer">{{ note.user.username }}</a>
                    <a :href="`https://${note.user.host}/@${note.user.username}`" v-else target="_blank" rel="noopener noreferrer">{{ note.user.username }}</a>
                </h3>
                <h4 v-if="note.user.host == null">@{{ note.user.username }}@{{ host }}</h4>
                <h4 v-else>@{{ note.user.username }}@{{ note.user.host }}</h4>
                <p class="ml-auto text-right">
                    <a :href="`https://${host}/notes/${note.id}`" target="_blank" rel="noopener noreferrer" v-if="note.uri == null">{{ $formatDate(note.createdAt) }}</a>
                    <a :href="`${note.uri}`" target="_blank" rel="noopener noreferrer" v-else>{{ $formatDate(note.createdAt) }}</a>
                </p>
            </div>
            <p class="flex flex-col sm:flex-row"><a :href="`https://${host}/notes/${note.id}`" target="_blank" rel="noopener noreferrer" v-if="note.uri == null">
                <svg v-if="type == 'reply'" style="color: rgb(134, 179, 0)!important;" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-back-up">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M9 14l-4 -4l4 -4" />
                    <path d="M5 10h11a4 4 0 1 1 0 8h-1" />
                </svg></a>
                <a :href="`${note.uri}`" target="_blank" rel="noopener noreferrer" v-else>
                <svg v-if="type == 'reply'" style="color: rgb(134, 179, 0)!important;" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 20 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-back-up">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M9 14l-4 -4l4 -4" />
                    <path d="M5 10h11a4 4 0 1 1 0 8h-1" />
                </svg></a>
                <MFM v-if="type == 'reply'" :text="note.text" :baseHost="host" class="ml-1" />
                <MFM v-else :text="note.text" :baseHost="host" />
            </p>
        </div>
    </div>
</template>

<style scoped>
@media (max-width: 640px) {
    .flex {
        flex-direction: column;
        align-items: flex-start;
    }
    .ml-auto {
        margin-left: 0;
        margin-top: 0.5rem;
    }
}
</style>

<script>
export default {
    props: {
        host: {
            type: String,
            required: true
        },
        note: {
            type: Object,
            required: true
        },
        type: {
            type: String,
            default: 'note'
        }
    },
}
</script>
