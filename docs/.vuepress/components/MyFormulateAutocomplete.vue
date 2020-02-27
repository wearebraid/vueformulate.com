<template>
  <div
    :class="`formulate-input-element formulate-input-element--${context.type}`"
    :data-type="context.type"
  >
    <input
      type="text"
      v-model="context.model"
      v-bind="context.attributes"
      autocomplete="no"
      @keydown.enter.prevent="context.model = selection.label"
      @keydown.down.prevent="increment"
      @keydown.up.prevent="decrement"
      @blur="context.blurHandler"
    >
    <ul
      v-if="filteredOptions.length"
      class="formulate-input-dropdown"
    >
      <li
        v-for="(option, index) in filteredOptions"
        :key="option.value"
        v-text="option.label"
        :data-is-selected="selection && selection.value === option.value"
        @mouseenter="selectedIndex = index"
        @click="context.model = selection.label"
      />
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    context: {
      type: Object,
      required: true
    },
  },
  data () {
    return {
      selectedIndex: 0
    }
  },
  watch: {
    model () {
      this.selectedIndex = 0
    }
  },
  computed: {
    model () {
      return this.context.model
    },
    selection () {
      if (this.filteredOptions[this.selectedIndex]) {
        return this.filteredOptions[this.selectedIndex]
      }
      return false
    },
    filteredOptions () {
      if (Array.isArray(this.context.options) && this.context.model) {
        const isAlreadySelected = this.context.options.find(option => option.label === this.context.model)
        if (!isAlreadySelected) {
          return this.context.options
            .filter(option => option.label.toLowerCase().includes(this.context.model.toLowerCase()))
        }
      }
      return []
    }
  },
  methods: {
    increment () {
      const length = this.filteredOptions.length
      if (this.selectedIndex + 1 < length) {
        this.selectedIndex++
      } else {
        this.selectedIndex = 0
      }
    },
    decrement () {
      const length = this.filteredOptions.length
      if (this.selectedIndex - 1 >= 0) {
        this.selectedIndex--
      } else {
        this.selectedIndex = length - 1
      }
    }
  }
}
</script>
