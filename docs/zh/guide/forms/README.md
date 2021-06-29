# 表单

虽然您可以自由地将 `FormulateInput` 元素用作独立元素，
但将它们组合成更传统的形式通常很有用。这样做就像将 `FormulateInput` 字段
包装在 `FormulateForm` 组件中一样简单。

该 `FormulateForm` 会积极收集所有来自 `FormulateInput` 域包装的元素的值，
并使用各自的 `name` prop 作为对象的属性名称。您可以用 `v-model` 像在表单域上一样使用读取和写入表单值 。
我们以注册表单为例：

<demo-form-2 />

::: details 查看源码
```vue
<template>
  <FormulateForm
    class="login-form"
    v-model="formValues"
  >
    <h2 class="form-title">Register</h2>
    <p>
      You can place any elements you want inside a form. The inputs themselves
      can even be deeply nested.
    </p>
    <FormulateInput
      name="name"
      type="text"
      label="Your name"
      placeholder="Your name"
      validation="required"
    />
    <FormulateInput
      name="email"
      type="email"
      label="Email address"
      placeholder="Email address"
      validation="required|email"
    />
    <div class="double-wide">
      <FormulateInput
        name="password"
        type="password"
        label="Password"
        placeholder="Your password"
        validation="required"
      />
      <FormulateInput
        name="password_confirm"
        type="password"
        label="Confirm your password"
        placeholder="Confirm password"
        validation="required|confirm"
        validation-name="Confirmation"
      />
    </div>
    <FormulateInput
      type="submit"
      label="Register"
    />
    <pre
      class="code"
      v-text="formValues"
    />
  </FormulateForm>
</template>

<script>
export default {
  data () {
    return {
      formValues: {}
    }
  }
}
</script>

<style scoped>
.login-form {
  padding: 2em;
  border: 1px solid #a8a8a8;
  border-radius: .5em;
  max-width: 500px;
  box-sizing: border-box;
}
.form-title {
  margin-top: 0;
}
.login-form::v-deep .formulate-input .formulate-input-element {
  max-width: none;
}
@media (min-width: 420px) {
  .double-wide {
    display: flex;
  }
  .double-wide .formulate-input {
    flex-grow: 1;
    width: calc(50% - .5em);
  }
  .double-wide .formulate-input:first-child {
    margin-right: .5em;
  }
  .double-wide .formulate-input:last-child {
    margin-left: .5em;
  }
}
</style>
```
:::

## 设置初始值
<div id="setting-initial-values"></div>

要重新填充整个表单的数据，您可以设置表单的 `values` prop。这使得创建 “更新” 表单（如帐户页面）变得容易：

```vue
<template>
  <FormulateForm
    values="formValues"
  >
    <FormulateInput
      type="text"
      name="name"
      label="Your name"
    />
    <FormulateInput
      type="email"
      name="email"
      label="Your email"
    />
    <FormulateInput
      type="submit"
      label="Save account"
    />
  </FormulateForm>
</template>

<script>
export default {
  data () {
    return {
      formValues: {
        name: 'Jenny Taylor',
        email: 'jenny.taylor@example.com'
      }
    }
  }
}
</script>
```

<demo-form-repopulate />

## 模型绑定

在上面的例子中，`formValues` 用于最初设置字段值，但之后它永远不会改变。
通常，被动地使用表单的值是有帮助的。要做到这一点，请使用  `v-model` 而不是 `values` 双向绑定到表单值
——如果您更改该对象的值，表单字段将更新。例如，您在其中一个文本字段中键入，该对象将更新！

```vue
  <FormulateForm
    v-model="formValues"
  >
    ...
  </FormulateForm>
```

