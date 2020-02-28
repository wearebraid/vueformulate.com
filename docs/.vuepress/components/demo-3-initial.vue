<template>
  <FormulateForm
    v-model="formValues"
  >
    <FormulateInput
      label="Username"
      name="username"
      autocomplete="no"
    />
    <FormulateInput
      label="Email"
      name="email"
      autocomplete="no"
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
