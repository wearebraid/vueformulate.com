<template>
  <FormulateInput
    type="date"
    name="sample"
    label="Sample date input"
    placeholder="Sample date placeholder"
    help="Sample date help text"
    validation="required|after:2019-01-01"
    min="2018-12-01"
    max="2021-01-01"
    error-behavior="live"
  />
</template>
