<template>
  <FormulateForm
    :schema="[
      {
        type: 'group',
        repeatable: true,
        name: 'addresses',
        addLabel: '+ Address',
        children: [
          {
            name: 'street',
            label: 'Street address'
          },
          {
            name: 'city',
            label: 'City',
          },
          {
            component: 'div',
            class: 'double-row',
            children: [
              {
                name: 'state',
                type: 'select',
                label: 'State',
                options: {
                  va: 'Virginia',
                  fl: 'Florida',
                  ne: 'Nebraska',
                  ca: 'California'
                },
              },
              {
                name: 'zip',
                label: 'Zip',
              },
            ]
          }
        ]
      }
    ]"
  />
</template>

<script>
export default {

}
</script>

<style lang="scss">
.double-row {
  display: flex;

  [data-classification="select"] {
    width: 10em;
    margin-right: 1em;
  }
  [data-classification="text"] {
    width: 9em;
  }

}
</style>
