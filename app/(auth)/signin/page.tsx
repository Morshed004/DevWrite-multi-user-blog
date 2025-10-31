import SignInClient from './signin.client'
import { redirect } from 'next/navigation'
import { getServerSession } from '@/lib/action/get-session'

export default async function SignIn() {

  const session = await getServerSession()
  const user = session?.user;


  if(user){
    redirect("/")
  }
  return (
    <SignInClient />
  )
}
