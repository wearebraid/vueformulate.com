<template>
  <FormulateForm
    @submit="submit"
  >
    <FormulateInput
      label="New password"
      type="password"
      name="password"
      validation="required"
      autocomplete="no"
    />
    <FormulateInput
      label="Confirm password"
      type="password"
      name="password_confirm"
      validation="required|confirm"
      validation-name="Password confirmation"
      autocomplete="no"
    />
    <FormulateInput
      type="submit"
      label="Change password"
    />
  </FormulateForm>
</template>

<script>
export default {
  methods: {
    submit () {
      alert('passed validation')
    }
  }
}
</script>

<style>

</style>
