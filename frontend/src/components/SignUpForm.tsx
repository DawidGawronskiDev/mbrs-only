import { Form, useActionData } from "react-router-dom";
import Input from "./Input";

export default function SignUpForm() {
  const errors = useActionData();

  return (
    <Form
      method="post"
      className="w-11/12 max-w-xl flex flex-col gap-6 mx-auto"
    >
      <Input
        label="Username"
        name="username"
        type="text"
        placeholder="John Doe"
      />
      <Input
        label="Email"
        name="email"
        type="email"
        placeholder="johndoe@gmail.com"
      />
      <Input label="Password" name="password" type="password" />
      <button
        type="submit"
        className="bg-c-300 w-full grid place-content-center text-c-200 uppercase font-black border-4 border-c-200 h-12"
      >
        Sign Up
      </button>
    </Form>
  );
}

export const action = async ({ params, request }) => {
  const formData = await request.formData();

  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
  };

  console.log(data);

  const response = await fetch("http://localhost:3002/auth/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    return response;
  }

  return null;
};
