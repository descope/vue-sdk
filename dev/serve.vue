<script lang="ts">
import { defineComponent } from 'vue';
// Uncomment import and local "components" registration if library is not registered globally.
// import { DescopeVueSdkSample } from '@/entry.esm';

export default defineComponent({
  name: 'ServeDev',
  // components: {
  //  DescopeVueSdkSample,
  // }
});
</script>

<template>
  <div id="app">
    <descope-vue-sdk-sample />
  </div>
</template>
