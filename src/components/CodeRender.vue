<script lang="ts" setup>
import { ref, onUnmounted, watchEffect } from 'vue'
import hljs from 'boot/hljs'
import type { HighlightResult } from 'highlight.js'
import 'highlight.js/styles/github-dark.min.css'

const props = defineProps<{
  content: string
}>()

const highlightResult = ref<HighlightResult | null>(null)

watchEffect(() => {
  highlightResult.value = hljs.highlightAuto(props.content)
})

onUnmounted(() => { highlightResult.value = null })
</script>

<template>
  <pre class="relative-position m-0">
    <code class="hljs" v-html="highlightResult?.value"></code>
    <small class="absolute absolute-top-right text-white q-pr-sm q-pt-sm">
      {{ highlightResult?.language }}
    </small>
  </pre>
</template>
