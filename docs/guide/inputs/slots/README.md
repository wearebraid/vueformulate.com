# Slots <Badge text='2.3.0'/>

Sometimes it’s necessary to override the markup or structure of Vue Formulate’s
inputs. Vue Formulate has 3 mechanisms to customize an input:

  - [Slot components](#slot-components)
  - [Scoped slots](#scoped-slots)
  - [Custom input types](/guide/inputs/custom-inputs/)

## Available slots

There are several available slots exposed by Vue Formulate, and they can all be
leveraged by using either [scoped slots](#scoped-slots) or [slot components](#slot-components).
All slots are passed the [context object](#context-object) via scoped slot.

Slot name      | Description
---------------|----------------------------------------------------------------
`label`        | The label value that will appear `before` or `after` the input element, default is a `<label>` element.
`element`      | The primary element slot. The component rendered by default in this slot is determined by the plugin's `options.library` values. _It is rare that you would use this slot — instead create a custom input._
`help`         | The help text value that appears after the element.
`errors`       | The errors that are displayed for a given input. Defaults to a `FormulateErrors` component.
`default`      | The `default` slot is already reserved for use as a pass-through on the `element` slot. Some input types leverage this, like [buttons](/guide/inputs/types/button/) and [groups](/guide/inputs/types/group/).

:::tip Addition slots
Inputs can expose additional slots. The [group](/guide/inputs/types/group/) input
type does this, refer to [that documentation](/guide/inputs/types/group/) page
for more details.
:::


## Scoped slots

Scoped slots are a common pattern in Vue and are well supported in Vue Formulate
as well. Vue Formulate recommends using scoped slots for occasional overrides,
but not as the primary method for extending Vue Formulate. Read the
[Preamble on custom input documentation](/guide/inputs/custom-inputs/) for more
detail.


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

## Slot components

Let’s say, on a given project, you wanted to change all labels to include the
tooltip we used in the above example. You could certainly do that with scoped
slots, but it would require a ton of copy and paste or wrapping every
`FormulateInput` —  both poor choices. Using “slot components” you can override the
default value of any of the [available slots](#available-slots) with your own
component. Slot components are passed the [context object](#context-object) as a
prop.

### Global slot components

To replace the default component placed in any available slot, simply
register your component with Vue Formulate using the `slotComponents` option:

```js
import Vue from 'vue'
import VueFormulate from '@braid/vue-formulate'
import MyLabel from './MyLabel.vue'

// Globally register your component with Vue.
Vue.component('MyLabel', MyLabel)

Vue.use(VueFormulate, {
  slotComponents: {
    // Use the string name of the globally registered component.
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
`addLabel`      | The label to display inside "add more" button on `group` inputs.
`attributes`    | An object of non-prop attributes passed to the input like `placeholder`
`blurHandler`   | Function that must be called when an input blurs.
`classification`| The classification of the input.
`disableErrors` | `Boolean` indicating if errors should be _displayed_ for this field (defaults to `false`).
`errors`        | Errors set via the form [error handling](/guide/forms/error-handling/) or directly on the input itself via `error` or `errors` props. Does not include validation errors.
`hasLabel`      | `Boolean` indicating if the field has a label prop, `button` classification is always `false`.
`hasValidationErrors` | Function, returns a `Promise` that resolves to a `Boolean`.
`help`          | The `help` prop value (help text)
`helpPosition`  | The position of the help text, `before` or `after` the element wrapper. Defaults to `before`.
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
