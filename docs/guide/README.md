# Introduction

Vue Formulate aims to be the easiest way to build forms using [Vue](https://vuejs.org/).
Like Vue itself, with Vue Formulate "easy" doesn't mean that you have to sacrifice power.
Web forms commonly appear deceptively simple to build at first blush, but experienced
engineers are familiar with how they can quickly grow in complexity and become difficult
to implement well. Raise your hand if web forms are your favorite part of a project.
Anyone...? Bueller?

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
these features as easy as possible.

## Input elements
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
a `textarea` in HTML is not an `<input>` element, but in Vue Formulate you
only need to remember to change the `type`.

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

### Input features

When building a real-world forms there are typically a variety of input element
types and extra features surrounding an `<input>` in order to create a delightful
experience. Often a `<div>` wrapper, a `<label>`, perhaps a `<small>` for help
text, maybe another `<div>` for validation messages.

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
Outputs:

<demo-3-inputs />

## Input props
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
`validation`      | A `string` or `array` of validation rules. See [input validation](/guide/validation)
`validation‑name` | The name to use in validation error messages. By default this uses the `name` prop if available and falls back to the `label` prop. It can be explicitly overridden here if needed.
`error`           | A custom error message to be manually shown on an element (validation errors are generated on their own)
`errors`          | An array of custom error messages to show on an element.
`error‑behavior`  | By default, error messages are only shown when the `blur` event fires on an input, or a `<FormulateForm>` element is submitted with errors. This behavior can be changed to `live` which will display all error messages for the input immediately as a user interacts with element. This is useful in the case of inputs such as range sliders where you may want validation feedback to be immediate.
`show‑errors`     | When `true` this forces an element to show it’s errors regardless of the state of the `error-behavior`
