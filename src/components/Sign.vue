<template>
  <div class="login xl:bg-white">
    <div class="container mx-auto">
      <div class="xl:grid grid-cols-2 gap-4">
        <div class="hidden xl:flex flex-col h-screen my-auto md:ml-36 relative">
          <RouterLink
            to="/"
            class="flex items-center z-0 absolute top-24"
          >
            <img src="/svg/layer.svg">
            <span class="text-white text-3xl ml-3">Leafage</span>
          </RouterLink>
          <figure class="my-auto">
            <img
              alt="leafage"
              src="/svg/illustration.svg"
              class="w-full h-full"
              width="660"
              height="460"
            >
          </figure>
          <div class="z-0 absolute bottom-24">
            <p class="text-white font-medium text-xl leading-tight">
              基于 RBAC（Role-Based Access Control） 模型的管理系统实践
            </p>
            <p class="text-neutral-300">
              采用 MIT 开源协议，使用 vue3、vite.js 的基础框架构建
            </p>
          </div>
        </div>
        <div class="h-screen flex px-2">
          <div
            class="max-w-xs m-auto bg-white xl:bg-transparent px-4 py-8 xl:p-0 rounded-md shadow-sm xl:shadow-none w-full"
          >
            <slot />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@media (min-width: 1280px) {
  .login:before {
    content: "";
    margin-left: -48%;
    min-width: 768px;
    @apply absolute w-full h-full bg-no-repeat bg-right;
    background-image: url(/svg/background.svg);
    background-size: auto 100%;
  }
}
</style>