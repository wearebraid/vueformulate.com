# 自定义样式技巧

一致的标记和带有分类的类似字段 classifications 有助于将必要的 CSS 保持在最低限度。该软件包包括一个样板 SCSS 文件。

[下载 SCSS 样板](https://github.com/wearebraid/vue-formulate-next/tree/master/themes/boilerplate/boilerplate.scss)

#### 示例标记

```html
<!-- Outer Wrapper -->
<div class="formulate-input"  data-classification="text" data-type="text" data-has-errors="true" data-is-showing-errors="true">

  <!-- Wrapper around label + input -->
  <div class="formulate-input-wrapper">
    <!-- Label -->
    <label for="my-id" class="formulate-input-label formulate-input-label--before">
      Sample text input
    </label>
    <!-- Interior element wrapper -->
    <div data-type="text" class="formulate-input-element formulate-input-element--text">
      <!-- Actual input element -->
      <input type="text" placeholder="Sample placeholder" id="my-id">
    </div>
  </div>

  <!-- Help message -->
  <div class="formulate-input-help formulate-input-help--after">
    Sample help text
  </div>

  <!-- List of error messages -->
  <ul class="formulate-input-errors">
    <li class="formulate-input-error">
      Sample is required.
    </li>
  </ul>
</div>
```

一旦上述输出被主题化，样式将在很大程度上转移到所有 FormulateInput 。唯一的差异是某些 classification 使用不同的内部表单域。

### 使用 classification

最外层的包装器始终具有 `data-classification` 可用于对样式进行分组的属性。
例如，`[data-classification="text"]` 选择器可用于同时设置所有基于单行文本框的样式：

```scss
.formulate-input {
  & [data-classification="text"] {
    input {
      // style all text-like inputs here
    }
  }
}
```

### 数据属性

为了使动态样式更容易一些，有几个实用程序数据属性被用于最外层的包裹器。

属性                 | 说明
--------------------------|----------------------------------------------------------------
`data-classification`     | 始终可用。设定为表单域的 classification (如：`box`, `text`, `group`)
`data-has-errors`         | 当字段有任何验证错误或显式错误（通过 prop 或 form 传入）时添加，_无论是否显示错误。_
`data-has-value`          | 当字段不为空时添加。
`data-is-showing-errors`  | 在字段有错误并显示错误时添加 (基于 `error-behavior`)
`data-type`               | 始终可用。设置为 `type` prop 的值。
