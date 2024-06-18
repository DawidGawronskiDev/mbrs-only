import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { Fragment } from "react/jsx-runtime";

export default function RootLayout() {
  return (
    <Fragment>
      <Header />

      <main>
        <Outlet />
      </main>
    </Fragment>
  );
}
