import { Fragment } from "react/jsx-runtime";
import Container from "../components/Container";
import IconShine from "../ui/icons/IconShine";
import MessagesList from "../components/MessagesList";
import { useLoaderData } from "react-router-dom";
import { getAuthToken } from "../util/auth";

export interface IMessage {
  _id: string;
  content: string;
  author?: string;
}

export async function loader() {
  const token = getAuthToken();
  const response = await fetch("http://localhost:3002/messages", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  console.log(response);

  if (!response.ok) {
    throw new Error("Failed to fetch messages");
  }

  const data = await response.json();

  return data.messages;
}

export default function MessagesPage() {
  const messages = useLoaderData() as IMessage[];

  console.log(messages);

  return (
    <Fragment>
      <div className="flex items-start mt-8">
        <Container>
          <div className="flex items-center justify-center mt-16">
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
      </div>
      <Container>
        <MessagesList messages={messages} />
      </Container>
    </Fragment>
  );
}
