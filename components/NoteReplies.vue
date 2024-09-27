<template>
    <div>
        <div v-if="success">
            <div v-if="notes != null">
                <div v-if="notes.length">
                    <div v-for="reply in notes" :key="reply.id" class="mt-2 ml-4 border-l-2 pl-4">
                        <!--<IconArrowBackUp stroke={2} class="mr-2" />-->
                        <NoteComponent :note="reply" :host="host" type="reply" />
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <p class="text-center">返信の取得に失敗しました</p>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import NoteComponent from './NoteComponent.vue';
//import { IconArrowBackUp } from '@tabler/icons-vue';

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
        //IconArrowBackUp
    },
    setup(props) {
        const { host, noteId } = props;
        const { data, status, error } = useFetch(`https://${host}/api/notes/children`, {
            method: "POST",
            body: {
                noteId: noteId
            },
        });

        const success = ref(!error.value);

        return { notes: data.value, status, success };
    }
}
</script>
