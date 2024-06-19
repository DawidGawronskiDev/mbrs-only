import { Outlet, useLoaderData, useSubmit } from "react-router-dom";
import Header from "../components/Header";
import { Fragment } from "react/jsx-runtime";
import { useEffect } from "react";
import { getTokenDuration } from "../util/auth";

export default function RootLayout() {
  const token = useLoaderData();
  const submit = useSubmit();

  useEffect(() => {
    if (!token) {
      return;
    }

    if (token === "EXPIRED") {
      submit(null, { action: "/logout", method: "post" });
      return;
    }

    const tokenDuration = getTokenDuration();

    setTimeout(() => {
      submit(null, { action: "/logout", method: "post" });
    }, tokenDuration);
  }, [token, submit]);

  return (
    <Fragment>
      <Header />

      <main>
        <Outlet />
      </main>
    </Fragment>
  );
}
