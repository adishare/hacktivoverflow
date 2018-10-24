<template>
  <section class="threadcard">
    <div id="maincontainer">
  
      <a class="card-link" @click="$router.push({name: 'threaddetail',params: {id: thread._id}})">
        <article class="blog-card">
          <!-- <img class="post-image" :src="image" /> -->
          <!-- <img class="post-image" src="https://picsum.photos/300/300/?random" /> -->
          <div class="thread-details">
            <h4 class="post-category"> {{ inThread.category.join(', ') }} </h4>
  
            <VueEditForm v-if="editMode" :schema='schemaEdit' :model='model'></VueEditForm>
            <div v-if="editMode" v-html="contentEdit"></div>
            <vue-editor v-if="editMode" v-model="contentEdit"></vue-editor>
            <div class="buttonbar">
              <button v-if="editMode" type="button" v-on:click="editThread()" class="btn btn-primary">Update</button>
              <button v-if="editMode" type="button" v-on:click="editMode=false" class="btn btn-secondary">Cancel</button>
            </div>
            <div v-if="!editMode">
              <h3 class="post-title">{{ inThread.title }}</h3>
              <p class="post-description">
                <div v-if="!detail" v-html="inThread.content.slice(0,200)"></div>
                <p class="post-description">
                  <div v-if="detail" v-html="inThread.content"></div>
  
                  <p class="post-author">By {{ inThread.author.firstName+' '+inThread.author.lastName }}</p>
            </div>
          </div>
  
        </article>
      </a>
  
      <div class="cardfooter">
        <sharecomponent id="sharecmpnt" v-if="user" :thread='thread' :user='user'></sharecomponent>
        <div @click="like()">
          <p> <i class="likeBtn btn btn-secondary" v-if="likes.indexOf(user._id) != -1"> Unlike </i><i class="likeBtn btn btn-primary" v-if="likes.indexOf(user._id) == -1"> Like </i> ( {{likes.length}} ) </p>
        </div>
        <div id="cmtbtn" @click="$router.push({name: 'threaddetail',params: {id: thread._id}}); goComment()"> Comment ( {{comments.length}} ) </div>
        <div v-if="inThread.author._id == user._id & detail" @click="editMode = true"> Edit </div>
        <div v-if="inThread.author._id == user._id & detail" @click="deleteThread()"> Delete </div>
      </div>
  
      <div v-if="detail" class="commentbar">
  
        <div class='threadcomments'>
  
          <div v-for="comment in comments" :key="comment._id">
            <commentCard :votes='comment.likes' :getComments='getComments' :deleteComment='deleteComment' :formatthis='formatthis' :comment='comment' :thread='thread' :detail='detail' :user='user' :getThreads='getThreads'></commentCard>
          </div>
  
        </div>
  
        <div v-if="user" class="commentarea">
          <VueForm :schema='schema' :model='model'></VueForm>
        </div>
        <div v-if="user" style="align-self:start;">
          <button type="button" @click="postComment()" class="btn btn-primary">Post Comment</button>
        </div>
      </div>
  
    </div>
  </section>
</template>

<script>
  import VueForm from "vue-form-generator";
  import $ from 'jquery';
  import moment from 'moment';
  import sharecomponent from './Share.vue'
  import commentCard from './CommentCard.vue'
  import {
    VueEditor
  } from 'vue2-editor'
  
  export default {
    name: 'threadcard',
    props: ['thread', 'threads', 'detail', 'user', 'getThreads'],
    components: {
      VueEditor,
      VueForm: VueForm.component,
      sharecomponent,
      VueEditForm: VueForm.component,
      commentCard
    },
    created() {
      this.getComments()
    },
    data() {
      return {
        inThread: this.thread,
        likes: this.thread.likes,
        editMode: false,
        comments: [],
  
        contentEdit: this.thread.content,
        model: {
          commentContent: '',
  
          titleEdit: this.thread.title,
          contentEdit: this.thread.content
        },
  
        schema: {
          fields: [{
            type: 'textArea',
            model: 'commentContent',
            placeholder: 'Your Comment ...',
            rows: 3,
            max: 1000,
            hint: 'max 1000 char',
            validator: VueForm.validators.string
          }]
        },
  
        schemaEdit: {
          fields: [{
              type: "input",
              inputType: "text",
              label: 'Title Edit',
              model: "titleEdit",
              placeholder: "Thread Title",
              required: true,
            },
            // {
            //   type: "textArea",
            //   model: "contentEdit",
            //   label: 'Content Edit',
            //   placeholder: "Content",
            //   required: true,
            //   rows: 15,
            //   validator: VueForm.validators.string
            // }
          ]
        }
      }
    },
    methods: {
      like() {
        this.$server.post(`/threads/likes/${this.thread._id}/${this.user._id}`)
          .then((result) => {
            this.getThreads()
            this.likes = result.data.result.likes
          }).catch((err) => {
            this.$jBox.setContent(err.response.data.message)
            this.$jBox.open()
          });
      },
  
      deleteComment(commentId) {
        this.$server.delete(`/comments/${commentId}`)
          .then(() => {
            this.getComments()
          }).catch((err) => {
            this.$jBox.setContent(err.response.data.message)
            this.$jBox.open()
          });
      },
  
      editThread() {
        let self = this
        this.$server.put(`/threads/${this.thread._id}`, {
            title: self.model.titleEdit,
            content: self.contentEdit,
          })
          .then((result) => {
            this.getThreads()
            this.inThread = result.data
            this.editMode = false
          }).catch((err) => {
            this.$jBox.setContent(err.response.data.message)
            this.$jBox.open()
          });
      },
  
      deleteThread() {
        this.$server.delete(`/threads/${this.thread._id}`)
          .then(() => {
            this.getThreads()
            this.thread = this.thread
            this.$router.push('/')
          }).catch((err) => {
            this.$jBox.setContent(err.response.data.message)
            this.$jBox.open()
          });
      },
  
      postComment() {
        this.$server.post(`/comments/${this.thread._id}`, {
            user: this.user._id,
            commentContent: this.model.commentContent
          })
          .then(() => {
            this.getComments()
            this.model.commentContent = ''
          }).catch((err) => {
            this.$jBox.setContent(err.response.data.message)
            this.$jBox.open()
          });
      },
  
      getComments() {
        this.$server.get(`/comments/${this.thread._id}`)
          .then((result) => {
            this.comments = result.data
          }).catch((err) => {
            this.$jBox.setContent(err.response.data.message)
            this.$jBox.open()
          });
      },
      formatthis(date) {
        return moment(date).format('DD MMM YY - hh:mm')
      },
      goComment() {
        $('#comment').focus();
      }
  
    },
    watch: {
      '$route.params.id': function(newVal) {
        this.param = newVal
        this.getThreads()
        this.inThread = this.threads.filter(item => {
          return item._id == this.param
        })[0]
        this.getComments()
        this.likes = this.thread.likes
      }
    },
  }
