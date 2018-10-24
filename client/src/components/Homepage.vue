<template>
  <section class="homepage">
    
    <threads :user='user' :threads='threads' :getThreads='getThreads'></threads>

  </section>
</template>

<script>
  import sidebar from './Sidebar.vue'
  import threads from './Threads.vue'

  export default  {
    name: 'homepage',
    props: ['user','threads','setUser','getThreads'],
    components : {
      sidebar,threads
    }
}
</script>

<style scoped lang="css">
  .homepage {
    display: grid;
    /* background: radial-gradient(circle, #ffffff, #ced3ce); */
    /* background-image: linear-gradient(-60deg, #ffffff54,#e7ad25af ); */
    padding-top: 50px;
    min-height: 650px;
    padding-bottom: 200px;
  }
</style>
