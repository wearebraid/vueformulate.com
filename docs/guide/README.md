# Introduction

Vue Formulate is the easiest way to build forms using [Vue](https://vuejs.org/).
Forms are surprisingly tedious to create — Vue Formulate is built to increase
developer happiness by anticipating pain points and exposing a clean APIs with
sensible defaults that make implementing common features as easy as possible.
In fact, there are only 2 components that need to be learned to create nearly
any type of form: `FormulateInput` and `FormulateForm`.

✓ Create any input element with a single component<br>
✓ Supports Vue `v-model` [binding](#model-binding)<br>
✓ [Re-populate an entire form](/guide/forms/#setting-initial-values) from a single object<br>
✓ [Generate a form](/guide/forms/#generating-forms) using json<br>
✓ Easy to add field labels<br>
✓ Easy to add help text<br>
✓ Easy to add [form validation](/guide/validation)<br>
✓ Easy to add [custom validation](/guide/validation/#custom-validation-rules) rules<br>
✓ Easy to modify [validation messages](/guide/validation/#customize-validation-messages)<br>
✓ Easy to add [custom inputs](/guide/custom-inputs)

## Inputs
Every type of input in Vue Formulate is an instance of the `FormulateInput`
component. This component is used whether you need a text input, password,
select list, checkbox, or date picker. It doesn't get much easier
to remember than that.

### A simple example
The simplest implementation of Vue Formulate is just outputting a
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
to get the desired element, even if the internal html structure differs. For example
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

Adding input and form validation is a core feature. Fortunately it’s easy to add.

```vue
<FormulateField
  type="email"
  name="email"
  validation="required|email"
/>
```

Read more about on the [validation documentation page](/guide/validation).

## Model binding

Vue Formulate uses model binding (`v-model`) to read/write values in and out of
inputs. You can bind data on a `<FormulateInput>`, `<FormulateForm>`, or both (read
the [forms](#forms) documentation for information on form binding).


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


### What it isn’t

While Vue Formulate is a powerful tool for building forms there are some things
this package does not aim to do:

  1. This is not a form _layout_ tool. Want inputs next to each other? Cool!
    Just wrap some inputs in a `<div>` and sprinkle on the `flexbox`. This
    package assumes you'll still be responsible for form layout.
  2. This package is BYOB — bring your own backend. Vue Formulate doesn't care
    a lick about the backend you choose (the closest it gets to caring is when
    using [file inputs](/guide/inputs/file))
