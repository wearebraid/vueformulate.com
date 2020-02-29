---
layout: HomeLayout
home: true
heroImage: /logo.svg
heroText: Vue Formulate
tagline: The easiest way to build forms with Vue
actionText: Get Started →
actionLink: /guide/
features:
- title: Developer happiness
  details: Forms are everywhere, yet surprisingly tedious to author — well, not anymore. Vue Formulate provides a powerful and flexible API to developers that makes complex form creation a breeze.
- title: A single input element
  details: With Vue Formulate you don't need to remember the names of a dozen components — all form elements are created with a single component. Easy!
- title: Built-in validation
  details: Ridiculously easy validation out-of-the-box to handle 95% of use-cases. Help text, validation rules, and validation messages are simple props. Need more? You can add custom validations too.
- title: Plugin system
  details: Extend Vue Formulate's functionality or reuse custom inputs, validation rules, and messages across projects by tapping into the plugin system. Make your plugin open source to share with others!
- title: Generate forms
  details: Generate an entire form from a JSON string. Because Vue Formulate uses a single input component, you can easily loop through an array and dynamically generate a form.
- title: Bring your own styles
  details: Vue Formulate has simple semantic classes that make styling inputs a snap. Roll your own styles or choose one of our pre-baked themes.
footer: MIT Licensed | Written by Braid LLC
---

```vue live
<template>
  <div class="formulate-playground">
    <h2>Live Vue Formulate Demo</h2>
    <p>Edit the code to modify the form</p>
    <FormulateForm
      v-model="AllFormValues"
      class="demo-form"
      @submit="handleSubmission"
    >
      <FormulateInput
        label="My First Vue Formulate Input"
        placeholder="Type your text here..."
        name="firstInput"
      />
      <FormulateInput
        name="email"
        type="email"
        label="What is your email?"
        validation="required|email"
        help="We wont’t sell it...for cheap."
        placeholder="jon@example.com"
      />
      <!-- Try changing the "type" to radio or select -->
      <FormulateInput
        name="opinion"
        type="checkbox"
        label="What do you think of Vue Formulate?"
        :options="{
          good: 'It’s good',
          great: 'It’s great',
          install: 'I’m installing it now.'
        }"
        validation="required"
      />
      <FormulateInput
        type="submit"
        label="Save feedback"
      />
    </FormulateForm>

    <pre v-text="AllFormValues">
  </div>
</template>

<script>
export default {
  data () {
    return {
      AllFormValues: {}
    }
  }
}
</script>
```