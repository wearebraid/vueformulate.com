<template>
  <FormulateInput
    type="select"
    label="What nationality’s food is the best?"
    name="food"
    :options="{
      french: 'French',
      italian: 'Italian',
      german: 'German',
      indian: 'Indian'
    }"
    placeholder="Select a food type"
    validation="required|in:italian,indian"
    error-behavior="live"
    value="french"
    :validation-messages="{
      required: 'Please pick your favorite food',
      in: ({ value }) => `Oh, ${value} food isn’t very good...`
    }"
  />
</template>
