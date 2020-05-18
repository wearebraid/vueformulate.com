<template>
  <FormulateForm
    name="login"
    @submit="setSomeErrors"
    v-model="formData"
    class="login-form"
  >
    <h2 class="form-title">Login</h2>
    <FormulateInput
      name="email"
      label="Email"
      validation="required|email"
    />
    <FormulateInput
      name="password"
      label="Password"
      validation="required"
    />
    <FormulateErrors />
    <div class="actions">
      <FormulateInput
        type="submit"
      />
      <FormulateInput
        type="button"
        label="Reset"
        data-ghost
        @click="reset"
      />
    </div>
    <code class="code code--block">{{ formData }}</code>
  </FormulateForm>
</template>

<script>
export default {
  data () {
    return {
      formData: {}
    }
  },
  methods: {
    setSomeErrors () {
      // do some processing...
      const errors = {
        fieldErrors: { username: 'Sorry, no such username exists!' },
        formErrors: ['Incorrect login, please try again.']
      }
      this.$formulate.handle(errors, 'login')
    },
    reset () {
      this.$formulate.reset('login')
    }
  }
}
</script>

<style>
.actions {
  display: flex;
  margin-bottom: 1em;
}
.actions .formulate-input {
  margin-right: 1em;
  margin-bottom: 0;
}
.login-form {
  padding: 2em;
  border: 1px solid #a8a8a8;
  border-radius: .5em;
  max-width: 500px;
  box-sizing: border-box;
}
.form-title {
  margin-top: 0;
}
</style>
