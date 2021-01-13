# Generating Forms

Form generation is a first-class feature of Vue Formulate, and can be accomplished
in two ways:

- [Schemas](#schemas) (recommended)
- [Simple iteration](#simple-iteration)

The above methods are very similar — both utilize arrays of objects with prop
values. This works really well since Vue Formulate is a component-first library,
where nearly all of the functionality is accessible via props. Additionally,
features like [slot components](/guide/inputs/slots/#slot-components) allow
for customization of the inputs being rendered without needing to bring-your-own
components (although you can).

## Schemas <Badge text="2.4.0" />

Schemas were introduced in version `2.4` and allow for generating complex forms
with `group` fields, wrappers, and your own components. Showing is better than telling, so here’s an interactive JSON playground with several examples.
We’ll go into more detail on the structure of the schemas after this.

##### Interactive JSON playground

<ClientOnly>
  <demo-schemas />
</ClientOnly>

### Schema inputs

Schemas are simply arrays of objects, where each object represents the props to
give to the generated component or tag. Objects in a schema are assumed to be `FormulateInput` components by default. In fact, the simplest valid schema is
just an array with an empty object `[ {} ]` which renders to an empty text field.

<FormulateForm :schema="[{}]" />

These schema arrays can be passed directly as a prop to `<FormulateForm>` or to
`<FormulateSchema>`. Since `<FormulateForm>` adds model binding, it’s most
convenient unless you have advanced needs.

```vue
<template>
  <FormulateForm
    v-model="values"
    :schema="schema"
  />
</template>

<script>
export default {
  data () {
    return {
      values: {},
      schema: [
        {
          type: 'password',
          name: 'password',
          label: 'Enter a new password',
          validation: 'required'
        },
        {
          type: 'password',
          name: 'password_confirm',
          label: 'Confirm your password',
          validation: '^required|confirm:password',
          validationName: 'Password confirmation'
        },
        {
          type: 'submit',
          label: 'Change password'
        }
      ]
    }
  }
}
</script>
```
<demo-schema-1 />

### Schema components

Schemas are not limited to `FormulateInput` elements. Each object can define a
`component` property to specify any component or HTML tag to render.

```js
[
  {
    component: 'img',
    src: '/logo.svg',
    style: 'width: 50px;'
  },
  {
    component: 'Badge',
    text: '2.4.0'
  },
]
```

<demo-schema-2 />

### Schema children

The final piece of the puzzle is the ability to nest schemas. For example,
you might want to wrap two elements, or use a `group` input. There is no limit
to the depth or size of your schema.

```js
[
  {
    type: 'group',
    repeatable: true,
    name: 'addresses',
    addLabel: '+ Address',
    children: [
      {
        name: 'street',
        label: 'Street address'
      },
      {
        name: 'city',
        label: 'City',
      },
      {
        component: 'div',
        class: 'double-row',
        children: [
          {
            name: 'state',
            type: 'select',
            label: 'State',
            options: {
              va: 'Virginia',
              fl: 'Florida',
              ne: 'Nebraska',
              ca: 'California'
            },
          },
          {
            name: 'zip',
            label: 'Zip',
          },
        ]
      }
    ]
  }
]
```

<demo-schema-3 />

## Simple iteration

Because Vue Formulate stresses a single input API, it makes DIY form-generation
simple. In its simplest form, all you need is an array of objects you want to
represent inputs.

```vue
<template>
  <FormulateForm>
    <FormulateInput
      v-for="item in items"
      :key="item.name"
      v-bind="item"
    />
  </FormulateForm>
</template>

<script>
export default {
  data () {
    return {
      items: [
        {
          name: 'email',
          label: 'Your email',
          validation 'required|email'
        }
      ]
    }
  }
}
</script>
```
<demo-generating-1 />

This simple feature can actually produce fairly robust forms since you have full
control of your inputs via props:

:::details JSON source
```js
[
  {
    type: 'text',
    name: 'name',
    label: 'What is your name?',
    placeholder: 'Your name...',
    validation: 'required'
  },
  {
    type: 'text',
    name: 'address',
    label: 'What is your street address?',
    placeholder: 'Your address...',
    help: 'Where would you like your product shipped?',
    validation: 'required'
  },
  {
    type: 'radio',
    name: 'method',
    label: 'What shipping method would you like?',
    options: [
      { value: 'fedex_overnight', id: 'fedex_overnight', label: 'FedEx overnight' },
      { value: 'fedex_ground', id: 'fedex_ground', label: 'FedEx ground' },
      { value: 'usps', id: 'usps', label: 'US Postal Service' }
    ],
    value: 'fedex_ground',
    'validation-name': 'Shipping method',
    validation: 'required'
  },
  {
    name: 'submit',
    type: 'submit',
    label: 'Submit order'
  }
]
```
:::

<demo-generated />
