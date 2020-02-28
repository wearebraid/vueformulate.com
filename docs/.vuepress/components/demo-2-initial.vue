<template>
  <FormulateInput
    type="text"
    v-model="myModel"
    autocomplete="no"
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
