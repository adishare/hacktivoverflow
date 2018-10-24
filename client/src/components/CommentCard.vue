<template>
  <section class="comment-card">
    <div class="usercomment">
      <h6> " {{ inComment.commentContent }} " </h6>
      <div>
        Total Votes : {{inVotes.length}}
        <div v-if="user" @click="vote()">
          <i v-if="inVotes.indexOf(user._id) != -1">  
              <button type="button" class="btn btn-secondary">Down Vote </button>  
            </i>
          <i v-if="inVotes.indexOf(user._id) == -1">  
              <button type="button" class="btn btn-primary">Up Vote </button>  
            </i>
  
        </div>
      </div>
  
      <h6> By {{ inComment.user.firstName+' '+inComment.user.lastName }} <br> <i> at {{ formatthis(inComment.createdAt) }} </i></h6>
      <h6 v-if="inComment.user._id == user._id"> <i> <button type="button" @click="deleteComment(inComment._id)" class="btn">REMOVE</button> </i> </h6>
    </div>
  
  </section>
</template>

<script>
  export default {
    name: 'comment-card',
    props: ['deleteComment', 'votes', 'thread', 'detail', 'user', 'getThreads', 'comment', 'formatthis', 'getComments'],
    data() {
      return {
        inVotes: this.votes,
        inComment: this.comment
      }
    },
    methods: {
      vote() {
        this.$server.post(`/comments/votes/${this.comment._id}/${this.user._id}`)
          .then((result) => {
            this.getThreads()
            this.inVotes = result.data.result.likes
          }).catch((err) => {
            this.$jBox.setContent(err.response.data.message)
            this.$jBox.open()
          });
      },
    },
    watch: {
      '$route.params.id': function() {
        this.getComments()
        this.inVotes = this.votes
      }
    }
  }
</script>

<style scoped lang="css">
  /* .comment-card {} */
  
  .usercomment {
    padding: 15px;
    margin-bottom: 10px;
    background-color: #f0f0f057;
    display: grid;
    grid-template-rows: 1fe 1fr;
    grid-template-columns: 5fr 1fr;
    grid-gap: 10px;
  }
</style>
