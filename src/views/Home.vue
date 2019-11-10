<template>
  <div class="home">
    <el-container>
      <Headers />
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import Headers from '@/components/Headers.vue'

export default {
  name: 'home',
  components: {
    Headers
  }
}
</script>
