<template>
    <h2 class="text-center text-lg font-bold">コメント一覧</h2>
    <p class="text-center">コメントを投稿するには<a :href="`https://${host}/notes/${noteId}`" target="_blank"
            rel="noopener noreferrer" class="text-blue-500">Fediverseの投稿</a>に返信してください。引用は表示されません。</p>
    <div v-if="status.value === 'pending' || status.value === 'idle'">
        <p class="text-center">コメントを読み込んでいます...</p>
    </div>
    <div else>
        <div v-if="success">
            <div v-if="notes != null">
                <div v-if="notes.length">
                    <div v-for="note in notes" class="mb-4">
                        <div v-if="note.replyId != null" class="flex items-end">
                            <!--<lazy-image :src="note.user.avatarUrl" :blurhash="note.user.avatarBlurhash" :width="100" :height="100"/>-->
                            <img :src="note.user.avatarUrl" width="50" height="50" class="rounded-full" />
                            <div class="ml-2 flex-grow">
                                <div class="flex text-sm items-center">
                                    <h3 v-if="note.user.name" class="mr-1"><a
                                            :href="`https://${host}/@${note.user.username}`"
                                            v-if="note.user.host == null" target="_blank" rel="noopener noreferrer">
                                            <MFM :text="note.user.name" :baseHost="host" />
                                        </a><a :href="`https://${note.user.host}/@${note.user.username}`" v-else
                                            target="_blank" rel="noopener noreferrer">
                                            <MFM :text="note.user.name" :baseHost="host" />
                                        </a></h3>
                                    <h3 v-else class="mr-1"><a :href="`https://${host}/@${note.user.username}`"
                                            v-if="note.user.host == null" target="_blank" rel="noopener noreferrer">{{
                                                note.user.username }}</a><a
                                            :href="`https://${note.user.host}/@${note.user.username}`" v-else
                                            target="_blank" rel="noopener noreferrer">{{ note.user.username }}</a></h3>
                                    <h4 v-if="note.user.host == null">@{{ note.user.username }}@{{ host }}</h4>
                                    <h4 v-else>@{{ note.user.username }}@{{ note.user.host }}</h4>
                                    <p class="ml-auto">
                                        <a :href="`https://${host}/notes/${note.id}`" target="_blank"
                                            rel="noopener noreferrer" v-if="note.uri == null">{{
                                                $formatDate(note.createdAt) }}</a>
                                        <a :href="`${note.uri}`" target="_blank" rel="noopener noreferrer" v-else>{{
                                            $formatDate(note.createdAt) }}</a>
                                    </p>
                                </div>
                                <p>
                                    <MFM :text="note.text" :baseHost="host" />
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else>
                    <p class="text-center">コメントはありません</p>
                </div>
            </div>
        </div>
        <div v-else>
            <p class="text-center">コメントの取得に失敗しました</p>
        </div>
    </div>
</template>


<script>
import LazyImage from '@/components/LazyImage.vue';

export default {
    props: {
        host: {
            type: String,
            required: true
        },
        noteId: {
            type: String,
            required: true
        }
    },
    components: {
        LazyImage,
    },
    setup(props) {
        const { host, noteId } = props;
        const { data, status, error } = useFetch(`https://${host}/api/notes/children`, {
            method: "POST",
            body: {
                noteId: noteId
            },
        });
        if (error.value) {
            return { success: false }
        };

        console.log(status.value);
        return { notes: data.value, status: status, success: true };
    }
}
</script>