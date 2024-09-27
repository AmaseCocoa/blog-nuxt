<template>
    <div class=" border-slate-200 dark:border-slate-700 mfm-root relative overflow-hidden">
    <div class="ignore" :class="$style.mfmRoot">
            <MkMfm :text="realText" :baseHost="baseHost" />
        </div>
    </div>
</template>

<script setup lang="ts">
import MkMfm from '@/components/mk/Mfm';

const props = defineProps<{
    text: string;
    baseHost: string;
}>();

const realText = computed(() => props.text.replace(/\\[\s]*$/gm, '\n'));
</script>

<style module>
.mfmRoot img {
    display: inline;
}
</style>
