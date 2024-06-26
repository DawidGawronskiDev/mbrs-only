import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "../pages/Root";
import MainPage from "../pages/Main";
import MessagesPage from "../pages/Messages";
import SignUp from "../pages/SignUp";
import { action as signUpAction } from "./SignUpForm";
import SignIn from "../pages/SignIn";
import { action as SignInAction } from "./SignInForm";
import { loader as messagesLoader } from "../loaders/messagesLoader";
import { action as logoutAction } from "../pages/Logout";
import { checkAuthLoader, tokenLoader } from "../util/auth";
import SecretPage, { action as secretAction } from "../pages/Secret";
import MessagePage, { action as messageAction } from "../pages/Message";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    id: "root",
    loader: tokenLoader,
    children: [
      {
        path: "",
        index: true,
        element: <MainPage />,
      },
      {
        path: "messages",
        element: <MessagesPage />,
        loader: messagesLoader,
      },
      {
        path: "message",
        element: <MessagePage />,
        action: messageAction,
      },
      {
        path: "signup",
        element: <SignUp />,
        action: signUpAction,
        loader: checkAuthLoader,
      },
      {
        path: "signin",
        element: <SignIn />,
        action: SignInAction,
        loader: checkAuthLoader,
      },
      {
        path: "logout",
        action: logoutAction,
      },
      {
        path: "secret",
        element: <SecretPage />,
        action: secretAction,
      },
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