:::warning
不建议在表单提交处理程序中通过 `v-model` 使用您的数据。
相反，使用传递给您的提交处理程序的数据。阅读 [提交表单](#submitting-forms) 了解更多信息。
:::

## 提交表单
<div id="submitting-forms"></div>

虽然使用 `v-model` 获取和设置表单的值很容易，
但 `@submit` 事件是从表单中检索最终值以进行处理或
提交到后端的首选方式。这里有许多的原因：

- 所有验证规则（包括异步验证规则）都通过之前，该 `@submit` 事件不会触发。
- 此 `@submit` 事件中发出的数据是深度克隆的，可以安全地更改而没有副作用。

您可以像标准 `<form>` 元素的 submit 一样监听监听 `@submit` 事件。如果您从提交处理程序返回一个 `Promise`,
`FormulateForm` 将自动在 [上下文对象](#context-object) 中公开 `isLoading` 属性。

::: details 表单提交控制流程图
![Form submission control flow](./control-flow.svg)
:::

```vue
<template>
  <FormulateForm
    @submit="submitHandler"
    #default="{ isLoading }"
  >
    <FormulateInput
      label="What is your name?"
      name="name"
      help="Please enter your name"
      validation="required"
    />
    <FormulateInput
      type="submit"
      :disabled="isLoading"
      :label="isLoading ? 'Loading...' : 'Submit this form'"
    />
  </FormulateForm>
</template>

<script>
export default {
  methods: {
    async submitHandler (data) {
      await this.$axios.post('/my/api', data)
      alert(`Thank you, ${data.name}`)
    }
  }
}
</script>
```

**Outputs:**

<demo-form-3 />

注意上面的表单在它包含的任何字段通过验证之前不会触发 alert 对话框。整洁哦。

:::tip
由于验证规则是异步的，并且 [文件上传](/zh/guide/inputs/types/file) 时，
将等待解析 `@submit` 事件，相当于表单提交也是异步的。
:::

#### 未经验证的提交处理程序

有时您可能不想选择加入 `@submit` 事件的默认行为， 而是希望在每次尝试提交表单时同步收到通知。
对于这些边缘情况，您可以绑定到 `@submit-raw` 事件。

此事件在所有提交尝试时触发，即使输入未通过验证。由您决定如何处理它。
事件的载荷是一个 [`FormSubmission` 实例](https://github.com/wearebraid/vue-formulate/blob/master/src/FormSubmission.js).

## 表单验证 <Badge text="2.5" /> {data-new}

该 `<FormulateForm>` 组件始终了解其每个表单域的验证状态。
此外，除非每个嵌套的 `FormulateInput` 都有有效值，否则不会调用 `@submit` 处理程序。
表单的验证状态也可以通过 `default` 插槽提供给您的模板。在这个例子中，
我们只在所有字段都通过验证时启用提交按钮：

```vue
<FormulateForm
  #default="{ hasErrors }"
>
  <FormulateInput
    type="email"
    label="Please enter a superhero email address"
    validation="required|email"
    validation-behavior="live"
  />
  <FormulateInput
    type="checkbox"
    label="Select some of your favorite superheros"
    validation="required|min:2"
    :options="{
      batman: 'Batman',
      blackpanther: 'Black Panther'
      captainamerica: 'Captain America,
      catwoman: 'Catwoman',
      hulk: 'Hulk,
      superman: 'Superman',
      wonderwoman: 'Wonder woman',
    }"
    validation-behavior="live"
  />
  <FormulateInput
    type="submit"
    :disabled="hasErrors"
  />
</FormulateForm>
```
<demo-form-7 />

### 验证失败的消息 <Badge text="2.5" /> {data-new}

在长表单上，当提交包含无效字段的表单时，在提交按钮附近显示错误消息会很有帮助，
因为验证错误可能在可视区域之外。为此，请使用 `invalid-message` prop。

```vue
<FormulateForm
  invalid-message="Not all fields were filled out properly"
>
  <FormulateInput
    label="Email"
    type="email"
    name="email"
    validation="required|email"
  />
  <FormulateInput
    label="First name"
    name="first_name"
    validation="required"
  />
  <FormulateInput
    label="Last name"
    name="first_name"
    validation="required"
  />
  <!-- 表单错误将显示在这 -->
  <FormulateErrors />
  <FormulateInput type="submit" />
</FormulateForm>
```

<demo-form-8 />

该 `invalid-message` prop 可以是一个 String，Array 或者一个 Function。
函数被传递一个包含所有无效表单域的对象，
你应该返回一个 `String` 或 `Array` 字符串。
对上面的例子稍作调整，我们就可以输出失败的字段的名称：

```vue
<FormulateForm
  :invalid-message="invalidMessage"
>
...
<script>
export default {
  methods: {
    invalidMessage(fields) {
      const fieldNames = Object.keys(fields)
      const listOfNames = fieldNames.map(fieldName => fieldName.replace('_', ' '))
      return `Invalid fields: ${listOfNames}`
    }
  }
}
</script>
```

<demo-form-9 />

:::tip
有关该 `FormulateErrors` 组件的更多信息，请阅读
[表单错误处理](/zh/guide/forms/error-handling/#form-errors).
:::

## 带条件的字段

要使字段有条件，请使用简单的 Vue 指令，例如 `v-if`。

```vue
<FormulateForm v-model="values">
  <FormulateInput
    type="select"
    name="planet"
    label="What is your favorite rocky planet?"
    :options="{ mercury: 'Mercury', venus: 'Venus', earth: 'Earth', mars: 'Mars' }"
  />
  <FormulateInput
    v-if="values.planet === 'earth'"
    key="earth"
    name="earth_moon"
    label="What is the name of earth’s moon?"
  />
  <FormulateInput
    v-if="values.planet === 'mars'"
    key="mars"
    name="mars_sunset"
    label="What color is the Martian sunset?"
  />
</FormulateForm>
```
<demo-form-4 />

:::warning 条件字段和 key
由于 Vue 修补 DOM 的方式，通常最佳做法是在可以动态换出的每个 `FormulateInput` 上放置一个 `key`。
这确保了 Vue 在修补时不会重复使用 DOM 元素。有关更多信息，请阅读 Vue 文档中有关 [重(chong)用元素](https://vuejs.org/v2/guide/conditional.html#Controlling-Reusable-Elements-with-key) 的信息。
:::

#### 保留条件值

您是否注意到在上面的示例中，当相应的值被删除时，
表单数据中的值也被 `FormulateInput` 删除了？
如果您需要将这些值保留在表单数据中，请将 `keep-model-data` prop 设置为 `true`。
如果你只想要保存一两个字段的数据，你也可以将 `keep-model-data` 直接设置在相应的 `<FormulateInput>` 上。

```vue
<FormulateForm
  v-model="values"
  :keep-model-data="true"
>
  <FormulateInput
    type="select"
    name="planet"
    label="What is your favorite rocky planet?"
    :options="{ mercury: 'Mercury', venus: 'Venus', earth: 'Earth', mars: 'Mars' }"
  />
  <FormulateInput
    v-if="values.planet === 'earth'"
    key="earth"
    name="earth_moon"
    label="What is the name of earth’s moon?"
  />
  <FormulateInput
    v-if="values.planet === 'mars'"
    key="mars"
    name="mars_sunset"
    label="What color is the Martian sunset?"
  />
</FormulateForm>
```
<demo-form-5 />

## 忽略表单域 <Badge text="2.5+" />

复杂的表单通常具有不需要提交给服务器的表单域，
例如仅用于控制表单显示的表单域。这些表单域可以通过添加 `ignored` prop 来选择退出表单参与：

```vue
<FormulateForm
  v-model="values"
>
  <FormulateInput
    label="Select your meal"
    v-model="meal"
    type="select"
    :options="{burger: 'Hamburger', pasta: 'Pasta'}"
    ignored
  />
  <FormulateInput
    v-if="meal === 'burger'"
    label="Build your own burger"
    type="checkbox"
    name="burger"
    :options="{
      meat: 'Meat',
      lettuce: 'Lettuce',
      tomato: 'Tomato',
      cheese: 'Cheese'
    }"
  />
  <FormulateInput
    label="Select a pasta sauce"
    v-if="meal === 'pasta'"
    name="sauce"
    type="radio"
    :options="{
      bolognese: 'Bolognese',
      carbonara: 'Carbonara',
      tortellini: 'Tortellini'
    }"
  />
</FormulateForm>
```

<demo-form-6 />

## 命名表单

Vue Formulate 引入了 “命名表单” 的概念，作为通过 `$formulate` 插件 _全局_ 访问和操作表单的机制。
要利用命名表单，只需为任何 `<FormulateForm>` 组件提供一个唯一的 name prop 即可。
在任何当前安装的表单中名称应该是唯一的。
命名表单后，您可以轻松调用多个命名的表单方法。

方法                         | 说明
-------------------------------|------------------------------------------------
`handle(err, formName)`        | 用于在表单上设置错误消息，通常来自后端服务器。阅读有关 [错误处理](/zh/guide/forms/error-handling/) 了解更多信息。
`reset(formName, values)`      | 重置表单的值、验证消息和错误消息。
`resetValidation(formName)`    | 重置所有验证和错误消息。
`setValues(formName)`          | 设置表单模型的值（即使没有 `v-model` 定义）
`submit(formName)`             | 用于以编程方式提交表单。

:::details 查看源码
```vue
<template>
  <FormulateForm
    name="login"
    @submit="setSomeErrors"
    v-model="formData"
    class="login-form"
  >
    <h2 class="form-title">Login</h2>
    <FormulateInput
      name="email"
      label="Email"
      validation="required|email"
    />
    <FormulateInput
      name="password"
      label="Password"
      validation="required"
    />
    <FormulateErrors />
    <div class="actions">
      <FormulateInput
        type="submit"
      />
      <FormulateInput
        type="button"
        label="Reset"
        data-ghost
        @click="reset"
      />
    </div>
    <code class="code code--block">{{ formData }}</code>
  </FormulateForm>
</template>

<script>
export default {
  data () {
    return {
      formData: {}
    }
  },
  methods: {
    setSomeErrors () {
      // do some processing...
      const errors = {
        fieldErrors: { username: 'Sorry, no such username exists!' },
        formErrors: ['Incorrect login, please try again.']
      }
      this.$formulate.handle(errors, 'login')
    },
    reset () {
      this.$formulate.reset('login')
    }
  }
}
</script>

<style>
.actions {
  display: flex;
  margin-bottom: 1em;
}
.actions .formulate-input {
  margin-right: 1em;
  margin-bottom: 0;
}
.login-form {
  padding: 2em;
  border: 1px solid #a8a8a8;
  border-radius: .5em;
  max-width: 500px;
  box-sizing: border-box;
}
.form-title {
  margin-top: 0;
}
</style>
```
:::
<demo-named-form />

## 事件

事件          | 说明
---------------|------------------------------------------------------------------
`created`      | 在应用默认值后，在表单的生命周期创建后触发
`failed-validation` | 当表单提交由于验证失败时发出，传递一个以字段名称作为属性和组件实例作为值的对象。
`input`        | 当表单中的任何值更改时发出。
`submit-raw`   | 在任何表单提交尝试时发出，即使是无效字段。
`submit`       | _如果_ 所有字段都通过验证，则由任何标准表单提交事件发出

## Props
<div id="props"></div>

名称              | 说明
------------------|-----------------------------------------------------------------
`debounce`        | 以表单形式清除所有表单域的抖动的时间量（单位毫秒）。 _Note: this is not reactive, it only applies to inputs when they register_
`invalid-message` | `String`, `Array` 或 `Function`, 当表单提交时显示无效字段的错误消息。

## 上下文对象 <Badge text="2.5" /> {data-new}

表单包含一个 `default` 插槽，它传递了一个表单上下文对象。
此对象类似于 [表单域上下文对象](/zh/guide/inputs/#context-object)，但要简单得多。

Property              | 说明
----------------------|-----------------------------------------------------------
`errors`              | 通过 [错误处理](/zh/guide/forms/error-handling/) 功能分配的一组显式表单错误（不是验证错误）。
`hasErrors`           | `Boolean` 指示表单是否有验证错误
`hasValue`            | `Boolean` 指示表单是否有任何值
`isValid`             | `hasErrors` 的倒数
`isLoading`           | If the form is currently loading. This is automatically managed by returning a promise from your `@submit handler.
`values`              | 表单本身的输入值。
