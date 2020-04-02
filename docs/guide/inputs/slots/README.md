# Slots

Sometimes it’s necessary to override the markup or structure of Vue Formulate’s
inputs. Vue Formulate has 3 mechanisms by which it customize an input:

  - Slot components
  - Scoped slots
  - Custom input types

## Context object

All of 3 methods of creating and customizing inputs require an understanding of
Vue Formulate’s internal `context` object. This gives a full awareness
of nearly every aspect of the input, the input’s model and even other inputs in
the same `FormulateForm` (if applicable). The following properties are part of
the "public" api, and are safe to use.

Property        | Description
----------------|---------------------------------------------------------------
`attributes`    | An object of non-prop attributes passed to the input like `placeholder`
`blurHandler`   | Function that must be called when an input blurs.
`classification`| The classification of the input.
`errors`        | Errors set via the form [error handling](/guide/forms/error-handling/) or directly on the input itself via `error` or `errors` props. Does not include validation errors.
`hasLabel`      | `Boolean` indicating if the field has a label prop, `button` classification is always `false`.
`hasValidationErrors` | Function, returns a `Promise` that resolves to a `Boolean`.
`help`          | The `help` prop value (help text)
`getValidationErrors` | Function, returns a `Promise` that resolves to an array of validation error objects.
`id`            | The id prop or an auto-generated id.
`imageBehavior` | The value of the `image-behavior` prop. Defaults to `preview`.
`label`         | The value of the `label` prop.
`labelPosition` | The position of the label, `before` or `after`. Default is `before` for all except `box` classified inputs. Can be overridden with `label-position` prop.
`model`         | The value of the current field, bound to a setter.
`name`          | The name of the field, if none is set, it auto-generates a name.
`options`       | The `options` prop converted to an array (when applicable).
`performValidation` | Function that will run validation. this is executed on every input even already.
`preventWindowDrops` | `true` by default, this prevents the browser from navigating to a file when the user misses the dropzone.
`setErrors`     | Function to set (or clear) the current `errors` (not validation errors).
`showValidationErrors` | `Boolean`, true if the validation errors should be displayed.
`type`          | The type of input.
`uploadBehavior` | The `upload-behavior` prop, `live` or `delayed`.
`uploader`      | [Uploader function](/guide/inputs/types/file/#uploader). `uploader` prop, `axios`, or `uploader` defined when initializing.
`uploadUrl`     | The `upload-url` prop, or the `uploadUrl` defined when initializing.
`validationErrors` | An `array` of the current validation errors irregardless of their visibility.
`value`         | The `value` prop, not the current value of the field. This is the exact value passed into the `value` prop, usually used to set the initial value of the field.
`visibleValidationErrors` | `Array` of the current validation errors being displayed.


::: warning
If you inspect the context object, you may find additional properties not listed
in the table above. Using these is discouraged since they are not considered
available for public consumption and may change between minor versions.
:::

## Scoped slots

Scoped slots are a common

::: tip Note
Vue Formulate recommends using scoped slots for occasional overrides, but not as
the primary method for extending Vue Formulate. Read the [Preamble on custom
input documentation](/guide/inputs/custom-inputs/) for more detail.
:::

## Available slots

### Label

```vue
  <FormulateInput
    type="text"
    label="Select a username"
  >
    <template #label="{ label, id }">
      <label :for="id">
        {{ label }}
        <svg
          v-tooltip="'Pick a username that you’ll remember.'"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
        >
          <path d="M50,11A39,39,0,1,0,89,50,39.05,39.05,0,0,0,50,11Zm4,55a4,4,0,0,1-8,0V47a4,4,0,0,1,8,0ZM50,38a4,4,0,1,1,4-4A4,4,0,0,1,50,38Z" />
        </svg>
      </label>
    </template>
  </FormulateInput>
```
<demo-slots-label />

### Help text

```vue
  <FormulateInput
    type="textarea"
    label="Compose your email"
    help="[f_name] = First Name<br>[l_name] = Last Name"
    :value='"Dear [f_name],\nHow have you been doing?"'
  >
    <template #help="{ help }">
      <!-- opt-into using HTML formatting -->
      <small v-html="help" />
    </template>
  </FormulateInput>
```
<demo-slots-help />


## Slot components
