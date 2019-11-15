# Introduction

VueFormulate aims to be the easiest way to build forms using [Vue](https://vuejs.org/),
but that doesn't mean you have to sacrifice power. Web forms seem easy to
build at first blush, but as any engineer knows they can be get complicated and
tedious to implement well.

Consider some of the things a single input "field" needs to account for: Markup
for each type (text, textarea, select etc), a label, an initial value when
empty, initial state when pre-populated (like an edit form), help text, field
validation (required, valid email, password confirmation etc), error messages
from front end validation or the backend, data bindings (v-model or events), and
more. Vue Formulate is built to increase developer happiness by making all of
these features as easy as possible.

## Input elements

Every type of input in Vue Formulate is an instance of the `FormulateInput`
component. This component is used whether you need a text input, password,
select list, checkbox, or date picker, etc — this makes it easy to remember.

### Input types

The simplest implementation of Vue Formulate is just out putting a
single `FormulateInput`:

```vue
<FormulateInput type="text" />
```
Outputs:

<demo-1-inputs />

Familiar right? This is essentially equivalent to the native HTML:

```html
<input type="text">
```

**All formulate inputs have this same syntax.** Just swap out the `type` and
you get the desired element, even if the html structure differs. For example
a `textarea` in HTML is not an `<input>` element, but in Vue Formulate you
only need to remember to change the `type`.

```vue
<FormulateInput type="textarea" />
```

Outputs:

<demo-2-inputs />

### Input features

When building an actual form however, there are typically lots of additional
elements and features surrounding an `<input>` in order to make a delightful
experience. Often a `<div>` wrapper, a `<label>`, perhaps a `<small>` for help
text, maybe another `<div>` for validation messages.

With Vue Formulate, inputs include all of these features:

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
Outputs:

<demo-3-inputs />

## Input props 

::: tip Note
Some `FormulateInput` types have additional props specific to that type. Please
reference the input library for the type you're implementing.
:::

Prop              | Description
------------------|-------------------------------------------------------------
`type`            | *Required.* The type of input element. [See the input library](/guide/inputs) for a full range of options.
`label`           | A descriptive label for the input element.
`label‑position`  | Most input elements place the label before the input by default. The `box` [classification](/guide/inputs/box) places labels after by default, but either can be overridden with this prop.
`name`            | Adds a name attribute, and when used with `<FormulateForm>` this is the key of the field. If no name is defined a random hash will be assigned
`help`            | Help text to be displayed with the input.
`placeholder`     | The placeholder attribute of the element (if applicable)
`validation`      | A `string` or `array` of validation rules. See [input validation](/inputs/validation)
`validation‑name` | The name to use in validation error messages. By default this uses the `name` prop, then the `label` prop.
`error`           | A custom error message to show on an element (validation errors are generated on their own)
`errors`          | An array of custom error messages to show on an element.
`error‑behavior`  | By default, error messages are only shown when the `blur` event fires on an input, or a `<FormulateForm>` element is submitted with errors. This behavior can be changed to `live` which will display all error messages for the input immediately.
`show‑errors`     | When `true` this forces an element to show it’s errors regardless of the state of the `error-behavior`
