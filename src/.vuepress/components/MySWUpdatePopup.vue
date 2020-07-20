<template>
  <SWUpdatePopup v-slot="{ enabled, reload, message, buttonText }">
    <div
      v-if="enabled"
      class="my-sw-update-popup">
      {{ message }}<br>
      <button @click="reload">{{ buttonText }}</button>
    </div>
  </SWUpdatePopup>
</template>

<script>
import SWUpdatePopup from '@vuepress/plugin-pwa/lib/SWUpdatePopup.vue'

export default {
  components: { SWUpdatePopup },
  data: () => ({
      message: 'Add the icon on your HomeScreen!',
      buttonText: 'Add'
  })
}
</script>

<style>
.my-sw-update-popup {
  text-align: right;
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #fff;
  font-size: 20px;
  padding: 10px;
  border: 5px solid #3eaf7c;
}

.my-sw-update-popup button {
  border: 1px solid #fefefe;
}

.my-sw-update-popup button {
  display: inline-block;
  max-width: 180px;
  text-align: left;
  background-color: #09ffa1;
  font-size: 16px;
  color: #FFF;
  text-decoration: none;
  font-weight: bold;
  padding: 10px 24px;
  border-radius: 4px;
  border-bottom: 4px solid #d37800;
}

.my-sw-update-popup button:active {
    transform: translateY(4px);
    border-bottom: none;
}

</style>