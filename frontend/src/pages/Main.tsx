import Container from "../components/Container";
import IconShine from "../ui/icons/IconShine";
import IconStar from "../ui/icons/IconStar";

export default function MainPage() {
  return (
    <div className="min-h-screen overflow-hidden">
      <div className="h-screen flex items-center">
        <Container>
          <div className="relative">
            <div className="absolute aspect-square w-[786px] sm:w-[1048px] md:w-[2048px] -z-10 top-0 left-0 -translate-x-[360px] sm:-translate-x-[480px] md:-translate-x-[940px] -translate-y-[288px] sm:-translate-y-[384px] md:-translate-y-[744px]">
              <IconStar />
            </div>
            <div className="absolute w-[48] sm:w-[64px] md:w-[128px] top-0 left-0 translate-x-[225px] sm:translate-x-[300px] md:translate-x-[600px] translate-y-[1px] sm:-translate-y-[7.5px] md:-translate-y-[11px]">
              <IconShine />
            </div>
            <h1 className="text-[96px] sm:text-[128px] md:text-[256px] uppercase font-black max-w-min leading-none text-c-200">
              Mbrs <span className="opacity-0">o</span>nly
            </h1>
          </div>
        </Container>
        <p className="absolute left-1/2 leading-none -translate-x-1/2 text-[64px] sm:text-[128px] xl:text-[256px] font-black w-full text-center text-c-200 bottom-12">
          ... .... .... ....
        </p>
      </div>
    </div>
  );
}
