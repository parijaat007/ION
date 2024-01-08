import Image from 'next/image'
import "@/app/globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";

export default function Home() {
  return (
    <div>
      <a href="/api/auth/login">Login</a>
      <a href="/api/auth/logout">Logout</a>
    </div>
  );
}
