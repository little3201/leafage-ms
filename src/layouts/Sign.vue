<template>
    <div class="login xl:bg-white">
        <div class="container mx-auto">
            <div class="xl:grid grid-cols-2 gap-4">
                <div class="hidden xl:flex flex-col h-screen my-auto md:ml-36 relative">
                    <RouterLink
                        title="leafage"
                        to="/"
                        class="flex items-center z-0 absolute top-24"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="28"
                            height="28"
                            viewBox="0 0 311.983 311.929"
                        >
                            <g transform="translate(-4.494 -4.496)">
                                <path
                                    d="M305.678,64.318,184.327,9a65.721,65.721,0,0,0-47.842,0L15.22,64.318c-14.293,6.5-14.293,17.117,0,23.639l120.221,54.826a69.059,69.059,0,0,0,50.033,0L305.687,87.956C319.971,81.46,319.971,70.822,305.678,64.318Z"
                                    transform="translate(0.07 0)"
                                    fill="#b5c8ff"
                                />
                                <g transform="translate(4.493 135.941)">
                                    <path
                                        d="M135.441,61.195,54.375,24.239a13.18,13.18,0,0,0-10.8,0L15.22,37.154C.927,43.65.927,54.271,15.22,60.792l120.221,54.826a69.058,69.058,0,0,0,50.033,0L305.687,60.792c14.293-6.5,14.293-17.117,0-23.639L277.341,24.239a13.18,13.18,0,0,0-10.8,0L185.474,61.195A69.058,69.058,0,0,1,135.441,61.195Z"
                                        transform="translate(-4.423 60.176)"
                                        fill="#fff"
                                    />
                                    <path
                                        d="M305.757,28.732,280,17.033a12.992,12.992,0,0,0-10.724,0l-87.724,39.72a71.712,71.712,0,0,1-42.159,0L51.681,17.033a12.992,12.992,0,0,0-10.724,0l-25.744,11.7C.92,35.228.92,45.849,15.213,52.371L135.426,107.2a69.058,69.058,0,0,0,50.033,0L305.671,52.371C320.049,45.866,320.049,35.228,305.757,28.732Z"
                                        transform="translate(-4.493 -15.875)"
                                        fill="#fff"
                                    />
                                </g>
                            </g>
                        </svg>
                        <span class="text-white text-3xl ml-3">Leafage</span>
                    </RouterLink>
                    <figure class="my-auto">
                        <img src="/svg/illustration.svg" class="w-full h-full" alt="leafage" />
                    </figure>
                    <div class="z-0 absolute bottom-24">
                        <p class="text-white font-medium text-xl leading-tight">一个开源、灵活、美观、可定制的管理系统</p>
                        <p class="text-gray-300">基于Vue3、 Tailwindcss开发</p>
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