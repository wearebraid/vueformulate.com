# 插槽

我们有时需要覆盖 Vue Formulate 表单域的标签或结构。Vue Formulate 有 3 种机制来自定义表单域：

  - [插槽组件](#slot-components)
  - [作用域插槽](#scoped-slots)
  - [自定义表单域类型](/zh/guide/inputs/custom-inputs/)

## 可用的插槽
<div id="available-slots"></div>

Vue Formulate 开放了几个可用的插槽，它们都可以通过使用 [作用域插槽](#scoped-slots) 或 [插槽组件](#slot-components) 来使用。所有插槽都通过作用域插槽传递 [上下文对象](#context-object) 。

插槽名      | 说明
---------------|----------------------------------------------------------------
`default`      | 该 `default` 插槽已预留用作 `element` 插槽上的直通。一些表单域类型利用了这一点，比如 [按钮](/zh/guide/inputs/types/button/) 和 [表单域组](/zh/guide/inputs/types/group/).
`element`      | 主要元素插槽。此插槽中默认呈现的组件由插件的 `options.library` 值决定。你很少会使用这个槽，这个主要用来创建一个自定义表单域。
`errorList`    | 这只能用作 `slotComponent`, 并允许您在不更改逻辑的情况下替换错误的显示。开发者应该参考 [`FormulateErrorList.vue`](https://github.com/wearebraid/vue-formulate/blob/master/src/slots/FormulateErrorList.vue) 的 props 和使用示例。
`errors`       | 为给定表单域显示的错误。默认为 `一个FormulateErrors` 组件。
`prefix`       | 紧接在 `<input>` 元素之前- 默认情况下为空。
`suffix`       | 紧接在 `<input>` 元素之后- 默认情况下为空。
`help`         | 出现在元素之后的帮助文本值。
`label`        | 将出现在 `<input>` 元素之前或之后的标签值，默认为一个 `label` 元素

:::tip 添加按钮插槽
表单域可以公开的额外插槽。[group](/zh/guide/inputs/types/group/) 类型的表单域能够用到这个，请参阅 [该文档页面](/zh/guide/inputs/types/group/) 了解详情。
:::

![FormulateInput internal structure](../custom-inputs/structure.svg)

## 作用域插槽
<div id="scoped-slots"></div>

作用域插槽是 Vue 中的一种常见模式，并且在 Vue Formate 中也得到了很好的支持。
Vue Formulate 建议使用作用域槽来做偶尔的覆盖，但不作为扩展 Vue Formulate 的主要方法。有关更多详细信息，请阅读
[自定义表单域文档的序言](/zh/guide/inputs/custom-inputs/)


```vue
  <FormulateInput
    type="text"
    label="Select a username"
  >
    <template #label="{ label, id }">
      <label :for="id">
        {{ label }}
        <svg
          v-tooltip="'Pick a username that you’ll remember.'"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
        >
          <path d="M50,11A39,39,0,1,0,89,50,39.05,39.05,0,0,0,50,11Zm4,55a4,4,0,0,1-8,0V47a4,4,0,0,1,8,0ZM50,38a4,4,0,1,1,4-4A4,4,0,0,1,50,38Z" />
        </svg>
      </label>
    </template>
  </FormulateInput>
```
<demo-slots-label />

## 插槽组件
<div id="slot-components"></div>

假设，在给定的项目中，您想要更改所有标签以包含我们在上面的示例中使用的工具提示。你当然可以用作用域插槽来做到这一点，但
它需要大量的复制和粘贴或包装每一个 `FormulateInput` 中 -- 这两个都是糟糕的选择。使用 “插槽组件”，
您可以使用自己的组件覆盖任何 [可用插槽](#available-slots) 的默认值。而且 [上下文对象](/zh/guide/inputs/#context-object) 
会以 prop 的形式传递给该组件，另外，所有在 `slotProps` 中定义的值也会以 prop 方式传递给这个组件。

Slot 组件非常强大，并致力于维护一致的 API，这对于一致性、易用性和 [生成表单](/zh/guide/forms/generating-forms/) 都是可取的。
有关更多详细信息，请查看 [示例插槽组件](#a-slot-component-example).

::: tip 额外的上下文属性

在某些插槽中，有额外的数据绑定到上下文对象，例如插槽 `remove` 上的 `removeItem` 属性。
使用插槽组件时，这些额外的属性除了上下文对象之外，还作为 prop 传递，而不是在内部与上下文对象合并。
:::

### 注册插槽组件
<div id="registering-slot-components"></div>

您可以为所有表单域或特定类型的表单域注册插槽组件。

#### 全局插槽组件

要替换放置在任何可用插槽中的默认组件，只需使用以下 `slotComponents` 选项向 Vue Formulate 注册您的组件：

```js
import Vue from 'vue'
import VueFormulate from '@braid/vue-formulate'
import MyLabel from './MyLabel.vue'

// 使用 Vue 全局注册你的组件
Vue.component('MyLabel', MyLabel)

Vue.use(VueFormulate, {
  slotComponents: {
    // 使用全局注册的组件名的字符串
    label: 'MyLabel'
  }
})
```

#### 特定 `type` 的插槽组件

有时可能只需要为特定表单域类型自定义插槽组件。

```js
import Vue from 'vue'
import VueFormulate from '@braid/vue-formulate'
import MyFileUploadHelp from './MyFileUploadHelp.vue'

// 使用 Vue 全局注册你的组件
Vue.component('MyFileUploadHelp', MyFileUploadHelp)

// 让 Vue Formulate 知道 你想用插槽覆盖的类型
Vue.use(VueFormulate, {
  library: {
    // 这是你的目标表单域的 `type`
    file: {
      slotComponents: {
        help: 'MyFileUploadHelp'
      }
    }
  }
})
```

### 声明插槽 props

插槽组件可以声明自己的 props, 然后这些 props 在顶层被 `FormulateInput` 接受并作为 props 传递给适当的插槽组件。
您可以使用 `slotProp` 为特定类型的表单域或所有表单域声明 prop 。`slotProp` 声明应该总是一个字符串值的数组。

#### 对于所有表单域类型
```js
Vue.use(VueFormulate, {
  slotProps: {
    help: ['extraHelpText']
  }
})
```

然后可以将上述声明用作 `FormulateInput`。

```vue
<FormulateInput
  extra-help-text="My extra help text"
/>
```

#### 对于特定类型

```js
Vue.use(VueFormulate, {
  library: {
    range: {
      slotProps: {
        label: ['slider-icon']
      }
    }
  }
})
```

以上可以用于任何 `range` 类型:

```vue
<FormulateInput
  type="range"
  min="10"
  max="20"
  :slider-icon="true"
/>
```

:::tip 自定义类型表单域
创建自定义表单域时，您可以使用 `slotProp` 声明 [自定义 props](/zh/guide/inputs/custom-inputs/#custom-props)
:::

## 上下文对象
<div id="context-object"></div>

创建或定制表单域的所有三种方法，都使用 [相同的上下文对象](/zh/guide/inputs/#context-object) 进行操作。
该对象对表单域的几乎所有方面、表单域的模型甚至相同 `FormulateForm`（如果适用）的其他表单域都有全面的了解 。

## 一个插槽组件示例

在上面的作用域插槽 [示例](#scoped-slots) 中，我们使用 `label` 作用域插槽向一个表单域添加工具提示。
那么我们如何使用插槽组件来替换我们项目中的每个标签呢？

#### 1. 新建一个组件
`文件: ./components/MyCustomLabel.vue`
```vue
<template>
  <label :for="context.id">
    {{ context.label }}
    <svg
      v-if="tooltip"
      v-tooltip="tooltip"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
    >
      <path d="M50,11A39,39,0,1,0,89,50,39.05,39.05,0,0,0,50,11Zm4,55a4,4,0,0,1-8,0V47a4,4,0,0,1,8,0ZM50,38a4,4,0,1,1,4-4A4,4,0,0,1,50,38Z" />
    </svg>
  </label>
</template>

<script>
export default {
  props: {
    context: {
      type: Object,
      required: true
    },
    tooltip: {
      type: [String, Boolean],
      default: false
    }
  }
}
</script>

<style>
/* styles? sure... */
</style>
```
请注意有关上述组件的一些事项：

1. 它接受了 [全能的 `context` 对象](#context-object) 作为一个 prop
2. 它还接受工具提示内容的 tooltip 作为一个 prop (被 slotProp 所定义)。

当 `label` 插槽被内联定义时，我们可以轻松地对我们的工具提示值进行硬编码，
但是现在我们已经将它定义为一个组件——并且该组件在我们的 `FormulateInput` 中。
结果是告诉 `VueFormulate` 你有一个 `slotProp` 。您在注册插槽组件时执行此操作，
Vue Formulate 将负责将正确的 prop 传递到正确的插槽中。

#### 2. Register the `slotComponent` and `slotProp`

```js
import Vue from 'vue';
import VTooltip from 'v-tooltip'
import VueFormulate from '@braid/vue-formulate'
import MyCustomLabel from './components/MyCustomLabel'

// 注册 v-tooltip （不管你想用什么额外的东西）
Vue.use(VTooltip)

// 全局注册我们的插槽组件
Vue.component('MyCustomLabel', MyCustomLabel)

Vue.use(VueFormulate, {
  // 定义我们的自定义插槽组件
  slotComponents: {
    label: 'MyCustomLabel'
  },
  // 定义要传递给插槽组件的任何 prop
  slotProps: {
    label: ['tooltip']
  }
})
```

阅读有关 [注册插槽组件](#registering-slot-components) 的更多信息。

#### 3. 使用我们的新组件

```vue
<FormulateInput
  type="text"
  label="Enter your EIN"
  tooltip="EIN is an employee identification number"
/>
```
<demo-slots-label-2 />
