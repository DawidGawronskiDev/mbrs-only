import Container from "../components/Container";
import SignUpForm from "../components/SignUpForm";
import IconShine from "../ui/icons/IconShine";

export default function SignUp() {
  return (
    <div className="min-h-screen flex flex-col gap-24 items-center justify-start pt-16">
      <Container>
        <div className="flex items-center justify-center mt-16">
          <div className="relative">
            <div className="absolute -z-10 w-[24px] sm:w-[48px] md:w-[64px] lg:w-[128px] top-0 left-0 translate-x-[166px] sm:translate-x-[243px] md:translate-x-[324px] lg:translate-x-[645px] -translate-y-[10px] sm:-translate-y-[20px] md:-translate-y-[25px] lg:-translate-y-[50px]">
              <div className="animate-levitate">
                <IconShine />
              </div>
            </div>
            <h3 className="text-[64px] sm:text-[96px] md:text-[128px] lg:text-[253px] uppercase font-black leading-none text-c-200">
              Sign Up
            </h3>
          </div>
        </div>
      </Container>
      <SignUpForm />
    </div>
  );
}
