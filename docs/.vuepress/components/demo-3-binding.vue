<template>
  <div class="double-pane">
    <div class="pane">
      <FormulateInput
        type="checkbox"
        label="Which animals make good pets?"
        v-model="pets"
        :options="{dog: 'Dogs', alligators: 'Alligators', cat: 'Cats'}"
      />
    </div>
    <code
      class="pane code"
      v-text="pets"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      pets: []
    }
  }
}
</script>
