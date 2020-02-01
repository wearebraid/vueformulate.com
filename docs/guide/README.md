# Introduction

Vue Formulate aims to be the easiest way to build forms using [Vue](https://vuejs.org/)
while maintaining tremendous power. Web forms appear deceptively simple to build,
but experienced engineers are familiar with how they can quickly grow in
complexity and become difficult to implement well. Raise your hand if web forms
are your favorite part of a project. Anyone...? Bueller?

What's behind this? Consider some of the things a single input "field" needs to
account for:

- Markup for each input type (text, textarea, select etc)
- A label
- An initial value when empty
- An initial state when pre-populated (such as in the case of an edit form for
an existing piece of content)
- Help text
- Field validation (required, valid email, password confirmation etc)
- Error messages from front-end validation or the back-end
- Data bindings (v-model or events)
- and more...

Vue Formulate is built to increase developer happiness by anticipating all of
these needs and exposing a clean API and sensible defaults that make implementing
these features as easy as possible. In fact, there are only 2 components that
need to be learned to create nearly any type of form: `FormulateInput` and
`FormulateForm`.

### What it's not

While Vue Formulate is a powerful tool for building forms there are some things
this package does not aim to do:

  1. This is not a form _layout_ tool. Want inputs next to each other? Cool!
    Just wrap some inputs in a `<div>` and sprinkle on the `flexbox`. This
    package assumes you'll still be responsible for form layout.
  2. This package is BYOB — bring your own backend. Vue Formualte doesn't care
    a lick about the backend you choose (the closest it gets to caring is when
    using [file inputs](/inputs/files))

## Inputs
Every type of input in Vue Formulate is an instance of the `FormulateInput`
component. This component is used whether you need a text input, password,
select list, checkbox, or date picker, etc — it doesn't get much easier
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
remember a variety of component names in order to handle different input types.
:::


## Model binding

Vue Formulate uses model binding (`v-model`) to read/write values in and out of
inputs. You can bind data on a `<FormulteInput>`, `<FormulateForm>`, or both (read
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

Of course, because the input's value is bound to the model you can bind the
model to multiple inputs, and even trigger validation errors on those other
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

### Setting an initial value

Sometimes it's helpful to set the initial value of a field without binding a
model. This can be done with the `value` prop, no `v-model` necessary:

```vue
<FormulateInput
  type="text"
  value="One time initial value"
/>
```
**Output:**
<demo-1-initial />

::: tip
Note: When using `v-model` and `value` on the same `<FormulateInput>` the
initial value will use the `v-model` value over the `value`.
:::

## Input features

When building a real-world forms there are typically a variety of input element
types and extra features surrounding an `<input>` in order to create a delightful
experience. Often a `<div>` wrapper, a `<label>`, perhaps a `<small>` for help
text, maybe event a `<ul>` for validation messages.

With Vue Formulate, `FormulateInput` components provide all of these features:

```vue
<FormulateInput
  type="text"
  label="Your name"
  help="What is your full name?"
  placeholder="Enter your full name"
  validation="required"
  error="My custom error message"
  error-behavior="live"
/>
```
**Output:**

<demo-3-inputs />

::: tip Note
Some `FormulateInput` types have props that are specific to their type. Please
reference the input library for the type you're implementing to see all available
props.
:::

Prop              | Description
------------------|-------------------------------------------------------------
`type`            | *Required.* The type of input element. [See the input library](/guide/inputs/text) for a full range of options.
`label`           | A descriptive label for the input element.
`label‑position`  | Most input elements place the label before the input by default. The `box` [classification](/guide/inputs/box) places labels after by default, but either can be overridden with this prop.
`name`            | Adds a name attribute, and when used with `<FormulateForm>` this is the key of the field. If no name is defined a random hash will be assigned
`help`            | Help text to be displayed with the input.
`placeholder`     | The placeholder attribute of the element (if applicable)
`value`           | An initial unbound value (use when `v-model` or form binding is not good option)
`validation`      | A `string` or `array` of validation rules. See [input validation](/guide/validation)
`validation‑name` | The name to use in validation error messages. By default this uses the `name` prop if available and falls back to the `label` prop. It can be explicitly overridden here if needed.
`error`           | A custom error message to be manually shown on an element (validation errors are generated on their own). This error will always be visible (if you want to remove it, use a dynamic prop).
`errors`          | An array of custom error messages to show on an element (see above).
`error‑behavior`  | By default, error messages are only shown when the `blur` event fires on an input, or a `<FormulateForm>` element is submitted with errors. This behavior can be changed to `live` which will display all error messages for the input immediately as a user interacts with element. This is useful in the case of inputs such as range sliders where you may want validation feedback to be immediate.
`show‑errors`     | When `true` this forces an element to show it’s errors regardless of the state of the `error-behavior`

## Forms

- More TK -

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
