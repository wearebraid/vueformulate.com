# Textarea

The textarea [classification](/guide/inputs/custom-inputs/#what-is-a-classification) is only given to:

- [textarea](#textarea)

## Textarea

```vue
<FormulateInput
  type="textarea"
  v-model="value"
  label="Enter a tweet in the box"
  validation="required|max:50,length"
  validation-name="tweet"
  error-behavior="live"
  :help="`Keep it under 50 characters. ${50 - value.length} left.`"
/>
```

<demo-input-textarea />
