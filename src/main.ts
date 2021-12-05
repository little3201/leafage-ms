import { createApp } from 'vue'
import App from './App.vue'
import './assets/main.css'
import router from './router'

import { setupProdMockServer } from './mock';

// dev mock server
if (process.env.NODE_ENV != 'production') {
    // let user = { username: "little3201", nickname: "布吉岛", avatar: "" }
    // let menus = [
    //     { "code": "2122466RP", "name": "Dashboard", "superior": "2122466RP", "expand": { "path": "/", "icon": "home" }, "children": [] },
    //     {
    //         "code": "21224DRMU", "name": "System", "superior": "21224DRMU", "expand": { "path": "/system", "icon": "layers" }, "children": [
    //             { "code": "21224UJ5C", "name": "Group", "superior": "21224DRMU", "expand": { "path": "/group", "icon": "users" }, "children": [] },
    //             {
    //                 "code": "21224PV6C", "name": "Role", "superior": "21224DRMU", "expand": { "path": "/role", "icon": "pocket" }, "children": []
    //             },
    //             { "code": "212240439", "name": "Authority", "superior": "21224DRMU", "expand": { "path": "/authority", "icon": "power" }, "children": [] },
    //             {
    //                 "code": "203315P3Q", "name": "User", "superior": "21224DRMU", "expand": { "path": "/user", "icon": "user" }, "children": []
    //             }
    //         ]
    //     },
    //     { "code": "21224B8JZ", "name": "Posts", "superior": "21224B8JZ", "expand": { "path": "/posts", "icon": "book" }, "children": [] },
    //     { "code": "21224QI72", "name": "Resource", "superior": "21224QI72", "expand": { "path": "/resource", "icon": "camera" }, "children": [] },
    //     { "code": "21224HMLG", "name": "Category", "superior": "21224HMLG", "expand": { "path": "/category", "icon": "tag" }, "children": [] }
    // ]
    // sessionStorage.setItem("user", JSON.stringify(user));
    // sessionStorage.setItem("menus", JSON.stringify(menus))
    // setupProdMockServer();
}

createApp(App).use(router).mount('#app')
