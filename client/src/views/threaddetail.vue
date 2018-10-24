<template>
  <section class="threaddetail">

    <transition name="fade">
      <div id="delly">
        <threadcard class="classcard" :thread='thread' :threads='threads' :detail='detail' :user='user' :getThreads='getThreads'></threadcard>
      </div>
    </transition>

    <router-view/>
  </section>
</template>



<script>
  import sidebar from '../components/Sidebar';
  import threadcard from "../components/threadcard";
  import $ from 'jquery'
  
  export default {
    name: 'threaddetail',
    props: ['threads', 'user','getThreads'],
    components: {
      sidebar,
      threadcard
    },
    data() {
      return {
        thread: '',
        param: this.$route.params.id,
        detail: true
      }
    },
    created() {
      this.getThread()
    },
    mounted() {
      this.getThread()
    },
    watch: {
      '$route.params.id': function(newVal) {
        $("#delly").css("display", "none");
        $("#delly").fadeIn(800).css("display", "normal")
        this.param = newVal
        this.thread = this.threads.filter(item => {
          return item._id == this.param
        })[0]
  
      },
      thread: {
        immediate: true,
        handler() {
          //
        }
      }
    },
    methods: {
      getThread() {
        this.thread = this.threads.filter(item => {
          return item._id == this.param
        })[0]
      }
    }
  }
</script>

<style scoped lang="css">
  .threaddetail {
    display: grid;
    /* grid-template-columns: 2fr 5fr; */
    /* background-color: rgba(251, 255, 227, 0.226); */
    background: radial-gradient(circle, #ffffff, #ced3ce);
    padding-top: 50px;
    min-height: 650px;
    transition: .5s;
    padding-bottom: 130px;
  }
  
  .hidden {
    display: none;
  }
  
  .fade-enter-active {
    transition: opacity 1.5s;
  }
  
  .fade-leave-active {
    opacity: 0;
  }
  
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
</style>
