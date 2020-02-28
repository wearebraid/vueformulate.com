<template>
  <FormulateForm
    @submit="submit"
  >
    <FormulateInput
      label="New password"
      type="password"
      name="password"
      validation="required"
      autocomplete="new-password"
    />
    <FormulateInput
      label="Confirm password"
      type="password"
      name="password_confirm"
      validation="required|confirm"
      validation-name="Password confirmation"
      autocomplete="new-password"
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
