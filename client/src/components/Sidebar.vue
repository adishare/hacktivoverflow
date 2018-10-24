<template>
  <section class="sidebar">
    <profileSec v-if="user" :user='user' :setUser='setUser'></profileSec>
        <ul class="rolldown-list" id="myList">
      <div class="listthread" >
        <li @click="$router.push('/')"> All </li>
      </div>
    </ul>
    <br>
    <ul class="rolldown-list" id="myList">
      <div class="listthread" v-for="thread in threads" :key="thread._id">
        <li :class="{ 'liactive' : $route.params.id == thread._id}" @click="goToDetail(thread._id)"> {{ thread.title.slice(0,20) }} </li>
      </div>
    </ul>
  </section>
</template>

<script lang="js">
  import profileSec from './Profile'
  export default {
    name: 'sidebar',
    props: ['user', 'threads','setUser'],
    components: {
      profileSec
    },
    created(){

    },
    methods: {
      goToDetail(threadId) {
        this.$router.push({
          name: 'threaddetail',
          params: {
            id: threadId
          }
        })
      }
    },
  }
</script>

<style scoped>
  .sidebar {
    padding-left: 18px;
    padding-top: 60px;
    margin-bottom: 100px;
  }

  .liactive {
    margin-left: 15px;
    margin-right: -20px;
    background-color: rgba(255, 55, 29, 0.493) !important;
    color: white;
  }
  
  .listthread {
    font: 1.2em/1.4 'Oswald', sans-serif;
    color: rgb(19, 19, 19);
    text-align: left;
    max-width: 400px;
    margin: 0 auto;
  }
  
  .rolldown-list {
    text-align: left;
    padding: 0;
    margin: 0;
  }
  
  .rolldown-list li {
    padding: 0.5em;
    margin-bottom: .225em;
    display: block;
    list-style: none;
    text-transform: uppercase;
    transition: .3s;
  }
  
  .rolldown-list li:hover {
    cursor: pointer;
    background-color: rgba(255, 120, 42, 0.486) !important;
    margin-left: -10px !important;
    margin-right: -10px !important;
    color: rgb(46, 46, 46);
  }
  
  .rolldown-list li {
    visibility: hidden;
    animation: rolldown .7s 1;
    transform-origin: 50% 0;
    animation-fill-mode: forwards;
    box-shadow: 0 0 10px rgb(182, 182, 182);
    padding-left: 30px;
    border-radius: 5px;
  }
  
  .rolldown-list li:nth-child(2n) {
    background-color: rgb(255, 255, 255);
  }
  
  .rolldown-list li:nth-child(2n+1) {
    background-color: rgb(255, 255, 255);
  }
  
  /* #myList {} */
  
  #btnReload {
    float: right;
    color: #333;
    background: #ccc;
    text-transform: uppercase;
    border: none;
    padding: .5em 1em;
  }
  
  
  @keyframes rolldown {
    0% {
      visibility: visible;
      transform: rotateX(180deg) perspective(500px);
    }
    70% {
      visibility: visible;
      transform: rotateX(-20deg);
    }
    100% {
      visibility: visible;
      transform: rotateX(0deg);
    }
  }
</style>
