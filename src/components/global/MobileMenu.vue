<template>
  <div class="mobile-menu md:hidden">
    <div class="mobile-menu-bar">
      <a href="" class="flex mr-auto">
        <img
          alt="Midone Tailwind HTML Admin Template"
          class="w-6"
          src="/images/logo.svg"
        />
      </a>
      <a href="javascript:;" id="mobile-menu-toggler">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-bar-chart-2 w-8 h-8 text-white transform -rotate-90"
        >
          <line x1="18" y1="20" x2="18" y2="10"></line>
          <line x1="12" y1="20" x2="12" y2="4"></line>
          <line x1="6" y1="20" x2="6" y2="14"></line>
        </svg>
      </a>
    </div>
    <ul class="border-t border-theme-24 py-5 hidden">
      <li>
        <a href="index.html" class="menu menu--active">
          <div class="menu__icon"><i data-feather="home"></i></div>
          <div class="menu__title">Dashboard</div>
        </a>
      </li>
      <li>
        <a href="javascript:;" class="menu">
          <div class="menu__icon"><i data-feather="box"></i></div>
          <div class="menu__title">
            Menu Layout
            <i data-feather="chevron-down" class="menu__sub-icon"></i>
          </div>
        </a>
        <ul class="">
          <li>
            <a href="index.html" class="menu">
              <div class="menu__icon"><i data-feather="activity"></i></div>
              <div class="menu__title">Side Menu</div>
            </a>
          </li>
          <li>
            <a href="simple-menu-dashboard.html" class="menu">
              <div class="menu__icon"><i data-feather="activity"></i></div>
              <div class="menu__title">Simple Menu</div>
            </a>
          </li>
          <li>
            <a href="top-menu-dashboard.html" class="menu">
              <div class="menu__icon"><i data-feather="activity"></i></div>
              <div class="menu__title">Top Menu</div>
            </a>
          </li>
        </ul>
      </li>
      <li>
        <a href="side-menu-inbox.html" class="menu">
          <div class="menu__icon"><i data-feather="inbox"></i></div>
          <div class="menu__title">Inbox</div>
        </a>
      </li>
      <li>
        <a href="side-menu-file-manager.html" class="menu">
          <div class="menu__icon"><i data-feather="hard-drive"></i></div>
          <div class="menu__title">File Manager</div>
        </a>
      </li>
      <li>
        <a href="side-menu-point-of-sale.html" class="menu">
          <div class="menu__icon"><i data-feather="credit-card"></i></div>
          <div class="menu__title">Point of Sale</div>
        </a>
      </li>
      <li>
        <a href="side-menu-chat.html" class="menu">
          <div class="menu__icon"><i data-feather="message-square"></i></div>
          <div class="menu__title">Chat</div>
        </a>
      </li>
      <li>
        <a href="side-menu-post.html" class="menu">
          <div class="menu__icon"><i data-feather="file-text"></i></div>
          <div class="menu__title">Post</div>
        </a>
      </li>
      <li class="menu__devider my-6"></li>
      <li>
        <a href="javascript:;" class="menu">
          <div class="menu__icon"><i data-feather="edit"></i></div>
          <div class="menu__title">
            Crud <i data-feather="chevron-down" class="menu__sub-icon"></i>
          </div>
        </a>
        <ul class="">
          <li>
            <a href="side-menu-crud-data-list.html" class="menu">
              <div class="menu__icon"><i data-feather="activity"></i></div>
              <div class="menu__title">Data List</div>
            </a>
          </li>
          <li>
            <a href="side-menu-crud-form.html" class="menu">
              <div class="menu__icon"><i data-feather="activity"></i></div>
              <div class="menu__title">Form</div>
            </a>
          </li>
        </ul>
      </li>
      <li>
        <a href="javascript:;" class="menu">
          <div class="menu__icon"><i data-feather="users"></i></div>
          <div class="menu__title">
            Users <i data-feather="chevron-down" class="menu__sub-icon"></i>
          </div>
        </a>
        <ul class="">
          <li>
            <a href="side-menu-users-layout-1.html" class="menu">
              <div class="menu__icon"><i data-feather="activity"></i></div>
              <div class="menu__title">Layout 1</div>
            </a>
          </li>
          <li>
            <a href="side-menu-users-layout-2.html" class="menu">
              <div class="menu__icon"><i data-feather="activity"></i></div>
              <div class="menu__title">Layout 2</div>
            </a>
          </li>
          <li>
            <a href="side-menu-users-layout-3.html" class="menu">
              <div class="menu__icon"><i data-feather="activity"></i></div>
              <div class="menu__title">Layout 3</div>
            </a>
          </li>
        </ul>
      </li>
      <li>
        <a href="javascript:;" class="menu">
          <div class="menu__icon"><i data-feather="trello"></i></div>
          <div class="menu__title">
            Profile <i data-feather="chevron-down" class="menu__sub-icon"></i>
          </div>
        </a>
        <ul class="">
          <li>
            <a href="side-menu-profile-overview-1.html" class="menu">
              <div class="menu__icon"><i data-feather="activity"></i></div>
              <div class="menu__title">Overview 1</div>
            </a>
          </li>
          <li>
            <a href="side-menu-profile-overview-2.html" class="menu">
              <div class="menu__icon"><i data-feather="activity"></i></div>
              <div class="menu__title">Overview 2</div>
            </a>
          </li>
          <li>
            <a href="side-menu-profile-overview-3.html" class="menu">
              <div class="menu__icon"><i data-feather="activity"></i></div>
              <div class="menu__title">Overview 3</div>
            </a>
          </li>
        </ul>
      </li>
      <li>
        <a href="javascript:;" class="menu">
          <div class="menu__icon"><i data-feather="layout"></i></div>
          <div class="menu__title">
            Pages <i data-feather="chevron-down" class="menu__sub-icon"></i>
          </div>
        </a>
        <ul class="">
          <li>
            <a href="javascript:;" class="menu">
              <div class="menu__icon"><i data-feather="activity"></i></div>
              <div class="menu__title">
                Wizards
                <i data-feather="chevron-down" class="menu__sub-icon"></i>
              </div>
            </a>
            <ul class="">
              <li>
                <a href="side-menu-wizard-layout-1.html" class="menu">
                  <div class="menu__icon"><i data-feather="zap"></i></div>
                  <div class="menu__title">Layout 1</div>
                </a>
              </li>
              <li>
                <a href="side-menu-wizard-layout-2.html" class="menu">
                  <div class="menu__icon"><i data-feather="zap"></i></div>
                  <div class="menu__title">Layout 2</div>
                </a>
              </li>
              <li>
                <a href="side-menu-wizard-layout-3.html" class="menu">
                  <div class="menu__icon"><i data-feather="zap"></i></div>
                  <div class="menu__title">Layout 3</div>
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="javascript:;" class="menu">
              <div class="menu__icon"><i data-feather="activity"></i></div>
              <div class="menu__title">
                Blog <i data-feather="chevron-down" class="menu__sub-icon"></i>
              </div>
            </a>
            <ul class="">
              <li>
                <a href="side-menu-blog-layout-1.html" class="menu">
                  <div class="menu__icon"><i data-feather="zap"></i></div>
                  <div class="menu__title">Layout 1</div>
                </a>
              </li>
              <li>
                <a href="side-menu-blog-layout-2.html" class="menu">
                  <div class="menu__icon"><i data-feather="zap"></i></div>
                  <div class="menu__title">Layout 2</div>
                </a>
              </li>
              <li>
                <a href="side-menu-blog-layout-3.html" class="menu">
                  <div class="menu__icon"><i data-feather="zap"></i></div>
                  <div class="menu__title">Layout 3</div>
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="javascript:;" class="menu">
              <div class="menu__icon"><i data-feather="activity"></i></div>
              <div class="menu__title">
                Pricing
                <i data-feather="chevron-down" class="menu__sub-icon"></i>
              </div>
            </a>
            <ul class="">
              <li>
                <a href="side-menu-pricing-layout-1.html" class="menu">
                  <div class="menu__icon"><i data-feather="zap"></i></div>
                  <div class="menu__title">Layout 1</div>
                </a>
              </li>
              <li>
                <a href="side-menu-pricing-layout-2.html" class="menu">
                  <div class="menu__icon"><i data-feather="zap"></i></div>
                  <div class="menu__title">Layout 2</div>
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="javascript:;" class="menu">
              <div class="menu__icon"><i data-feather="activity"></i></div>
              <div class="menu__title">
                Invoice
                <i data-feather="chevron-down" class="menu__sub-icon"></i>
              </div>
            </a>
            <ul class="">
              <li>
                <a href="side-menu-invoice-layout-1.html" class="menu">
                  <div class="menu__icon"><i data-feather="zap"></i></div>
                  <div class="menu__title">Layout 1</div>
                </a>
              </li>
              <li>
                <a href="side-menu-invoice-layout-2.html" class="menu">
                  <div class="menu__icon"><i data-feather="zap"></i></div>
                  <div class="menu__title">Layout 2</div>
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="javascript:;" class="menu">
              <div class="menu__icon"><i data-feather="activity"></i></div>
              <div class="menu__title">
                FAQ <i data-feather="chevron-down" class="menu__sub-icon"></i>
              </div>
            </a>
            <ul class="">
              <li>
                <a href="side-menu-faq-layout-1.html" class="menu">
                  <div class="menu__icon"><i data-feather="zap"></i></div>
                  <div class="menu__title">Layout 1</div>
                </a>
              </li>
              <li>
                <a href="side-menu-faq-layout-2.html" class="menu">
                  <div class="menu__icon"><i data-feather="zap"></i></div>
                  <div class="menu__title">Layout 2</div>
                </a>
              </li>
              <li>
                <a href="side-menu-faq-layout-3.html" class="menu">
                  <div class="menu__icon"><i data-feather="zap"></i></div>
                  <div class="menu__title">Layout 3</div>
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="login-login.html" class="menu">
              <div class="menu__icon"><i data-feather="activity"></i></div>
              <div class="menu__title">Login</div>
            </a>
          </li>
          <li>
            <a href="login-register.html" class="menu">
              <div class="menu__icon"><i data-feather="activity"></i></div>
              <div class="menu__title">Register</div>
            </a>
          </li>
          <li>
            <a href="main-error-page.html" class="menu">
              <div class="menu__icon"><i data-feather="activity"></i></div>
              <div class="menu__title">Error Page</div>
            </a>
          </li>
          <li>
            <a href="side-menu-update-profile.html" class="menu">
              <div class="menu__icon"><i data-feather="activity"></i></div>
              <div class="menu__title">Update profile</div>
            </a>
          </li>
          <li>
            <a href="side-menu-change-password.html" class="menu">
              <div class="menu__icon"><i data-feather="activity"></i></div>
              <div class="menu__title">Change Password</div>
            </a>
          </li>
        </ul>
      </li>
      <li class="menu__devider my-6"></li>
      <li>
        <a href="javascript:;" class="menu">
          <div class="menu__icon"><i data-feather="inbox"></i></div>
          <div class="menu__title">
            Components
            <i data-feather="chevron-down" class="menu__sub-icon"></i>
          </div>
        </a>
        <ul class="">
          <li>
            <a href="javascript:;" class="menu">
              <div class="menu__icon"><i data-feather="activity"></i></div>
              <div class="menu__title">
                Grid <i data-feather="chevron-down" class="menu__sub-icon"></i>
              </div>
            </a>
            <ul class="">
              <li>
                <a href="side-menu-regular-table.html" class="menu">
                  <div class="menu__icon"><i data-feather="zap"></i></div>
                  <div class="menu__title">Regular Table</div>
                </a>
              </li>
              <li>
                <a href="side-menu-datatable.html" class="menu">
                  <div class="menu__icon"><i data-feather="zap"></i></div>
                  <div class="menu__title">Datatable</div>
                </a>
              </li>
            </ul>
          </li>
          <li>
            <a href="side-menu-accordion.html" class="menu">
              <div class="menu__icon"><i data-feather="activity"></i></div>
              <div class="menu__title">Accordion</div>
            </a>
          </li>
          <li>
            <a href="side-menu-button.html" class="menu">
              <div class="menu__icon"><i data-feather="activity"></i></div>
              <div class="menu__title">Button</div>
            </a>
          </li>
          <li>
            <a href="side-menu-modal.html" class="menu">
              <div class="menu__icon"><i data-feather="activity"></i></div>
              <div class="menu__title">Modal</div>
            </a>
          </li>
          <li>
            <a href="side-menu-alert.html" class="menu">
              <div class="menu__icon"><i data-feather="activity"></i></div>
              <div class="menu__title">Alert</div>
            </a>
          </li>
          <li>
            <a href="side-menu-progress-bar.html" class="menu">
              <div class="menu__icon"><i data-feather="activity"></i></div>
              <div class="menu__title">Progress Bar</div>
            </a>
          </li>
          <li>
            <a href="side-menu-tooltip.html" class="menu">
              <div class="menu__icon"><i data-feather="activity"></i></div>
              <div class="menu__title">Tooltip</div>
            </a>
          </li>
          <li>
            <a href="side-menu-dropdown.html" class="menu">
              <div class="menu__icon"><i data-feather="activity"></i></div>
              <div class="menu__title">Dropdown</div>
            </a>
          </li>
          <li>
            <a href="side-menu-toast.html" class="menu">
              <div class="menu__icon"><i data-feather="activity"></i></div>
              <div class="menu__title">Toast</div>
            </a>
          </li>
          <li>
            <a href="side-menu-typography.html" class="menu">
              <div class="menu__icon"><i data-feather="activity"></i></div>
              <div class="menu__title">Typography</div>
            </a>
          </li>
          <li>
            <a href="side-menu-icon.html" class="menu">
              <div class="menu__icon"><i data-feather="activity"></i></div>
              <div class="menu__title">Icon</div>
            </a>
          </li>
          <li>
            <a href="side-menu-loading-icon.html" class="menu">
              <div class="menu__icon"><i data-feather="activity"></i></div>
              <div class="menu__title">Loading Icon</div>
            </a>
          </li>
        </ul>
      </li>
      <li>
        <a href="javascript:;" class="menu">
          <div class="menu__icon"><i data-feather="sidebar"></i></div>
          <div class="menu__title">
            Forms <i data-feather="chevron-down" class="menu__sub-icon"></i>
          </div>
        </a>
        <ul class="">
          <li>
            <a href="side-menu-regular-form.html" class="menu">
              <div class="menu__icon"><i data-feather="activity"></i></div>
              <div class="menu__title">Regular Form</div>
            </a>
          </li>
          <li>
            <a href="side-menu-datepicker.html" class="menu">
              <div class="menu__icon"><i data-feather="activity"></i></div>
              <div class="menu__title">Datepicker</div>
            </a>
          </li>
          <li>
            <a href="side-menu-select2.html" class="menu">
              <div class="menu__icon"><i data-feather="activity"></i></div>
              <div class="menu__title">Select2</div>
            </a>
          </li>
          <li>
            <a href="side-menu-file-upload.html" class="menu">
              <div class="menu__icon"><i data-feather="activity"></i></div>
              <div class="menu__title">File Upload</div>
            </a>
          </li>
          <li>
            <a href="side-menu-wysiwyg-editor.html" class="menu">
              <div class="menu__icon"><i data-feather="activity"></i></div>
              <div class="menu__title">Wysiwyg Editor</div>
            </a>
          </li>
          <li>
            <a href="side-menu-validation.html" class="menu">
              <div class="menu__icon"><i data-feather="activity"></i></div>
              <div class="menu__title">Validation</div>
            </a>
          </li>
        </ul>
      </li>
      <li>
        <a href="javascript:;" class="menu">
          <div class="menu__icon"><i data-feather="hard-drive"></i></div>
          <div class="menu__title">
            Widgets <i data-feather="chevron-down" class="menu__sub-icon"></i>
          </div>
        </a>
        <ul class="">
          <li>
            <a href="side-menu-chart.html" class="menu">
              <div class="menu__icon"><i data-feather="activity"></i></div>
              <div class="menu__title">Chart</div>
            </a>
          </li>
          <li>
            <a href="side-menu-slider.html" class="menu">
              <div class="menu__icon"><i data-feather="activity"></i></div>
              <div class="menu__title">Slider</div>
            </a>
          </li>
          <li>
            <a href="side-menu-image-zoom.html" class="menu">
              <div class="menu__icon"><i data-feather="activity"></i></div>
              <div class="menu__title">Image Zoom</div>
            </a>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>