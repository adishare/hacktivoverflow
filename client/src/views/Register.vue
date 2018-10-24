<template lang="html">
  <section class="register">
  
    <h1>Register</h1>
    <div class="panel-body">
      <form>
        <formRegister :schema="schema" :model="model"></formRegister>
        <button type="button" @click="register()" class="btn btn-primary">Register</button>
      </form>
    </div>
  
  </section>
</template>

<script lang="js">
  import VueFormGenerator from "vue-form-generator";
  
  export default {
    name: 'register',
    components: {
      formRegister: VueFormGenerator.component
    },
    data() {
      return {
        model: {
          firstName: '',
          lastName: '',
          email: '',
          password: '',
  
          gender: '',
          age: '',
          avatar: '',
        },
  
        schema: {
          fields: [{
              type: "input",
              inputType: 'text',
              label: 'FIRST NAME',
              model: 'firstName',
              placeholder: 'Your First Name',
              required: true,
            },
            {
              type: "input",
              inputType: 'text',
              label: 'LAST NAME',
              model: 'lastName',
              placeholder: 'Your Last Name',
              required: true,
            },
            {
              type: "input",
              inputType: 'email',
              label: 'EMAIL',
              model: 'email',
              placeholder: 'Your Email',
              required: true,
            },
            {
              type: "input",
              inputType: 'password',
              label: 'PASSWORD',
              model: 'password',
              placeholder: 'Your Password',
              required: true,
            },
            {
              type: "select",
              label: "Gender",
              model: "gender",
              values: ["Male", "Female"],
              required: true,
            },
            {
              type: "select",
              label: "Age",
              model: "age",
              required: true,
              values: [18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28,
                29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
                40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50
              ]
            }
          ]
        }
      }
    },
    methods: {
      register() {
        this.$server.post('/register', {
            firstName: this.model.firstName,
            lastName: this.model.lastName,
            email: this.model.email,
            password: this.model.password,
            gender: this.model.gender,
            age: this.model.age,
            avatar: this.model.avatar
          })
          .then(() => {
            this.$jBox.setContent('Registered . Please login to continue')
            this.$jBox.open()
            setTimeout(() => {
              this.$jBox.close()
              this.$router.push('/login')
            }, 1000);
          })
          .catch((err) => {
            this.$jBox.setContent(err.response.data.message)
            this.$jBox.open()
          });
      }
    },
  }
</script>

<style scoped>
  .register * {
    border: none;
  }
  
  .register {
    margin-bottom: 150px;
    padding-top: 40px;
  }
  
  form {
    margin: 0 auto;
    max-width: 400px;
  }
</style>
