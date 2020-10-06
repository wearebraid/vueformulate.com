# Select

The select [classification](/guide/inputs/custom-inputs/#what-is-a-classification) is only given to:

- [select](#select-2)

## Select

```vue
<FormulateInput
  v-model="value"
  :options="{first: 'First', second: 'Second', third: 'Third', fourth: 'Fourth'}"
  type="select"
  placeholder="Select an option"
  label="Which of your children is your favorite?"
/>
```

<demo-input-select />

The `options` prop can be an object or an array of objects. When using an array
each object must include a `label` and `value` property while `id` is optional:

```vue
<FormulateInput
  type="select"
  :options="[
    { value: 'first', label: 'First name' },
    { value: 'last', label: 'Last name' },
    { value: 'initial', label: 'Middle Initial', id: 'name-initial' }
  ]"
/>
```

:::tip Note
Native select elements don’t have placeholders, but that prop is available
and will inject a non-selectable option item as the initially selected value.
:::

### Option grouping

Use the `optionGroups` prop when you need to use `<optgroup>`.

```vue
<FormulateInput
  label="Select an available meeting time"
  type="select"
  placeholder="Choose a time"
  :option-groups="{
    Morning: {
      10: '10am',
      11: '11am'
    },
    Afternoon: {
      15: '3pm',
      17: '5pm'
    }
  }"
/>
```

<demo-input-select-group />

:::warning String values only
Although Vue Formulate supports non-string values, HTML `select` inputs only
support string values, using integers or booleans as keys will result in
unexpected behavior.
:::
