# 分组

这个 `group` [classification](/zh/guide/inputs/custom-inputs/#what-is-a-classification)
只包含 `group` 类型表单域. 它是一种特殊的表单域，用于在逻辑上将一个或多个字段组合在一起。它适用于：

- [组织表单数据](#data-organization).
- [创建可重复的组](#repeatable-groups).
- [验证字段集合](#validation)

## Data organization
<div id="data-organization"></div>

您可以使用该 `group` 类型对数据进行逻辑分组。嵌套在一个 `group` 下的字段将作为它们自己的对象捆绑在一起。

```vue
<FormulateForm
  v-model="fields"
>
  <FormulateInput
    type="text"
    name="name"
    label="Your name"
  />
  <FormulateInput
    type="group"
    name="address"
  >
    <FormulateInput
      type="text"
      name="address"
      label="Street address"
    />
    <FormulateInput
      type="text"
      name="city"
      label="City"
    />
    <FormulateInput
      type="select"
      name="state"
      label="State"
      :options="{VA: 'Virginia', CA: 'California', NY: 'New York'}"
    />
  </FormulateInput>
</FormulateForm>
```
<demo-group-data />


:::tip
为了一致性，`group` 即使该字段不可重复，一个分组的值也将始终是一个数组。
如果您需要一个普通对象，我们建议在 [表单](/zh/guide/forms/) `submit` 处理程序中解构数组。
:::

## 可重复的分组
<div id="repeatable-groups"></div>

通过将 `repeatable` prop 设置为 `true` ，让我们组内的任何内容，包括非公式化元素在内的任何内容都可以无限重复。
还添加了一个 “添加更多” 按钮，以及每个项目的删除按钮。`repeatable` 可以使用特殊 [props](#props) 
和 [插槽](#slots) 进一步定制一个分组。

::: details 查看源代码
```vue
<template>
  <div class="form-wrapper">
    <FormulateForm
      v-model="formData"
    >
      <FormulateInput
        type="group"
        name="attendees"
        :repeatable="true"
        label="Who is going to attend?"
        add-label="+ Add Attendee"
        validation="required"
      >
        <div class="attendee">
          <FormulateInput
            name="name"
            validation="required"
            label="Attendee’s name"
          />
          <FormulateInput
            type="email"
            name="email"
            validation="required|email"
            label="Attendee’s email"
          />
          <strong class="price" v-text="`$100`" />
        </div>
      </FormulateInput>
      <FormulateInput
        type="radio"
        label="Select your payment method"
        name="payment"
        :options="{paypal: 'PayPal', credit: 'Credit Card'}"
      />
      <strong>Total: {{ total }}</strong>
      <FormulateInput
        type="submit"
        label="Purchase tickets"
      />
    </FormulateForm>
    <code class="code code--block">{{ formData }}</code>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formData: {}
    }
  },
  computed: {
    total () {
      const count = Array.isArray(this.formData.attendees) ? this.formData.attendees.length : 1
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'}).format(count * 100)
    }
  }
}
</script>

<style scoped>
.form-wrapper {
  padding: 2em;
  border: 1px solid #a8a8a8;
  border-radius: .5em;
  box-sizing: border-box;
}
@media (min-width: 650px) {
  .attendee {
    display: flex;
  }
}

@media (min-width: 720px) {
  .attendee {
    display: block;
  }
}

@media (min-width: 850px) {
  .attendee {
    display: flex;
  }
  .attendee .formulate-input {
    margin-right: 1.5em;
  }
}
.attendee .formulate-input {
  margin-right: 2em;
  margin-bottom: 0;
}

strong {
  display: block;
  margin: 1em 0;
}

strong.price {
  margin-top: 1.25em;
  margin-bottom: 0;
  height: 2.5em;
  display: inline-flex;
  align-items: center;
}

code {
  margin-top: 2em;
}
</style>
```
:::

<demo-group-repeatable />

:::warning
使用分组创建具有深度嵌套的非常大的表单很容易，但是请记住，
所有表单域都相互依赖——这样做会产生性能问题。如果您发现性能问题，
请尝试利用 [表单或表单域上的 `debounce` prop](/zh/guide/forms/#props).
:::

### 验证功能
<div id="validation"></div>

默认情况下，组内的字段与任何其他字段一样可以验证。例如，在分组中的必填字段中新加一个字段
会阻止该表单提交，直到该字段填入了内容。但是，您也可以直接在组上放置验证规则。
因此，在 `group` 组件上放置 “required” 规则 可确保您的组中至少有 1 个可重复项。

```vue
<FormulateForm>
  <FormulateInput
    type="group"
    label="Add your social media pages"
    :repeatable="true"
    validation-name="social media links"
    validation="min:2,length"
    add-label="+ Social link"
  >
    <FormulateInput
      label="Social media link"
      validation="required|url"
    />
  </FormulateInput>
  <FormulateInput
    type="submit"
  />
</FormulateForm>
```

<demo-group-repeatable-2 />

:::tip
在分组组件上没有 `blur` 事件，因此默认情况下，当有人尝试提交表单时将显示验证错误。
如果您希望立即显示错误，请考虑使用 `error-behavior="live"`。
:::

:::tip
[`confirm` 规则](/zh/guide/validation/#confirm) 目前在分组内无法执行。这将在即将发布的版本中修复。查看 [跟踪问题](https://github.com/wearebraid/vue-formulate/issues/226) 。
:::

#### 使用自定义验证规则

将自定义验证规则应用于 `group` 字段允许非常精细和强大的规则来满足您的特定场景。
这些规则使您可以访问其所有子字段中的数据，从而允许复杂的跨字段验证。

::: details 查看源码
```vue
<template>
  <FormulateForm
    class="form-wrapper"
    @submit="handle"
  >
    <FormulateInput
      name="name"
      label="Your name"
      placeholder="Your name"
      validation="required"
    />
    <FormulateInput
      label="Your shipping address"
      type="group"
      validation="address"
      :validation-rules="{ address: addressRule }"
      :validation-messages="{ address: addressMessage }"
    >
      <FormulateInput
        name="street"
        placeholder="Street address"
      />
      <div class="triple">
        <FormulateInput
          name="city"
          placeholder="City"
        />
        <FormulateInput
          type="select"
          name="state"
          :options="{VA: 'VA', PA: 'PA', WA: 'WA'}"
          placeholder="State"
        />
        <FormulateInput
          name="zip"
          placeholder="Zip"
        />
      </div>
    </FormulateInput>
    <FormulateInput
      type="submit"
    />
  </FormulateForm>
</template>

<script>
export default {
  methods: {
    addressRule ({ value }) {
      if (Array.isArray(value)) {
        const [address] = value
        return address.street && address.city && address.state && address.zip
      }
      return false
    },
    addressMessage ({ value }) {
      if (Array.isArray(value)) {
        const [address] = value
        const missing = ['street', 'city', 'state', 'zip'].reduce((missing, field) => {
          if (!address[field]) {
            missing.push(field)
          }
          return missing
        }, [])
        return `Your shipping address still requires: ${missing.join(', ')}.`
      }
      return 'Please fill out your shipping address.'
    },
    handle () {
      alert('All validation complete, form submitted.')
    }
  }
}
</script>

<style scoped>
.form-wrapper {
  padding: 2em;
  border: 1px solid #a8a8a8;
  border-radius: .5em;
  box-sizing: border-box;
  max-width: 450px;
}


.form-wrapper::v-deep .formulate-input-element {
  max-width: none;
}

@media (min-width: 650px) {
  .triple {
    display: flex;
  }

  .triple .formulate-input {
    margin-bottom: .25em;
    margin-right: 1em;
    flex-grow: 1;
  }

  .triple .formulate-input[data-classification="select"] {
    flex: 0 0 5em;
  }

  .triple .formulate-input:last-child {
    margin-right: 0;
  }
}

@media (min-width: 720px) {
  .triple {
    display: block;
  }

  .triple .formulate-input {
    margin-bottom: 1.5em;
    margin-right: 0;
  }
}

@media (min-width: 850px) {
  .triple {
    display: flex;
  }
  .triple .formulate-input {
    margin-bottom: .25em;
    margin-right: 1em;
  }

  .triple .formulate-input:last-child {
    margin-right: 0;
  }
}

</style>

```
:::
<demo-group-validation />

## 为分组设置错误信息 <Badge text="2.5" /> {data-new}

在分组上显式设置错误信息时，我们需要一种方法来指示错误字段位于哪个索引。
为了使这尽可能简单，请使用 `group-errors` prop 和 “点符号” 来引用索引中的表单域。例如：

```vue
<FormulateInput
  type="group"
  :repeatable="true"
  name="invitees"
  :group-errors="{
    '0.email': 'This email is already in use',
    '1.name': 'Pretty sure Rensmold isn’t a real last name'
  }"
  :value="[
    { name: 'Todd Berkins', email: 'todd@example.com' },
    { name: 'Stella Rensmold', email: 'stella@example.com' },
  ]"
>
  <FormulateInput
    name="name"
    label="Invitee's name"
  />
  <FormulateInput
    name="email"
    label="What is this user's email?"
  />
</FormulateInput>
```

<demo-group-errors-1 />

注意错误信息总是从分组的索引开始。`group-errors` prop 的属性必须始终以它们所应用到的组的索引开始。

你还可以 [通过 `<FormulateForm>` 使用点符号](/zh/guide/forms/error-handling/#form-input-errors) 来设置分组的错误信息

## 分组的当前索引

要操作分组的不同字段，获取当前组项的索引很有帮助。幸运的是，插槽可以提供帮助。例如 `default`，插槽提供 `index` 作为 `groupProps` 的上下文变量：

例如：
```vue
 <FormulateInput
    type="group"
    name="attendees"
    :repeatable="true"
    add-label="+ Add Attendee"
    #default="{ index }"
>
  <p>This is Group # {{ index }} </p>
  <FormulateInput
    name="price"
    disabled
    :value="getPrice(index)"
    label="Price"
  />
</FormulateInput>
```

## Props

分组里的字段，有一些独特的 props

Prop             | 说明
-----------------|----------------------------------------------------------------
`add-label`      | 当可重复时，这是显示在 “+ 添加” 按钮上的标签（默认为 `label || name`）
`limit`          | 当可重复时，这是组项目的最大数量。
`minimum`        | 当可重复时，这是组项目的最小数量。
`remove-label`   | 当可重复时，这是显示在 “删除” 按钮上的标签。
`remove-position`| 在组内表单域的 `before` 或 `after` 显示删除按钮 (默认为 `after`)
`repeatable`     | `Boolean` 类型，指示该字段是否可重复。
`group-errors`   | `Object` 点符号属性 (就像 `0.name`) 的错误

## 插槽

分组有几个独特的插槽（和匹配的 [插槽组件](/zh/guide/inputs/slots/#slot-components)）：

插槽名      | 说明
---------------|----------------------------------------------------------------
`addmore`      | `repeatable` 时的添加更多按钮。<br>_此插槽中的上下文对象包括一个 `addMore`函数，应调用该函数来添加新项目。_
`default`      | 默认插槽中的任何内容都将被视为组的一部分, 当存在 `repeatable` 时， _上下文对象将另外具有 "index" 属性。_
`grouping`     | 主要的可重复区域，负责渲染内部内容。
`remove`       | `repeatable` 时的删除按钮。<br>_此插槽中的上下文对象包括 `index` 和一个 `removeItem` 函数用于删除该项目_
`repeatable`   | 负责渲染每一行表单域。<br>_此插槽中的上下文对象包括一个 `removeItem` 函数，应调用该函数以删除该项目。_

## 事件 <Badge text="2.5" /> {data-new}

分组类型有两个独特的事件：

事件名 | 说明
-----------|--------------------------------------------------------------------
`@repeatableAdded` | 将新的可重复项添加到分组时触发。
`@repeatableRemoved` | 从组中删除可重复项时触发

## 自定义样式 class 名

除了所有 [公共样式 class 名](/zh/guide/theming/#customizing-classes) 之外，
还可以使用以下 class 名：

键             | 默认值                          | 说明
----------------|----------------------------------|---------------------------------------------------
`grouping`      | `.formulate-input-grouping`      | 所有可重复字段的包装器（仅在可重复时存在）
`groupRepeatable`    | `.formulate-input-group-repeatable` | 每组分组字段的包装器（即使对于不可重复的组也存在）。
`groupRepeatableRemove`   | `.formulate-input-group-repeatable-remove` | 字段组的删除按钮。
`groupAddMore`       | `.formulate-input-group-add-more` | 可重复分组的 “添加更多按钮” 周围的包裹器。
