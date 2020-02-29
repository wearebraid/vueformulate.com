# File

The file [classification](/guide/custom-inputs.html#custom-types) is given to the following types:

- [file](#file)
- [image](#image)

Because file inputs require server interaction they require more configuration
then other `FormulateInput` types.

:::danger Warning — wet paint
File uploads are still under active development and the details of this API may
still be subject to change. This warning will be removed as soon as the API has
been solidified.
:::

## File

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

## Image

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

## Props
File inputs use the [default props](/guide/#input-props), as well as the
following classification specific props:


Prop                | Description
--------------------|-------------------------------------------------------------
`upload‑behavior`   | `live` or `delayed` - Determines when the file is uploaded. Defaults to `live`, which uploads the file as soon as it is selected.
`image‑behavior`    | `preview` or `file` - For an input type `image`, the default is `preview` where a thumbnail of the image is shown.
`upload‑url`        | URL to perform a post request which overrides the configured default.
`uploader`          | `function` or [axios instance](https://github.com/axios/axios) - Mechanism used to perform upload. Defaults to the [globally configured](#uploader) instance.
`prevent‑window‑drops` | `true` by default, this prevents the browser from navigating to a file when the user misses the dropzone.
`accept`            | This is [standard HTML](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#attr-accept), but helpful when trying to upload files of a certain type.


## Uploader

Inputs in the `file` classification are all used to upload data to a server.
Because of this, they require additional configuration to work
properly. An `uploader` must be defined before `file` inputs are supported.

### Axios

The easiest configuration is to provide an instance of [axios](https://github.com/axios/axios).

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

### Upload function

If you prefer to roll-your-own upload mechanism, you can provide a function as
the `uploader`. The function will receive 4 arguments:

- `File` object to upload
- `progress` callback, expects `0-100` percentage return value
- `error` callback to call when the upload fails. Accepts a string error message argument.
- `options `Vue Formulate’s configuration object

The `uploader` function must always return a `Promise`. `async`
functions are a good option for doing this automatically.

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

The `uploader` can also be defined directly on a `FormulateInput` instance:

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

The result from the server should be a simple JSON object in the format:

```json
{
  "url": "/absolute/path/to/filename.png"
}
```

While the result can certainly include more details than the `url` it is the only
required value. It can be a fully qualified URL or a path. If it's an `image` it
should work as the `src` attribute for an `<img>` tag.

::: warning
By default, Vue Formulate uses a fake uploader function that advances the progress
bar but performs no requests. This is helpful for scaffolding and
theming but must be replaced for actual uploads to work.
:::

## Getting results

When files are added to a file `type` in Vue Formulate the value is automatically
transformed into an instance of `FileUpload`, a helper class to wrap the [FileList](https://developer.mozilla.org/en-US/docs/Web/API/FileList)
object. It is recommended that the backend have a common URL where files can be uploaded.

### Upload results with `FormulateForm`

When using a `FormulateForm` a successful submission will perform an upload on
all files in your form which have not already been uploaded
(`upload‑behavior` can be set to `live` or `delayed`). The resulting upload will return the
string path provided by your server.

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
      // (in the demo we show the data object at this point)
      // Send data to your server
      await this.$axios.put('/profile', data)
    }
  }
}
</script>
```

The `submit` handler above will be called only after Vue Formulate has uploaded
any `FormUpload` instances (file values) in the form data. Here's an example of
the above code:

<demo-file-form />

::: tip Note
If you prefer to handle the form submission manually you can listen to the
`submit-raw` event on `FormulateForm` which returns an instance of
`FormSubmission`, read more about [FormulateForm](/guide/#forms).
:::

```json
// console.log(await form.values())
{
  "name": "Jon Doe",
  "avatar": "/your/upload/directory/avatar.jpg"
}
```

### Upload results with `v-model` on `FormulateInput`

If your use case does not call for a full form, you can directly bind to the
`FormulateInput` and upload the file manually:

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
If the file has already been uploaded (like when using the default
`upload‑behavior` of `live`) the `FileUpload.upload()` method will not cause a
duplicate upload, but rather return the resolved path.
:::
