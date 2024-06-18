import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "../pages/Root";
import MainPage from "../pages/Main";
import MessagesPage from "../pages/Messages";
import SignUp from "../pages/SignUp";
import { action as signUpAction } from "./SignUpForm";
import SignIn from "../pages/SignIn";
import { action as SignInAction } from "./SignInForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "",
        index: true,
        element: <MainPage />,
      },
      {
        path: "/messages",
        element: <MessagesPage />,
      },
      {
        path: "/signup",
        element: <SignUp />,
        action: signUpAction,
      },
      {
        path: "signin",
        element: <SignIn />,
        action: SignInAction,
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
