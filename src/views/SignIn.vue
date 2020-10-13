<template>
  <div class="login">
    <div class="container sm:px-10">
      <div class="block xl:grid grid-cols-2 gap-4">
        <!-- BEGIN: Login Info -->
        <div class="hidden xl:flex flex-col min-h-screen">
          <a href="" class="-intro-x flex items-center pt-5">
            <img
              alt="Midone Laravel Admin Dashboard Starter Kit"
              class="w-6"
              src="../assets/logo.svg"
            />
            <span class="text-white text-lg ml-3">
              Mid<span class="font-medium">one</span>
            </span>
          </a>
          <div class="my-auto">
            <img
              alt="Midone Laravel Admin Dashboard Starter Kit"
              class="-intro-x w-1/2 -mt-16"
              src="../assets/illustration.svg"
            />
            <div
              class="-intro-x text-white font-medium text-4xl leading-tight mt-10"
            >
              A few more clicks to <br />
              sign in to your account.
            </div>
            <div class="-intro-x mt-5 text-lg text-white">
              Manage all your e-commerce accounts in one place
            </div>
          </div>
        </div>
        <!-- END: Login Info -->
        <!-- BEGIN: Login Form -->
        <div class="h-screen xl:h-auto flex py-5 xl:py-0 my-10 xl:my-0">
          <div
            class="my-auto mx-auto xl:ml-20 bg-white xl:bg-transparent px-5 sm:px-8 py-8 xl:p-0 rounded-md shadow-md xl:shadow-none w-full sm:w-3/4 lg:w-2/4 xl:w-auto"
          >
            <h2
              class="intro-x font-bold text-2xl xl:text-3xl text-center xl:text-left"
            >
              Sign In
            </h2>
            <div class="intro-x mt-2 text-gray-500 xl:hidden text-center">
              A few more clicks to sign in to your account. Manage all your
              e-commerce accounts in one place
            </div>
            <div class="intro-x mt-8">
              <form id="login-form">
                <input
                  type="text"
                  id="input-email"
                  value="midone@left4code.com"
                  class="intro-x login__input input input--lg border border-gray-300 block"
                  placeholder="Email"
                />
                <div
                  id="error-email"
                  class="input__error w-5/6 text-theme-6 mt-2"
                ></div>
                <input
                  type="password"
                  id="input-password"
                  value="password"
                  class="intro-x login__input input input--lg border border-gray-300 block mt-4"
                  placeholder="Password"
                />
                <div
                  id="error-password"
                  class="input__error w-5/6 text-theme-6 mt-2"
                ></div>
              </form>
            </div>
            <div class="intro-x flex text-gray-700 text-xs sm:text-sm mt-4">
              <div class="flex items-center mr-auto">
                <input
                  type="checkbox"
                  class="input border mr-2"
                  id="remember-me"
                />
                <label class="cursor-pointer select-none" for="remember-me"
                  >Remember me</label
                >
              </div>
              <a href="">Forgot Password?</a>
            </div>
            <div
              class="intro-x mt-5 xl:mt-8 xl:flex justify-center xl:justify-start"
            >
              <button
                id="btn-login"
                class="button button--lg w-full xl:w-32 text-white bg-theme-1 xl:mr-3"
              >
                Login
              </button>
              <button
                class="button button--lg w-full xl:w-32 text-gray-700 border border-gray-300 mt-3 xl:mt-0"
              >
                Sign up
              </button>
            </div>
            <div
              class="intro-x mt-10 xl:mt-24 text-gray-700 text-center xl:text-left"
            >
              By signin up, you agree to our <br />
              <a class="text-theme-1" href="">Terms and Conditions</a> &
              <a class="text-theme-1" href="">Privacy Policy</a>
            </div>
          </div>
        </div>
        <!-- END: Login Form -->
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login {
  @apply relative bg-white;
  @media (max-width: theme("screens.xl")) {
    background: linear-gradient(to bottom, #1c3faa, #2b51b4);
    background-repeat: no-repeat;
    background-attachment: fixed;
  }
  &:before {
    content: "";
    margin-left: -48%;
    background-image: url(../assets/bg-login-page.svg);
    background-repeat: no-repeat;
    background-size: auto 100%;
    background-position: right;
    @apply w-full h-full absolute top-0 left-0;
    @media (max-width: theme("screens.xl")) {
      @apply hidden;
    }
  }
  .login__input {
    min-width: 350px;
    box-shadow: 0px 3px 5px #00000007;
    @media (max-width: theme("screens.xl")) {
      @apply min-w-full;
    }
  }
}
.input {
    @apply py-2 px-3 rounded-md appearance-none;
    &:not(textarea) {
        &.input--sm {
            @apply py-1 px-2;
        }
        &.input--lg {
            @apply py-3 px-4;
        }
    }
    &:focus {
        @apply outline-none shadow-outline;
    }
    &[type="radio"] {
        width: 16px;
        height: 16px;
        @apply relative rounded-full overflow-hidden cursor-pointer;
        &:before {
            content: "";
            width: 10px;
            height: 10px;
            transition: all 0.2s ease-in-out;
            @apply absolute rounded-full bg-theme-1 inset-0 m-auto opacity-0;
        }
        &:checked {
            @apply border-theme-1;
            &:before {
                @apply opacity-100;
            }
        }
    }
    &[type="checkbox"]:not(.input--switch) {
        width: 16px;
        height: 16px;
        border-radius: 0.2em;
        @apply relative overflow-hidden cursor-pointer;
        &:before {
            content: "";
            transition: all 0.2s ease-in-out;
            background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23ffffff' stroke-width='3' stroke-linecap='round' stroke-linejoin='round' class='feather feather-check'%3E%3Cpolyline points='20 6 9 17 4 12'%3E%3C/polyline%3E%3C/svg%3E");
            background-size: 80%;
            @apply w-full h-full absolute text-white flex items-center justify-center opacity-0 bg-no-repeat bg-center;
        }
        &:checked {
            @apply bg-theme-1 border-theme-1;
            &:before {
                @apply opacity-100;
            }
        }
    }
    &.input--switch[type="checkbox"] {
        width: 38px;
        height: 24px;
        padding: 1px;
        @apply outline-none rounded-full relative cursor-pointer;
        &:before {
            content: "";
            width: 22px;
            height: 22px;
            transition: all 0.2s ease-in-out;
            box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.25);
            @apply absolute inset-y-0 my-auto rounded-full;
        }
        &:checked {
            @apply bg-theme-1 border-theme-1;
            &::before {
                margin-left: 13px;
                @apply bg-white;
            }
        }
    }
}
.button {
    @apply py-2 px-3 rounded-md font-medium cursor-pointer;
    &:focus {
        @apply outline-none shadow-outline;
    }
    &:not(button) {
        @apply text-center;
    }
    &.button--sm {
        @apply py-1 px-2;
    }
    &.button--lg {
        @apply py-3 px-4;
    }
}
</style>