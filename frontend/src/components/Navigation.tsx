import { Form, Link, useRouteLoaderData } from "react-router-dom";

export default function Navigation() {
  const token = useRouteLoaderData("root");

  return (
    <nav className="text-c-200">
      <ul className="flex items-center gap-8">
        {token ? (
          <>
            <li>
              <Form action="/logout" method="post">
                <button>Log Out</button>
              </Form>
            </li>
            <li>
              <Link to="/secret">Become a member</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/signin">Sign In</Link>
            </li>
            <li>
              <Link to="/signup">Sign Up</Link>
            </li>
          </>
        )}

        <li>
          <Link to="/messages">See Messages</Link>
        </li>
      </ul>
    </nav>
  );
}
