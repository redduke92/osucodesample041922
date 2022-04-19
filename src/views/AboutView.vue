<template>
  <div class="about">
      <BlogDetail msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
</template>

<script>// @ is an alias to /src
import BlogDetail from '@/components/BlogDetail.vue'

export default {
  name: 'AboutView',
  components: {
      BlogDetail
  }
}</script>