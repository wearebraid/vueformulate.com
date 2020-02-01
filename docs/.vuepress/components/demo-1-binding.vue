<template>
  <div class="demo-1-binding">
    <FormulateInput
      type="text"
      label="What is your name?"
      v-model="value"
    />
    <strong>Hello <em>{{ value }}</em>!</strong>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: 'My initial value'
    }
  }
}
</script>

<style scoped>
.demo-1-binding {
  position: relative;
  z-index: 10;
}
</style>
