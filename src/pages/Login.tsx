// pages/Login.tsx
import { Form, useActionData } from 'react-router'

export default function Login() {
  const error = useActionData() as string

  return (
    <Form method="post">
      <input name="username" placeholder="User" />
      <input name="password" type="password" placeholder="Password" />
      <button type="submit">Login</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </Form>
  )
}
