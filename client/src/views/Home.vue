<template>
  <div class="home">
    <Homepage :threads='threads' :getThreads="getThreads" :user='user' :setUser='setUser'></Homepage>
  
  </div>
</template>

<script>
  import Homepage from '@/components/Homepage.vue'
  
  export default {
    name: 'home',
    props: ['setUser', 'user', 'threads', 'getThreads'],
    components: {
      Homepage
    }
  }
</script>
