<template>
  <FormulateInput
    type="month"
    name="sample"
    label="Sample month input"
    placeholder="Sample month placeholder"
    help="Sample month help text"
    validation="required|after:2019-01-01"
    min="2018-12"
    max="2021-01"
    error-behavior="live"
  />
</template>
