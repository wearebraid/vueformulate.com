# 国际化

Vue Formulate 附带预装的英语验证消息，但 Vue 社区很棒，并且不断提交新的翻译。
这些本地化信息收集在 `@braid/vue-formulate-i18n` 包中。

## 支持的语言

Vue Formulate 目前支持以下语言：

:::tip 语言环境
以下列表中的标志表示该翻译的来源国。还支持语言区域设置，例如 🇺🇸 `en-US` vs 🇬🇧 `en-GB`。如果您希望代表您的语言环境，请按照 [贡献指南](/zh/guide/contributing/#internationalization) 提交 PR 。
:::

- 🇪🇬 Arabic (ar)
- <img src="./Flag_of_Catalonia.svg" style="width: 1.25em; display: inline-block; vertical-align: middle;"> Catalan (ca)
- 🇨🇳 Chinese (zh)
- 🇨🇿 Czech (cs)
- 🇩🇰 Danish (da)
- 🇳🇱 Dutch (nl)
- 🇩🇪 German (de)
- 🇺🇸 English (en)
- 🇫🇷 French (fr)
- 🇮🇱 Hebrew (he)
- 🇭🇺 Hungarian (hu)
- 🇮🇹 Italian (it)
- 🇯🇵 Japanese (ja)
- 🇰🇷 Korean (ko)
- 🇱🇹 Lithuanian (lt)
- 🇳🇴 Norwegian (nb)
- 🇵🇱 Polish (pl)
- 🇧🇷 Portuguese (pt)
- 🇷🇺 Russian (ru)
- 🇷🇸 Serbian (sr)
- 🇸🇰 Slovak (sk)
- 🇨🇺 Spanish (es)
- 🇹🇭 Thai (th)
- 🇹🇷 Turkish (tr)
- 🇻🇳 Vietnamese (vi)
- 🇸🇪 Swedish (sv)

当使用从右到左的语言（如阿拉伯语）和默认的 [snow 主题](/zh/guide/theming/#default-theme) 时 ，可能需要修改 `direction` 项目中的 css 属性。

感谢所有语言环境贡献者！

::: tip 💪 添加您的语言
Vue Formulate 需要您的帮助！`en-US` 通过提供 [提供新的语言环境](/zh/guide/contributing) 来帮助使用您的语言或本地化的其他人！ 
:::

## 注册语言环境

您可以像注册任何其他 Vue Formulate [插件](/zh/guide/plugins) 一样注册翻译。

```js
import Vue from 'vue'
import VueFormulate from '@braid/vue-formulate'
import { de } from '@braid/vue-formulate-i18n'

Vue.use(VueFormulate,  {
  plugins: [ de ]
})
```
如果您的站点需要支持多种语言，您可以同时注册所有语言。

```js
import Vue from 'vue'
import VueFormulate from '@braid/vue-formulate'
import { de, da, fr } from '@braid/vue-formulate-i18n'

Vue.use(VueFormulate,  {
  plugins: [ de, da, fr ]
})
```

### 切换当前的语言环境

#### 显式设置语言环境

您可以在安装 Vue 的选项中使用 `locale` 明确设置。这样做可确保这是将在站点上使用的唯一语言环境。

```js
Vue.use(VueFormulate,  {
  plugins: [ de ],
  locale: 'de'
})
```

:::tip 使用 CDN
通过 `.min.js` 文件从 CDN 导入区域设置时，您必须使用该 `.default` 属性。请参阅此示例：https://codepen.io/team/braid/pen/ExZaQYr
:::

#### `vue-i18n`

如果你正在使用 [`vue-i18n`](https://kazupon.github.io/vue-i18n/) 你可以保持 `locale` 配置为空，它会尝试使用当前在 `vue-i18n` 中的配置
