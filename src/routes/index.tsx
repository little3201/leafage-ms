import { createBrowserRouter, redirect } from "react-router"
import App from "../App"
import Home from '../pages/Home'
import Login from "../pages/Login"

// 示例 action（登录）
const loginAction = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const username = formData.get("username");
  const password = formData.get("password");

  const res = await fetch("/api/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: { "Content-Type": "application/json" },
  });

  if (res.ok) {
    return redirect("/");
  } else {
    throw new Response("Login failed", { status: 401 });
  }
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: Home
      }
    ]
  },
  {
    path: "/",
    element: <Login />,
    action: loginAction,
  }
])
