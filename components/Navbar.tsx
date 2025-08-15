
import { getSession, signOut } from "@/api/auth";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";

export default async function Navbar() {
  const user = await getSession();

  return (
    <div className="flex justify-between items-center">
      <nav>
        <ul className="flex space-x-4">
          <li>
            <Link href="/" className="text-blue-500 hover:underline">
              Home
            </Link>
          </li>
          {user && (
            <li>
              <Link href="/dashboard" className="text-blue-500 hover:underline">
                Dashboard
              </Link>
            </li>
          )}
        </ul>
      </nav>
      <nav>
        {!user ? (
          <ul className="flex space-x-4">
            <li>
              <Link href="/sign-in" className={buttonVariants()}>
                Sign In
              </Link>
            </li>
            <li>
              <Link href="/sign-up" className={buttonVariants()}>
                Sign Up
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="flex space-x-4">
            <li>
              <h4 style={{
                marginBottom: 0,
              }}>{user.name}</h4>
            </li>
            <li>
              <Button onClick={signOut}>
                Log Out
              </Button>
            </li>
          </ul>
        )}
      </nav>
    </div>
  );
}