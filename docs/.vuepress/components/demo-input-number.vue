<template>
  <FormulateInput
    type="number"
    name="sample"
    label="Sample number input"
    placeholder="Sample number placeholder"
    help="Sample number help text"
    validation="required|number|between:10,20"
    min="0"
    max="100"
    error-behavior="live"
  />
</template>
