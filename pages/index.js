import { useUser } from "@auth0/nextjs-auth0"

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
          <a href="/api/auth/logout">Logout</a>
        </div>
      </div>
    )
  }

  else return (
    <div>
      <a href="/api/auth/login">Login</a>
    </div>
  )
}
