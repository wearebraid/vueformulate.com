<template>
  <FormulateInput
    type="password"
    name="password"
    label="Choose a new password"
    validation="matches:/[0-9]/"
    error-behavior="live"
    :validation-messages="{ matches: 'Passwords must include a number.' }"
  />
</template>

<script>
export default {

}
</script>
