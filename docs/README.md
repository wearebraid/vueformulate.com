---
layout: HomeLayout
home: true
heroImage: /logo.svg
heroText: Vue Formulate
tagline: The easiest way to build forms with Vue
actionText: Get Started →
actionLink: /guide/
features:
- title: 😎 Developer happiness
  details: Forms are everywhere, yet surprisingly tedious to author — well, not anymore. Vue Formulate provides a powerful and flexible API to developers that makes complex form creation a breeze.
- title: ☝️ A single input element
  details: With Vue Formulate you don't need to remember the names of a dozen components — all form elements are created with a single component. Easy!
- title: 🎯 Built-in validation
  details: Ridiculously easy validation out-of-the-box to handle 95% of use-cases. Help text, validation rules, and validation messages are simple props. Need more? You can add custom validations too.
- title: 🔌 Plugin system
  details: Extend Vue Formulate's functionality or reuse custom inputs, validation rules, and messages across projects by tapping into the plugin system. Make your plugin open source to share with others!
- title: ✨ Generate forms
  details: Generate an entire form from a JSON string. Because Vue Formulate uses a single input component, you can easily loop through an array and dynamically generate a form.
- title: 🎨 Bring your own styles
  details: Vue Formulate has simple semantic classes that make styling inputs a snap. Roll your own styles or choose one of our pre-baked themes.
footer: MIT Licensed | Written by Braid LLC
---


### Complex Validation made simple
Vue Formulate includes 18 rules w/ support for defining your own
```html live
<FormulateInput
  type="email"
  label="What is your email?"
  validation="required|email"
  placeholder="jon@example.com"
/>
```


### Single-element inputs provide flexibility
Try Changing the input type to "checkbox" or "select"

```html live
<FormulateInput
  type="radio"
  label="What do you think of Vue Formulate?"
  :options="{
    good: 'It’s good',
    great: 'It’s great',
    install: 'I’m installing it now.'
  }"
/>
```

### Well-considered file uploading
Handle complex upload requirements in your apps (this demo does not actually upload your images).
```html live
<FormulateInput
  type="image"
  label="Gallery Images"
  help="Select jpg image(s) to upload."
  validation="mime:image/jpeg"
  multiple
/>
```

### FormulateForm elements allow for easy value grouping
Effortlessly ensure all fields have validated and model field values to a single object
```vue live
<template>
  <FormulateForm v-model="values">
    <FormulateInput
      name="name"
      label="What is your email?"
      validation="required|email"
      placeholder="jon@example.com"
    />
    <FormulateInput
      name="flavor"
      type="checkbox"
      label="Which ice cream do you like?"
      validation="required|min:1,length"
      :options="{ vanilla: 'Vanilla', chocolate: 'Chocolate', strawberry: 'Strawberry'}"
    />
    <FormulateInput type="submit" />
    <pre>{{ values }}</pre>
  </FormulateForm>
</template>

<script>
export default {
  data () { return { values: {} } }
}
</script>
```