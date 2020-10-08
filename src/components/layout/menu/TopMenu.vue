<template>
  <nav class="top-nav">
    <ul>
      <li v-for="(menu, index) in menus" :key="index">
        <a href="#" class="top-menu top-menu--active">
          <div class="top-menu__icon">
            <i data-feather="{{ menu.icon }}"></i>
          </div>
          <div class="top-menu__title">
            {{ menu.title }}
            <i
              v-if="menu.subs"
              data-feather="chevron-down"
              class="top-menu__sub-icon"
            ></i>
          </div>
        </a>
        <ul v-if="menu.subs">
          <li v-for="(sub, index) in menu.subs" :key="index">
            <a href="#" class="top-menu">
              <div class="top-menu__icon">
                <i data-feather="activity"></i>
              </div>
              <div class="top-menu__title">
                {{ sub.title }}
                <i
                  v-if="sub.subs"
                  data-feather="chevron-down"
                  class="top-menu__sub-icon"
                ></i>
              </div>
            </a>
            <ul
              v-if="sub.subs"
            >
              <li v-for="(subMenu, index) in sub.subs" :key="index">
                <a href="#" class="top-menu">
                  <div class="top-menu__icon">
                    <i data-feather="zap"></i>
                  </div>
                  <div class="top-menu__title">{{ subMenu.title }}</div>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>