<template>
  <p class="demo">
    <FormulateInput
      label="Text input"
      type="text"
      help="This is what help text looks like on a text field."
      :placeholder="placeholder"
      :data-has-placeholder="placeholder"
      v-model="textInput"
    />
    <FormulateInput
      label="Textarea"
      type="textarea"
      help="This is what help text looks like on a textarea"
      placeholder="I saw a chicken cross the..."
      v-model="textareaInput"
    />
    <FormulateInput
      label="Checkbox"
      type="checkbox"
      help="This is what help text looks like on a single checkbox"
      v-model="singleCheckbox"
    />
    <FormulateInput
      label="Checkbox with multiple options"
      type="checkbox"
      help="This is what help text looks like for a group of checkboxes"
      :options="{foo: 'Foo', bar: 'Bar', fooey: 'Fooey'}"
      v-model="checkboxInput"
    />
    {{ checkboxInput }}
    <FormulateInput
      label="Radio buttons"
      type="radio"
      help="This is what help text looks like for radio buttons"
      :options="{water: 'Water', tea: 'Tea'}"
      v-model="radioInput"
    />
    <FormulateInput
      label="What is your favorite ice cream?"
      type="select"
      help="This is what help text looks like on a select list"
      placeholder="Select an flavor"
      :options="selectOptions"
      v-model="selectInput"
    />
  </p>
</template>

<script>
export default {
  data () {
    return {
      textInput: 'initial',
      selectInput: '',
      checkboxInput: [],
      radioInput: '',
      singleCheckbox: false,
      textareaInput: '',
      simple: '',
      placeholder: false,
      selectOptions: {chocolate: 'Chocolate', strawberry: 'Strawberry', vanilla: 'Vanilla'}
    }
  }
}
</script>

<style>

</style>
