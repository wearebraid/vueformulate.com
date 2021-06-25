# 社区

## 问题和支持 <span /> {data-updated}

### Stack Overflow

如果您有关于如何使用 Vue Formulate 的问题，请在 Stack Overflow 上提问，在标签中加上 `vue-formulate`。
当您这样做时，请包含代码示例，如果可能，请提供指向 CodePen 或 CodeSandbox 的链接，
以便社区可以进一步帮助您（请参阅下面的 [Code Playgrounds](#code-playgrounds)）

<stack-overflow-link />

### Vue Formulate Discord (通用帮助和讨论) <Badge text="New" />

Stack Overflow 不适合提出笼统的 “为什么我的代码不起作用” 问题。
它旨在询问有关特定问题的问题。如果你需要更广泛的帮助——或者你只是想在 Vue Formulate 社区内建立联系
——考虑加入官方的 Vue Formulate Discord。如果您还不是会员（免费且开放），
您需要使用以下邀请链接加入服务器。

<vue-discord-link />

### GitHub Issues (错误和特性)

GitHub issues 用于功能请求和错误报告，但如果您发现错误，请报告！功能请求总是有点主观，
但如果您认为 Vue Formulate 目前有一个大型测试用例，我们也想知道这一点。

<github-issues-link />

## 代码操场

我们维护了一个支持 Vue Formulate 的 CodePen 和 CodeSandbox，
让您可以快速模拟表单并重现您可能遇到的问题或错误。如果你只是想玩玩，或者计划提交一个问题，编写一个示例是一个很好的起点。

### CodePen
如果可以，我们建议使用 CodePen，但它仅限于一个单一文件组件。要创建自己的分支（fork），请单击页面右下角的 “使用此模板” 。

<codepen-link />

### CodeSandbox

CodeSandbox 功能更全一些，允许多个单文件组件，
就像您可能在自己的项目中使用的那样。此外，
如果您想使用初始化 `Vue.use(VueFormulate, {...})`，则可以使用该功能。

<codesandbox-link />


## 文章

<ArticleCard
  href="https://dev.to/justinschroeder/introducing-vue-formulate-truly-delightful-form-authoring-56f5"
  image="/assets/img/og.jpg"
  image-alt="Vue Formulate Logo"
  headline="Introducing Vue Formulate — truly delightful form authoring."
  copy="An overview of Vue Formulate by the author. Why it exists, what it does, and where it is going."
/>

<ArticleCard
  href="https://dev.to/justinschroeder/tailwind-vue-formulate-24k1"
  image="https://res.cloudinary.com/practicaldev/image/fetch/s--q0Wc3dER--/c_imagga_scale,f_auto,fl_progressive,h_500,q_auto,w_1000/https://assets.wearebraid.com/vue-formulate/vueformulate-tailwinds_og.jpg"
  image-alt="Vue Formulate heart Tailwind"
  headline="Tailwind + Vue Formulate = ❤️"
  copy="Using the newly customizable classes in Vue Formulate, learn how to leverage the Tailwind CSS utility framework to quickly add custom styling to your forms."
/>

<ArticleCard
  href="https://dev.to/justinschroeder/better-uploads-with-vue-formulate-s3-and-lambda-58b8"
  image="/assets/img/resources/aws.jpg"
  image-alt="Vue Formulate with S3 and Lambda"
  badge="Latest Article"
  headline="Better uploads with Vue Formulate, S3, and Lambda"
  copy="A practical guide to improving file uploads with Vue Formulate, AWS S3, and AWS Lambda."
/>

<!-- ===========YOUR ARTICLE HERE=============================== -->
<!-- Copy one of the article cards above and fill out the relevant props! -->


<!-- =========================================================== -->
:::tip 写文章？
您是否在项目中使用过 Vue Formulate 或想出了一种独特的技术？考虑写一篇关于它的文章！无论是在 DEV、Medium 还是您的个人博客上，我们都很乐意在这里分享。只需
 [编辑此页面并提交拉取请求即可](https://github.com/wearebraid/vueformulate.com/edit/master/docs/guide/community/README.md).
:::

## 例子

越来越多的 Vue Formulate 代码示例。

- [自定义验证规则（多字段）](https://codepen.io/justin-schroeder/pen/ExPagor)
- [禁用提交按钮，直到整个表单有效](https://codepen.io/justin-schroeder/pen/KKzaqjJ)
- [CDN 使用](https://codepen.io/justin-schroeder/pen/Poqmyba)
- [分组的 `v-model`](https://codepen.io/justin-schroeder/pen/PoPxyLx)
- [`image` 表单域的初始值](https://codepen.io/justin-schroeder/pen/KKdOBvX)
- [带条件的可重复字段](https://codepen.io/justin-schroeder/pen/BajBWWm)
- [可重复的分组字段](https://codepen.io/boyd/pen/oNjaoLQ)
- [简单的注册表单 (CDN)](https://codepen.io/justin-schroeder/pen/ExjRdRZ)
- [简单的 `text` 和 `checkbox` 表单域](https://codepen.io/justin-schroeder/pen/dyYQZgr)
- [`radio` 表单域选中样式](https://codepen.io/justin-schroeder/pen/xxZbVNd)
- [以编程方式提交表单](https://codepen.io/justin-schroeder/pen/qBbEZGX)
- [通过 props 引入 Tailwind](https://codesandbox.io/s/tailwind-vue-formulate-2-password-reset-styled-t1k0h?file=/src/components/Demo-02.vue)
- [通过 config 引入 Tailwind](https://codesandbox.io/s/tailwind-vue-formulate-2-password-reset-all-global-kydyp)
- [使用 `label` 插槽添加工具提示](https://codepen.io/justin-schroeder/pen/rNOQQww)
- [Use `@click.prevent` in `v-slot:addmore` to prevent auto-validation on click](https://codesandbox.io/s/use-prevent-to-add-element-to-vue-formulate-group-without-it-validation-triggered-n2wg6?file=/src/components/Reproduction.vue)
- [使用 Tailwind 设计的按钮组](https://codesandbox.io/s/tailwind-vue-formulate-button-group-iq4we)
- [使用 HTML 和图像作为复选框](https://codesandbox.io/s/vue-formulate-image-checkboxes-example-clbwf?file=/src/components/Reproduction.vue)
- [可折叠的手风琴风格可重复组](https://codesandbox.io/s/vue-formulate-collapsable-group-accordion-style-g612o?file=/src/components/Reproduction.vue)

:::tip 添加您的示例
您是否创建了 Vue 制定 CodePen 或 CodeSandbox？与社区分享！只需 [编辑此页面并提交拉取请求](https://github.com/wearebraid/vueformulate.com/edit/master/docs/guide/community/README.md)
:::

## 社区插件

查看插件文档页面以获取 [社区插件](/zh/guide/plugins) 的简短列表。

## 使用 Vue Formulate 的项目

你有没有在线上使用 Vue Formulate 构建过一些东西？将其提交给 [Vue Telemetry](https://vuetelemetry.com/) ——它支持在项目中检测 Vue Formulate —— 并将其添加到不断增长的示例站点列表中。

<vuetelemetry-link />
