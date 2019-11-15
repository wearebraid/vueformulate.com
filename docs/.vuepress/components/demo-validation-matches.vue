<template>
  <div class="groupable">
    <FormulateInput
      class="groupable--first"
      type="text"
      name="color"
      placeholder="#00ff00"
      label="Enter a hexidecimal color value"
      :validation="[['matches', /^#[a-fA-F0-9]{6}$/]]"
      error-behavior="live"
      v-model="color"
    />
    <FormulateInput
      type="color"
      label="Or pick one"
      v-model="color"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      color: ''
    }
  }
}
</script>

<style scoped>
.groupable {
  display: flex;
  width: 100%;
}
.groupable--first {
  margin-right: 2em;
}
</style>
