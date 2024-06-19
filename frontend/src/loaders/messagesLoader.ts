import { defer } from "react-router-dom";
import { getAuthToken } from "../util/auth";

export async function loader() {
  const messages = fetch("http://localhost:3002/messages", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + getAuthToken(),
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch messages");
      }
      return response.json();
    })
    .then((messages) => messages.messages);

  return defer({ messages });
}
