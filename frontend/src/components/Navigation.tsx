import { Link } from "react-router-dom";

export default function Navigation() {
  return (
    <nav>
      <ul className="flex items-center gap-8">
        <li>
          <Link to="/">Sign In</Link>
        </li>
        <li>
          <Link to="/signup">Sign Up</Link>
        </li>
        <li>
          <Link to="/">Log Out</Link>
        </li>
        <li>
          <Link to="/messages">See Messages</Link>
        </li>
      </ul>
    </nav>
  );
}
