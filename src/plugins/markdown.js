import Vue from 'vue'
import VueMarkdownEditor from '@kangc/v-md-editor/lib/base-editor'
import '@kangc/v-md-editor/lib/style/base-editor.css'
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import 'prismjs/components/prism-java'

VueMarkdownEditor.use(vuepressTheme)

Vue.use(VueMarkdownEditor)
