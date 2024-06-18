import clsx from "clsx";
import { ReactNode } from "react";
import { useNavigation } from "react-router-dom";

export default function SubmitButton({ children }: { children: ReactNode }) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <button
      type="submit"
      disabled={isSubmitting}
      className={clsx(
        "bg-c-300 w-full grid place-content-center text-c-200 uppercase font-black border-4 border-c-200 h-12",
        {
          "opacity-50": isSubmitting === true,
        }
      )}
    >
      {isSubmitting ? <p>Submitting...</p> : children}
    </button>
  );
}
