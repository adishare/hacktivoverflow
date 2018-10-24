<template lang="html">
  <section class="creator">
  
    <h1>Create Thread</h1>
    <div class="panel-body">
      <form>
        <formRegister :schema="schema" :model="model"></formRegister>
        <div style="max-width: 100%; text-align: unset;" >
          <div v-html="content"></div>
          <vue-editor v-model="content"></vue-editor>
        </div>
        <br>
        <button type="button" v-on:click="create()" class="btn btn-primary">Save</button>
      </form>
    </div>
  
  </section>
</template>

<script>
  import VueFormGenerator from "vue-form-generator";
  import {VueEditor} from 'vue2-editor'
  
  export default {
    name: 'creator',
    props: ['user', 'getThreads'],
    computed : {
      
    },
    created(){

    },
    components: {
      formRegister: VueFormGenerator.component,
      VueEditor
    },
    data() {
      return {
        content : '',
        model: {
          authorName: this.user.firstName + ' ' + this.user.lastName,
          author: this.user._id,
          title: '',
          content: '',
          category: '',
        },
        schema: {
          fields: [{
              type: "input",
              inputType: "text",
              label: "Author",
              model: "authorName",
              readonly: true,
              disabled: true
  
            },
            {
              type: "input",
              inputType: "text",
              label: "Title",
              model: "title",
              placeholder: "Thread Title",
              required: true,
            },
            // {
            //   type: "textArea",
            //   label: "Thread Content",
            //   model: "content",
            //   placeholder: "Content",
            //   rows: 4,
            //   validator: VueFormGenerator.validators.string
            // },
            {
              type: "checklist",
              label: "Category",
              model: "category",
              values: [{
                  name: "javascript"
                },
                {
                  name: "goLang"
                },
                {
                  name: "Tecnology"
                },
                {
                  name: "Kawai"
                }
              ],
              checklistOptions: {
                value: "name"
              }
            }
          ]
        }
  
      }
    },
    methods: {
      create() {
        
        this.$server.post('/threads', {
            author: this.user._id,
            title: this.model.title,
            content: this.content,
            category: this.model.category
  
          })
          .then(() => {
            this.getThreads()
            this.$router.push('/')
          })
          .catch((error)=> {
            this.$jBox.setContent(error.response.data.message)
            this.$jBox.open()
          })
      }
    }
  
  }
</script>

<style scoped lang="css">
  form {
    margin: 0 auto;
    max-width: 90%;
  }
</style>
