
import SignUpClient from './signup.client'
import { redirect } from 'next/navigation'
import { getServerSession } from '@/lib/action/get-session'

async function SignUp() {

  const session = await getServerSession();
  const user = session?.user;
  
    if(user){
      redirect("/")
    }
  return (
    <SignUpClient />
  )
}

export default SignUp