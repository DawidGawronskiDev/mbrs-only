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
              <div className="absolute w-[128px] top-0 left-0 translate-x-[600px] -translate-y-[10px]">
                <IconShine />
              </div>
              <h3 className="text-[256px] uppercase font-black leading-none text-c-200">
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
