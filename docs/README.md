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
---
# Live Code Examples

### Form validation
Vue Formulate includes [20 rules](/guide/validation/) and support for defining your own.
```html live
<FormulateInput
  type="email"
  label="What is your school email address?"
  validation="required|email|ends_with:.edu"
  validation-name="School email"
  placeholder="user@university.edu"
/>
```


### Single-element inputs
Try changing `type="radio"` to `checkbox` or `select` in this demo.

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
File uploads done well, right out of the box.
```html live
<FormulateInput
  type="image"
  label="Gallery Images"
  validation="mime:image/jpeg,image/jpg,image/png"
  help="Don’t worry — our demo doesn't upload your image"
  multiple
/>
```

### Model your entire form with one object
Effortlessly ensure all fields have validated and `v-model` field values to a single object.
```vue live
<template>
  <FormulateForm v-model="values">
    <FormulateInput
      type="email"
      name="email"
      label="What is your email?"
      validation="required|email"
      placeholder="jon@example.com"
    />
    <FormulateInput
      name="flavor"
      type="checkbox"
      label="Which flavor ice cream do you like?"
      validation="required|min:1"
      :options="{ vanilla: 'Vanilla', chocolate: 'Chocolate', strawberry: 'Strawberry', pineapple: 'Pineapple'}"
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
