# File

The file [classification](/inputs/) is given to the following types:

- [file](#file)
- [image](#image)

## Props
File inputs use the [default props](/guide/#input-props), as well as the
following classification specific props:


Prop                | Description
--------------------|-------------------------------------------------------------
`upload‑behavior`   | `live` or `delayed` - Determines when the file is uploaded. Defaults to `live`, which uploads the file as soon as it is selected.
`image‑behavior`    | `preview` or `file` - For an input type `image`, the default is `preview` where a thumbnail of the image is shown.
`upload‑url`        | URL to perform a post request to, overrides the configured default.
`uploader`          | `function` or [axios instance](https://github.com/axios/axios) - Mechanism used to perform upload. Defaults to the a the [globally configured](#uploader) instance.
`prevent‑window‑drops` | `true` by default, this prevents the browser from navigating to a file when the user misses the dropzone.
`accept`            | This is [standard HTML](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#attr-accept), but helpful when trying to upload files of a certain type.


## Uploader

Inputs in the `file` classification are all used to upload data to a server.
Because of this, they require additional configuration in order to work
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

If you prefer to roll your own upload mechanism, you can provide a function as
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

::: warning
By default Vue Formulate uses a fake uploader function that advances the progress
bar, but actually performs no requests. This is helpful for scaffolding and
theming but must be replaced for actual uploads to work.
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

