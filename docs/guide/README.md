# Introduction

Vue Formulate is the easiest way to build forms using [Vue](https://vuejs.org/).

Although forms are required in almost every project developers encounter they are
surprisingly tedious to create. Vue Formulate is built to increase developer happiness
by anticipating pain points and exposing clean APIs — with sensible defaults — that
make implementing common features effortless. In fact, **there are only 2
components that need to be learned** to create nearly any type of form: `FormulateInput`
and `FormulateForm`.

With Vue Formulate developers are empowered to:

✓ Create any input element with a single component<br>
✓ Use native `v-model` [binding](#model-binding) across all input types<br>
✓ [Re-populate an entire form](/guide/forms/#setting-initial-values) from a single object<br>
✓ [Generate a form](/guide/forms/#generating-forms) using JSON<br>
✓ Easily add field labels<br>
✓ Easily add help text<br>
✓ [Group fields](/guide/inputs/types/group/) into custom data structures<br>
✓ [Repeat grouped fields](/guide/inputs/types/group/#repeatable-groups) for complex UIs<br>
✓ Perform robust [form validation](/guide/validation)<br>
✓ Crate [custom validation](/guide/validation/#custom-validation-rules) rules<br>
✓ Modify default [validation messages](/guide/validation/#customize-validation-messages)<br>
✓ Create and share [custom inputs](/guide/custom-inputs)<br>
✓ Override default component templates with [scoped slots](/guide/inputs/slots)<br>

## Inputs
Every type of input in Vue Formulate is an instance of the `FormulateInput`
component. This component is used whether you need a text input, password,
select list, checkbox, or date picker. It doesn't get much easier
to remember than that.

### A simple example
The simplest implementation of Vue Formulate is outputting a
single `FormulateInput` with no additional configuration:

```vue
<FormulateInput type="text" />
```
**Output**:

<demo-1-inputs />

Familiar right? This is essentially equivalent to the native HTML:

```html
<input type="text">
```

### Outputting different input types
**All Vue Formulate inputs share this same syntax.** Swap out the value of `type`
to get the desired element, even if the internal HTML structure differs. For example
a `<textarea>` is a completely different element than `<input>` in HTML, but in
Vue Formulate you only need to remember to change the `type`.

```vue
<FormulateInput type="textarea" />
```

**Output**:

<demo-2-inputs />

::: tip
With Vue Formulate you only need to use the supplied `FormulateInput` element and
pass the appropriate `type` to generate the input type that you need. No need to
remember a variety of component names to handle different input types.
:::

## Validation

Input and form validation are a core feature and easy to add.

```vue
<FormulateInput
  type="email"
  name="email"
  validation="required|email"
/>
```

<demo-2-validation />

Read more about on the [validation documentation page](/guide/validation).

## Model binding

Vue Formulate uses model binding (`v-model`) to read/write values in and out of
inputs. You can bind data on a `<FormulateInput>`, `<FormulateForm>`, or both (read
the [forms](/guide/forms) documentation for information on form binding).


```vue
<template>
  <div>
    <FormulateInput
      type="text"
      label="What is your name?"
      v-model="value"
    />
    <strong>Hello <em>{{ value }}</em>!</strong>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: 'My initial value'
    }
  }
}
</script>
```

**Output:**

<demo-1-binding />

### Double binding

Because the input's value is bound to the model you can bind the
model to multiple inputs, even triggering validation errors on those other
elements.

```vue
<template>
  <div>
    <FormulateInput
      type="text"
      label="Favorite car brand?"
      validation="not:Toyota"
      validation-name="car brand"
      error-behavior="live"
      v-model="brand"
    />
    <FormulateInput
      type="radio"
      v-model="brand"
      error-behavior="live"
      validation="in:Toyota,Honda"
      :options="{Toyota: 'I like Toyota', Honda: 'I like Honda' }"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      brand: 'Honda'
    }
  }
}
</script>
```
**Output:**
<demo-2-binding />

### Array binding

Certain types of inputs set an `array` of values on their model.

```vue
<FormulateInput
  type="checkbox"
  label="Which animals make good pets?"
  v-model="pets"
  :options="{dog: 'Dogs', alligators: 'Alligators', cat: 'Cats'}"
/>
```
**Output:**


<demo-3-binding />


:::tip Read more...
Model binding isn't all you can do with a `FormulateInput` element! There are
lots of additional configuration options.

Read more on the [inputs page →](/guide/inputs)
:::

### Form binding

In addition to binding values to individual `FormulateInput` fields, you can
also collect all the values from a collection of inputs by wrapping them in
a `FormulateForm` and placing a `v-model` on that element.


```vue
<FormulateForm
  v-model="formValues"
>
  <FormulateInput
    name="name"
    label="What is your name?"
    validation="required"
  />
  <FormulateInput
    name="age"
    label="How old are you?"
    validation="required|number|max:120"
  />
  <FormulateInput
    type="submit"
    label="Sign up"
  />
</FormulateForm>
```

<demo-form />

:::tip Read more...
That’s not all folks...the `FormulateForm` element has several other really
valuable features like form submission, group validation, and file uploads.

Read more about [using forms →](/guide/forms)
:::


## What it isn’t

While Vue Formulate is a powerful tool for building, validating, and handling errors
on forms — there are some things this package does not aim to do:

  1. This is not a UI framework or a _layout_ tool. Want inputs next to each
    other? Cool! Wap some inputs in a `<div>` and sprinkle on some `flexbox`.
    This package assumes you'll still be responsible for your form layout.
  2. This package is BYOB — bring your own backend. Vue Formulate doesn't care
    a lick about the backend you choose (the closest it gets to caring is when
    using [file inputs](/guide/inputs/file))

## Why not...?

### Vuetify

Vuetify is full UI framework while Vue Formulate is a focused tool for building
forms. Some people prefer not to use large UI frameworks, don’t have them on a
pre-existing project, don’t want to learn a new framework, or just prefer
writing their own narrowly scoped styles. Also, we think composing forms in
Vue Formulate is second-to-none.

### Buefy

Similar to Vuetify, Beufy is a full UI framework. If you’re already using Bulma
or you're looking for a comprehensive UI solution it’s a solid choice.
Vue Formulate is happy to live in the context of any UI framework and still
offers the benefits of slick form composition, validation, and error handling
to name a few. Even still there are plenty of people who don’t want or need a
full UI framework that would benefit from Vue Formulate’s focused approach.

### vue-forms

The `vue-forms` package is focused exclusively on form validation, while
Vue Formulate takes a more holistic and opinionated approach to forms and ships
with UI scaffolding, validation, and data modeling. We wanted to make form
composition _a lot easier_ for developers while still increasing the overall
quality — try it out.

### VeeValidate

VeeValidate is another great option for Vue form validation, and thats it’s
primary mission — validation. Vue Formulate makes building high quality forms
easier by including validation as a sub-feature of the field composition itself.
Building forms with Vue Formulate is super easy and blazing fast — of course if
you need the extra validation power, you still have it. You can write any [custom
validation logic](/guide/validation/#custom-validation-rules) you want, even on
individual fields.

### Vuelidate

Yet another great option for form validation, but focused solely on validation.
Vue Formulate provides additional scaffolding allowing developers to create complex
forms with minimal friction with validation and error handling included.

### vue-form-generator

Generating forms from JSON is great, and also a sub-feature of Vue Formulate. Since
Vue Formulate uses a single element to create any input type form generation from
a JSON string or JavaScript module is as simple as using a `v-for` directive.
[Checkout the documentation](/guide/forms/#generating-forms).
