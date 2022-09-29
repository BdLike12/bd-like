import { useUser } from "@auth0/nextjs-auth0"
import Link from "next/link";


export default function Home() {
  const { user, isLoading } = useUser();

  if (isLoading) {
    return (
      <div>
        <p>loading . . .</p>
      </div>
    )
  }

  else if (user) {
    return (
      <div>
        <p>{JSON.stringify(user)}</p>
        <div>
          <Link href="/api/auth/logout">Logout</Link>
        </div>
      </div>
    )
  }

  else return (
    <div>
      <Link href="/api/auth/login">Login</Link>
    </div>
  )
}
