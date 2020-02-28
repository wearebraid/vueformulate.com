<template>
  <div>
    <FormulateInput
      type="text"
      label="Your name"
      help="What is your full name?"
      placeholder="Enter your full name"
      validation="required"
      error="My custom error message"
      error-behavior="live"
      autocomplete="new-password"
    />
  </div>
</template>

<script>
export default {
  name: 'demo-3-inputs'
}
</script>
