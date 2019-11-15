<template>
  <div>
    <FormulateInput
      type="range"
      min="5"
      max="35"
      name="Age"
      label="How old are you?"
      validation="between:10,18"
      error-behavior="live"
      v-model="age"
    />
    {{ age }}
  </div>
</template>

<script>
export default {
  data () {
    return {
      age: 15
    }
  }
}
</script>

<style>

</style>
