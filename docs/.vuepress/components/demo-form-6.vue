<template>
  <div class="double-pane">
    <div class="pane">
      <FormulateForm
        v-model="values"
      >
        <FormulateInput
          label="Select your meal"
          v-model="meal"
          type="select"
          :options="{burger: 'Hamburger', pasta: 'Pasta'}"
          help="Notice this field wont end up in the form data."
          ignored
        />
        <FormulateInput
          v-if="meal === 'burger'"
          label="Build your own burger"
          type="checkbox"
          name="burger"
          :options="{
            meat: 'Meat',
            lettuce: 'Lettuce',
            tomato: 'Tomato',
            cheese: 'Cheese'
          }"
        />
        <FormulateInput
          label="Select a pasta sauce"
          v-if="meal === 'pasta'"
          type="radio"
          name="sauce"
          :options="{
            bolognese: 'Bolognese',
            carbonara: 'Carbonara',
            tortellini: 'Tortellini'
          }"
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
      values: {},
      meal: {}
    }
  }
}
</script>
