# Slots <Badge text='2.3.0'/>

Sometimes it’s necessary to override the markup or structure of Vue Formulate’s
inputs. Vue Formulate has 3 mechanisms by which it customize an input:

  - Slot components
  - Scoped slots
  - Custom input types

## Available slots

There are several available slots exposed by Vue Formulate, and they can all be
leveraged by using either [scoped slots](#scoped-slots) or [slot components](#slot-components).
All slots are passed the [context object](#context-object) via scoped slot.

Slot name      | Description
---------------|----------------------------------------------------------------
`label`        | The label value that will appear `before` or `after` the input element, default is a `<label>` element.
`element`      | The primary element slot. The component rendered by default in this slot is determined by the plugin's `options.library` values.
`help`         | The help text value that appears after the element.
`errors`       | The errors that are displayed for a given input. Defaults to a `FormulateErrors` component.
`default`      | The `default` slot is already reserved for use as a pass-through on the `element` slot. Some input types leverage this, lik [buttons](/guide/inputs/types/button/).
`grouping`     | The region of a `group` type that contains all the repeated fields.
`repeatable`   | The region of a `group` type that contains each repeatable row.
`addMore`      | The add more button on a repeatable `group` type.


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


## Scoped slots

Scoped slots are a common pattern in Vue and are well supported in Vue Formulate
as well. 

::: tip Note
Vue Formulate recommends using scoped slots for occasional overrides, but not as
the primary method for extending Vue Formulate. Read the [Preamble on custom
input documentation](/guide/inputs/custom-inputs/) for more detail.
:::

## Slot components

Let’s say, on a given project, you wanted to change all labels to include a
little tooltip next to the label value. You could certainly do that with scoped
slots, but it would require a ton of copy and paste or wrapping every
`FormulateInput` both bad options. Using “slot components” you can override the
default value of any of the [available slots](#available-slots) with your own
component.

### Global slot components

To replace the default value of every instance of an available slot, simply
register your component with Vue Formulate using the `slotComponents` option:

```js
import Vue from 'vue'
import VueFormulate from '@braid/vue-formulate'
import MyLabel from './MyLabel.vue'

// Register your component with vue
Vue.component('MyLabel', MyLabel)

// Let Vue Formulate know which slot you want to override
Vue.use(VueFormulate, {
  slotComponents: {
    label: 'MyLabel'
  }
})
```

### Specific `type` slot components

Sometimes it may be desirable to only customize the slot component for a
specific input type.

```js
import Vue from 'vue'
import VueFormulate from '@braid/vue-formulate'
import MyFileUploadHelp from './MyFileUploadHelp.vue'

// Register your component with vue
Vue.component('MyFileUploadHelp', MyFileUploadHelp)

// Let Vue Formulate know which slot you want to override for a given type
Vue.use(VueFormulate, {
  library: {
    // the `type` of input you’re targeting.
    file: {
      slotComponents: {
        help: 'MyFileUploadHelp'
      }
    }
  }
})
```

## Context object

All 3 methods of creating and customizing inputs operate by using
the same `context` object. This object has a full awareness of nearly every
aspect of the input, the input’s model and even other inputs in the same
`FormulateForm` (if applicable):

Property        | Description
----------------|---------------------------------------------------------------
`attributes`    | An object of non-prop attributes passed to the input like `placeholder`
`blurHandler`   | Function that must be called when an input blurs.
`classification`| The classification of the input.
`disableErrors` | `Boolean` indicating if errors should be _displayed_ for this field (defaults to `false`).
`errors`        | Errors set via the form [error handling](/guide/forms/error-handling/) or directly on the input itself via `error` or `errors` props. Does not include validation errors.
`hasLabel`      | `Boolean` indicating if the field has a label prop, `button` classification is always `false`.
`hasValidationErrors` | Function, returns a `Promise` that resolves to a `Boolean`.
`help`          | The `help` prop value (help text)
`getValidationErrors` | Function, returns a `Promise` that resolves to an array of validation error objects.
`id`            | The id prop or an auto-generated id.
`imageBehavior` | The value of the `image-behavior` prop. Defaults to `preview`.
`isSubField`    | A function that returns a `boolean` indicating if it is a descendant of a `group` type.
`label`         | The value of the `label` prop.
`labelPosition` | The position of the label, `before` or `after`. Default is `before` for all except `box` classified inputs. Can be overridden with `label-position` prop.
`limit`         | For a `group` type, this is the is the maximum number of repeatable items allowed (default is `Infinity`).
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
