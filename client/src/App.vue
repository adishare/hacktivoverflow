<template>
  <div id="app">
  
    <navbar :setUser="setUser" :setMessage="setMessage" :setFilteredThreads='setFilteredThreads' :getThreads="getThreads" :user='user' :threads="threads"></navbar>
  
    <div class="sidebarnview">
      <sidebar :user='user' :threads='threads' :setUser='setUser'></sidebar>
      <transition name="fade" mode="out-in">
        <router-view :setUser="setUser" :user='user' :threads="threads" :getThreads="getThreads"></router-view>
      </transition>  
    </div>

    <chatcomponent :setUser="setUser" :user='user'></chatcomponent>
  
  </div>
</template>

<script>
  import navbar from '@/components/Navbar.vue'
  import chatcomponent from '@/components/Chat.vue'
  import sidebar from '@/components/Sidebar.vue'
  
  export default {
    components: {
      navbar,
      sidebar,
      chatcomponent,
    },
    name: 'App',
    data() {
      return {
        user: '',
        message: '',
        filteredThreads: '',
        threads: '',
        token: localStorage.getItem('token') || ''
      }
    },
    created() {
      this.getThreads()
    },
    mounted() {
      if (this.token) {
        this.getUserByToken(this.token)
      }
      if (this.filteredThreads) {
        this.threads = this.filteredThreads
      }
    },
    watch: {
      filteredThreads: function(newval) {
        this.threads = newval
      }
    },
    methods: {
      setFilteredThreads: function(val) {
        this.filteredThreads = val
      },
      setUser: function(val) {
        this.user = val
      },
      setMessage: function(val) {
        this.message = val
      },
  
      getThreads() {
        this.$server.get('/threads')
          .then((result) => {
            this.threads = result.data
          })
          .catch(function(error) {
            console.log(error);
          })
      },
  
      getUserByToken(token) {
        this.$server.get(`/users/verify/${token}`, {})
          .then((result) => {
            this.user = result.data
          })
          .catch(function(error) {
            console.log(error);
          })
      },
  
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /* text-align: center; */
    color: #2c3e50;
    box-sizing: border-box;
  }
  
  .fade-enter-active,
  .fade-leave-active {
    transition-duration: 0.15s;
    transition-property: opacity;
    transition-timing-function: ease;
  }
  
  .fade-enter,
  .fade-leave-active {
    opacity: 0
  }
  
  .sidebarnview {
    display: grid;
    grid-template-columns: 2fr 5fr;
  }
</style>
