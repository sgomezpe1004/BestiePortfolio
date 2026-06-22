import { SignIn } from "@clerk/clerk-react"

const Login = () => {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SignIn forceRedirectUrl="/" />
    </div>
  )
}

export default Login