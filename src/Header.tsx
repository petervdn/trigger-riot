import Link from "next/link";

export function Header() {
  return (
    <>
      <h1>Trigger riot</h1>

      <Link href={"/main"}>Main</Link>
      <Link href={"/settings"}>Settings</Link>
    </>
  );
}
