import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "../pages/Root";
import MainPage from "../pages/Main";
import MessagesPage from "../pages/Messages";

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
    ],
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
