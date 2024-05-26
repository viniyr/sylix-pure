import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import React, { useReducer, useState } from "react"

export function LoginForm() {

  const [credentials, setCredentials] = useReducer(
    (prev: any, next: any) => {
      return { ...prev, ...next }
    },
    {
      username: "",
      password: ""
    }
  )

  const [pageStatus, setPageStatus] = useState({ status: "", message: "" })

  const logUserIn = async (e: React.FormEvent) => {

    e.preventDefault();
    setPageStatus({ status: "LOADING", message: "" })

    console.log(credentials)

    setTimeout(() => {
      setPageStatus({ status: "ERROR", message: "Please fill all the fields" })
    }, 1000)

    return true;
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Welcome back!</CardTitle>
        <CardDescription>
          Enter your email below to login to your account.
        </CardDescription>
        {pageStatus.status == "ERROR" && <h1 data-testid="error-message" className="text-center text-red-500 mt-2 font-medium">{pageStatus.message}</h1>}
      </CardHeader>
      <form onSubmit={logUserIn}>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input onChange={(e) => setCredentials({ username: e.target.value })} id="email" type="email" placeholder="m@example.com" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input onChange={(e) => setCredentials({ username: e.target.value })} id="password" type="password" />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full">Sign in</Button>
        </CardFooter>
      </form>
    </Card >
  )
}
