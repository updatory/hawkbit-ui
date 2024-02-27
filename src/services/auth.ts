export interface UserInfo {
  username: string
  tenant: string
}

// authenticate returns the user info if the user is authenticated, otherwise it returns null.
export async function authenticate(): Promise<UserInfo | null> {
  const response = await fetch('/rest/v1/userinfo')

  if (response.status !== 200) {
    return null
  }

  return response.json()
}