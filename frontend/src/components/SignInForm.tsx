import { Form, redirect, useActionData } from "react-router-dom";
import Input from "./Input";
import { useEffect, useState } from "react";

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

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (data) {
      setIsSubmitting(false);
    }
  }, [data]);

  return (
    <Form
      method="post"
      onSubmit={() => setIsSubmitting(true)}
      className="w-11/12 max-w-xl flex flex-col gap-6 mx-auto"
    >
      <Input
        label="Username"
        name="username"
        type="text"
        placeholder="John Doe"
      />

      <Input label="Password" name="password" type="password" />

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-c-300 w-full grid place-content-center text-c-200 uppercase font-black border-4 border-c-200 h-12"
      >
        Sign In
      </button>
      <ul className="text-red-500 text-center font-black">
        {data &&
          data.errors.map((error) => <li key={error.msg}>{error.msg}</li>)}
      </ul>
    </Form>
  );
}

export const action = async ({ params, request }) => {
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

  return redirect("/messages");
};
