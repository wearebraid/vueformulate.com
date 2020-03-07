<template>
  <FormulateForm
    :errors="{
      username: 'That username is already taken',
      password: ['You can’t re-use an old password', 'That password was too weak']
    }"
  >
    <FormulateInput
      name="username"
      label="Select a username"
      type="text"
    />
    <FormulateInput
      name="password"
      label="Choose your password"
      type="password"
    />
  </FormulateForm>
</template>

<script>
export default {

}
</script>

<style>

</style>
