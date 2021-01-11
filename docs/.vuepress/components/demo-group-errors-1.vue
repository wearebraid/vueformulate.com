<template>
  <FormulateInput
    type="group"
    :repeatable="true"
    name="invitees"
    :group-errors="{
      '0.email': 'This email is already in use.',
      '1.name': 'Yeah...pretty sure “Rensmold” isn’t a real last name.'
    }"
    :value="[
      { name: 'Todd Berkins', email: 'todd@example.com' },
      { name: 'Stella Rensmold', email: 'stella@example.com' },
    ]"
  >
    <FormulateInput
      name="name"
      label="Invitee's name"
    />
    <FormulateInput
      name="email"
      label="What is this user's email?"
    />
  </FormulateInput>
</template>
