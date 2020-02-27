<template>
<FormulateInput
  label="How long do you think you’ll live?"
  type="range"
  name="range"
  min="0"
  max="100"
  value="45"
  validation="required|min:10|max:90"
  error-behavior="live"
/>
</template>
