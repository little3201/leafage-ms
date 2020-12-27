<template>
  <div class="flex">
    <!-- BEGIN: Side Menu -->
    <nav class="side-nav">
      <a href="" class="intro-x flex items-center pl-5 pt-4">
        <img
          alt="Midone Tailwind HTML Admin Template"
          class="w-6"
          src="/src/assets/images/logo.svg"
        />
        <span class="hidden xl:block text-white text-lg ml-3">
          Abe<span class="font-medium">ille</span>
        </span>
      </a>
      <div class="side-nav__devider my-6"></div>
      <ul>
        <li>
          <a href="index.html" class="side-menu side-menu--active">
            <div class="side-menu__icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-home"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
            </div>
            <div class="side-menu__title">Dashboard</div>
          </a>
        </li>
        <li>
          <a href="javascript:;" class="side-menu">
            <div class="side-menu__icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-box"
              >
                <path
                  d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
                ></path>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                <line x1="12" y1="22.08" x2="12" y2="12"></line>
              </svg>
            </div>
            <div class="side-menu__title">
              Menu Layout
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-chevron-down ml-5"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
          </a>
          <ul class="">
            <li>
              <a href="index.html" class="side-menu">
                <div class="side-menu__icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-activity"
                  >
                    <polyline
                      points="22 12 18 12 15 21 9 3 6 12 2 12"
                    ></polyline>
                  </svg>
                </div>
                <div class="side-menu__title">Side Menu</div>
              </a>
            </li>
            <li>
              <a href="simple-menu-dashboard.html" class="side-menu">
                <div class="side-menu__icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-activity"
                  >
                    <polyline
                      points="22 12 18 12 15 21 9 3 6 12 2 12"
                    ></polyline>
                  </svg>
                </div>
                <div class="side-menu__title">Simple Menu</div>
              </a>
            </li>
            <li>
              <a href="top-menu-dashboard.html" class="side-menu">
                <div class="side-menu__icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-activity"
                  >
                    <polyline
                      points="22 12 18 12 15 21 9 3 6 12 2 12"
                    ></polyline>
                  </svg>
                </div>
                <div class="side-menu__title">Top Menu</div>
              </a>
            </li>
          </ul>
        </li>
        <li>
          <a href="side-menu-inbox.html" class="side-menu">
            <div class="side-menu__icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-inbox"
              >
                <polyline points="22 12 16 12 14 15 10 15 8 12 2 12"></polyline>
                <path
                  d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"
                ></path>
              </svg>
            </div>
            <div class="side-menu__title">Inbox</div>
          </a>
        </li>
        <li>
          <a href="side-menu-file-manager.html" class="side-menu">
            <div class="side-menu__icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="feather feather-hard-drive"
              >
                <line x1="22" y1="12" x2="2" y2="12"></line>
                <path
                  d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"
                ></path>
                <line x1="6" y1="16" x2="6.01" y2="16"></line>
                <line x1="10" y1="16" x2="10.01" y2="16"></line>
              </svg>
            </div>
            <div class="side-menu__title">File Manager</div>
          </a>
        </li>
      </ul>
    </nav>
    <!-- END: Side Menu -->
    <!-- BEGIN: Content -->
    <div class="content">
      <!-- BEGIN: Top Bar -->
      <div class="top-bar">
        <!-- BEGIN: Breadcrumb -->
        <div class="-intro-x breadcrumb mr-auto hidden sm:flex">
          <a href="" class="">Application</a>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="feather feather-chevron-right opacity-50"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
          <a href="" class="breadcrumb--active">Dashboard</a>
        </div>
        <div class="intro-x relative mr-3 sm:mr-6">
          <div class="search hidden sm:block">
            <input
              type="text"
              class="search__input input placeholder-theme-13"
              placeholder="Search..."
            />
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search search__icon"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </div>
        </div>
        <div class="intro-x dropdown relative mr-auto sm:mr-6">
          <div
            class="dropdown-toggle notification notification--bullet cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-bell notification__icon"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
          </div>
        </div>
        <div class="intro-x dropdown w-8 h-8 relative">
          <div
            class="dropdown-toggle w-8 h-8 rounded-full overflow-hidden shadow-lg image-fit zoom-in"
          >
            <img
              alt="Midone Tailwind HTML Admin Template"
              src="/src/assets/images/profile-12.jpg"
            />
          </div>
        </div>
      </div>
      <!-- END: Top Bar -->
      <div class="grid grid-cols-12 gap-6">
        <div class="col-span-12 xxl:col-span-9 grid grid-cols-12 gap-6">
          <!-- BEGIN: General Report -->
          <div class="col-span-12 mt-8">
            <div class="intro-y flex items-center h-10">
              <h2 class="text-lg font-medium truncate mr-5">General Report</h2>
              <a href="" class="ml-auto flex text-theme-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="feather feather-refresh-ccw w-4 h-4 mr-3"
                >
                  <polyline points="1 4 1 10 7 10"></polyline>
                  <polyline points="23 20 23 14 17 14"></polyline>
                  <path
                    d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"
                  ></path>
                </svg>
                Reload Data
              </a>
            </div>
            <div class="grid grid-cols-12 gap-6 mt-5">
              <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                <div class="report-box zoom-in">
                  <div class="box p-5">
                    <div class="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-shopping-cart report-box__icon text-theme-10"
                      >
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path
                          d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"
                        ></path>
                      </svg>
                      <div class="ml-auto">
                        <div
                          class="report-box__indicator bg-theme-9 tooltip cursor-pointer"
                          title="33% Higher than last month"
                        >
                          33%
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-up w-4 h-4"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
                        </div>
                      </div>
                    </div>
                    <div class="text-3xl font-bold leading-8 mt-6">4.510</div>
                    <div class="text-base text-gray-600 mt-1">Item Sales</div>
                  </div>
                </div>
              </div>
              <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                <div class="report-box zoom-in">
                  <div class="box p-5">
                    <div class="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-credit-card report-box__icon text-theme-11"
                      >
                        <rect
                          x="1"
                          y="4"
                          width="22"
                          height="16"
                          rx="2"
                          ry="2"
                        ></rect>
                        <line x1="1" y1="10" x2="23" y2="10"></line>
                      </svg>
                      <div class="ml-auto">
                        <div
                          class="report-box__indicator bg-theme-6 tooltip cursor-pointer"
                          title="2% Lower than last month"
                        >
                          2%
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-down w-4 h-4"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
                        </div>
                      </div>
                    </div>
                    <div class="text-3xl font-bold leading-8 mt-6">3.521</div>
                    <div class="text-base text-gray-600 mt-1">New Orders</div>
                  </div>
                </div>
              </div>
              <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                <div class="report-box zoom-in">
                  <div class="box p-5">
                    <div class="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-monitor report-box__icon text-theme-12"
                      >
                        <rect
                          x="2"
                          y="3"
                          width="20"
                          height="14"
                          rx="2"
                          ry="2"
                        ></rect>
                        <line x1="8" y1="21" x2="16" y2="21"></line>
                        <line x1="12" y1="17" x2="12" y2="21"></line>
                      </svg>
                      <div class="ml-auto">
                        <div
                          class="report-box__indicator bg-theme-9 tooltip cursor-pointer"
                          title="12% Higher than last month"
                        >
                          12%
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-up w-4 h-4"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
                        </div>
                      </div>
                    </div>
                    <div class="text-3xl font-bold leading-8 mt-6">2.145</div>
                    <div class="text-base text-gray-600 mt-1">
                      Total Products
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-span-12 sm:col-span-6 xl:col-span-3 intro-y">
                <div class="report-box zoom-in">
                  <div class="box p-5">
                    <div class="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        class="feather feather-user report-box__icon text-theme-9"
                      >
                        <path
                          d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
                        ></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                      <div class="ml-auto">
                        <div
                          class="report-box__indicator bg-theme-9 tooltip cursor-pointer"
                          title="22% Higher than last month"
                        >
                          22%
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="feather feather-arrow-up w-4 h-4"><line x1="12" y1="19" x2="12" y2="5"></line><polyline points="5 12 12 5 19 12"></polyline></svg>
                        </div>
                      </div>
                    </div>
                    <div class="text-3xl font-bold leading-8 mt-6">152.000</div>
                    <div class="text-base text-gray-600 mt-1">
                      Unique Visitor
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- BEGIN: Weekly Top Seller -->
          <div class="col-span-12 mt-6">
            <div class="intro-y block sm:flex items-center h-10">
              <h2 class="text-lg font-medium truncate mr-5">
                Weekly Top Seller
              </h2>
              <div class="flex items-center sm:ml-auto mt-3 sm:mt-0">
                <button class="button box flex items-center text-gray-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-file-text hidden sm:block w-4 h-4 mr-2"
                  >
                    <path
                      d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                    ></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                  Export to Excel
                </button>
                <button class="ml-3 button box flex items-center text-gray-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-file-text hidden sm:block w-4 h-4 mr-2"
                  >
                    <path
                      d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                    ></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                  Export to PDF
                </button>
              </div>
            </div>
            <div class="intro-y overflow-auto lg:overflow-visible mt-8 sm:mt-0">
              <table class="table table-report sm:mt-2">
                <thead>
                  <tr>
                    <th class="whitespace-no-wrap">IMAGES</th>
                    <th class="whitespace-no-wrap">PRODUCT NAME</th>
                    <th class="text-center whitespace-no-wrap">STOCK</th>
                    <th class="text-center whitespace-no-wrap">STATUS</th>
                    <th class="text-center whitespace-no-wrap">ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  <tr class="intro-x">
                    <td class="w-40">
                      <div class="flex">
                        <div class="w-10 h-10 image-fit zoom-in">
                          <img
                            alt="Midone Tailwind HTML Admin Template"
                            class="tooltip rounded-full"
                            src="/src/assets/images/preview-2.jpg"
                            title="Uploaded at 6 August 2022"
                          />
                        </div>
                        <div class="w-10 h-10 image-fit zoom-in -ml-5">
                          <img
                            alt="Midone Tailwind HTML Admin Template"
                            class="tooltip rounded-full"
                            src="/src/assets/images/preview-8.jpg"
                            title="Uploaded at 1 May 2021"
                          />
                        </div>
                        <div class="w-10 h-10 image-fit zoom-in -ml-5">
                          <img
                            alt="Midone Tailwind HTML Admin Template"
                            class="tooltip rounded-full"
                            src="/src/assets/images/preview-11.jpg"
                            title="Uploaded at 10 October 2020"
                          />
                        </div>
                      </div>
                    </td>
                    <td>
                      <a href="" class="font-medium whitespace-no-wrap"
                        >Apple MacBook Pro 13</a
                      >
                      <div class="text-gray-600 text-xs whitespace-no-wrap">
                        PC &amp; Laptop
                      </div>
                    </td>
                    <td class="text-center">77</td>
                    <td class="w-40">
                      <div
                        class="flex items-center justify-center text-theme-9"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="feather feather-check-square w-4 h-4 mr-2"
                        >
                          <polyline points="9 11 12 14 22 4"></polyline>
                          <path
                            d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"
                          ></path>
                        </svg>
                        Active
                      </div>
                    </td>
                    <td class="table-report__action w-56">
                      <div class="flex justify-center items-center">
                        <a class="flex items-center mr-3" href="">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="feather feather-check-square w-4 h-4 mr-2"
                          >
                            <polyline points="9 11 12 14 22 4"></polyline>
                            <path
                              d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"
                            ></path>
                          </svg>
                          Edit
                        </a>
                        <a class="flex items-center text-theme-6" href="">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="feather feather-trash-2 w-4 h-4 mr-1"
                          >
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path
                              d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                            ></path>
                            <line x1="10" y1="11" x2="10" y2="17"></line>
                            <line x1="14" y1="11" x2="14" y2="17"></line>
                          </svg>
                          Delete
                        </a>
                      </div>
                    </td>
                  </tr>
                  <tr class="intro-x">
                    <td class="w-40">
                      <div class="flex">
                        <div class="w-10 h-10 image-fit zoom-in">
                          <img
                            alt="Midone Tailwind HTML Admin Template"
                            class="tooltip rounded-full"
                            src="/src/assets/images/preview-7.jpg"
                            title="Uploaded at 21 July 2020"
                          />
                        </div>
                        <div class="w-10 h-10 image-fit zoom-in -ml-5">
                          <img
                            alt="Midone Tailwind HTML Admin Template"
                            class="tooltip rounded-full"
                            src="/src/assets/images/preview-13.jpg"
                            title="Uploaded at 31 December 2021"
                          />
                        </div>
                        <div class="w-10 h-10 image-fit zoom-in -ml-5">
                          <img
                            alt="Midone Tailwind HTML Admin Template"
                            class="tooltip rounded-full"
                            src="/src/assets/images/preview-2.jpg"
                            title="Uploaded at 9 September 2020"
                          />
                        </div>
                      </div>
                    </td>
                    <td>
                      <a href="" class="font-medium whitespace-no-wrap"
                        >Dell XPS 13</a
                      >
                      <div class="text-gray-600 text-xs whitespace-no-wrap">
                        PC &amp; Laptop
                      </div>
                    </td>
                    <td class="text-center">100</td>
                    <td class="w-40">
                      <div
                        class="flex items-center justify-center text-theme-9"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="feather feather-check-square w-4 h-4 mr-2"
                        >
                          <polyline points="9 11 12 14 22 4"></polyline>
                          <path
                            d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"
                          ></path>
                        </svg>
                        Active
                      </div>
                    </td>
                    <td class="table-report__action w-56">
                      <div class="flex justify-center items-center">
                        <a class="flex items-center mr-3" href="">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="feather feather-check-square w-4 h-4 mr-2"
                          >
                            <polyline points="9 11 12 14 22 4"></polyline>
                            <path
                              d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"
                            ></path>
                          </svg>
                          Edit
                        </a>
                        <a class="flex items-center text-theme-6" href="">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="feather feather-trash-2 w-4 h-4 mr-1"
                          >
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path
                              d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                            ></path>
                            <line x1="10" y1="11" x2="10" y2="17"></line>
                            <line x1="14" y1="11" x2="14" y2="17"></line>
                          </svg>
                          Delete
                        </a>
                      </div>
                    </td>
                  </tr>
                  <tr class="intro-x">
                    <td class="w-40">
                      <div class="flex">
                        <div class="w-10 h-10 image-fit zoom-in">
                          <img
                            alt="Midone Tailwind HTML Admin Template"
                            class="tooltip rounded-full"
                            src="/src/assets/images/preview-9.jpg"
                            title="Uploaded at 5 January 2021"
                          />
                        </div>
                        <div class="w-10 h-10 image-fit zoom-in -ml-5">
                          <img
                            alt="Midone Tailwind HTML Admin Template"
                            class="tooltip rounded-full"
                            src="/src/assets/images/preview-6.jpg"
                            title="Uploaded at 18 November 2021"
                          />
                        </div>
                        <div class="w-10 h-10 image-fit zoom-in -ml-5">
                          <img
                            alt="Midone Tailwind HTML Admin Template"
                            class="tooltip rounded-full"
                            src="/src/assets/images/preview-13.jpg"
                            title="Uploaded at 1 June 2021"
                          />
                        </div>
                      </div>
                    </td>
                    <td>
                      <a href="" class="font-medium whitespace-no-wrap"
                        >Oppo Find X2 Pro</a
                      >
                      <div class="text-gray-600 text-xs whitespace-no-wrap">
                        Smartphone &amp; Tablet
                      </div>
                    </td>
                    <td class="text-center">50</td>
                    <td class="w-40">
                      <div
                        class="flex items-center justify-center text-theme-9"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="feather feather-check-square w-4 h-4 mr-2"
                        >
                          <polyline points="9 11 12 14 22 4"></polyline>
                          <path
                            d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"
                          ></path>
                        </svg>
                        Active
                      </div>
                    </td>
                    <td class="table-report__action w-56">
                      <div class="flex justify-center items-center">
                        <a class="flex items-center mr-3" href="">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="feather feather-check-square w-4 h-4 mr-2"
                          >
                            <polyline points="9 11 12 14 22 4"></polyline>
                            <path
                              d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"
                            ></path>
                          </svg>
                          Edit
                        </a>
                        <a class="flex items-center text-theme-6" href="">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="feather feather-trash-2 w-4 h-4 mr-1"
                          >
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path
                              d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                            ></path>
                            <line x1="10" y1="11" x2="10" y2="17"></line>
                            <line x1="14" y1="11" x2="14" y2="17"></line>
                          </svg>
                          Delete
                        </a>
                      </div>
                    </td>
                  </tr>
                  <tr class="intro-x">
                    <td class="w-40">
                      <div class="flex">
                        <div class="w-10 h-10 image-fit zoom-in">
                          <img
                            alt="Midone Tailwind HTML Admin Template"
                            class="tooltip rounded-full"
                            src="/src/assets/images/preview-11.jpg"
                            title="Uploaded at 22 April 2020"
                          />
                        </div>
                        <div class="w-10 h-10 image-fit zoom-in -ml-5">
                          <img
                            alt="Midone Tailwind HTML Admin Template"
                            class="tooltip rounded-full"
                            src="/src/assets/images/preview-10.jpg"
                            title="Uploaded at 12 December 2020"
                          />
                        </div>
                        <div class="w-10 h-10 image-fit zoom-in -ml-5">
                          <img
                            alt="Midone Tailwind HTML Admin Template"
                            class="tooltip rounded-full"
                            src="/src/assets/images/preview-12.jpg"
                            title="Uploaded at 7 May 2020"
                          />
                        </div>
                      </div>
                    </td>
                    <td>
                      <a href="" class="font-medium whitespace-no-wrap"
                        >Apple MacBook Pro 13</a
                      >
                      <div class="text-gray-600 text-xs whitespace-no-wrap">
                        PC &amp; Laptop
                      </div>
                    </td>
                    <td class="text-center">50</td>
                    <td class="w-40">
                      <div
                        class="flex items-center justify-center text-theme-9"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="feather feather-check-square w-4 h-4 mr-2"
                        >
                          <polyline points="9 11 12 14 22 4"></polyline>
                          <path
                            d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"
                          ></path>
                        </svg>
                        Active
                      </div>
                    </td>
                    <td class="table-report__action w-56">
                      <div class="flex justify-center items-center">
                        <a class="flex items-center mr-3" href="">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="feather feather-check-square w-4 h-4 mr-2"
                          >
                            <polyline points="9 11 12 14 22 4"></polyline>
                            <path
                              d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"
                            ></path>
                          </svg>
                          Edit
                        </a>
                        <a class="flex items-center text-theme-6" href="">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="feather feather-trash-2 w-4 h-4 mr-1"
                          >
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path
                              d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"
                            ></path>
                            <line x1="10" y1="11" x2="10" y2="17"></line>
                            <line x1="14" y1="11" x2="14" y2="17"></line>
                          </svg>
                          Delete
                        </a>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div
              class="intro-y flex flex-wrap sm:flex-row sm:flex-no-wrap items-center mt-3"
            >
              <ul class="pagination">
                <li>
                  <a class="pagination__link" href="">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-chevrons-left"
                    >
                      <polyline points="11 17 6 12 11 7"></polyline>
                      <polyline points="18 17 13 12 18 7"></polyline>
                    </svg>
                  </a>
                </li>
                <li>
                  <a class="pagination__link" href="">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-chevron-left"
                    >
                      <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                  </a>
                </li>
                <li><a class="pagination__link" href="">...</a></li>
                <li><a class="pagination__link" href="">1</a></li>
                <li>
                  <a class="pagination__link pagination__link--active" href=""
                    >2</a
                  >
                </li>
                <li><a class="pagination__link" href="">3</a></li>
                <li><a class="pagination__link" href="">...</a></li>
                <li>
                  <a class="pagination__link" href="">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="feather feather-chevron-right"
                    >
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </a>
                </li>
                <li>
                  <a class="pagination__link" href=""> </a>
                </li>
              </ul>
              <select class="w-20 input box mt-3 sm:mt-0">
                <option>10</option>
                <option>25</option>
                <option>35</option>
                <option>50</option>
              </select>
            </div>
          </div>
          <!-- END: Weekly Top Seller -->
        </div>
      </div>
    </div>
    <!-- END: Content -->
  </div>
</template>