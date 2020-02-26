<template>
  <FormulateInput
    type="text"
    v-model="myModel"
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
