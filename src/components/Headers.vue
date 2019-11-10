<template>
  <div id="header">
    <el-row :span="24">
      <el-col :xs="0" :sm="24">
        <el-header :style="{ position: 'fixed', width: '100%' }">
          <el-menu default-active="home" class="el-menu-demo" mode="horizontal">
            <div :style="{ float: 'left' }">
              <router-link to="/">
                <img
                  :style="{
                    height: '30px',
                    marginLeft: '60px',
                    marginTop: '10px'
                  }"
                  src="../assets/logo.svg"
                />
              </router-link>
            </div>
            <el-menu-item index="home">首页</el-menu-item>
            <el-menu-item index="introduce">介绍</el-menu-item>
            <el-menu-item index="resource">资源</el-menu-item>
            <el-menu-item index="console">控制台</el-menu-item>
          </el-menu>
        </el-header>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Headers extends Vue {
}
</script>

<style lang="less" scoped>
</style>
