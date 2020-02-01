<template>
  <FormulateInput
    type="button"
    disabled
  >
    Loading <span class="loader" />
  </FormulateInput>
</template>

<script>
export default {

}
</script>

<style scoped>
.loader {
  display: block;
  width: 16px;
  height: 16px;
  border: 2px solid white;
  border-left-color: transparent;
  border-top-color: transparent;
  border-radius: 16px;
  backface-visibility: none;
  transform: rotate(0deg);
  animation: spin .5s infinite linear;
  margin-left: .5em;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
