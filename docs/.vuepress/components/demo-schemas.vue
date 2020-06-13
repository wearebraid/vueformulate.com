<template>
  <div class="schema-examples">
    <div class="schema-selector">
      <FormulateInput
        type="select"
        label="Select an example"
        :options="exampleOptions"
        v-model="currentExample"
        help="Schemas are reactive too, so feel free to edit the examples."
      />
    </div>
    <div class="schema-group">
      <div class="schema-editor">
        <ClientOnly>
          <CodeMirror v-model="code" :options="options" class="cm-editor" />
        </ClientOnly>
      </div>
      <div class="schema-example">
        <FormulateForm
          v-if="schema"
          :schema="schema"
          v-model="formValues"
          :key="currentExample"
        />
        <span
          v-else
          class="schema-error"
        >
          Invalid JSON syntax!
        </span>
      </div>
    </div>
    <code class="code code--block">{{ formValues }}</code>
  </div>
</template>

<script>
import { codemirror } from 'vue-codemirror'
import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/theme/idea.css'

const simple_input_list = `[
  {
    "component": "h3",
    "children": "Student registration"
  },
  {
    "label": "Your name",
    "name": "name",
    "validation": "required"
  },
  {
    "label": "Your email",
    "name": "email",
    "help": "Please use your student email address",
    "validation": "bail|required|email|ends_with:.edu",
    "validation-messages": {
      "ends_with": "Please use a .edu email address"
    }
  },
  {
    "label": "Student ID",
    "name": "student_id",
    "help": "Your 6 digit student ID (ex. ST-123421)",
    "placeholder": "ST-",
    "validation": "^required|matches:/^ST-[\\\\d]{6}$/",
    "validation-name": "Student ID"
  },
  {
    "type": "submit"
  }
]`

const smallest_valid_schema = `[
  {}
]`

const flexbox_wrapper = `[
  {
    "component": "h3",
    "children": "Order pizza"
  },
  {
    "type": "select",
    "label": "Pizza size",
    "name": "size",
    "placeholder": "Select a size",
    "options": {
      "small": "Small",
      "large": "Large",
      "extra_large": "Extra Large"
    },
    "validation": "required"
  },
  {
    "component": "div",
    "class": "flex-wrapper",
    "children": [
      {
        "name": "cheese",
        "label": "Cheese options",
        "type": "checkbox",
        "options": {
          "mozzarella": "Mozzarella",
          "feta": "Feta",
          "parmesan": "Parmesan",
          "extra": "Extra cheese"
        }
      },
      {
        "name": "toppings",
        "label": "Toppings",
        "type": "checkbox",
        "options": {
          "salami": "Salami",
          "prosciutto": "Prosciutto",
          "avocado": "Avocado",
          "onion": "Onion"
        }
      }
    ]
  },
  {
    "component": "div",
    "class": "flex-wrapper",
    "children": [
      {
        "type": "select",
        "name": "country_code",
        "label": "Code",
        "outer-class": ["flex-item-small"],
        "value": "1",
        "options": {
          "1": "+1",
          "49": "+49",
          "55": "+55"
        }
      },
      {
        "type": "text",
        "label": "Phone number",
        "name": "phone",
        "inputmode": "numeric",
        "pattern": "[0-9]*",
        "validation": "matches:/^[0-9-]+$/",
        "validation-messages": {
          "matches": "Phone number should only include numbers and dashes."
        }
      }
    ]
  },

  {
    "type": "submit",
    "label": "Order pizza"
  }
]`

const field_group = `[
  {
    "component": "h3",
    "children": "Social profile"
  },
  {
    "type": "image",
    "name": "headshot",
    "label": "Your headshot"
  },
  {
    "type": "group",
    "name": "accounts",
    "validation": "min:2,length",
    "repeatable": true,
    "add-label": "+ Add platform",
    "value": [{}],
    "children": [
      {
        "type": "select",
        "name": "platform",
        "label": "Social platform",
        "placeholder": "Select one",
        "options": {
          "twitter": "Twitter",
          "facebook": "Facebook",
          "instagram": "Instagram",
          "linkedin": "LinkedIn"
        }
      },
      {
        "type": "text",
        "name": "url",
        "label": "Profile url",
        "validation": "required|url"
      }
    ]
  },
  {
    "type": "submit",
    "label": "Save my social"
  }
]`

