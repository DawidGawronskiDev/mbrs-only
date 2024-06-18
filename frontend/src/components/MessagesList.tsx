interface Message {
  id: number;
  name: string;
  message: string;
}

const dummyMessages = [
  {
    id: 1,
    name: "Alice",
    message: "Hello, how are you?",
  },
  {
    id: 2,
    name: "Bob",
    message: "I'm good, thanks! How about you?",
  },
  {
    id: 3,
    name: "Alice",
    message: "I'm doing well, thank you!",
  },
];

export default function MessagesList() {
  const messages: Message[] = dummyMessages;

  return (
    <ul className="grid md:grid-cols-2 gap-8">
      {messages.length &&
        messages.map((message) => <Item key={message.id} message={message} />)}
    </ul>
  );
}

function Item({
  message,
}: {
  message: { id: number; name: string; message: string };
}) {
  return (
    <li className="bg-c-300">
      <div className="relative p-4 border border-c-200 h-full">
        <div className="absolute w-full h-full bg-c-200 top-0 left-0 -rotate-2 -z-10"></div>
        <h4 className="text-2xl font-black">{message.name}</h4>
        <p>{message.message}</p>
      </div>
    </li>
  );
}
