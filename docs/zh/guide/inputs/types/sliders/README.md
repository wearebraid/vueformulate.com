# 滑块

滑块 [classification](/zh/guide/inputs/custom-inputs/#what-is-a-classification) 仅支持以下类型:

- [range](#range)

## range

```vue
<FormulateInput
  label="How long do you think you’ll live?"
  type="range"
  name="range"
  min="0"
  max="100"
  value="45"
  validation="required|min:10|max:90"
  error-behavior="live"
/>
```

<demo-input-range />

范围表单域可能会造成糟糕的用户体验，
因为默认情况下不显示范围的值。通过添加 `show-value` prop ，Vue Formulate 将在滑块旁边显示范围输入的值。

<demo-input-range-value />

## 自定义样式 class 名

除了所有 [全局样式名](/zh/guide/theming/#customizing-classes) 之外， 还可以使用以下方法：

键             | 默认值                          | 说明
----------------|----------------------------------|---------------------------------------------------
`rangeValue`         | `.formulate-input-element-range-value`   | 紧跟在 `<input>` 包含范围输入值的元素之后的元素。仅在 `show-value` 为 `true` 时有效。

