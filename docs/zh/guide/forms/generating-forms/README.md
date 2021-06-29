# 构建表单

构建表单是 Vue Formulate 的一流功能，可以通过以下两种方式完成：

- [模式](#schemas) (推荐)
- [简单迭代](#simple-iteration)

上面的方法非常相似——都使用具有 prop 值的对象数组。
这非常有效，因为 Vue Formulate 是一个组件优先的库，
几乎所有的功能都可以通过 props 访问。
此外，[插槽组件](/zh/guide/inputs/slots/#slot-components) 等功能允许自定义渲染的表单域，
而无需自带组件（尽管您可以）。

## 模式
<div id="schemas"></div>

模式是在 `2.4` 版本中引入的，允许生成带有group字段、包装器和您自己的组件的复杂表单。
展示胜于讲述，因此这里有一个包含多个示例的交互式 JSON 游乐场。在此之后，我们将更详细地介绍模式的结构。

##### 交互式 JSON 游乐场

<ClientOnly>
  <demo-schemas />
</ClientOnly>

### 模式表单域

模式只是对象的数组，其中每个对象都表示要给生成的组件或标记的 prop。默认情况下，架构中的对象假定为 `FormulateInput` 组件。
事实上，最简单的有效模式是一个只带有空对象的数组，该对象 `[{}]` 呈现为一个空文本字段。

<FormulateForm :schema="[{}]" />

这些模式数组可以作为 prop 直接传递给 `<FormulateForm>` 或 `<FormulateSchema>`。
由于 `<FormulateForm>` 添加了模型绑定，除非您有高级需求，否则它是最方便的选择。

```vue
<template>
  <FormulateForm
    v-model="values"
    :schema="schema"
  />
</template>

<script>
export default {
  data () {
    return {
      values: {},
      schema: [
        {
          type: 'password',
          name: 'password',
          label: 'Enter a new password',
          validation: 'required'
        },
        {
          type: 'password',
          name: 'password_confirm',
          label: 'Confirm your password',
          validation: '^required|confirm:password',
          validationName: 'Password confirmation'
        },
        {
          type: 'submit',
          label: 'Change password'
        }
      ]
    }
  }
}
</script>
```
<demo-schema-1 />

### 模式组件

模式不限于 `FormulateInput` 元素。
每个对象都可以定义一个 `component` 属性来指定要呈现的任何组件或 HTML 标记。

```js
[
  {
    component: 'img',
    src: '/logo.svg',
    style: 'width: 50px;'
  },
  {
    component: 'Badge',
    text: '2.4.0'
  },
]
```

<demo-schema-2 />

### 模式子级

最后一部分，拼图也是嵌套模式的能力。例如，您可能想要包装两个元素，或使用一个 `group` 表单域。模式的深度或大小没有限制。

```js
[
  {
    type: 'group',
    repeatable: true,
    name: 'addresses',
    addLabel: '+ Address',
    children: [
      {
        name: 'street',
        label: 'Street address'
      },
      {
        name: 'city',
        label: 'City',
      },
      {
        component: 'div',
        class: 'double-row',
        children: [
          {
            name: 'state',
            type: 'select',
            label: 'State',
            options: {
              va: 'Virginia',
              fl: 'Florida',
              ne: 'Nebraska',
              ca: 'California'
            },
          },
          {
            name: 'zip',
            label: 'Zip',
          },
        ]
      }
    ]
  }
]
```

<demo-schema-3 />

### 模式事件 <Badge text="2.5" /> {data-new}

模式还支持事件绑定。可以通过三种方式将事件绑定到您的模式中：

- 简单的事件监听器
- 重命名的事件侦听器
- 内联函数

#### 简单的事件监听器

将事件绑定到架构元素就像 `@{eventName}` 在元素上包含属性一样简单。例如，给定这个架构：

```json
[
  {
    "type": "text",
    "name": "username",
    "@blur": true
  }
]
```

我们现在可以通过 `<FormulateForm>` 或 `<FormulateSchema>` 向 username 元素添加事件侦听器来侦听 blur 事件：


```vue
<FormulateForm
  :schema="schema"
  @blur="handleBlur"
/>
```

<demo-schema-4 />

#### 重命名的事件侦听器

当您只需要侦听模式中的一两个事件时，简单事件侦听器非常有用，但是当您需要侦听多个模式节点上的多
个事件时会发生什么？例如，如果长表单中的每个输入都侦听 `@focus` 事件，
则确定哪个输入已被关注可能会令人沮丧。

为了解决这个问题，您可以通过简单地提供一个新的事件名称作为您的 `@{eventName}` 属性值来重命名发出的事件。
您可以选择任何字符串（kebab-case推荐）。例如：

```json
[
  {
    "label": "Select a username",
    "type": "text",
    "name": "username",
    "@focus": "focus-username"
  },
  {
    "label": "Select a password",
    "type": "password",
    "name": "password",
    "@focus": "focus-password"
  },
  {
    "label": "Confirm your password",
    "validation": "confirm",
    "type": "password",
    "name": "password_confirm",
    "@focus": "focus-confirm"
  }
]
```

```vue
<FormulateForm
  :schema="schema"
  @focus-username="focusedOn = 'username'"
  @focus-password="focusedOn = 'password'"
  @focus-confirm="focusedOn = 'confirm'"
>
  Now we know the last focus was <strong>{{ focusedOn }}</strong>
</FormulateForm>
```

<demo-schema-5 />

#### 内联函数

也可以将事件侦听器函数直接绑定到您的架构中。
此选项（显然）不适用于简单的 JSON，但如果您将架构存储在组件中，
或者如果您从 JavaScript 文件导出架构，则它非常有用。

```js
export default [
  {
    label: 'Where would you prefer to live?',
    type: 'select',
    name: 'location',
    options: ['Cleveland', 'Fiji', 'San Francisco',],
    '@change': (e) => e.target.value === 'Fiji' ? alert('🏝') : alert('🤔')
  }
]
```

<demo-schema-6 />

## 简单迭代
<div id="simple-iteration"></div>

因为 Vue Formulate 强调单一表单域 API，它使 DIY 表单生成变得简单。
在最简单的形式中，您只需要一个要表示表单域的对象数组即可。

```vue
<template>
  <FormulateForm>
    <FormulateInput
      v-for="item in items"
      :key="item.name"
      v-bind="item"
    />
  </FormulateForm>
</template>

<script>
export default {
  data () {
    return {
      items: [
        {
          name: 'email',
          label: 'Your email',
          validation: 'required|email'
        }
      ]
    }
  }
}
</script>
```
<demo-generating-1 />

这个简单的功能实际上可以生成相当健壮的表单，因为您可以通过 props 完全控制您的表单域：

:::details JSON 源码
```js
[
  {
    type: 'text',
    name: 'name',
    label: 'What is your name?',
    placeholder: 'Your name...',
    validation: 'required'
  },
  {
    type: 'text',
    name: 'address',
    label: 'What is your street address?',
    placeholder: 'Your address...',
    help: 'Where would you like your product shipped?',
    validation: 'required'
  },
  {
    type: 'radio',
    name: 'method',
    label: 'What shipping method would you like?',
    options: [
      { value: 'fedex_overnight', id: 'fedex_overnight', label: 'FedEx overnight' },
      { value: 'fedex_ground', id: 'fedex_ground', label: 'FedEx ground' },
      { value: 'usps', id: 'usps', label: 'US Postal Service' }
    ],
    value: 'fedex_ground',
    'validation-name': 'Shipping method',
    validation: 'required'
  },
  {
    name: 'submit',
    type: 'submit',
    label: 'Submit order'
  }
]
```
:::

<demo-generated />