export default {
  components: {
    CodeMirror: codemirror
  },
  data () {
    return {
      examples: {
        simple_input_list,
        smallest_valid_schema,
        flexbox_wrapper,
        field_group
      },
      code: simple_input_list,
      currentExample: 'simple_input_list',
      formValues: {},
      options: {
        tabSize: 2,
        mode: 'application/json',
        gutters: ["CodeMirror-lint-markers"],
        theme: 'idea',
        lineNumbers: true,
        autoCloseBrackets: true
      }
    }
  },
  computed: {
    schema () {
      try {
        return JSON.parse(this.code)
      } catch (err) {
        return false
      }
    },
    exampleOptions () {
      return Object.keys(this.examples)
        .map(example => ({
          label: `${example[0].toUpperCase()}${example.substr(1)}`.replace(/_/g, ' '),
          value: example
        }))
    }
  },
  watch: {
    currentExample (value) {
      // reset the values
      this.formValues = {}
      // reset the example code
      this.code = this.examples[value]
    }
  }
}
</script>

<style lang="scss" scoped>
.schema-examples {
  border: 1px solid #eaecef;
  border-radius: 6px;
  margin-top: 1em;
}
.schema-selector {
  padding: 1em;
  border-bottom: 1px solid #eaecef;
  background-color: #fbfcfc;
}
.schema-group {
  @media (min-width: 500px) {
    display: flex;
  }

  @media (min-width: 720px) {
    display: block;
  }

  @media (min-width: 850px) {
    display: flex;
  }
}
.schema-editor {
  font-size: .85em;
  border-right: 1px solid #eaecef;
  box-sizing: border-box;
  position: relative;
  min-height: 500px;

  .cm-editor,
  &::v-deep .CodeMirror {
    height: 100%;
  }

  &::before {
    content: 'JSON';
    position: absolute;
    top: 0;
    right: 0;
    background-color: #eaecef;
    font-size: .941em;
    padding: .5em;
    border-bottom-left-radius: 6px;
    font-family: monospace;
    line-height: 1em;
    z-index: 10;
  }

  @media (min-width: 500px) {
    width: 50%;
  }

  @media (min-width: 720px) {
    width: auto;
  }

  @media (min-width: 850px) {
    width: 50%;
  }
}
.schema-example {
  padding: 1.5em 1em 1em 1em;
  box-sizing: border-box;
  position: relative;
  border-top: 1px solid #eaecef;

  &::v-deep {
    .flex-wrapper {
      max-width: 20em;
      display: flex;

      & > .formulate-input {
        flex-grow: 1;

        &.flex-item-small {
          width: 5em;
          flex-basis: 5em;
          flex-shrink: 0;
        }

        &:nth-child(odd) {
          margin-right: 1em;
        }
      }
    }
  }

  @media (min-width: 500px) {
    border-top: 0;
    width: 50%;
  }

  @media (min-width: 720px) {
    border-top: 1px solid #eaecef;
    width: auto;
  }

  @media (min-width: 850px) {
    border-top: 0;
    width: 50%;
  }

  &::before {
    content: 'Output';
    position: absolute;
    top: 0;
    right: 0;
    background-color: #eaecef;
    font-size: .8em;
    padding: .5em;
    border-bottom-left-radius: 6px;
    font-family: monospace;
    line-height: 1em;
  }
}
.schema-error {
  font-size: 1em;
  color: #d57275;
  font-style: italic;
}
.code--block {
  padding: 1em;
  border-top: 1px solid #eaecef;
  position: relative;
  background-color: #f7f7f7;

  &::before {
    content: 'Model value';
    position: absolute;
    top: 0;
    right: 0;
    background-color: #eaecef;
    font-size: .8em;
    padding: .5em;
    border-bottom-left-radius: 6px;
  }
}
</style>
