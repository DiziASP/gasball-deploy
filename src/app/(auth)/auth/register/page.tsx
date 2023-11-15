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
    <div className="mx-40 my-20 rounded-[40px] overflow-hidden">
      <div className="flex flex-row items-center justify-center bg-white">
        <div className="flex flex-col items-center justify-center w-full">
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
        <div className="m-10">
          <div className="rounded-[20px] overflow-hidden">
            <Image src='/assets/images/register-img.jpg' alt='' width={1000} height={954}/>
          </div>
        </div>
      </div>
    </div>
  );
}