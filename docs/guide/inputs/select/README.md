# Select

The select [classification](/inputs/) is only given to:

- [select](#select)

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
