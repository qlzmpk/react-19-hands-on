"use client";

import { action } from "./action";
import Button from "./Button";

export default function ClientComponent() {
  return <Button onClick={() => action(1, "")}>Client Component</Button>;
}
