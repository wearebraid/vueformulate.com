# 表单域

表单域是 Vue Formulate 的基本元素，使用它们非常容易。首先，只需使用 `<FormulateInput />` 组件标签
声明任何类型的输入字段，您就可以获得一个由验证、模型绑定、文件上传和一个插件系统来组成的表单域。
这是更改输入类型本身的示例：

<demo-4-inputs />

::: details 查看源码
```vue
<template>
  <div>
    <FormulateInput
      label="Change an input type"
      type="radio"
      :options="types"
      v-model="type"
    />
    <FormulateInput
      label="Favorite B10 football team?"
      :type="type"
      name="team"
      :options="{nebraska: 'Nebraska', ohiost: 'Ohio St.', michigan: 'Michigan'}"
      value="nebraska"
      error-behavior="live"
      validation="required|matches:nebraska"
      validation-name="Team name"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      type: 'select',
      types: {
        select: 'Select list',
        radio: 'Radio list',
        text: 'Text field',
        textarea: 'Text area',
        checkbox: 'checkbox',
      }
    }
  }
}
</script>
```
:::

## 模型绑定

查看 [入门](/zh/guide/#model-binding) 的详细信息，了解如何结合模型和 `FormulateInput`。

## 设置初始值
设置字段的初始值有以下三种方式：

- 使用 `v-model`
- 使用 `value` prop
- 使用 `FormulateForm`

### 通过 `v-model` 设置初始值

给一个表单域通过 `v-model` 设置初始值，直接给它指定一个 `v-model` 属性即可

```vue
<template>
  <FormulateInput
    type="text"
    v-model="myModel"
  />
</template>

<script>
export default {
  data () {
    return {
      myModel: 'Initial value'
    }
  }
}
</script>
```
**输出:**
<demo-2-initial />

### 带有 value 属性的初始值

有时在不绑定模型的情况下设置字段的初始值会很有帮助。这可以通过 `value` prop 完成，没有必要用 `v-model`：

```vue
<FormulateInput
  type="text"
  value="One time initial value"
/>
```
**输出:**
<demo-1-initial />

::: tip
注意: 如果在同一个 `<FormulateInput>` 上面使用了 `v-model` 和 `value` ，初始值会使用 `value` 覆盖掉 `v-model`, 
更新后，会匹配到 `v-model`
:::

### 使用 `FormulateForm` 初始值

通常，为整个字段元素集合设置初始值很重要，例如在更新表单上。
您可以通过允许包装 `FormulateForm` 设置其字段的值来轻松做到这一点：

```vue
<template>
  <FormulateForm
    v-model="formValues"
  >
    <FormulateInput
      label="Username"
      name="username"
    />
    <FormulateInput
      label="Email"
      name="email"
    />
  </FormulateForm>
</template>

<script>
export default {
  data () {
    return {
      formValues: {
        username: 'mojiko',
        email: 'mojiko@gmail.com'
      }
    }
  }
}
</script>
```
**输出:**
<demo-3-initial />

## Props
每个 `FormulateInput` 都可以通过声明 `props` 来配置。下面的列表包含所有可用的通用选项：

::: tip
某些 `FormulateInput` 类型具有特定于其类型的道具。请参考您正在实现的类型的输入库以查看所有可用的道具。
:::

Prop              | 描述
------------------|-------------------------------------------------------------
`debounce`        | `model` 更新输入之前的去抖动延迟（以毫秒为单位）。
`disableErrors`   | 设置为 true 时不会显示任何错误消息。
`error`           | 要在元素上手动显示的自定义错误消息（验证错误是自行生成的）。此错误将始终可见（如果要删除它，请使用动态 prop ）。
`errors`          | 显示在元素上的一组自定义错误消息（见上文）。
`error‑behavior`  | 定义何时显示错误消息。可以是 `blur`（默认）`submit`、`value`、 或 `live`。任何时候 `<FormulateForm>` 提交元素时都会显示错误。`live` 将始终显示输入的所有错误消息，并将 `value` 在内容输入字段后立即显示错误。
`help-position`   | 帮助文本显示的位置 `before` 或 `after` (默认为 `after`).
`help`            | 与输入一起显示的帮助文本。
`id`              | 表单域的 id（默认为自动生成的）
`keep-model-data` | 将输入的数据从 `FormulateForm` 中删除时将其保留在模型中
`label`           | 输入元素的描述性标签。
`label‑position`  | 默认情况下，大多数输入元素将标签放在输入之前。默认情况下，[`box` classification](/zh/guide/inputs/types/box/) 将标签放置在后面，但可以使用此属性覆盖其中任何一个。
`name`            | 添加 name 属性，与 `<FormulateForm>` 此一起使用时是字段的键。如果未定义名称，则将分配随机散列值
`options`         | 选项的数组或对象 (`select` 或 `box` classification)
`placeholder`     | 元素的占位符属性（如果适用）
`show‑errors`     | 当设置为 `true` 时，强制显示这个元素的错误信息，无论 `error-behavior` 值是怎样
`type`            | *必需的* 输入元素的类型。[查看表单域资料库](/zh/guide/inputs/types/text/) 了解更多
`validation-rules` | 查看 [自定义验证器](/zh/guide/validation/#custom-validation-rules).
`validation`      | 一个 `string` 或 `array` 类型的验证器，查看 [表单域验证器](/zh/guide/validation)
`validation‑messages` | 查看 [自定义验证器消息](/zh/guide/validation/#customize-validation-messages).
`validation‑name` | 在验证错误消息中使用的名称。默认情况下，这会使用 `name` prop（如果可用）并且备用选项是 `label` prop。如果需要，可以在此处显式覆盖它。
`value`           | 初始未绑定值（当 `v-model` 或表单绑定不是一个好的选择时使用）

## 事件

这些事件由每种表单域类型触发（添加原生 DOM 事件）。

事件                | 描述
--------------------|-------------------------------------------------------------
`@input`            | 每次字段值更改时发出。通常，这是通过使用 `v-model` 隐式使用的。
`@validation`       | 无论错误的可见性如何（`v2.3+`），只要输入的验证状态发生变化，就会发出 [更多细节](/zh/guide/validation/#validation-event)
`@error-visibility` | 当错误的可见性发生变化时发出，例如，在 `blur` 或 `submit` (`v2.3+`) 时
`@blur-context`     | 失去焦点时触发，但包括输入的上下文作为有效负载

## 上下文对象

所有输入都包含一个全面的上下文对象，它详细说明了输入操作的几乎所有内容。它被传递到所有 [自定义表单域](/zh/guide/inputs/custom-inputs/) 和插槽中。

Property        | 描述
----------------|---------------------------------------------------------------
`addLabel`      | 在 `group` and `file[multiple]` 表单域的 “添加更多” 按钮中显示的标签。
`attributes`    | 传递给输入的非 prop 属性的对象，如 `placeholder`
`blurHandler`   | 失去焦点时调用的函数
`classification`| 表单域的 classification
`disableErrors` | `Boolean` 指示是否应为此字段 *显示* 错误（默认为 `false` ）。
`errors`        | 通过表单的 [错误处理](/zh/guide/forms/error-handling/) 或通过 `error`, `errors` prop 直接在输入本身上设置错误。不包括验证错误。
`hasValue`      | `Boolean` 指示该字段是否具有有效值。
`hasLabel`      | `Boolean` 指示该字段是否具有标签属性， `button` classification 始终为 `false`.
`hasValidationErrors` | 函数，返回 `Promise` 他的 resolve 需要返回一个 `Boolean`。
`help`          | `help` prop 的值，帮助文本
`helpPosition`  | 帮助文本处于包裹器的位置， `before` 或 `after` 。默认值 `before`.
`getValidationErrors` | 函数，返回 `Promise` ，其 resolve 返回验证错误对象数组。
`id`            | id 属性或自动生成的 id。
`isValid`       | `Boolean` 指示该字段是否完全没有错误 (可见与否).
`imageBehavior` | `image-behavior` prop 的值，默认是 `preview`。
`isSubField`    | 这是一个函数，他的返回值是一个 `boolean` 指示它是否是一个 `group` 类型的后代元素
`label`         | `label` prop 的值
`labelPosition` | 标签的位置，有 `before` 或 `after`. 除了 `box` 类型的表单域默认为 `before` ，可以使用 `label-position` prop 覆盖他
`limit`         | 对于 `group` 类型, 这是允许的最大可重复项数 (默认值 `Infinity`)。
`minimum`       | 对于 `group` 类型, 这是允许的最小可重复项数（默认为 `0`)。
`model`         | 当前字段的值，绑定到一个 setter。
`name`          | 字段的名称，如果没有设置，它会自动生成一个名称。
`options`       | 将 `options` prop 转换为一个数组（如果可用）
`performValidation` | 将运行的验证函数。这将在每个 `FormulateInput` 上自动执行。
`preventWindowDrops` | 默认为 `true`， this prevents the browser from navigating to a file when the user misses the dropzone.
`removeLabel`   | 在 `group` 表单域中，删除按钮的显示的标签
`repeatable`    | `Boolean` 指示字段是否可重复。
`rootEmit`      | 函数，等同于 `$emit`, 但应在自定义表单域和插槽中使用这个用来触发 `<FormulateInput>` 事件 。
`rules`         | `Array` 类型的表单域验证规则. 数组填充值包含 `{ ruleName: string, args: [] }` 格式
`setErrors`     | 设置（或清除）当前 `errors`（非验证错误）的函数。
`showValidationErrors` | `Boolean`, 如果应显示验证错误，则为 true。
`type`          | 表单域的类型
`uploadBehavior` | 此 `upload-behavior` prop ，有 `live` 或 `delayed`.
`uploader`      | [上传函数](/zh/guide/inputs/types/file/#uploader). `uploader` prop 的值，根据初始化时定义的 `axios` 或 `uploader`。
`uploadUrl`     | `upload-url` prop 的值, 或初始化时定义的 `uploadUrl`。
`validationErrors` | 当前的验证错误与其可见性无关的一个数组
`value`         | 该 `value` prop 的值, 而不是字段的当前值。这是传递给 `value` prop 的确切值，通常用于设置字段的初始值。
`visibleValidationErrors` | 显示的当前验证错误的一个数组


::: 警告
如果您检查上下文对象，您可能会发现上表中未列出的其他属性。不鼓励使用这些，
因为它们不被视为可供公众使用，并且可能会在次要版本之间发生变化。
:::
