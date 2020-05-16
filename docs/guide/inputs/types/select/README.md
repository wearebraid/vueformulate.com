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
