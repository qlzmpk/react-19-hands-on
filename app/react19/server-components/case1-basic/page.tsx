import ClientComponent from "./ClientComponent";
import ServerComponent from "./ServerComponent";

export default function Page() {
  console.log("\nFirst Load.");

  return (
    <main>
      <h1>Page</h1>
      <ClientComponent />
      <ServerComponent />
    </main>
  );
}
