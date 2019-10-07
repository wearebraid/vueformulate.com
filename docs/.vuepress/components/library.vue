<template>
  <p class="demo">
    <FormulateInput
      label="Text input"
      type="text"
      help="This is what help text looks like on a text field."
      placeholder="Jon Doe"
      v-model="textInput"
    />
    {{ textInput }}
    <FormulateInput
      label="Textarea"
      type="textarea"
      help="This is what help text looks like on a textarea"
      placeholder="I saw a chicken cross the..."
      v-model="textareaInput"
    />
    {{ textareaInput }}
    <FormulateInput
      label="Checkbox"
      type="checkbox"
      help="This is what help text looks like on a single checkbox"
      v-model="singleCheckbox"
    />
    {{ singleCheckbox }}
    <FormulateInput
      label="Checkbox with multiple options"
      type="checkbox"
      help="This is what help text looks like for a group of checkboxes"
      :options="{first: 'I like veggies', second: 'I like meat', third: 'I like fruit'}"
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
    {{ radioInput }}
    <FormulateInput
      label="What is your favorite ice cream?"
      type="select"
      help="This is what help text looks like on a select list"
      placeholder="Select an flavor"
      :options="{chocolate: 'Chocolate', straberry: 'Strawberry', vanilla: 'Vanilla'}"
      v-model="selectInput"
    />
    {{ selectInput }}
  </p>
</template>

<script>
export default {
  data () {
    return {
      textInput: 'initial',
      selectInput: '',
      checkboxInput: '',
      radioInput: '',
      singleCheckbox: false,
      textareaInput: ''
    }
  }
}
</script>

<style>

</style>
