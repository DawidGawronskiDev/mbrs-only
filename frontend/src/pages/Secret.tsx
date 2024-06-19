import { Form, redirect, useActionData } from "react-router-dom";
import SubmitButton from "../components/SubmitButton";
import Wrapper from "../components/Wrapper";
import Input from "../components/Input";
import { Data } from "../components/SignInForm";
import { getAuthToken } from "../util/auth";

export default function SecretPage() {
  const data = useActionData() as Data;

  return (
    <div className="min-h-screen flex flex-col gap-4 items-center justify-center">
      <Wrapper>
        <Form method="post" className="grid gap-8">
          <Input label="Secret key" name="key" placeholder="key" />
          <SubmitButton>Become a member</SubmitButton>
        </Form>
      </Wrapper>
      <ul className="text-red-500 text-center font-black">
        {data &&
          Array.isArray(data.errors) &&
          data.errors.map((error) => <li key={error.msg}>{error.msg}</li>)}
      </ul>
    </div>
  );
}

export const action = async ({ params, request }) => {
  const formData = await request.formData();

  const data = {
    key: formData.get("key"),
  };

  const token = getAuthToken();

  const response = await fetch("http://localhost:3002/secret", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    return response;
  }

  return redirect("/messages");
};
