# 错误处理

尽管 Vue Formulate 提供了很好的 [验证器](/zh/guide/validation)，
但仅仅依赖前端验证是不明智的。将错误消息从后端获取到表单的相关输入中可能会
很乏味。Vue Formulate 提供了一种简单的方法来将表单级别和表单域级别的错误放入表单中。

## 手动错误处理

我们从 [表单域文档](/zh/guide/inputs#all-options) 中已经知道所有的表单域都有
 `error` 和 `errors` props 可以用。

```vue
<FormulateInput
  type="text"
  label="What is your username"
  :error="isTaken ? 'That username is already taken' : null"
/>
```
<demo-errors-1 />

这些 `error` prop 会覆盖元素的 `error-behavior` prop（通过实时 `live` 或 `blur` 显示错误）
并且无论如何都会显示。您当然可以通过这种方式处理所有后端错误，但它仍然过于冗长。

## 表单的错误
<div id="form-input-errors"></div>

`FormulateForm` 具有为表单中的每个 `FormulateInput` 设置错误的机制。

```vue
<FormulateForm
  :errors="{
    username: 'That username is already taken',
    password: ['You can’t re-use an old password', 'That password was too weak']
  }"
>
  <FormulateInput
    name="username"
    label="Select a username"
    type="text"
  />
  <FormulateInput
    name="password"
    label="Choose your password"
    type="password"
  />
</FormulateForm>
```
<demo-errors-2 />

正如您在示例中所看到的，此 `FormulateForm` 接受一个通过 `errors` prop 传递的对象，
并在表单中定位到具有匹配 `name` 的表单域上. 您可以定义单个错误字符串或要显示的错误字符串数组。

如果您使用 `FormulateForm` 和直接在 `FormulateInput` 上设置错误， 则将同时显示值，并删除任何重复项。

```vue
<FormulateForm
  :errors="{
    username: ['Username is too short', 'Username is already taken' ]
  }"
>
  <FormulateInput
    name="username"
    label="Select a username"
    :errors="['Username is too short', 'Invalid username characters']"
  />
</FormulateForm>
```
<demo-errors-3 />

### 分组的错误 <Badge text="2.5" /> {data-new}

[`group` 类型的表单域](/zh/guide/inputs/types/group/) 提出了一个有趣的挑战，因为它们嵌套在数组中。
为了处理这些嵌套和可重复的表单域，Vue Formulate 支持通过 “点符号” 设置错误。

```vue
<FormulateForm
  :errors="{
    'stocks.0.price': 'You’re paying too much for this stock',
    'stocks.2.symbol': 'That stock symbol doesn’t exist.'
  }"
>
```

:::details 完整示例代码
```vue
<FormulateForm
  :errors="{
    'stocks.0.price': 'You’re paying too much for this stock',
    'stocks.2.symbol': 'That stock symbol doesn’t exist.'
  }"
  :values="{
    payment_method: 'mastercard',
    stocks: [
      { symbol: 'AAPL', price: '122.00' },
      { symbol: 'MSFT', price: '13.00' },
      { symbol: 'FXSW', price: '3200.00' }
    ]
  }"
>
  <FormulateInput
    label="Payment method"
    type="select"
    name="payment_method"
    :options="{
      visa: 'Visa x-4452',
      mastercard: 'Mastercard x-9927'
    }"
  />
  <FormulateInput
    type="group"
    name="stocks"
    label="Enter the names of stocks you want to purchase"
    add-label="+ Add stock"
    :repeatable="true"
  >
    <FormulateInput
      name="symbol"
      label="Stock symbol"
    />
    <FormulateInput
      name="price"
      label="Limit price"
      help="How much are you willing to pay?"
    />
  </FormulateInput>
  <FormulateInput
    type="submit"
    label="Purchase stocks"
  />
</FormulateForm>
```
:::

<demo-group-errors-2 />

:::tip
您也可以使用 `group-errors` 直接在分组本身上进行设置。有关更多详细信息，
请阅读 [`group`类型文档](/zh/guide/inputs/types/group/)。
:::

## 表单错误
<div id="form-errors"></div>

有时，表单错误与 `FormulateInput` 无关。也许是服务器正在响应 `500` 状态码。
该 `form-errors` prop 专为这种场合而设计。

```vue
<FormulateForm
  :form-errors="['Sorry, an unexpected error ocurred. Please try again soon.']"
>
  <FormulateInput
    type="text"
    name="st_address"
    label="Street Address"
  />
  <FormulateInput
    type="text"
    name="city"
    label="City"
  />
  <FormulateForm
    type="submit"
    label="Submit Order"
  />
</FormulateForm>
```
<demo-errors-4 />

默认情况下，这些错误显示在表单的顶部，但通常将这些错误移到更靠近表
单提交操作的地方更有意义。您可以通过在 `<FormulateForm>` 元素内的任何位置添加 `<FormulateErrors />` 组件来实现此目的。

```vue
<FormulateForm
  class="order-form"
  :form-errors="[
    'Sorry, an unexpected error ocurred. Please try again soon.'
  ]"
>
  <FormulateInput
    type="text"
    name="st_address"
    label="Street Address"
  />
  <FormulateInput
    type="text"
    name="city"
    label="City"
  />
  <FormulateErrors />
  <FormulateInput
    type="submit"
    label="Submit Order"
  />
</FormulateForm>
```

<demo-errors-5 />

这会自动从顶部删除表单错误并将它们定位到 `<FormulateErrors />` 放置的任何位置。
如果您希望表单错误出现在多个位置，您甚至可以有多个 `<FormulateErrors />` 。

## 表单错误处理

现在我们已经介绍了如何在表单上显示错误，让我们来谈谈我们
如何以更优雅的方式实际处理这些错误。让我们完成一个简单的登录表单：

#### 一个有问题的例子
```vue
<template>
  <FormulateForm
    :form-errors="formErrors"
    :errors="inputErrors"
    @submit="login"
  >
    <FormulateInput
      type="email"
      name="email"
      validation="required|email"
    />
    <FormulateInput
      type="password"
      name="password"
      validation="required"
    />
    <FormulateErrors />
    <FormulateInput
      type="submit"
      label="Login"
    />
  </FormulateForm>
</template>

<script>
export default {
  data () {
    formErrors: [],
    inputErrors: {}
  },
  methods: {
    async login () {
      try {
        const res = await this.$axios.post('/login')
        this.$cookie.setToken(res.data.token) // do some auth
      } catch (err) {
        // here's where things get nasty
        if (err.response && err.response.status) {
          switch (err.response.status) {
            case 422:
              this.inputErrors = err.response.data.errors // assign field errors
              this.formErrors = err.response.data.message
              return
            case 401:
              this.$cookie.removeToken()
              return
            // ... add lots more cases of bad things that can happen here
          }
        }
        this.formErrors = ['There was an unknown error ocurred.']
      }
    }
  }
}
</script>
```

奥，那 catch 语句——真是一团糟，我们只处理了几种可能的情况。
这种类型的代码往往是抽象掉在 libs 目录里的一个辅助函数。
但它仍然需要设置一些本地组件的变量（在我们的情况中是 `formErrors` 和 `inputErrors`）
为了给用户适当的反馈

### 命名表单

Vue Formate 通过利用 [命名表单](/zh/guide/forms/#named-forms) 和错误处理函数来简化错误处理。

```vue
<template>
  <FormulateForm
    name="login"
    @submit="login"
  >
    // ...login form inputs
  </FormulateForm>
</template>

<script>
<script>
export default {
  methods: {
    async login () {
      try {
        const res = await this.$axios.post('/login')
        this.$cookie.setToken(res.data.token) // do some auth
      } catch (err) {
        this.$formulate.handle(err, 'login')
      }
    }
  }
}
</script>
```
更干净，但让我们通过它。有几个重要的事情需要注意：

  - 这个表单不能再有 `:form-errors` 和 `:errors` props.
  - 这个表单必须有一个 `name` prop.
  - 脚本不再需要 `formErrors` 和 `inputErrors` 数据
  - 我们所有的错误处理逻辑都被替换为 `this.$formulate.handle(err, 'login')`

#### `errorHandler` 函数

那么所有这些处理程序代码都去哪儿了呢？
可能提取到一个帮助文件，如 `libs/utils` - 这取决于你，但 Vue Formulate 想知道如何访问它。
在注册 Vue Formulate 时，让它知道你的错误处理程序在哪里。

```js
import yourErrorHandler from './libs/error-handler'

Vue.use(VueFormulate, {
  errorHandler: yourErrorHandler
})
```

那么它是怎样工作的？在我们的组件中，我们将我们 `err` 的 `handle` 方法与表单的 `name` 字符串一起传递给 $formulate。
此 `handle` 方法然后调用 `yourErrorHandler` 并期望具有两个属性的对象响应：

```js
{
  inputErrors: { fieldName: ['Unknown email'] },
  formErrors: ['Unknown error ocurred']
}
```

然后该 `handle` 方法在您的表单和表单输入上设置这些值。
这意味着我们可以有一个单一的函数来处理我们所有的表单错误，
还有一个单行程序来设置错误。我们甚至不需要本地数据属性。

开箱即用的 `errorHandler` 函数什么都不做，所以如果我们想测试功能可以用 `{ inputErrors: {}, formErrors: [] }` 符号调用 `handle`。
下面是一个例子：

```vue
<template>
  <FormulateForm
    class="order-form"
    name="order"
    @submit="order"
  >
    <FormulateInput
      type="text"
      name="st_address"
      label="Street Address"
    />
    <FormulateInput
      type="text"
      name="city"
      label="City"
    />
    <FormulateErrors />
    <FormulateInput
      type="submit"
      label="Submit Order"
    />
  </FormulateForm>
</template>

<script>
export default {
  methods: {
    order () {
      this.$formulate.handle({
        inputErrors: { st_address: 'This address doesn’t appear valid' },
        formErrors: ['Also, this form isn’t hooked up yet']
      }, 'order')
    }
  }
}
</script>
```
<demo-errors-6 />

:::tip errorHandler 插件
一旦您编写了错误处理函数，您就可以轻松地将其封装在一个插件中，以便将来轻松重用。
如果您这样做，请考虑共享它，我们会将其发布在插件页面上。
:::
