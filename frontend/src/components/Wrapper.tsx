import { ReactNode } from "react";

export default function Wrapper({ children }: { children: ReactNode }) {
  return <div className="w-11/12 max-w-xl mx-auto">{children}</div>;
}
