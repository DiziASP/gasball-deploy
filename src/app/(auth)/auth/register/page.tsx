import Image from "next/image"
import { Brand } from "@/components/brand"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import Link from "next/link"

/**
 * Register Page
 * @returns The register page component.
 */
export default async function Register(formData: any) {
  return (
    <div className="flex w-full px-40 py-20 items-center justify-center">
      <div className="flex flex-wrap-reverse rounded-[40px] flex-row items-center justify-center bg-white h-full w-full overflow-hidden">
        <div className="flex flex-col py-20 px-40 items-center justify-center w-full max-w-[625px]">
          {/* Brand */}
          <Brand />
          <h4>Kick Off Your Fun with Us!</h4>
          <div className="grid w-full max-w-sm items-center gap-4 m-10">
            {/* Form */}
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label>Email</Label>
              <Input type="email" placeholder="Email" />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label>Full Name</Label>
              <Input type="text" placeholder="Full Name" />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label>Phone Number</Label>
              <Input type="tel" placeholder="Phone Number" />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label>Password</Label>
              <Input type="password" placeholder="Password" />
            </div>
          </div>
          {/* Button */}
          <div className="grid w-full max-w-sm items-center gap-4 m-5">
            <Button type="submit">Sign Up</Button>
            <Button type="submit" variant="secondary">Sign Up with Google</Button>
          </div>
          {/* Back */}
          <div className="flex items-center gap-1.5 mt-20">
            <Link href="/auth/login" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              &lt; Go Back
            </Link>
          </div>
        </div>    
        <div className="grow rounded-[20px] max-w-[800px] m-10 overflow-hidden">
          <img className="w-full h-full object-cover" src='/assets/images/register-img.jpg' alt=''/>
        </div>
      </div>
    </div>
  );
}