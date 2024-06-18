import { Fragment } from "react/jsx-runtime";
import Container from "../components/Container";
import IconShine from "../ui/icons/IconShine";
import MessagesList from "../components/MessagesList";

export default function MessagesPage() {
  return (
    <Fragment>
      <div className="flex items-start">
        <Container>
          <div className="flex items-center justify-center mt-16">
            <div className="relative">
              <div className="absolute w-[48px] sm:w-[64px] md:w-[128px] top-0 left-0 translate-x-[225px] sm:translate-x-[300px] md:translate-x-[600px] -translate-y-[4px] sm:-translate-y-[5px] md:-translate-y-[10px]">
                <IconShine />
              </div>
              <h3 className="text-[96px] sm:text-[128px] md:text-[256px] uppercase font-black leading-none text-c-200">
                Msgs
              </h3>
            </div>
          </div>
        </Container>
      </div>
      <Container>
        <MessagesList />
      </Container>
    </Fragment>
  );
}
