import { useEffect, useRef, useState } from "react"
import LoadingBar, { type LoadingBarRef } from "react-top-loading-bar"

import Logo from "../assets/icon.png"
import mountains from "../assets/login-bg.webp"
import AlertIcon from "../components/icons/alert-icon"
import GithubIcon from "../components/icons/github-icon"
import GoogleIcon from "../components/icons/google-icon"
import { Button } from "../components/ui/button"
import { Card } from "../components/ui/card"
import { Input } from "../components/ui/input"

export default function Login() {
  const [isValid, setIsValid] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const loadingBarRef = useRef<LoadingBarRef>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (chrome.storage.local.get("jwt-token")) {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.remove(tabs[0].id)
      })
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setIsValid(true)
    if (loadingBarRef.current) {
      loadingBarRef.current.continuousStart()
    }
    if (emailRef.current && passwordRef.current) {
      const email = emailRef.current.value
      const password = passwordRef.current.value
      try {
        const result = await fetch("https://vectra-api.issaminu.com/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email,
            password
          })
        })
        console.log("result", result)
        const token = result.headers.get("Authorization")
        console.log(token)
        chrome.storage.local.set({ "jwt-token": token })
      } catch (err: any) {
        setIsLoading(false)
        setIsValid(false)
        if (loadingBarRef.current) {
          loadingBarRef.current.complete()
        }
        console.error("error", err)
      }
    }
  }

  const signInWith = (strategy) => {
    // setIsLoading(true)
    // if (loadingBarRef.current) {
    //   loadingBarRef.current.continuousStart()
    // }
    // const redirectUrl = searchParams.get("redirect_url")
    // const redirectPathname = redirectUrl
    //   ? new URL(redirectUrl).pathname
    //   : "/buildings"
    // return signIn.authenticateWithRedirect({
    //   strategy,
    //   redirectUrl: "/sso-callback",
    //   redirectUrlComplete: redirectPathname
    // })
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen sm:px-6 lg:px-8">
      <img
        alt="Login background image"
        src={mountains}
        sizes="100vw"
        style={{
          zIndex: -1,
          objectFit: "cover"
        }}
      />
      <Card className="mx-auto py-12 px-12 w-[27rem]">
        <LoadingBar height={3} color="#06b6d4" ref={loadingBarRef} />
        <div className="mb-10 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="flex justify-center">
            <Logo />
          </div>
          <h2 className="mt-6 text-3xl font-bold text-center">Welcome!</h2>
          <p className="mt-2 text-sm text-center">
            Please sign in to your account
          </p>
        </div>
        <form className="space-y-4" onSubmit={(e) => handleSubmit(e)}>
          <div>
            <Input
              type="email"
              id="email"
              placeholder="Email"
              ref={emailRef}
              required
              autoFocus
              className={
                isValid
                  ? ""
                  : "border-2 border-red-600 focus:outline-red-600 focus-visible:ring-1 focus-visible:ring-red-300"
              }
            />
          </div>
          <div>
            <Input
              type="password"
              id="password"
              placeholder="Password"
              ref={passwordRef}
              minLength={8}
              maxLength={100}
              required
              className={
                isValid
                  ? ""
                  : "border-2 border-red-600 focus:outline-red-600 focus-visible:ring-1 focus-visible:ring-red-300"
              }
            />
          </div>
          {!isValid && (
            <div className="flex items-center">
              <AlertIcon />
              <span className="text-sm font-semibold text-red-600">
                Email or password is incorrect
              </span>
            </div>
          )}
          <div className="flex justify-between w-full gap-16">
            <div className="flex flex-col w-full gap-3">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 rounded-lg">
                <span className="w-full text-lg text-white">Continue</span>
              </Button>
            </div>
          </div>
        </form>
        <div className="flex flex-col w-full">
          <div className="mt-3 text-sm">
            Don&apos;t have an account? &nbsp;
            <a href="/signup">
              <Button
                disabled={isLoading}
                variant={"link"}
                className="py-0 pl-0">
                Sign up
              </Button>
            </a>
          </div>
          <div className="flex flex-row items-center justify-between mt-4 mb-4">
            <hr className="w-[40%]" /> <span className="text-sm">OR</span>
            <hr className="w-[40%]" />
          </div>
          <div className="space-y-4">
            <Button
              onClick={() => signInWith("oauth_google")}
              disabled={isLoading}
              variant="outline"
              className="w-full h-12 rounded-lg">
              <span className="flex items-center w-full justify-evenly">
                <GoogleIcon />
                <span className="h-full">Continue with Google</span>
                <span>{"  "}</span>
              </span>
            </Button>
            <Button
              onClick={() => signInWith("oauth_github")}
              disabled={isLoading}
              variant="outline"
              className="w-full h-12 rounded-lg">
              <span className="flex items-center w-full justify-evenly">
                <GithubIcon />
                <span className="h-full">Continue with Github</span>
                <span>{"  "}</span>
              </span>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
