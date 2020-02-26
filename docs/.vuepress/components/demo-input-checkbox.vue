<template>
  <div class="double-pane">
    <div class="pane">
      <FormulateInput
        v-model="value"
        type="checkbox"
        label="This is a single checkbox"
      />
    </div>
    <code class="pane code">value: {{ value }}</code>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: false
    }
  }
}
</script>

<style>

</style>
