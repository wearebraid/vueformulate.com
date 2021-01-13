# Group

The `group` [classification](/guide/inputs/custom-inputs/#what-is-a-classification)
only contains the input type `group`. It is a special input used to
logically group one or more fields together. It is useful for:

- [Organizing your form’s data](#data-organization).
- [Creating repeatable groups](#repeatable-groups).
- [Validating a collection](#validation) of fields.

## Data organization

You can use the `group` type to logically group data. The fields nested under a
`group` will be bundled together as their own object.

```vue
<FormulateForm
  v-model="fields"
>
  <FormulateInput
    type="text"
    name="name"
    label="Your name"
  />
  <FormulateInput
    type="group"
    name="address"
  >
    <FormulateInput
      type="text"
      name="address"
      label="Street address"
    />
    <FormulateInput
      type="text"
      name="city"
      label="City"
    />
    <FormulateInput
      type="select"
      name="state"
      label="State"
      :options="{VA: 'Virginia', CA: 'California', NY: 'New York'}"
    />
  </FormulateInput>
</FormulateForm>
```
<demo-group-data />


:::tip Note
For consistency, the value of a `group` will always be an array even if
the field is not repeatable. If you need a plain object, we recommend
destructuring the array inside [a form](/guide/forms/) `submit` handler.
:::

## Repeatable groups

By setting the `repeatable` prop to `true` anything inside our group becomes
infinitely repeatable including non-formulate elements. An "add more" button is
also added, along with a remove button for each item.  A `repeatable` group can
be further customized with special [props](#props) and [slots](#slots).

::: details View source code
```vue
<template>
  <div class="form-wrapper">
    <FormulateForm
      v-model="formData"
    >
      <FormulateInput
        type="group"
        name="attendees"
        :repeatable="true"
        label="Who is going to attend?"
        add-label="+ Add Attendee"
        validation="required"
      >
        <div class="attendee">
          <FormulateInput
            name="name"
            validation="required"
            label="Attendee’s name"
          />
          <FormulateInput
            type="email"
            name="email"
            validation="required|email"
            label="Attendee’s email"
          />
          <strong class="price" v-text="`$100`" />
        </div>
      </FormulateInput>
      <FormulateInput
        type="radio"
        label="Select your payment method"
        name="payment"
        :options="{paypal: 'PayPal', credit: 'Credit Card'}"
      />
      <strong>Total: {{ total }}</strong>
      <FormulateInput
        type="submit"
        label="Purchase tickets"
      />
    </FormulateForm>
    <code class="code code--block">{{ formData }}</code>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formData: {}
    }
  },
  computed: {
    total () {
      const count = Array.isArray(this.formData.attendees) ? this.formData.attendees.length : 1
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'}).format(count * 100)
    }
  }
}
</script>

<style scoped>
.form-wrapper {
  padding: 2em;
  border: 1px solid #a8a8a8;
  border-radius: .5em;
  box-sizing: border-box;
}
@media (min-width: 650px) {
  .attendee {
    display: flex;
  }
}

@media (min-width: 720px) {
  .attendee {
    display: block;
  }
}

@media (min-width: 850px) {
  .attendee {
    display: flex;
  }
  .attendee .formulate-input {
    margin-right: 1.5em;
  }
}
.attendee .formulate-input {
  margin-right: 2em;
  margin-bottom: 0;
}

strong {
  display: block;
  margin: 1em 0;
}

strong.price {
  margin-top: 1.25em;
  margin-bottom: 0;
  height: 2.5em;
  display: inline-flex;
  align-items: center;
}

code {
  margin-top: 2em;
}
</style>
```
:::

<demo-group-repeatable />

### Validation

By default, fields inside a group validate just like any other fields. Making
a field inside a `group` required, for example, would prevent that form from
submitting until that field has been completed. However, you can also place
validation rules directly on the group. So placing a "required" rule on the
`group` component ensures at least 1 repeatable item is in your group.

```vue
<FormulateForm>
  <FormulateInput
    type="group"
    label="Add your social media pages"
    :repeatable="true"
    validation-name="social media links"
    validation="min:2,length"
    add-label="+ Social link"
  >
    <FormulateInput
      label="Social media link"
      validation="required|url"
    />
  </FormulateInput>
  <FormulateInput
    type="submit"
  />
</FormulateForm>
```

<demo-group-repeatable-2 />

:::tip Note
There is no `blur` event for a group type, so by default validation errors will
be shown when someone attempts to submit a form. If you prefer errors to be
immediately show, consider using `error-behavior="live"`.
:::

:::tip Note
The [`confirm`-rule](/guide/validation/#confirm) currently does not work within groups. This will be fixed in an upcoming release. See [tracking issue](https://github.com/wearebraid/vue-formulate/issues/226)
:::

#### Applying custom validation rules

Applying custom validation rules to a `group` field allows for very granular and
powerful rules to meet your specific scenario. These rules give you
access to the data in all of its sub-fields allowing complex cross-field
validation.

::: details View source code
```vue
<template>
  <FormulateForm
    class="form-wrapper"
    @submit="handle"
  >
    <FormulateInput
      name="name"
      label="Your name"
      placeholder="Your name"
      validation="required"
    />
    <FormulateInput
      label="Your shipping address"
      type="group"
      validation="address"
      :validation-rules="{ address: addressRule }"
      :validation-messages="{ address: addressMessage }"
    >
      <FormulateInput
        name="street"
        placeholder="Street address"
      />
      <div class="triple">
        <FormulateInput
          name="city"
          placeholder="City"
        />
        <FormulateInput
          type="select"
          name="state"
          :options="{VA: 'VA', PA: 'PA', WA: 'WA'}"
          placeholder="State"
        />
        <FormulateInput
          name="zip"
          placeholder="Zip"
        />
      </div>
    </FormulateInput>
    <FormulateInput
      type="submit"
    />
  </FormulateForm>
</template>

<script>
export default {
  methods: {
    addressRule ({ value }) {
      if (Array.isArray(value)) {
        const [address] = value
        return address.street && address.city && address.state && address.zip
      }
      return false
    },
    addressMessage ({ value }) {
      if (Array.isArray(value)) {
        const [address] = value
        const missing = ['street', 'city', 'state', 'zip'].reduce((missing, field) => {
          if (!address[field]) {
            missing.push(field)
          }
          return missing
        }, [])
        return `Your shipping address still requires: ${missing.join(', ')}.`
      }
      return 'Please fill out your shipping address.'
    },
    handle () {
      alert('All validation complete, form submitted.')
    }
  }
}
</script>

<style scoped>
.form-wrapper {
  padding: 2em;
  border: 1px solid #a8a8a8;
  border-radius: .5em;
  box-sizing: border-box;
  max-width: 450px;
}


.form-wrapper::v-deep .formulate-input-element {
  max-width: none;
}

@media (min-width: 650px) {
  .triple {
    display: flex;
  }

  .triple .formulate-input {
    margin-bottom: .25em;
    margin-right: 1em;
    flex-grow: 1;
  }

  .triple .formulate-input[data-classification="select"] {
    flex: 0 0 5em;
  }

  .triple .formulate-input:last-child {
    margin-right: 0;
  }
}

@media (min-width: 720px) {
  .triple {
    display: block;
  }

  .triple .formulate-input {
    margin-bottom: 1.5em;
    margin-right: 0;
  }
}

@media (min-width: 850px) {
  .triple {
    display: flex;
  }
  .triple .formulate-input {
    margin-bottom: .25em;
    margin-right: 1em;
  }

  .triple .formulate-input:last-child {
    margin-right: 0;
  }
}

</style>

```
:::
<demo-group-validation />

## Settings errors on groups <span class="new-badge">2.5+</span>

When setting explicit errors on group input we need a way to indicate which
index the errant field is at. To make this as simple as possible, use the
`group-errors` prop along with "dot notation" to reference inputs in their
index. For example:

```vue
<FormulateInput
  type="group"
  :repeatable="true"
  name="invitees"
  :group-errors="{
    '0.email': 'This email is already in use',
    '1.name': 'Pretty sure Rensmold isn’t a real last name'
  }"
  :value="[
    { name: 'Todd Berkins', email: 'todd@example.com' },
    { name: 'Stella Rensmold', email: 'stella@example.com' },
  ]"
>
  <FormulateInput
    name="name"
    label="Invitee's name"
  />
  <FormulateInput
    name="email"
    label="What is this user's email?"
  />
</FormulateInput>
```

<demo-group-errors-1 />

Notice how the errors always begin with the index of the group. The proeprties
of the `group-errors` prop must always begin with the index of the group they
are being applied to.

You can also apply group errors [using dot notation from a `<FormulateForm>`](/guide/forms/error-handling/#form-input-errors).

## Index of current group

To manipulate a distinct group field, it is helpful to get the index of the current group item. Luckily, slots can help. The `default` slot for instance offers the `index` as a context variable of `groupProps`:

Example:
```vue
 <FormulateInput
    type="group"
    name="attendees"
    :repeatable="true"
    add-label="+ Add Attendee"
    #default="{ index }"
>
  <p>This is Group # {{ index }} </p>
  <FormulateInput
    name="price"
    disabled
    :value="getPrice(index)"
    label="Price""
  />
</FormulateInput>
```

## Props

The group field has a few unique props:

Prop             | Description
-----------------|----------------------------------------------------------------
`add-label`      | When repeatable, this is the label to display on the "+ Add" button (defaults to `label || name`).
`limit`          | When repeatable, this is the maximum number of group items.
`minimum`        | When repeatable, this is the minimum number of group items.
`remove-label`   | When repeatable, this is the label to display on the "Remove" button.
`remove-position`| Show the remove button `before` or `after` the group inputs (defaults to `before`)
`repeatable`     | `Boolean` indicates if the field is repeatable.
`group-errors`   | `Object` of dot notation properties (like `0.name`) with errors.

## Slots

The group input has several unique slots (and matching [Slot Components](/guide/inputs/slots/#slot-components)):

Slot name      | Description
---------------|----------------------------------------------------------------
`addmore`      | The add more button when `repeatable`.<br>_The context object in this slot includes an `addMore` function that should be called to add new items._
`default`      | Anything in the default slot will be considered part of the group, and become `repeatable` if applicable. _The context object will additionally have an "index" property._
`grouping`     | The primary repeatable area, responsible for rendering the inner content.
`remove`       | The remove button when `repeatable`.<br>_The context object in this slot includes the `index` and a `removeItem` function that should be called to remove that item._
`repeatable`   | Responsible for rendering each row of inputs.<br>_The context object in this slot includes a `removeItem` function that should be called to remove that item._

## Events <span class="new-badge">2.5+</span>

The group input type has two unique events:

Event name | Description
-----------|--------------------------------------------------------------------
`@repeatableAdded` | Emitted when a new repeatable item is added to the group.
`@repeatableRemoved` | Emitted when a repeatable item is removed from the group.

## Custom class keys

In addition to all [global class keys](/guide/theming/#customizing-classes)
following are available:

Key             | Default                          | Description
----------------|----------------------------------|---------------------------------------------------
`grouping`      | `.formulate-input-grouping`      | A wrapper around all repeatable fields (only exists when repeatable)
`groupRepeatable`    | `.formulate-input-group-repeatable` | A wrapper around each set of grouped fields (exists even for non-repeatable groups).
`groupRepeatableRemove`   | `.formulate-input-group-repeatable-remove` | The remove button for a field group.
`groupAddMore`       | `.formulate-input-group-add-more` | The wrapper around the add more button for repeatable groups.
