# 文件

此文件 [classification](/zh/guide/inputs/custom-inputs/#what-is-a-classification) 给出了以下类型:

- [文件](#file)
- [图片](#image)


## 文件
<div id="file"></div>

```vue
<FormulateInput
  type="file"
  name="file"
  label="Select your documents to upload"
  help="Select one or more PDFs to upload"
  validation="mime:application/pdf"
  multiple
/>
```
<demo-file />

## 图片
<div id="image"></div>

```vue
<FormulateInput
  type="image"
  name="headshot"
  label="Select an image to upload"
  help="Select a png, jpg or gif to upload."
  validation="mime:image/jpeg,image/png,image/gif"
/>
```

<demo-image />

## 它是如何运行的

文件表单域在 `FormulateForm` 的 `@submit` 调用处理程序之前执行其上传功能。
这是一种通过使用单个（或少量）端点来执行任何/所有文件的上传和存储来降低跨项目构建表单复杂性的方法。
这允许您的后端文件提交处理程序仅处理纯 JSON 结果，并确保在前端创作表单时使用干净简洁的 API。
它还非常适合使用 S3、Cloudinary 或 ImgIX 等服务的开发人员。

::: details 表单提交控制流程图
下图说明了在 Vue Formulate 中包含文件上传的表单的提交流程。

<img alt="Submission control flow" src="../../../forms/control-flow.svg">
:::

## 上传器
<div id="uploader"></div>

`file` classification 中的表单域都用于将数据上传到服务器。
因此，它们需要额外的配置才能正常工作。一个上传器必须定义 file input 支持。

<ArticleCard
  href="https://dev.to/justinschroeder/better-uploads-with-vue-formulate-s3-and-lambda-58b8"
  image="/assets/img/resources/aws.jpg"
  image-alt="Vue Formulate with S3 and Lambda"
  badge="Article"
  headline="Better uploads with Vue Formulate, S3, and Lambda"
  copy="A practical guide to improving file uploads with Vue Formulate, AWS S3, and AWS Lambda."
  :sidebar="false"
/>

### axios

最简单的配置是提供一个 [axios](https://github.com/axios/axios) 实例。

```js
import VueFormulate from 'vue-formulate'
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://www.your-upload-server.com'
})

Vue.use(VueFormulate, {
  uploader: axiosInstance,
  uploadUrl: '/upload'
})
```

### 自定义上传器

如果你更喜欢摆弄你自己的上传机制，你可以为 uploader 提供一个函数. 该函数将接收 4 个参数：

- 要上传的 `File` 对象
- 返回的 `progress`, 期望值在 `0-100`，指上传文件的百分比数值
- `error` 上传失败时调用的回调。接受字符串错误消息参数。
- `options` 完整的 VueFormulate 全局选项（包括 `options.uploadUrl`）。

该 `uploader` 函数必须始终返回一个 Promise。async 函数是自动执行此操作的不错选择。

```js
import VueFormulate from 'vue-formulate'

Vue.use(VueFormulate, {
  uploader: async function (file, progress, error, options) {
    try {
      const formData = new FormData()
      formData.append('file', file)
      const result = await fetch(options.uploadUrl, {
        method: 'POST',
        body: formData
      })
      progress(100) // (native fetch doesn’t support progress updates)
      return await result.json()
    } catch (err) {
      error('Unable to upload file')
    }
  }
})
```

该 `uploader` 也可以直接定义在一个 `FormulateInput` 实例上：

```vue
<template>
  <FormulateInput
    type="file"
    :uploader="uploadFile"
  />
</template>

<script>
export default {
  methods: {
    async uploadFile (file, progress, error, option) {
      // ... perform upload
    }
  }
}
</script>
```

服务器的结果应该是一个简单的 JSON 对象数组，格式如下：

```json
[{
  "url": "/absolute/path/to/filename.png"
}]
```

虽然每个结果肯定可以包含比 `url` 属性更多的细节，但它是唯一必要的值。
它可以是完整的 URL 或路径。如果它是一个 image 它应该作为标签 `img` 的 src 属性。

:::tip Note
如果您更喜欢使用不同的属性 `url`，则可以在注册 Vue Formulate 时通过设置 `fileUrlKey` 选项来更改它。
:::

### 虚拟上传器

Vue Formulate 附带了一个虚拟的上传器功能，可以推进进度条但不执行任何请求。
这对脚手架和主题很有帮助，但必须更换它才能上传工作。

如果你根本不需要上传（您正在其他地方处理），您可以通过将其替换为虚拟上传器，来禁用上传功能：

```js
Vue.use(VueFormulate, {
  uploader: function (file, progress) {
    // optionally handle the `file` for your own purposes here...
    progress(100)
    return Promise.resolve({})
  }
})
```

## 设置初始值

设置包含上传文件的表单的初始值就像给它一个包含 url 的对象数组一样简单。
这将填充表单元素，并在有效负载中返回相同的 url，但不会重新上传。

```vue
<FormulateInput
  type="file"
  :value="[
    {
      url: '/path/to/document.pdf', // url is required
      name: 'employment-offer.pdf' // name is optional
    }
  ]"
/>
```

<demo-input-hydration />

#### Mime 类型

设置初始文件值时，如上例所示，URL 中的文件扩展名用于重新创建文件的 MIME 类型。
Vue Formulate 包含 _非常有限_ 的 mime 扩展映射（以保持较小的包大小）。
这通常不会导致任何问题，但如果您使用 mime [验证规则](/zh/guide/validation/#mime) 并且文件扩展名未包含在列表中，则验证可能会失败。
您可以轻松地将您自己的扩展 mime 类型添加到 Vue Formulate 实例。

```js
Vue.use(VueFormulate, {
  mimes: {
    mp3: 'audio/mpeg'
  }
})
```

### 在提交 `FormulateForm` 时触发上传

使用 `FormulateForm` 成功提交时，将对表单中尚未上传的所有文件执行上传（`upload‑behavior` 可以设置为 `live` 或 `delayed`）。
然后上传器将返回您的服务器提供的字符串路径。

```vue
<template>
  <FormulateForm
    @submit="sendData"
  >
    <FormulateInput
      type="text"
      name="name"
      label="Your name"
    />
    <FormulateInput
      type="image"
      name="avatar"
      upload-url="/your/upload/directory"
      label="Your avatar"
      upload-behavior="delayed"
    />
    <FormulateInput
      type="submit"
      label="Save profile"
    />
  </FormulateForm>
</template>

<script>
export default {
  methods: {
    async sendData (data) {
      // (在演示中，我们展示了此时的数据对象)
      // 向你的服务端发送数据
      await this.$axios.put('/profile', data)
    }
  }
}
</script>
```
这里的 `submit` 只有在 Vue Formulate 上传 `FormUpload` 表单数据中的任何实例（文件值）后，才会调用上面的处理程序。
以下是上述代码的示例：

<demo-file-form />

::: tip
如果您更喜欢手动处理表单的提交，您可以侦听返回 `FormSubmission` 实例的 `submit-raw` 事件，
阅读有关 [`FormateForm`](/zh/guide/#forms) 的更多信息。
:::

```json
{
  "name": "Jon Doe",
  "avatar": {
    "url": "/your/upload/directory/avatar.jpg"
  }
}
```

::: warning Safari 浏览器和 `FileList` 对象
HTML `file` inputs use a [`FileList`](https://developer.mozilla.org/en-US/docs/Web/API/FileList)
object to track what files are currently attached to the input. The `FileList`
is an immutable object so adding/removing additional files is impossible. To
get around this limitation when a file accepts `[multiple]` files, Vue Formulate
uses its own internal [`FileUpload`](https://github.com/wearebraid/vue-formulate/blob/master/src/FileUpload.js) object to track mutations. The `FileUpload`
does its best to keep the `FileList` accurate by using a [`DataTransfer`](https://developer.mozilla.org/en-US/docs/Web/API/DataTransfer/DataTransfer)
object to create new a `FileList` on each add/remove event — however the
`DataTransfer` constructor is not supported in Safari. This doesn't matter if
you are using the recommended approach of uploading files with `Axios` or an
`uploader` function since `FileUpload` tracks these changes for you, but
if you're relying on the native `FormData` constructor your results will not
include mutations made to the `FileList` in Safari.
:::

### 使用 `FormulateInput` 上的 `v-model` 保存上传结果

如果您的用例不需要完整表单，您可以直接绑定到 `FormulateInput` 并手动上传文件：

```vue
<template>
  <div>
    <FormulateInput
      type="file"
      name="document"
      upload-behavior="delayed"
      v-model="document"
    />
    <a
      @click.prevent="uploadFile"
    >
      Upload the file
    </a>
  </div>
</template>

<script>
export default {
  data () {
    return {
      document: false
    }
  },
  methods: {
    async uploadFile () {
      if (this.document) {
        try {
          const path = await this.document.upload()
        } catch (err) {
          alert('Error uploading')
          console.error(err)
        }
      }
    }
  }
}
</script>
```

::: tip Note
如果文件已经上传（比如使用默认 `upload‑behavior` 的 `live`），该 `FileUpload.upload()` 方法不会导致重复上传，
而是返回解析的路径。
:::

## Props

文件表单域使用 [默认的 props](/zh/guide/inputs/#props), 以及以下 classification 特定的 props：

Prop                | 说明
--------------------|-----------------------------------------------------------
`accept`            | 这是 [标准的 HTML](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#attr-accept), 但在尝试上传某种类型的文件时很有帮助。
`add-label`         | `+ 添加文件` 按钮的标签, 或在使用 `false` 来禁用添加文件按钮
`image‑behavior`    | `preview` 或 `file` -- 对于表单域类型 `image` 的, 默认是 `preview` 显示图像的缩略图。
`prevent‑window‑drops` | 默认情况下是 `true`, 这会阻止浏览器在用户错过放置区时导航到文件。
`uploader`          | 函数或 [axios 实例](https://github.com/axios/axios) - 用于执行上传的机制。默认为 [全局配置](#uploader) 的实例。
`upload‑behavior`   | `live` or `delayed` - Determines when the file is uploaded. Defaults to `live`, which uploads the file as soon as it is selected.
`upload‑url`        | URL to perform a POST request which overrides the configured default.

## 事件 <Badge text="2.5" /> {data-new}

文件表单域使用 [默认事件](/zh/guide/inputs/#events), 以及以下 classification 特定事件：

事件名         | 说明
-------------------|------------------------------------------------------------
`file-upload-progress` | 当 [上传器](#uploader) 更新文件上传的进度时发出。有效负载是一个进度整数 (`0-100`)。
`file-upload-complete` | 当文件完成上传时发出。有效载荷是 `file` 对象。
`file-upload-error`    | 在上传过程中调用的 `uploader` 函数时发出的 `error`。有效载荷是错误本身。
`file-removed`        | 当文件从 `FileList` 中移除后触发. 有效载荷是内部文件数组。

## 插槽 <Badge text="2.5" /> {data-new}

该 `file` classification 有一些独特的插槽（和匹配的 [插槽组件](/zh/guide/inputs/slots/#slot-components)）：

插槽名         | 说明
------------------|-------------------------------------------------------------
`file`            | 负责渲染文件表单域的单个文件。当输入类型为 `multiple` 时，该插槽将多次渲染。
此插槽中的上下文对象包括一个 `file` 对象和一个 `imagePreview` 布尔值。
`uploadAreaMask`  | 负责在 `uploadArea` 没有文件时添加内容或样式。
此插槽中的上下文对象包括一个 `hasFiles` 布尔值。

## 自定义 css class 名

除了所有的 [全局 clas 名](/zh/guide/theming/#customizing-classes) 外，还可以使用以下方法：

名称             | 默认值                          | 说明
----------------|----------------------------------|---------------------------------------------------
`uploadArea`    | `.formulate-input-upload-area`   | 上传的 dropzone 区域包裹器。
`uploadAreaMask`| `.formulate-input-upload-area-mask` | 位于 `<input>` 之后的附加元素，用于设置放置区的样式。
`files`         | `.formulate-files`               | 文件列表的包裹器。
`file`          | `.formulate-file`                | 单个文件表单域
`fileAdd`       | `.formulate-file-add`            | `+ 添加文件` 按钮
`fileAddInput`  | `.formulate-file-add-input`      | `+ 添加文件` `<input>` 对象 (一般会隐藏).
`fileName`      | `.formulate-file-name`           | 负责显示文件名的元素。
`fileRemove`    | `.formulate-file-remove`         | 负责删除文件的元素。
`fileProgress`  | `.formulate-file-progress`       | 进度条的外部包裹器。
`fileProgressInner` | `.formulate-file-progress-inner` | 内部进度指示器。宽度自动设置为上传完成的百分比。
`fileUploadError` | `.formulate-file-upload-error` | 为每个不正确的文件显示文件上传错误。
`fileImagePreview` | `.formulate-file-image-preview` | `img` 预览图片的周围的包裹器。
`fileImagePreviewImage` | `.formulate-file-image-preview-image` | `img` 预览元素
