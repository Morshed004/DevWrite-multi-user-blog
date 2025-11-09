import Header from './homeComponent/Header'
import { getServerSession } from '@/lib/action/get-session';

export default async function Navbar() {

    const session = await getServerSession()
    const user = session?.user;

    return (
        <Header user={user || null} />
    )
}
