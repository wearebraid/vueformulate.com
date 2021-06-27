---
layout: HomeLayout
home: true
heroImage: /logo.svg
heroText: Vue Formulate
tagline: 使用 Vue 构建表单的最简单方法
actionText: 开始 →
actionLink: /zh/guide/
features:
- title: 😎 开发者的福利
  details: 表单无处不在，但对作者来说却很枯燥 —— 好吧，现在不再是了。Vue Formate 为开发人员提供了强大而灵活的 API，使复杂的表单创建变得轻而易举。
- title: ☝️ 单一的 input 元素
  details: 使用 Vue Formulate，你不需要记住十几个组件的名称—所有表单元素都是用一个组件创建的。非常简单！
- title: 💪 成组的表单域
  details: Vue Formulate 提供了现成的可重复的表单域组。轻松创建复杂的 UI，如多人预订表单。
- title: 🎯 内置验证器
  details: 极度简单的验证器开箱即用，可以处理 95% 的用例。帮助文本、验证规则和验证消息都是简单的 `props`。需要更多吗？你也可以添加自定义验证器。
- title: 🔌 插件系统
  details: 扩展 Vue Formulate 的功能，或者通过使用插件系统跨项目重用自定义表单、验证规则和验证消息。使你的插件开源与他人共享！
- title: ✨ 表单创建器
  details: 从 JSON 生成整个表单。Vue Formulate 包含一个模式，允许你使用组、包装器和自定义组件等从 JSON 中渲染出复杂的表单。
- title: 🎨 样式控制
  details: 使用提供的 class prop，你可以全局或逐个添加自己的样式 class 集合。使用 Tailwind? 没问题. Bootstrap? 想到一块去了. 自己从头来过，是的，支持了
- title: 🔍 作用域插槽
  details: 需要更多地控制表单的标记吗？Vue Formulate 附带全局插槽支持，以便你可以全局或有选择性地提供自己的标记。
- title: 🌐 国际化
  details: 感谢 Vue 社区的出色协作，Vue Formulate 支持十多种语言，这些语言可以选择性地导入以保持包的大小。
---
# 实时代码示例

### 表单验证
Vue Formulate 包含 [20 条规则](/zh/guide/validation/) 并支持定义你自己的 [规则](/zh/guide/validation/)

<ClientOnly>
  ```html live
  <FormulateInput
    type="email"
    label="你学校的邮件地址是?"
    validation="bail|required|email|ends_with:.edu"
    validation-name="学校的邮件"
    placeholder="user@university.edu"
  />
  ```
</ClientOnly>


### 单个输入框
你可以在这个演示中尝试将 `type="radio"` 更改为 `checkbox` 或 `select` 。

<ClientOnly>
```html live
<FormulateInput
  type="radio"
  label="你如何看待 Vue Formulate?"
  :options="{
    good: '很好',
    great: '很棒',
    install: '我现在正在安装。'
  }"
/>
```
</ClientOnly>

### 深度定制的文件表单域
[文件域](/zh/guide/inputs/types/file/) 做得很好，开箱即用。

<ClientOnly>
```html live
<FormulateInput
  type="image"
  label="画廊的图片"
  validation="mime:image/jpeg,image/jpg,image/png"
  help="别担心——我们的演示不会上传你的图片"
  multiple
/>
```
</ClientOnly>

### 在一个对象中对整个表单进行建模
毫不费力地确保所有字段都已验证，甚至 `v-model` 字段值都已验证为单个对象。

<ClientOnly>
```vue live
<template>
  <!-- 此处省去一些代码 -->
  <FormulateForm
    v-model="values"
    @submit="handleLogin"
  >
    <h2>Login</h2>
    <FormulateInput type="text" name="email" label="邮件地址" validation="required|email" />
    <FormulateInput type="text" name="password" label="密码" validation="required" />
    <FormulateInput name="terms" type="checkbox" label="我接受，只是不要让我阅读条款。" validation="accepted" />
    <FormulateInput type="submit" label="登录" />
    <pre>{{ values }}</pre>
  </FormulateForm>
</template>

<script>
export default { data () { return { values: {}, handleLogin: () => alert('已登录') } } }
</script>
```
</ClientOnly>


### 快速实现复杂的可重复字段
添加 [分组](/zh/guide/inputs/types/group/) and [可重复的](/zh/guide/inputs/types/group/#repeatable-groups) 的表单域，不再那么费事。

<ClientOnly>
```vue live
<template>
  <!-- 此处省去一些代码 -->
  <FormulateForm v-model="values" @submit="submitHandler">
    <h2>Frosty 的冷冻食品</h2>
    <FormulateInput
      type="group"
      name="flavors"
      label="创建你的自定义订单"
      help="Choose your hand-packed pints whipped up by our expert servers"
      add-label="+ Add Flavor"
      validation="required"
      :repeatable="true"
    >
      <div class="order">
        <FormulateInput name="flavor" type="select" label="风味" validation="required" :options="{ vanilla: 'Vanilla', chocolate: 'Chocolate', strawberry: 'Strawberry', pineapple: 'Pineapple'}" />
        <FormulateInput name="quantity" label="数量" type="number" min="1" validation="required|min:1" />
      </div>
    </FormulateInput>

    <FormulateInput name="deliveryMethod" type="radio" label="运输方式" validation="required" :options="{ local: '到店自取', delivery: '送货 (5英里半径)' }" />
    <FormulateInput name="orderNotes" type="textarea" label="订单备注" help="Allergies? Delivery instructions? Don't need the spoons? Let us know!" />
    <FormulateInput type="submit" value="下单" />
    <pre>{{ values }}</pre>
  </FormulateForm>
</template>

<script>
export default { data () { return { values: {} } }, methods: {submitHandler () { alert(`Thank you for your order!`) } } }
</script>
```
</ClientOnly>
