<template>
  <FormulateInput
    type="range"
    min="5"
    max="35"
    name="Age"
    label="How old are you?"
    validation="between:10,18,value"
    :show-value="true"
    :value="15"
    error-behavior="live"
  />
</template>

<script>
export default {
}
</script>

<style>

</style>
