import Button from "./Button";

export default function ServerComponent() {
  async function action(): Promise<string> {
    "use server";
    console.log("Server Action");

    return "Return from server. (ServerComponent.tsx)";
  }

  return <Button onClick={action}>Server Component</Button>;
}
