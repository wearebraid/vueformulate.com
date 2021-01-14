<template>
  <FormulateForm
    :schema="schema"
    @focus-username="focusedOn = 'username'"
    @focus-password="focusedOn = 'password'"
    @focus-confirm="focusedOn = 'confirm'"
    autocomplete="off"
  >
    Now we know the last focus was <strong>{{ focusedOn }}</strong>
  </FormulateForm>
</template>

<script>
export default {
  data () {
    return {
      focusedOn: 'Not yet focused',
      schema: [
        {
          "label": "Select a username",
          "type": "text",
          "name": "username",
          "@focus": "focus-username"
        },
        {
          "label": "Select a password",
          "type": "password",
          "name": "password",
          "@focus": "focus-password"
        },
        {
          "label": "Confirm your password",
          "validation": "confirm",
          "type": "password",
          "name": "password_confirm",
          "@focus": "focus-confirm"
        }
      ]
    }
  }
}
</script>
