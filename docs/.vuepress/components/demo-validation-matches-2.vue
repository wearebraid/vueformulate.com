<template>
  <FormulateInput
    type="text"
    name="language"
    placeholder="node, php, java..."
    label="What is your favorite server side language?"
    validation="matches:node,php,java"
    error-behavior="live"
    autocomplete="no"
  />
</template>

<script>
export default {

}
</script>

<style>

</style>
