# 贡献

## 情感支持 😉
Vue Formulate 是一项开源成果，也是一种回馈 Vue 社区的方式。Vue Formulate 将永远是 **免费** 和 **开源** 的。
如果您想支持该项目但没有时间为代码库做出贡献 - 考虑给我们一个 github 星，
在 Twitter 上关注核心维护者，或者帮助我们构建我们的平台以宣传 Vue Formulate。

<github-button
  href="https://github.com/wearebraid/vue-formulate"
  data-icon="octicon-star"
  data-size="large"
  data-show-count="true"
  aria-label="Star wearebraid/vue-formulate on GitHub"
>
  <p>Star</p>
</github-button>

### 核心开发者
**Justin Schroeder** - [@jpschroeder](https://twitter.com/jpschroeder)<br>
**Andrew Boyd** - [@BoydDotDev](https://twitter.com/BoydDotDev)

### 贡献者

![Vue Formulate Contributors](https://opencollective.com/vue-formulate/contributors.svg?width=750&button=false)

想贡献 Vue 公式吗？您可以 通过以下方式加入帮助构建 Vue Formulate 的 [用户列表](https://github.com/wearebraid/vue-formulate/graphs/contributors) ：

## 回答问题

这是任何技能水平的人都可以做出贡献的好方法。随着 Vue Formulate 的使用量不断增加，
我们希望看到人们加入进来并帮助其他可能有疑问的人。[查看社区页面](/zh/guide/community/) 以查看一些可以找到寻求帮助的人的地方。

## 提交新特性 & bug 反馈

前往 [社区页面](/zh/guide/community/#github-issues-bugs-and-features) 查看提交功能请求和错误报告的指南。

## Pull requests

非常感谢解决错误修复或功能请求的拉取请求。如果您希望添加对新语言的支持或修改可用语言，请阅读下面的 [国际化](#Internationalization) 部分。
应向主存储库发出其他核心功能拉取请求。

## 文档

在我们的文档中发现错别字？或者有更好的方式来解释一个概念？惊人的！
文档位于 [单独的存储库](https://github.com/wearebraid/vueformulate.com) 中。您可以通过单击每个页面底部的 “帮助改进此页面” 按钮轻松地向其提交拉取请求。

#### 语言支持

我们正在寻找翻译这些文档页面的人！这不是一项小任务，需要更高水平的协调，
但如果您是母语人士，精通技术英语，并愿意贡献您的时间来翻译本文档，请 [与我们联系](mailto:hello@wearebraid.com) !

## 国际化

Vue Formulate（2.2.0 及更高版本）的所有语言环境都存储在 `@braid/vue-formulate-i18n` ，你
可以在 [Github](https://github.com/wearebraid/vue-formulate-i18n) 上找到。
这是一个单独的存储库，可提供更好的 `tree-shaking` 和 `bundler` 支持，而无需在核心包中包含所有语言环境。

#### 新语言环境

添加 Vue Formulate 的其他翻译（目前这只是验证消息）是一种很好的贡献方式！
要创建新的语言环境，请 fork `@braid/vue-formulate-i18n` 存储库，然后执行以下基本步骤：

1. 复制 `src/locales/en.js` > `src/locales/xx.js` (这些应该以正确的 [ISO 639-1 标签](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes) 命名)，
然后按照该文件中的说明进行操作。
2. 复制 `tests/unit/en.js` > `tests/unit/xx.js` 并按照该文件中的说明进行操作。
3. 将您的新语言环境添加到 `src/locales.js`.
3. 运行 `npm install` 并执行 `npm test` 确保没有损坏。
4. 推送你的 fork 回来，并创建一个 PR。

我们不会说您的语言，因此请随时更改和修改消息，以尽可能对您的语言和文化友好。
允许针对每个语言环境更改参数的结构、语法和位置。如果你需要在 `libs/formats.js` 文件中添加一些轻量级的辅助函数，那也没关系。

#### 语法和错别字

非常欢迎更新语法和错别字！包维护人员只精通英语和意大利语，
因此有时我们可能会要求外部审阅者在合并之前批准其他语言的语法更改。
