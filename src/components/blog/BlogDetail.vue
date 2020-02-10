<template>
<div class="ql-container ql-snow">
    <div class="ql-editor">
        <pre class="ql-syntax" spellcheck="false"><span class="hljs-keyword">const</span> a = <span class="hljs-number">12</span>
</pre><h1>adasd</h1><p>asdasdasd</p>          
    </div>
</div>
</template>

<script>
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import { quillEditor } from 'vue-quill-editor'
export default {
    name:'BlogDetail',
    components:{
        quillEditor
    }
}
</script>

<style lang="scss" scoped>
    .ql-container{
        z-index: 0;
        margin: 10px 20px;
        border: none;
    }
</style>