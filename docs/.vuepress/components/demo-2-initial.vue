<template>
  <FormulateInput
    type="text"
    v-model="myModel"
    autocomplete="new-password"
  />
</template>

<script>
export default {
  data () {
    return {
      myModel: 'Initial value'
    }
  }
}
</script>
