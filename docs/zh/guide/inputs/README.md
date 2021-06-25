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

Checkout the [Getting Started](/zh/guide/#model-binding) documentation for details
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
**输出:**
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
**输出:**
<demo-1-initial />

::: tip
Note: When using `v-model` and `value` on the same `<FormulateInput>` the
initial value will use the `value` over the `v-model`, updating the `v-model`
to match.
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
**输出:**
<demo-3-initial />

## Props
Each `FormulateInput` can be configured by declaring props. The list below
contains all of the available universal options:

::: tip Note
Some `FormulateInput` types have props that are specific to their type. Please
reference the input library for the type you're implementing to see all available
props.
:::

Prop              | Description
------------------|-------------------------------------------------------------
`debounce`        | A debounce delay (in milliseconds) before the input's `model` is updated.
`disableErrors`   | Will not show any error messages when set to true.
`error`           | A custom error message to be manually shown on an element (validation errors are generated on their own). This error will always be visible (if you want to remove it, use a dynamic prop).
`errors`          | An array of custom error messages to show on an element (see above).
`error‑behavior`  | Defines when error messages are shown. Can be `blur` (default), `submit`, `value`, or `live`. Anytime a `<FormulateForm>` element is submitted errors are also shown. `live` will always display all error messages for the input, and `value` will show errors immediately after content has been entered into the field.
`help-position`   | The position of the help text `before` or `after` (default is `after`).
`help`            | Help text to be displayed with the input.
`id`              | The id of the input (defaults to an auto-generated one)
`keep-model-data` | Keeps the input's data in the model when removing it from a `FormulateForm`.
`label`           | A descriptive label for the input element.
`label‑position`  | Most input elements place the label before the input by default. The `box` [classification](/zh/guide/inputs/types/box/) places labels after by default, but either can be overridden with this prop.
`name`            | Adds a name attribute, and when used with `<FormulateForm>` this is the key of the field. If no name is defined a random hash will be assigned
`options`         | Array or object of options (`select` or `box` classifications)
`placeholder`     | The placeholder attribute of the element (if applicable)
`show‑errors`     | When `true` this forces an element to show it’s errors regardless of the state of the `error-behavior`.
`type`            | *Required.* The type of input element. [See the input library](/zh/guide/inputs/types/text/) for a full range of options.
`validation-rules` | See [custom validation rules](/zh/guide/validation/#custom-validation-rules).
`validation`      | A `string` or `array` of validation rules. See [input validation](/zh/guide/validation)
`validation‑messages` | See [custom validation messages](/zh/guide/validation/#customize-validation-messages).
`validation‑name` | The name to use in validation error messages. By default, this uses the `name` prop if available and falls back to the `label` prop. It can be explicitly overridden here if needed.
`value`           | An initial unbound value (use when `v-model` or form binding is not a good option)
## Events

These events are emitted by every input type (in addition to native DOM events).

Event               | Description
--------------------|-------------------------------------------------------------
`@input`            | Emitted every time the value of the field changes. Typically this is used implicitly by using `v-model`.
`@validation`       | Emitted anytime the state of validation changes for an input, irregardless of the visibility of the errors (`v2.3+`). [More details](/zh/guide/validation/#validation-event)
`@error-visibility` | Emitted when the visibility of the errors changes, for example, on blur or submit (`v2.3+`).
`@blur-context`     | Emitted on blur, but includes the input's context as the payload.

## Context object

All inputs contain a comprehensive context object that details nearly everything
about the operation of the input. It is passed into all [custom inputs](/zh/guide/inputs/custom-inputs/)
and slots.

Property        | Description
----------------|---------------------------------------------------------------
`addLabel`      | The label to display inside "add more" button on `group` and `file[multiple]` inputs.
`attributes`    | An object of non-prop attributes passed to the input like `placeholder`
`blurHandler`   | Function that must be called when an input blurs.
`classification`| The classification of the input.
`disableErrors` | `Boolean` indicating if errors should be _displayed_ for this field (defaults to `false`).
`errors`        | Errors set via the form [error handling](/zh/guide/forms/error-handling/) or directly on the input itself via `error` or `errors` props. Does not include validation errors.
`hasValue`      | `Boolean` indicates if the field has a valid value.
`hasLabel`      | `Boolean` indicating if the field has a label prop, `button` classification is always `false`.
`hasValidationErrors` | Function, returns a `Promise` that resolves to a `Boolean`.
`help`          | The `help` prop value (help text)
`helpPosition`  | The position of the help text, `before` or `after` the element wrapper. Defaults to `before`.
`getValidationErrors` | Function, returns a `Promise` that resolves to an array of validation error objects.
`id`            | The id prop or an auto-generated id.
`isValid`       | `Boolean` indicating if the field has no errors at all (visible or not).
`imageBehavior` | The value of the `image-behavior` prop. Defaults to `preview`.
`isSubField`    | A function that returns a `boolean` indicating if it is a descendant of a `group` type.
`label`         | The value of the `label` prop.
`labelPosition` | The position of the label, `before` or `after`. Default is `before` for all except `box` classified inputs. Can be overridden with `label-position` prop.
`limit`         | For a `group` type, this is the is the maximum number of repeatable items allowed (default is `Infinity`).
`minimum`       | For a `group` type, this is the minimum number of repeatable items allowed (default is `0`).
`model`         | The value of the current field, bound to a setter.
`name`          | The name of the field, if none is set, it auto-generates a name.
`options`       | The `options` prop converted to an array (when applicable).
`performValidation` | Function that will run validation. This is executed on every input automatically.
`preventWindowDrops` | `true` by default, this prevents the browser from navigating to a file when the user misses the dropzone.
`removeLabel`   | The label to display inside "remove" button on `group` inputs.
`repeatable`    | `Boolean` indicating if a field is repeatable or not.
`rootEmit`      | `Function` identical to `$emit`, but should be used in custom inputs and slots to emit events from the root `<FormulateInput>`.
`rules`         | `Array` of validation rules on the input. Array is populated with objects containing `{ ruleName: string, args: [] }`.
`setErrors`     | Function to set (or clear) the current `errors` (not validation errors).
`showValidationErrors` | `Boolean`, true if the validation errors should be displayed.
`type`          | The type of input.
`uploadBehavior` | The `upload-behavior` prop, `live` or `delayed`.
`uploader`      | [Uploader function](/zh/guide/inputs/types/file/#uploader). `uploader` prop, `axios`, or `uploader` defined when initializing.
`uploadUrl`     | The `upload-url` prop, or the `uploadUrl` defined when initializing.
`validationErrors` | An `array` of the current validation errors irregardless of their visibility.
`value`         | The `value` prop, not the current value of the field. This is the exact value passed into the `value` prop, usually used to set the initial value of the field.
`visibleValidationErrors` | `Array` of the current validation errors being displayed.


::: warning
If you inspect the context object, you may find additional properties not listed
in the table above. Using these is discouraged since they are not considered
available for public consumption and may change between minor versions.
:::
