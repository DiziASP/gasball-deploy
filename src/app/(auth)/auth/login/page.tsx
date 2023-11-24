'use client';
import { Brand } from "@/components/brand"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import Link from "next/link"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

/**
 * Login Page
 * @returns The login page component.
*/

async function getSelf() {
  try {
    const apiUrl = `/api/auth/self`;
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const res = await response.json();
    if (res.status == 'error') {
      return false;
    } else {
      return true;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
}

export default function Login() {
  const router = useRouter();

  useEffect(() => {
    async function checkLoginStatus() {
      try {
        if (await getSelf()) {
          router.push('/');
        }
      } catch (error) {
        console.error('Error checking login status: ', error);
      }
    }

    checkLoginStatus();
  }, []);

  const [user, setUser] = useState({
    email: "",
    password: "",
  })
  const [failmsg, setFailmsg] = useState("Gagal masuk, coba periksa kembali email dan password Anda!")
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);

  
  return (
    <div className="flex w-full px-40 py-20 items-center justify-center">
      <div className="flex flex-wrap-reverse rounded-[40px] flex-row items-center justify-center bg-white h-full overflow-hidden">
        <div className="flex flex-col py-20 px-40 items-center justify-center w-full max-w-[625px]">
          {/* Brand */}
          <Brand />
          <h4 className="text-center">Kick Off Your Fun with Us!</h4>
          <div className="grid w-full max-w-sm items-center gap-4 m-10 py-10">
            {/* Form */}
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label>Email</Label>
              <Input 
                id="email"
                type="email" 
                placeholder="Email"
                value={user.email}
                onChange={(e) => setUser({...user, email: e.target.value})} 
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label>Password</Label>
              <Input 
                type="password" 
                placeholder="Password" 
                value={user.password}
                onChange={(e) => setUser({...user, password: e.target.value})}
              />
            </div>
            {/* Check box and forget password */}
            <div className="flex justify-between items-center">
              <div></div>
              <div>
                <Link href="https://wa.me/6281232461738?text=Halo%20gann%20pacar%20bagas%2C%20password%20saya%20lupa%20gmn%20yh%20gan" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Forget password?
                </Link>
              </div>
            </div>
          </div>
          {failed ? <div className="rounded-[5px] px-5 py-2 bg-red-100 w-full">
            <Label className="text-red-800">{failmsg}</Label>
          </div> : <></>}
          {/* Button */}
          <div className="grid w-full max-w-sm items-center gap-4 m-5">
            <Button type="submit" onClick={async () => {
              try {
                setLoading(true);
                setFailed(false);
                const res = await fetch("/api/auth/login", {
                  method: "POST",
                  body: JSON.stringify(user),
                  headers: {
                    "Content-Type": "application/json",
                  }
                });
                
                if (res.ok) {
                  router.push("/");
                } else {
                  setLoading(false);
                  setFailmsg("Gagal masuk, coba periksa kembali email dan password Anda!");
                  setFailed(true)
                }
              } catch (error) {
                console.error('Error: ', error);
                setLoading(false)
                setFailmsg("Sistem sedang error! Coba beberapa saat lagi");
                setFailed(true)
              }
            }}>{loading ? "Loading" : "Login"}</Button>
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
