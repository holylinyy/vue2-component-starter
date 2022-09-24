<template>
  <div class="msg">
    {{ msg }}
  </div>
</template>
<script lang="ts">
import { ref, onMounted } from 'vue-demi'
export default {
  name: 'dcm-demo',
  setup() {
    const msg = ref('hello world123')
    onMounted(() => {
      setTimeout(() => {
        window.document.documentElement.setAttribute( "data-dcm-theme", 'dark' );
      }, 5000)
    })
    return {
      msg
    }
  }
}
</script>



