# 插件

插件只是简单的函数，可以访问 Vue Formulate 实例并可以扩展它。如果您想编写自己的自定义
[验证规则](/zh/guide/validation/#custom-validation-rules)，
[消息](/zh/guide/validation/#customize-validation-messages) 或
[表单域](/zh/guide/inputs/custom-inputs/)，这将非常有用 。

## 社区插件

这是社区创建的插件的简短列表, 通过 [编辑此页面(英文)](https://github.com/wearebraid/vueformulate.com/edit/master/docs/guide/plugins/README.md) 将您自己的插件添加到此列表：

- [`vue-formulate-datetime`](https://www.npmjs.com/package/@cone2875/vue-formulate-datetime) — Vue Formulate 对 [vue-datetime](https://github.com/mariomka/vue-datetime) 的支持
- [`vue-formulate-select`](https://www.npmjs.com/package/@cone2875/vue-formulate-select) — Vue Formulate 对 [vue-select](https://vue-select.org/) 的支持
- [`vue-formulate-extended`](https://www.npmjs.com/package/vue-formulate-extended) — 扩展并向 Vue Formulate 中添加各种功能
- [`vue-formulate-star-rating`](https://www.npmjs.com/package/vue-formulate-star-rating) — Vue Formulate 对 [vue-star-rating](https://www.npmjs.com/package/vue-star-rating) 的支持
- [`vue-formulate-datepicker`](https://www.npmjs.com/package/vue-formulate-datepicker) — Vue Formulate 对 [@sum.cumo/vue-datepicker](https://www.npmjs.com/package/@sum.cumo/vue-datepicker) 的支持

## 创建一个新插件

插件只是在注册时传递给 Vue Formulate 并在实例化时调用的函数。

### 简单例子

```js
import Vue from 'vue'
import VueFormulate from '@braid/vue-formulate'

// 我们的第一个插件
function myFirstPlugin (instance) {
  // 添加一个新的验证规则
  instance.extend({
    rules: {
      foobar: ({ value }) => ['foo', 'bar'].includes(value)
    }
  })
}

Vue.use(VueFormulate, {
  plugins: [ myFirstPlugin ]
})

```

#### 该 `extend` 方法

传递给 Vue Formulate 插件的参数是一个包含 `extend` 的实例，这个方法可以递归地扩展实例配置选项。这可用于覆盖和添加任何配置选项。

#### 示例自动完成插件

插件的一个常见用例是复用自定义表单域，因此作为示例，让我们创建一个插件，
该插件公开来自 [自定义输入文档页面](/zh/guide/inputs/custom-inputs/#custom-types) 的自动完成表单域

```js
// 文件: Autocomplete.js
import MyFormulateAutocomplete from './components/MyFormulateAutocomplete'

export default function (formulateInstance) {
  formulateInstance.extend({
    components: {
      MyFormulateAutocomplete
    },
    library: {
      autocomplete: {
        classification: 'text',
        component: 'MyFormulateAutocomplete'
      }
    }
  })
}
```

:::tip
在上面的代码中，我们使用 Vue Formate 通过将组件添加到 `components` 对象来注册我们的组件。
这很方便，但您不需要向 Vue Formulate 注册组件，只要它是全局注册的。
:::

```js
// index.js (or where you add your vue plugins)
import Vue from 'vue'
import VueFormulate from '@braid/vue-formulate'
import Autocomplete from './Autocomplete'

Vue.use(VueFormulate, {
  plugins: [ Autocomplete ]
})

```

当然，上面的代码也可以打包成一个整洁的 `npm` 包发布给公众使用。

