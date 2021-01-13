# Slots

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
`default`      | The `default` slot is already reserved for use as a pass-through on the `element` slot. Some input types leverage this, like [buttons](/guide/inputs/types/button/) and [groups](/guide/inputs/types/group/).
`element`      | The primary element slot. The component rendered by default in this slot is determined by the plugin's `options.library` values. _It is rare that you would use this slot — instead create a custom input._
`errorList`    | This can only be used as a `slotComponent`, and allows you to replace the rendering of errors without changing the logic. Developers should reference [`FormulateErrorList.vue`](https://github.com/wearebraid/vue-formulate/blob/master/src/slots/FormulateErrorList.vue) for props and usage example.
`errors`       | The errors that are displayed for a given input. Defaults to a `FormulateErrors` component.
`prefix`       | Immediately before the `<input>` element on all default input types — empty by default.
`suffix`       | Immediately after the `<input>` element on all default input types — empty by default.
`help`         | The help text value that appears after the element.
`label`        | The label value that will appear `before` or `after` the input element, default is a `<label>` element.

:::tip Addition slots
Inputs can expose additional slots. The [group](/guide/inputs/types/group/) input
type does this, refer to [that documentation](/guide/inputs/types/group/) page
for more details.
:::

![FormulateInput internal structure](../custom-inputs/structure.svg)

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
component. Slot components are passed the [context object](/guide/inputs/#context-object) as a
prop as well as any `slotProps` that have been declared for that slot.

Slot components are extremely powerful, and work to maintain a consistent API
which is desirable both for consistency, ease of use, and [generating forms](/guide/forms/generating-forms/). For more details checkout the [example slot
component](#a-slot-component-example).

::: tip Extra context properties
In some slots, extra data is bound to the context object, like the
`removeItem` property on the `remove` slot. When using slot components, these
extra properties are passed as props in addition to the context object instead
of inside merged with the context object.
:::

### Registering slot components

You can register a slot component for all inputs, or for a specific type of
input.

#### Global slot components

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

#### Specific `type` slot components

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

### Declaring slot props

Slot components can declare their own props, these props are then accepted at
the top level `FormulateInput` and passed to the appropriate slot component as
a prop. You can declare a `slotProp` for a specific type of input, or for all
inputs. `slotProp` declarations should always be an array of string values.

#### For all inputs types
```js
Vue.use(VueFormulate, {
  slotProps: {
    help: ['extraHelpText']
  }
})
```

The above declaration can then be used as a standard prop on a `FormulateInput`.

```vue
<FormulateInput
  extra-help-text="My extra help text"
/>
```

#### For a specific type

```js
Vue.use(VueFormulate, {
  library: {
    range: {
      slotProps: {
        label: ['slider-icon']
      }
    }
  }
})
```

And the above could be used on any `range` types:

```vue
<FormulateInput
  type="range"
  min="10"
  max="20"
  :slider-icon="true"
/>
```

:::tip Custom inputs types
When creating a custom input, you can declare [custom props](/guide/inputs/custom-inputs/#custom-props)
by using the `component` slotProp.
:::

## Context object

All 3 methods of creating and customizing inputs operate by using
[the same `context` object](/guide/inputs/#context-object). This object has a full awareness of nearly every
aspect of the input, the input’s model and even other inputs in the same
`FormulateForm` (if applicable). [View the context object →](/guide/inputs/#context-object)

## A slot component example

In our scoped slot [example above](#scoped-slots), we use the `label` scoped
slot to add a tooltip to one input. So how do we use slot components to replace
every label on our project?

#### 1. Create a new component
`file: ./components/MyCustomLabel.vue`
```vue
<template>
  <label :for="context.id">
    {{ context.label }}
    <svg
      v-if="tooltip"
      v-tooltip="tooltip"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
    >
      <path d="M50,11A39,39,0,1,0,89,50,39.05,39.05,0,0,0,50,11Zm4,55a4,4,0,0,1-8,0V47a4,4,0,0,1,8,0ZM50,38a4,4,0,1,1,4-4A4,4,0,0,1,50,38Z" />
    </svg>
  </label>
</template>

<script>
export default {
  props: {
    context: {
      type: Object,
      required: true
    },
    tooltip: {
      type: [String, Boolean],
      default: false
    }
  }
}
</script>

<style>
/* styles? sure... */
</style>
```
Notice a few things about the above component:

1. It accepted the [all-powerful `context` object](#context-object) as a prop.
2. It is also accepting a "tooltip" prop for the tooltip content (called a slotProp).

When the `label` slot was defined inline we could easily hard code our tooltip
value, but now that we've defined it as a component — and that component is
rendered _inside_ our `FormulateInput`, how do we pass that “tooltip” prop in?
The answer is to tell VueFormulate you have a `slotProp`. You do this when you
register your slot component, and Vue Formulate will take care of passing the
right prop to the right slot.

#### 2. Register the `slotComponent` and `slotProp`

```js
import Vue from 'vue';
import VTooltip from 'v-tooltip'
import VueFormulate from '@braid/vue-formulate'
import MyCustomLabel from './components/MyCustomLabel'

// Register v-tooltip (or whatever extras you might want to use)
Vue.use(VTooltip)

// Register our slot component globally
Vue.component('MyCustomLabel', MyCustomLabel)

Vue.use(VueFormulate, {
  // Define our custom slot component(s)
  slotComponents: {
    label: 'MyCustomLabel'
  },
  // Define any props we want to pass to our slot component
  slotProps: {
    label: ['tooltip']
  }
})
```

Read more about [registering slot components →](#registering-slot-components).

#### 3. Use our new component!

```vue
<FormulateInput
  type="text"
  label="Enter your EIN"
  tooltip="EIN is an employee identification number"
/>
```
<demo-slots-label-2 />
