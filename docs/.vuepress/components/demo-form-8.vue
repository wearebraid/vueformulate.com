<template>
  <FormulateForm
    invalid-message="Not all fields were filled out properly"
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
