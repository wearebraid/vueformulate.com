<template>
  <div class="double-pane">
    <div class="pane">
      <FormulateForm v-model="values">
        <FormulateInput
          type="select"
          name="planet"
          label="What is your favorite rocky planet?"
          :options="{ mercury: 'Mercury', venus: 'Venus', earth: 'Earth', mars: 'Mars' }"
        />
        <FormulateInput
          v-if="values.planet === 'earth'"
          key="earth"
          name="earth_moon"
          label="What is the name of earth’s moon?"
        />
        <FormulateInput
          v-if="values.planet === 'mars'"
          key="mars"
          name="mars_sunset"
          label="What color is the Martian sunset?"
        />
      </FormulateForm>
    </div>
    <code class="pane code">{{ values }}</code>
  </div>
</template>

<script>
export default {
  data () {
    return {
      values: {}
    }
  }
}
</script>
