<template>
  <FormulateInput
    type="textarea"
    v-model="value"
    label="Enter a tweet in the box"
    validation="required|max:50,length"
    validation-name="tweet"
    :help="`Keep it under 50 characters. ${50 - value.length} left.`"
    error-behavior="live"
  />
</template>

<script>
export default {
  data () {
    return {
      value: ''
    }
  }
}
</script>

