<template>
  <div class="double-pane">
    <div class="pane">
      <FormulateInput
        @validation="validation = $event"
        name="breath"
        label="How many minutes can you hold your breath?"
        validation="required|number|between:1,10,value"
      />
    </div>
    <code
      class="pane code"
      v-text="validation"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      validation: {}
    }
  }
}
</script>
