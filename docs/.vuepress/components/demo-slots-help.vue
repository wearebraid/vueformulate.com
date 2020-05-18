<template>
  <FormulateInput
    type="textarea"
    label="Compose your email"
    help="[f_name] = First Name<br>[l_name] = Last Name"
    :value='"Dear [f_name],\nHow have you been doing?"'
  >
    <template #help="{ help }">
      <!-- opt-into using HTML formatting -->
      <small v-html="help" />
    </template>
  </FormulateInput>
</template>

<script>
export default {

}
</script>

<style>

</style>