</script>

<style scoped lang="css">
  p {
    margin-top: 13px;
  }
  
  .usercomment {
    background-color: #f0f0f057;
    display: grid;
    grid-template-rows: 1fe 1fr;
    grid-template-columns: 5fr 1fr;
  }
  
  .commentbar {
    /* width: 100%; */
    display: grid;
    grid-template-rows: 1fr minmax(30px, 100px) minmax(20px, 50px);
    justify-items: center;
    align-items: center;
    background-color: #fff;
    box-shadow: 0 0.1875rem 1.5rem rgba(0, 0, 0, 0.2);
    padding-top: 15px;
  }
  
  .buttonbar {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
  }
  
  .threadcomments {
    width: 100%;
    max-width: 90%;
    padding-top: 20px;
  }
  
  .commentarea {
    width: 100%;
    max-width: 90%;
    padding-top: 20px;
  }
  
  .threadcard {
    transition: .5s;
  }
  
  * {
    box-sizing: border-box;
  }
  
  *::before,
  *::after {
    box-sizing: border-box;
  }
  
  #maincontainer {
    max-width: 90%;
    margin: 0 auto;
    text-align: left;
  }
  
  #sharecmpnt {
    grid-column: 1 / span 1;
  }
  
  .cardfooter {
    grid-column: 1 / span 2;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    justify-items: center;
    align-items: center;
    background-color: #fff;
    box-shadow: 0 0.1875rem 1.5rem rgba(0, 0, 0, 0.2);
    min-height: 40px;
    /* z-index: 10; */
  }
  
  .cardfooter div {
    width: 100%;
    height: 100%;
    display: grid;
    justify-items: center;
    align-items: center;
  }
  
  i {
    font-size: 13px;
  }
  
  h6 {
    text-align: center;
  }
  
  h5 {
    text-align: right;
  }
  
  .cardfooter div:hover {
    cursor: pointer;
    background-color: rgb(219, 219, 219);
  }
  
  .blog-card {
    display: flex;
    flex-direction: row;
    background: #fff;
    box-shadow: 0 -0.2875rem 1.5rem rgba(0, 0, 0, 0.2);
    border-radius: 0.375rem;
    overflow: hidden;
    transition: .1s;
  }
  
  .blog-card:hover {
    cursor: pointer;
    box-shadow: 0 -0.2875rem 1.1rem rgba(0, 0, 0, 0.3);
  }
  
  .card-link {
    position: relative;
    display: block;
    color: inherit;
    text-decoration: none;
  }
  
  .card-link:hover .post-title {
    transition: color 0.3s ease;
    color: #e04f62;
  }
  
  .card-link:hover .post-image {
    transition: opacity 0.3s ease;
    opacity: 0.9;
  }
  
  .post-image {
    transition: opacity 0.3s ease;
    display: block;
    width: 100%;
    object-fit: cover;
  }
  
  .thread-details {
    padding: 2rem;
  }
  
  .post-category {
    display: inline-block;
    text-transform: uppercase;
    font-size: 0.75rem;
    font-weight: 700;
    line-height: 1;
    letter-spacing: 0.0625rem;
    margin: 0 0 0.75rem 0;
    padding: 0 0 0.25rem 0;
    border-bottom: 0.125rem solid #ebebeb;
  }
  
  .post-title {
    transition: color 0.3s ease;
    font-size: 1.125rem;
    line-height: 1.4;
    color: #121212;
    font-weight: 700;
    margin: 0 0 0.5rem 0;
  }
  
  .post-author {
    font-size: 0.875rem;
    line-height: 1;
    margin: 1.125rem 0 0 0;
    padding: 1.125rem 0 0 0;
    border-top: 0.0625rem solid #ebebeb;
  }
  
  @media (max-width: 40rem) {
    .blog-card {
      flex-wrap: wrap;
    }
  }
  
  @supports (display: grid) {
    .post-image {
      height: 100%;
    }
    .blog-card {
      display: grid;
      grid-template-columns: 2fr;
      grid-template-rows: 1fr;
    }
    @media (max-width: 40rem) {
      .blog-card {
        grid-template-columns: auto;
        grid-template-rows: 12rem 1fr;
      }
    }
  }
</style>
