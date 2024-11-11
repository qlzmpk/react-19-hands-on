"use server";

export async function action(...args: [number, string]): Promise<string> {
  console.log(args);
  console.log("Server Action");

  return "Return from server. (action.ts)";
}
