import { Link } from "react-router-dom";
import Container from "./Container";
import Navigation from "./Navigation";

export default function Header() {
  return (
    <header className="fixed w-full">
      <Container>
        <div className="flex items-center justify-between py-6">
          <h2 className="text-4xl uppercase font-black text-c-200">
            <Link to="/">Mbrs.</Link>
          </h2>
          <Navigation />
        </div>
      </Container>
    </header>
  );
}
