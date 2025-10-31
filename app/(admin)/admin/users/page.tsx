import { Suspense } from 'react'
import UserManagement from './components/UserManagement'
import UserManagementLoading from './components/user-management-skeleton'
import { getServerSession } from '@/lib/action/get-session';
import { redirect } from 'next/navigation';

export default async function UserManagementPage() {
  const session = await getServerSession();
    if(!session) redirect("/signin")
    const isAdmin = session.user.isAdmin;
  
    if(!isAdmin) redirect("/")
  return (
    <Suspense fallback={<UserManagementLoading />}>
      <UserManagement />
    </Suspense>
  )
}
