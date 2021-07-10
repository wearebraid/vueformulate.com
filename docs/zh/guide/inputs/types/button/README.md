# 按钮

按钮 [体系](/zh/guide/inputs/custom-inputs/#what-is-a-classification) 有以下两种类型:

- [普通按钮](#button)
- [提交按钮](#submit)

Formulate 确定按以下顺序定义按钮的文本内容：

1. 默认插槽
2. `value` prop
3. `label` prop
4. `name` prop

::: tip
这两种类型的输出不同的是，标记为 `submit` 的按钮，本身具有 `type="submit"`，用于触发表单提交。
:::

## 普通按钮
<div id="button"></div>

```vue
<FormulateInput
  type="button"
  label="Buy it now"
/>
```

<demo-button />

您还可以使用默认插槽将更复杂的内容传递到按钮中。

```vue
<FormulateInput
  type="button"
  disabled
>
  Loading <span class="loader" />
</FormulateInput>
```
<demo-button-2 />

::: warning 重要提示
按钮类型没有模型绑定或标签元素。
:::

## 提交按钮

提交元素与按钮具有相同的语法，但它们能够提交表单 (处于 `FormulateForm` 包裹中).

```vue
<FormulateForm
  @submit="showAlert"
>
  <FormulateInput
    type="submit"
    name="Submit this form!"
  />
</FormulateForm>
```

<demo-input-submit />


## 插槽组件 <Badge text="2.5" /> {data-new}

按钮表单域有一个插槽 (`#default`) 和一个监督的 [插槽组件](/zh/guide/inputs/slots/#slot-components):

插槽组件名 | 说明
---------------|----------------------------------------------------------------
`buttonContent`| 此插槽组件在插槽中呈现 `#default` 并传递表单域上下文对象。
