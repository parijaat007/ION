import Image from 'next/image'
import "@/app/globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import Header from "@/components/Header";
import "@/components/AppRouter";
import Link from 'next/link';
import Footer from '@/components/Footer';


export default function Home() {
  return (
    <div>
    <main>
      <h1>Welcome to ION Inventory Management System</h1>
    </main>
      <Header/>
      <Footer/>

  </div>
  );
}
