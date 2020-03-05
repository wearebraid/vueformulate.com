<template>
  <FormulateForm
    :errors="{ username: ['Username is too short', 'Username is already taken' ] }"
  >
    <FormulateInput
      name="username"
      label="Select a username"
      :errors="['Username is too short', 'Invalid username characters']"
    />
  </FormulateForm>
</template>

<script>
export default {

}
</script>

<style>

</style>
