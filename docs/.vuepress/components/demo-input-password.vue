<template>
  <FormulateInput
    type="password"
    name="sample"
    label="Sample password input"
    placeholder="Sample password placeholder"
    help="Sample password help text"
    validation="required|min:10,length"
    validation-name="Password"
    error-behavior="live"
    autocomplete="new-password"
  />
</template>
