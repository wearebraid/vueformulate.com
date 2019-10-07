<template>
  <p class="demo">
    <FormulateInput
      type="text"
      placeholder="Your name here"
    />
    {{ textInput }}
    <FormulateInput
      type="textarea"
      placeholder="Once upon a time..."
    />
    <FormulateInput
      type="select"
      :options="{value1: 'First Option', value2: 'Second Option'}"
      placeholder="Select an option"
    />
    <FormulateInput
      type="checkbox"
      label="I agree to terms"
    />
  </p>
</template>

<script>
export default {
}
</script>
