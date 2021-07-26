# 介绍

Vue Formulate 是使用 [Vue](https://vuejs.org/) 构建表单的最简单方法。

<ArticleCard
  href="https://dev.to/justinschroeder/introducing-vue-formulate-truly-delightful-form-authoring-56f5"
  image="/assets/img/og.jpg"
  image-alt="Vue Formulate"
  badge="Article"
  headline="Introducing Vue Formulate — truly delightful form authoring."
  copy="An overview of Vue Formulate by the author. Why it exists, what it does, and where it is going."
  :sidebar="true"
/>

尽管程序员们遇到的几乎每个项目都需要表单，但创建它们却出奇地乏味。Vue Formulate 旨在通过预测痛点和公开干净的 API（具有合理的默认值）来提高开发人员的幸福感，从而轻松实现通用功能。事实上，创建几乎任何类型的表单 **只需要学习** 两个组件：`FormulateInput` 和 `FormulateForm`。

使用 Vue Formulate 了的程序员可以

✓ 使用单个组件可以创建任何表单域<br>
✓ 对所有表单域使用原生的 `v-model` [绑定](#model-binding)<br>
✓ 从单个对象 [重新填充整个表单](/zh/guide/forms/#setting-initial-values) <br>
✓ 使用 JSON [构建整个表单](/zh/guide/forms/#generating-forms)<br>
✓ 轻松添加字段标签<br>
✓ 轻松添加提示文本<br>
✓ 将字段 [分组](/zh/guide/inputs/types/group/) 到自定义数据中结构<br>
✓ 为复杂的 UI [重复分组字段](/zh/guide/inputs/types/group/#repeatable-groups)<br>
✓ 执行健壮的 [表单验证](/zh/guide/validation)<br>
✓ 创建 [自定义验证](/zh/guide/validation/#custom-validation-rules) 规则<br>
✓ 修改默认 [验证消息](/zh/guide/validation/#customize-validation-messages)<br>
✓ 创建和共享 [自定义表单域](/zh/guide/inputs/custom-inputs)<br>
✓ 覆盖默认组件模板的 [作用域插槽](/zh/guide/inputs/slots)<br>
✓ 还有 [更多](/changelog)<br>

## 表单域
Vue Formulate 中的每种类型的输入都是 `FormulateInput` 组件的一个实例。无论您需要文本域、密码框、下拉选择、复选框还是日期选择器，都会使用此组件。没有比这更容易记住的了。

### 简单举例

Vue Formulate 最简单的实现就是输出一个 `FormulateInput` 没有额外配置的例子：

```vue
<FormulateInput type="text" />
```
**Output**:

<demo-1-inputs />

很熟悉吧？这本质上等同于原生 HTML：

```html
<input type="text">
```

### 返回不同的表单域类型
**所有 Vue Formulate 表单域都共享相同的语法。** 根据 `type` 返回期望的 html 元素, 即使内部 HTML 结构不同。例如
`<textarea>` 与HTML中的 `<input>` 是完全不同的元素，但是在 Vue Formulate 中，你只需要记住更改 `type` 即可。

```vue
<FormulateInput type="textarea" />
```

**输出**:

<demo-2-inputs />

::: tip
使用 Vue Formulate，您只需要使用提供的 `FormulateInput` 元素并传递适当的参数 `type` 来生成您需要的表单域。无需记住各种组件名称来处理不同的输入类型。
:::

## 验证器

表单域和表单验证是一项核心功能，易于添加。

```vue
<FormulateInput
  type="email"
  name="email"
  validation="required|email"
/>
```

<demo-2-validation />

在 [验证器文档页面](/zh/guide/validation) 上阅读更多信息

<div id="model-binding"></div>

## 模型绑定

Vue Formulate 使用模型绑定 ( `v-model`) 来读/写表单域中的值。你可以在 `<FormulateInput>`，`<FormulateForm>` 或这一起绑定数据（阅读 [表单](/zh/guide/forms) 的表单绑定部分的文档，了解更多信息）。


```vue
<template>
  <div>
    <FormulateInput
      type="text"
      label="What is your name?"
      v-model="value"
    />
    <strong>Hello <em>{{ value }}</em>!</strong>
  </div>
</template>

<script>
export default {
  data () {
    return {
      value: 'My initial value'
    }
  }
}
</script>
```

**输出:**

<demo-1-binding />

### 双重绑定

由于输入的值绑定到模型，你可以将模型绑定到多个表单域，甚至触发其他元素的验证错误。

```vue
<template>
  <div>
    <FormulateInput
      type="text"
      label="Favorite car brand?"
      validation="not:Toyota"
      validation-name="car brand"
      error-behavior="live"
      v-model="brand"
    />
    <FormulateInput
      type="radio"
      v-model="brand"
      error-behavior="live"
      validation="in:Toyota,Honda"
      :options="{Toyota: 'I like Toyota', Honda: 'I like Honda' }"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      brand: 'Honda'
    }
  }
}
</script>
```
**输出:**
<demo-2-binding />

### Array binding

Certain types of inputs set an `array` of values on their model.

```vue
<FormulateInput
  type="checkbox"
  label="Which animals make good pets?"
  v-model="pets"
  :options="{dog: 'Dogs', alligators: 'Alligators', cat: 'Cats'}"
/>
```
**输出:**


<demo-3-binding />


:::tip 阅读更多...
模型绑定并不是您对 `FormulateInput` 元素所能做的全部！还有很多额外的配置选项。

在 [表单域页面](/zh/guide/inputs) 上阅读更多内容→
:::

### 表单绑定

除了将值绑定到单个 `FormulateInput` 字段之外，您还可以通过将输入集合中的所有值包装在 `FormulateForm` 中并将 `v-model` 放置在该元素上来收集所有值。


```vue
<FormulateForm
  v-model="formValues"
>
  <FormulateInput
    name="name"
    label="What is your name?"
    validation="required"
  />
  <FormulateInput
    name="age"
    label="How old are you?"
    validation="required|number|max:120"
  />
  <FormulateInput
    type="submit"
    label="Sign up"
  />
</FormulateForm>
```

<demo-form />

:::tip 阅读更多...
这不是所有内容……该 `FormulateForm` 元素还有其他几个非常有价值的功能，例如表单提交、组验证和文件上传。

阅读更多信息 [使用表单 →](/zh/guide/forms)
:::


## 它不是什么

虽然 Vue Formulate 是一个强大的工具，用于构建、验证和处理表单上的错误——但这个包并不打算做这些事情：

  1. 这不是 UI 框架或布局工具。想要彼此相邻的输入吗？凉爽的！将一些输入包裹在一个 `<div>`。这个包假设你仍然负责你的表单布局。
  2. 这个包是 BYOB——带上你自己的后端。Vue Formulate 并不关心您选择的后端（最接近关心的是使用 [文件输入](/zh/guide/inputs/types/file/) 时）

## 为什么不 ... ?

### Vuetify

Vuetify 是完整的 UI 框架，而 Vue Formulate 是用于构建表单的重点工具。有些人不喜欢使用大型 UI 框架，不将它们用于预先存在的项目中，不想学习新框架，或者只是喜欢编写自己的范围狭窄的样式。此外，我们认为 Vue Formulate 中的组合表单是首屈一指的。

### Buefy

与 Vuetify 类似，Buefy 是一个完整的 UI 框架。如果您已经在使用 Bulma 或者您正在寻找全面的 UI 解决方案，那么它是一个不错的选择。Vue Formulate 乐于在任何 UI 框架的上下文中生存，并且仍然提供灵活的表单组合、验证和错误处理等优点。即便如此，仍有很多人不想要或不需要一个完整的 UI 框架，而该框架将从 Vue Formulate 的专注方法中受益。

### vue-forms

该 `vue-forms` 软件包专注于表单验证，而 Vue Formulate 对表单采用更全面和更有主见的方法，并附带 UI 脚手架、验证和数据建模。我们想让开发人员更轻松地进行表单组合，同时仍然提高整体质量 - 试试看。

### VeeValidate

VeeValidate 是 Vue 表单验证的另一个很好的选择，这就是它的主要任务——验证。Vue Formulate 通过将验证作为字段组合本身的一个子功能，使构建高质量表单变得更加容易。使用 Vue Formulate 构建表单非常简单且快速——当然，如果你需要额外的验证能力，你仍然可以使用它。您可以编写任何您想要的 [自定义验证逻辑](/zh/guide/validation/#custom-validation-rules) ，甚至可以在单个字段上编写。

### Vuelidate

表单验证的另一个很好的选择，但只关注验证。Vue Formate 提供了额外的脚手架，允许开发人员以最小的弯路创建复杂的表单，其中包括验证和错误处理。

### vue-form-generator

从 JSON 生成表单很棒，也是 Vue Formate 的一个子功能。由于 Vue Formulate 使用单个元素从 JSON 字符串或 JavaScript 模块创建任何输入类型的表单生成，就像使用v-for指令一样简单。 [查看文档](/zh/guide/generating-forms/)。
