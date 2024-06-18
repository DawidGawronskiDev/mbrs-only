import Container from "../components/Container";
import IconShine from "../ui/icons/IconShine";
import IconStar from "../ui/icons/IconStar";

export default function MainPage() {
  return (
    <div className="min-h-screen overflow-hidden">
      <div className="h-screen flex items-center">
        <Container>
          <div className="relative">
            <div className="absolute aspect-square w-[2048px] -z-10 top-0 left-0 -translate-x-[940px] -translate-y-[744px]">
              <IconStar />
            </div>
            <div className="absolute w-[128px] top-0 left-0 translate-x-[600px] -translate-y-[10px]">
              <IconShine />
            </div>
            <h1 className="text-[256px] uppercase font-black max-w-min leading-none text-c-200">
              Mbrs <span className="opacity-0">o</span>nly
            </h1>
          </div>
        </Container>
      </div>
    </div>
  );
}
