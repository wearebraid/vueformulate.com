# Inputs

Inputs are the base element of Vue Formulate and using them is very easy. To begin,
simply use the `<FormulateInput />` component tag to declare any
type of input field and you get validation, model binding, file uploads, and
a plugin system to boot. Here's an example of changing the input type itself:

<demo-4-inputs />

::: details View source
```vue
<template>
  <div>
    <FormulateInput
      label="Change an input type"
      type="radio"
      :options="types"
      v-model="type"
    />
    <FormulateInput
      label="Favorite B10 football team?"
      :type="type"
      name="team"
      :options="{nebraska: 'Nebraska', ohiost: 'Ohio St.', michigan: 'Michigan'}"
      value="nebraska"
      error-behavior="live"
      validation="required|matches:nebraska"
      validation-name="Team name"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      type: 'select',
      types: {
        select: 'Select list',
        radio: 'Radio list',
        text: 'Text field',
        textarea: 'Text area',
        checkbox: 'checkbox',
      }
    }
  }
}
</script>
```
:::

## Model binding

Checkout the [Getting Started](/guide/#model-binding) documentation for details
on how to bind models to `FormulateInput` fields.

## Setting an initial value

There are three ways to set the initial value of a field:

- Using `v-model`
- Using the `value` prop
- Using a `FormulateForm`

### Initial value with `v-model`

Using `v-model` to set the initial value of an input field is as simple as
declaring a data property to use as the `v-model`

```vue
<template>
  <FormulateInput
    type="text"
    v-model="myModel"
  />
</template>

<script>
export default {
  data () {
    return {
      myModel: 'Initial value'
    }
  }
}
</script>
```
**Output:**
<demo-2-initial />

### Initial value with value prop

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

### Initial value with `FormulateForm`

Frequently, it’s important to set the initial value for a whole collection of
field elements, like on an update form. You can easily do this by allowing
a wrapping `FormulateForm` to set the value of its fields:

```vue
<template>
  <FormulateForm
    v-model="formValues"
  >
    <FormulateInput
      label="Username"
      name="username"
    />
    <FormulateInput
      label="Email"
      name="email"
    />
  </FormulateForm>
</template>

<script>
export default {
  data () {
    return {
      formValues: {
        username: 'mojiko',
        email: 'mojiko@gmail.com'
      }
    }
  }
}
</script>
```
**Output:**
<demo-3-initial />

## All Options

Each `FormulateInput` can be customized by adding a few props on it. The
list below contains all of the available universal options:

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
`value`           | An initial unbound value (use when `v-model` or form binding is not a good option)
`validation`      | A `string` or `array` of validation rules. See [input validation](/guide/validation)
`validation‑name` | The name to use in validation error messages. By default, this uses the `name` prop if available and falls back to the `label` prop. It can be explicitly overridden here if needed.
`error`           | A custom error message to be manually shown on an element (validation errors are generated on their own). This error will always be visible (if you want to remove it, use a dynamic prop).
`errors`          | An array of custom error messages to show on an element (see above).
`error‑behavior`  | By default, error messages are only shown when the `blur` event fires on an input, or a `<FormulateForm>` element is submitted with errors. This behavior can be changed to `live` which will display all error messages for the input immediately as a user interacts with an element. This is useful in the case of inputs such as range sliders where you may want validation feedback to be immediate.
`show‑errors`     | When `true` this forces an element to show it’s errors regardless of the state of the `error-behavior`
