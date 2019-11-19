# File

The file [classification](/inputs/) is given to the following types:

- [file](#file)
- [image](#image)

## Props
File inputs use the [default props](/guide/#input-props), as well as the
following classification specific props:


Prop                | Description
--------------------|-------------------------------------------------------------
`immediate‑upload`  | Immediately upload a selected or dropped image. Defaults to `true`.
`show‑image`        | For an image `type`, show a preview of the image.
`upload‑url`        | URL to perform a post request to, overrides the configured default.
`uploader`          | Expects a `function` or axios instance to perform upload. Overrides configured axios instance if defined.


## Uploader

Inputs in the `file` classification are all used to upload data to a server.
Because of this, they require additional configuration in order to work
properly. An `uploader` must be defined before `file` inputs are supported.

### Axios

The easiest configuration is to provide an instance of [axios](https://github.com/axios/axios).

```js
import VueFormulate from 'vue-Formulate'
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
import VueFormulate from 'vue-Formulate'

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
      return await response.json()
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

## File

```vue
<FormulateInput
  type="file"
  label="Upload a document"
  help="Select a PDF to upload a document"
  validation="mime:application/pdf"
/>
```
<demo-file />

## Image
