import { Fragment } from "react/jsx-runtime";
import Container from "../components/Container";
import IconShine from "../ui/icons/IconShine";
import MessagesList from "../components/MessagesList";
import { Await, Link, useLoaderData } from "react-router-dom";
import { Suspense } from "react";

export interface IMessage {
  _id: string;
  content: string;
  author: {
    _id: string;
    username: string;
  };
}

export default function MessagesPage() {
  const { messages } = useLoaderData() as { messages: IMessage[] };

  return (
    <Fragment>
      <div className="flex items-start mt-8">
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
              <Link to={"/message"}>
                <button className="absolute bg-c-200 border border-c-100 px-1 md:px-2 lg:px-4 py-0.5 md:py-1 lg:py-2 rounded-full font-black uppercase md:text-2xl lg:text-2xl bottom-0 right-0 -rotate-12">
                  Write a message
                </button>
              </Link>
            </div>
          </div>
        </Container>
      </div>
      <Container>
        <Suspense
          fallback={
            <p className="text-white text-4xl uppercase font-bold text-center animate-pulse">
              Loading...
            </p>
          }
        >
          <Await resolve={messages}>
            {(resolvedMessages) => <MessagesList messages={resolvedMessages} />}
          </Await>
        </Suspense>
      </Container>
    </Fragment>
  );
}
