<template>
    <h2 class="text-center text-lg font-bold">コメント一覧</h2>
    <p class="text-center">
        コメントを投稿するには<a :href="`https://${host}/notes/${noteId}`"
            target="_blank" rel="noopener noreferrer" class="text-blue-500">Fediverseの投稿</a>に返信してください。引用は表示されません。
    </p>
    <div v-if="status.value === 'pending' || status.value === 'idle'">
        <p class="text-center">コメントを読み込んでいます...</p>
    </div>
    <div v-else>
        <div v-if="success">
            <div v-if="notes != null">
                <div v-if="notes.length">
                    <div v-for="note in notes" :key="note.id" class="mb-4">
                        <NoteComponent :note="note" :host="host" type="note" />
                        <div v-if="note.repliesCount >= 1">
                            <NoteReplies :noteId="note.id" :host="host" />
                        </div>
                    </div>
                    <div v-if="notes.length === 10">
                        <button @click="loadMore" class="text-blue-500">もっと！</button>
                    </div>
                </div>
                <div v-else>
                    <p class="text-center mt-2">コメントはありません</p>
                </div>
            </div>
        </div>
        <div v-else>
            <p class="text-center mt-2">コメントの取得に失敗しました</p>
        </div>
    </div>
</template>

<script>
import { ref, watchEffect } from 'vue';
import NoteComponent from './NoteComponent.vue';
import NoteReplies from './NoteReplies.vue';

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
        NoteComponent,
        NoteReplies
    },
    setup(props) {
        const { host, noteId } = props;
        const notes = ref([]); // 定義を追加
        const status = ref('idle'); // status の初期化
        const error = ref(null); // error の初期化

        const fetchNotes = (sinceId = null) => {
            const { data, status: fetchStatus, error: fetchError } = useFetch(`https://${host}/api/notes/children`, {
                method: "POST",
                body: {
                    noteId: noteId,
                    ...(sinceId && { sinceId: sinceId })
                },
            });

            watchEffect(() => {
                status.value = fetchStatus.value;
                error.value = fetchError.value;

                if (data.value) {
                    notes.value = sinceId ? [...notes.value, ...data.value] : data.value;
                }
            });
        };

        const loadMore = () => {
            if (notes.value.length === 10) {
                const sinceId = notes.value[notes.value.length - 1].id;
                fetchNotes(sinceId);
            }
        };

        fetchNotes();

        const success = ref(!error.value);

        return { notes, status, success, loadMore };
    }
}

</script>