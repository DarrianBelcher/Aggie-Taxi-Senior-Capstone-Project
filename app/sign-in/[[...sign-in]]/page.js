//Sign in page for logging in to the website using gmail, Microsoft, or Facebook Accounts. The sign in was created using a Clerk Dashboard
// @clerk/nextjs
import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
    return ( 
  
    <>
    <div>
        <Image src='/TaxiBanner.png' width={900} height={1000} 
        className ="object-contain h-full w-full"/>
        <div className="absolute top-20 right-0">
           
        <SignIn />
        </div>

   
    </div>
    </>
    );
}