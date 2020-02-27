<template>
  <div class="double-pane">
    <div class="pane">
      <FormulateInput
        v-model="value"
        :options="{first: 'First', second: 'Second', third: 'Third', fourth: 'Fourth'}"
        type="select"
        placeholder="Select an option"
        label="Which of your children is your favorite?"
      />
    </div>
    <code class="pane code">value: {{ value }}</code>
  </div>
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
