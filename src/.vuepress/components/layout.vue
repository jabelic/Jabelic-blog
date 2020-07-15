<template>
  <div id="layout">
    <input type="text" v-model="message">
    <p>
      {{message}}
    </p>
  </div>
</template>

<script>
export default {
  name: 'MyComponent',
  computed: {
  },
  data() {
    return {
      message: 'MyComponent!!'
    }
  },
}
</script>