<template>
  <FormulateInput
    label="A gmail address (optional)"
    help="Enter a gmail email address."
    validation="optional|^email|ends_with:gmail.com"
    :validation-messages="{
     ends_with: 'Please use a gmail address.'
    }"
    error-behavior="live"
  />
</template>

<script>
export default {

}
</script>

<style>

</style>
