import Image from "next/image"
import { Brand } from "@/components/brand"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import Link from "next/link"

/**
 * Login Page
 * @returns The login page component.
 */
export default async function Login() {
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
              <Label>Password</Label>
              <Input type="password" placeholder="Password" />
            </div>
            {/* Check box and forget password */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1.5">
                <Checkbox id="remember-me" />
                <Label> Remember me</Label>
              </div>
              <div>
                <Link href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Forget password?
                </Link>
              </div>
            </div>
          </div>
          {/* Button */}
          <div className="grid w-full max-w-sm items-center gap-4 m-5">
            <Button type="submit">Login</Button>
            <Button type="submit" variant="secondary">Login with Google</Button>
          </div>
          {/* Sign up */}
          <div className="flex items-center gap-1.5 mt-20">
            <p className="text-sm font-normal leading-none">Don't have an account?</p>
            <Link href="/auth/register" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Sign up
            </Link>
          </div>
        </div>
        <div className="m-10">
          <div className="rounded-[20px] overflow-hidden">
            <Image src='/assets/images/login-img.jpg' alt='' width={1000} height={954}/>
          </div>
        </div>
      </div>
    </div>
  );
}
