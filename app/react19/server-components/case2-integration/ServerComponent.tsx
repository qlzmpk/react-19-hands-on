import fs from "node:fs/promises";

export default async function ServerComponent() {
  const file = await fs.readFile("LICENSE", "utf-8");

  return (
    <div>
      <p>Server Component</p>
    </div>
  );
}
