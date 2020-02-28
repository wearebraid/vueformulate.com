<template>
  <FormulateForm
    v-model="formValues"
  >
    <FormulateInput
      label="Username"
      name="username"
      autocomplete="new-password"
    />
    <FormulateInput
      label="Email"
      name="email"
      autocomplete="new-password"
    />
  </FormulateForm>
</template>

<script>
export default {
  data () {
    return {
      formValues: {
        username: 'mojiko',
        email: 'mojiko@gmail.com'
      }
    }
  }
}
</script>
