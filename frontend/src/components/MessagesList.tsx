import { IMessage } from "../pages/Messages";

export default function MessagesList({ messages }: { messages: IMessage[] }) {
  console.log(messages);
  return (
    <ul className="grid md:grid-cols-2 gap-8">
      {messages &&
        messages.map((message) => <Item key={message._id} message={message} />)}
    </ul>
  );
}

function Item({ message }: { message: IMessage }) {
  return (
    <li className="bg-c-200">
      <div className="relative p-4 border border-c-100 h-full">
        <div className="absolute w-full h-full bg-c-300 top-0 left-0 -rotate-2 -z-10"></div>
        <h4 className="text-2xl font-black">{message.author!.username}</h4>
        <p>{message.content}</p>
      </div>
    </li>
  );
}
