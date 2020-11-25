<template>
  <FormulateForm
    :invalid-message="invalidMessage"
    @submit="() => {}"
  >
    <FormulateInput
      label="Email"
      type="email"
      name="email"
      validation="required|email"
    />
    <FormulateInput
      label="First name"
      name="first_name"
      validation="required"
    />
    <FormulateInput
      label="Last name"
      name="first_name"
      validation="required"
    />
    <!-- Form errors will show here -->
    <FormulateErrors />
    <FormulateInput type="submit" />
  </FormulateForm>
</template>

<script>
export default {
  methods: {
    invalidMessage(fields) {
      const fieldNames = Object.keys(fields)
      const listOfNames = fieldNames.map(fieldName => fieldName.replace('_', ' '))
      return `Invalid fields: ${listOfNames.join(', ')}`
    }
  }
}
</script>
