import { Suspense } from 'react'
import PostManagement from './components/PostManagement'
import PostManagementLoading from './components/PostManagementLoading'
import { redirect } from 'next/navigation';
import { getServerSession } from '@/lib/action/get-session';
import AdminNavbar from '../../components/AdminNavbar';

export default async function PostManagementPage() {
  const session = await getServerSession();
  if (!session) redirect("/signin")
  const isAdmin = session.user.isAdmin;

  if (!isAdmin) redirect("/")
  return (
    <>
      {/* Navbar components */}
      <AdminNavbar />
      
      <Suspense fallback={<PostManagementLoading />}>
        <PostManagement />
      </Suspense>
    </>
  )
}
