::: tip 关于 Vue 3 的说明
Vue Formulate 与 Vue 2 兼容。我们正在努力支持 Vue 3。要在 Vue 3 兼容性更新时收到通知，请 [订阅 Vue Formulate 时事通讯](https://mailchi.mp/193f17457807/vue-formulate-newsletter).
:::

# 安装
使用 Vue Formulate 的首选方法是通过您最喜欢的 JavaScript 包管理器进行安装。

## NPM
```sh
npm install @braid/vue-formulate
```

## Yarn
```sh
yarn add @braid/vue-formulate
```

## 直接下载
或者，如果您的项目没有构建过程，您可以下载存储库并手动链接到缩小版本：

```html
<script src="/vue-formulate/dist/formulate.min.js"></script>
```
:::tip 笔记
由于 DOM 的限制，当在 DOM 模板中（在单文件组件之外）挂载 Vue Formulate 时，所有组件名称都需要
[小写、连字符分隔并带有结束标签](https://vuejs.org/v2/style-guide/#Component-name-casing-in-templates-strongly-recommended).

`<FormulateInput />` ⭢ `<formulate-input></formulate-input>`
:::

## CDN

与直接下载类似，您可以直接从像 [JSDeliver](https://www.jsdelivr.com/package/npm/@braid/vue-formulate?path=dist) 这样的 CDN 加载 Vue Formulate 。

## 添加到 Vue
下载 Vue Formulate 后，您需要使用 Vue 安装它。

```js
import Vue from 'vue'
import VueFormulate from '@braid/vue-formulate'

Vue.use(VueFormulate)
```

::: tip
当加载 Vue Formulate 作为 commonJS 模块时（想想 `require()`）可能需要 `VueFormulate.default` 在注册 Vue 时使用：

```js
const VueFormulate = require('@braid/vue-formulate')
Vue.use(VueFormulate.default)
```
:::

### 配置选项

如果您需要自定义配置选项，您可以将配置选项对象传递给第二个参数。

```js
Vue.use(VueFormulate, options)
```

## Nuxt <Badge text="2.5.1" /> {data-new}
在 Nuxt 上使用 Vue Formulate 也很容易。在 Nuxt 项目上开始使用 Vue Formulate 的最简单方法是使用包含的 Nuxt 模块。

```js
// nuxt.config.js
export default {
  buildModules: [
    '@braid/vue-formulate/nuxt'
  ]
}
```

### Nuxt 模块配置文件

要使用其他 [插件](/zh/guide/plugins/),
[本地化](/zh/guide/internationalization/), [验证规则](/zh/guide/validation/) 等配置 Vue Formulate，
您可以在 Nuxt 项目的根目录中创建一个 `formulate.config.js` 文件，该文件将由 Vue Formulate Nuxt 模块导入和使用。
如果您希望将配置文件放在 Nuxt 项目的根目录之外的某个位置，
只需告诉 Nuxt 模块它可以使用文件 `configPath` 中 `formulate` 对象的参数定位配置 `nuxt.config.js` 文件的位置。

```js
// nuxt.config.js
export default {
  formulate: {
    configPath: '~/different/location/of/formulate.config.js'
  }
}
```

您的 `formulate.config.js` 文件应该导出一个对象，该对象将通过 `Vue.use()` .

```js
// formulate.config.js
import { de } from '@braid/vue-formulate-i18n'

export default {
  plugins: [de],
  locale: 'de',
  rules: {
    foobar: ({ value }) => ['foo', 'bar'].includes(value)
  }
}
```

## 样式 / 主题

如果您想使用默认主题（这些文档中使用的主题），您可以 [轻松地将该 css 包含在您的页面](/zh/guide/theming/#default-theme)。
Vue Formulate 也非常容易为您自己 [自己设置主题](/zh/guide/theming/#custom-theme)。

## IE11 支持

虽然支持 Internet Explorer 11，但 Vue Formulate 中不包含 ES2015 语言功能的 polyfill。对于那些需要 IE11 支持的人，
我们建议使用 [polyfill.io](https://polyfill.io/v3/) 或类似的服务，抹平 ES2015 功能。

```html
<script src="https://polyfill.io/v3/polyfill.min.js?features=es2015"></script>
```
