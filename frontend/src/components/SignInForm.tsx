import { Form, redirect, useActionData } from "react-router-dom";
import Input from "./Input";
import SubmitButton from "./SubmitButton";

type Data = {
  errors: Error[];
};

type Error = {
  location: string;
  msg: string;
  path: string;
  type: string;
  value: string;
};

export default function SignInForm() {
  const data = useActionData() as Data;

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

      <Input label="Password" name="password" type="password" />

      <SubmitButton>Sign In</SubmitButton>
      <ul className="text-red-500 text-center font-black">
        {data &&
          data.errors.map((error) => <li key={error.msg}>{error.msg}</li>)}
      </ul>
    </Form>
  );
}

export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();

  const data = {
    username: formData.get("username"),
    password: formData.get("password"),
  };

  console.log(data);

  const response = await fetch("http://localhost:3002/auth/signin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    return response;
  }

  const responseData = await response.json();

  localStorage.setItem("user", responseData.user);
  localStorage.setItem("token", responseData.token);

  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 24);

  localStorage.setItem("expiration", expiration.toISOString());

  return redirect("/messages");
};
