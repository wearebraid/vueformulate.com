<template>
  <FormulateInput
    type="text"
    validation="required|foobar"
    label="The foobar field"
    placeholder="Can you type foobar?"
    error-behavior="live"
    :validation-rules="{
      foobar: ({ value }) => ['foo', 'bar'].includes(value)
    }"
    :validation-messages="{
      foobar: 'The value must be foo or bar'
    }"
  />
</template>

<script>
export default {

}
</script>

<style>

</style>
