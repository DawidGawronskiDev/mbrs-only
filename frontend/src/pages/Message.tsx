import { Form, redirect, useLoaderData } from "react-router-dom";
import SubmitButton from "../components/SubmitButton";
import { getAuthToken } from "../util/auth";
import Wrapper from "../components/Wrapper";
import Container from "../components/Container";
import IconShine from "../ui/icons/IconShine";

export default function MessagePage() {
  const data = useLoaderData();

  console.log(data);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start">
      <div className="my-16">
        <Container>
          <div className="flex items-center justify-center my-16">
            <div className="relative">
              <div className="absolute -z-10 w-[48px] sm:w-[64px] md:w-[128px] top-0 left-0 translate-x-[225px] sm:translate-x-[300px] md:translate-x-[600px] -translate-y-[4px] sm:-translate-y-[5px] md:-translate-y-[10px]">
                <div className="animate-levitate">
                  <IconShine />
                </div>
              </div>
              <h3 className="text-[96px] sm:text-[128px] md:text-[256px] uppercase font-black leading-none text-c-200">
                Msgs
              </h3>
            </div>
          </div>
        </Container>
        <Wrapper>
          <Form method="post">
            <textarea
              name="message"
              id="message"
              className="w-full h-32 resize-none p-2 font-black"
            ></textarea>
            <SubmitButton>Send Message</SubmitButton>
          </Form>
        </Wrapper>
      </div>
    </div>
  );
}

export const action = async ({ request }) => {
  const token = getAuthToken();
  const formData = await request.formData();
  const message = formData.get("message");

  const response = await fetch("http://localhost:3002/messages", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    return response;
  }

  return redirect("/messages");
};
