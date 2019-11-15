<template>
  <FormulateInput
    type="text"
    label="What ice cream flavor?"
    help="Note: We're fresh out of strawberries and bananas."
    name="flavor"
    validation="required|not:strawberry,banana"
  />
</template>
