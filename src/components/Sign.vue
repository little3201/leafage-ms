<template>
  <div class="xl:bg-white before:content-[''] before:absolute before:w-full before:h-full before:bg-no-repeat before:bg-right before:bg-[url('/svg/background.svg')] bg-auto">
    <div class="xl:grid grid-cols-2 gap-4">
      <div class="hidden xl:flex flex-col h-screen my-auto md:ml-36 relative">
        <RouterLink
          to="/"
          class="flex items-center z-0 absolute top-20"
        >
          <img src="/svg/layer.svg">
          <span class="text-white text-3xl ml-3">Leafage</span>
        </RouterLink>
        <figure class="my-auto ">
          <img
            alt="leafage"
            src="/svg/illustration.svg"
            class="w-full h-full"
            width="660"
            height="460"
          >
        </figure>
      </div>
      <div class="flex px-2 z-10">
        <div
          class="max-w-xs m-auto bg-white xl:bg-transparent px-4 py-8 xl:p-0 rounded-md shadow-sm xl:shadow-none w-full"
        >
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>