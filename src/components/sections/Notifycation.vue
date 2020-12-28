<template>
    <div>
        webSocket
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";

export default defineComponent({
  name: "Notyfication",

  setup() {
    return { 
    };
  },

  onMounted() {

  },

  methods: {
      initWebSocket: function(){
          // this.websock = new WebSocket("ws://localhost/webscoket")
      }
  }
})
</script>