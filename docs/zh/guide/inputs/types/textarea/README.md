# 文本域

文本域 [体系](/zh/guide/inputs/custom-inputs/#what-is-a-classification) 仅适用于:

- [文本域](#textarea)

## textarea

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
