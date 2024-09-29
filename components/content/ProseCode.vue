<template>
    <div class="container rounded-lg code-container" @mouseover="onHover(true)" @mouseleave="onHover(false)">
        <span v-if="filename != ''"
            class="text-gray-300 tokyo-night rounded-lg">
            {{ filename }}
        </span>
        <div class="code-inner">
            <slot />
            <div class="copy-container" v-show="true">
                <span class="copy-button text-gray-300" v-if="copied"><LucideClipboardCheck :size="20" /></span>
                <button class="copy-button text-gray-300" @click="onClick" v-if="! copied"><LucideClipboard :size="20" /></button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useClipboard } from '@vueuse/core';
import { ref } from 'vue';

const props = withDefaults(
    defineProps < {
        code?: string
        language?: string | null
        filename?: string | null
    } > (),{code: '', language: null, filename: null}
)

const isHovered = ref(false)
function onHover(state: boolean) {
  isHovered.value = state
}

const { copy, copied } = useClipboard();

const onClick = () => {
  copy(props.code)
}
</script>

<style scoped>
    .container {
        background: #1e1e1e;
        padding-top: 1em;
        position: relative;
    }

    .language-text {
        position: absolute;
        top: 0;
        right: 1em;
        padding: 0.25em 0.5em;
        font-size: 14px;
        text-transform: uppercase;
        border-bottom-right-radius: 0.25em;
        border-bottom-left-radius: 0.25em;
    }

    .bottom-container {
        display: flex;
        justify-content: flex-end;
    }

    .copy-container {
        position: absolute;
        top: 0;
        right: 0;
        display: flex;
        align-items: center;
        padding: 0.5em;
    }

    .copied-text {
        margin-right: 1em;
    }

    .copy-button {
        background: transparent;
        border: none;
        cursor: pointer;
    }
</style>
