<template>
  <p class="demo">
    <FormulateForm
      v-model="formValues"
    >
      <FormulateInput
        label="Text input"
        type="text"
        help="This is what help text looks like on a text field."
        placeholder="Placeholder"
        :debug="true"
        name="text"
        v-model="textInput"
        :formulate-value="textInput"
        autocomplete="new-password"
      />
      <button @click.prevent="textInput = 'Set by button'">Set via v-model</button>
      <button @click.prevent="formValues.text = 'Set by form'">Set via form value</button>
      <FormulateInput
        label="Textarea"
        type="textarea"
        help="This is what help text looks like on a textarea"
        :debug="true"
        placeholder="I saw a chicken cross the..."
        autocomplete="new-password"
      />
      <FormulateInput
        label="Checkbox"
        type="checkbox"
        :debug="true"
        help="This is what help text looks like on a single checkbox"
      />
      <FormulateInput
        label="Checkbox with multiple options"
        type="checkbox"
        help="This is what help text looks like for a group of checkboxes"
        :options="{foo: 'Foo', bar: 'Bar', fooey: 'Fooey'}"
        :debug="true"
        v-model="checkboxes"
      />
      {{ checkboxes }}
      <FormulateInput
        label="Radio buttons"
        type="radio"
        help="This is what help text looks like for radio buttons"
        :debug="true"
        :options="{water: 'Water', tea: 'Tea'}"
      />
      <FormulateInput
        label="What is your favorite ice cream?"
        type="select"
        help="This is what help text looks like on a select list"
        placeholder="Select an flavor"
        :debug="true"
        :options="selectOptions"
      />
    </FormulateForm>
    {{ formValues }}
  </p>
</template>

<script>
export default {
  name: 'library',
  data () {
    return {
      textInput: 'initial me',
      // selectInput: '',
      checkboxes: [],
      // radioInput: '',
      // singleCheckbox: false,
      // textareaInput: '',
      // simple: '',
      // placeholder: false,
      selectOptions: {chocolate: 'Chocolate', strawberry: 'Strawberry', vanilla: 'Vanilla'},
      formValues: {
        text: 'initial value'
      }
    }
  }
}
</script>

<style>

</style>
