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
    <div className="flex w-full px-40 py-20 items-center justify-center">
      <div className="flex flex-wrap-reverse rounded-[40px] flex-row items-center justify-center bg-white h-full overflow-hidden">
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
        <div className="grow rounded-[20px] max-w-[800px] m-10 overflow-hidden">
          <img className="w-full h-full object-cover" src='/assets/images/login-img.jpg' alt=''/>
        </div>
      </div>
    </div>
  );
}
