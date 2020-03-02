<template>
  <FormulateForm v-model="values">
    <FormulateInput
      name="name"
      label="What is your email?"
      validation="required|email"
      placeholder="jon@example.com"
    />
    <FormulateInput
      name="flavor"
      type="checkbox"
      label="Which ice cream do you like?"
      validation="required|min:1"
      :options="{ vanilla: 'Vanilla', chocolate: 'Chocolate', strawberry: 'Strawberry'}"
    />
    <FormulateInput type="submit" />
    <pre>{{ values }}</pre>
  </FormulateForm>
</template>

<script>
export default {
  data () { return { values: {} } }
}
</script>
