import { auth } from '@/lib/auth'
import Link from 'next/link'

const AdminLayout = async ({
  activeItem = 'dashboard',
  children,
}: {
  activeItem: string
  children: React.ReactNode
}) => {
  const session = await auth()
  if (!session || !session.user.isAdmin) {
    return (
      <div className="relative flex flex-grow p-4">
        <div>
          <h1 className="text-2xl">Unauthorized</h1>
          <p>Admin permission required</p>
        </div>
      </div>
    )
  }

  return (
    <div className="relative flex flex-grow p-3">
      <div className="w-full grid md:grid-cols-5">
        <div className="bg-primary-foreground rounded-md p-3">
          <ul className="flex flex-col gap-y-4">
            <li>
              <Link
                className={'dashboard' === activeItem ? 'text-orange-500' : ''}
                href="/admin/dashboard"
              >
                Головна
              </Link>
            </li>
            <li>
              <Link
                className={'orders' === activeItem ? 'text-orange-500' : ''}
                href="/admin/orders"
              >
                Замовлення
              </Link>
            </li>
            <li>
              <Link
                className={'products' === activeItem ? 'text-orange-500' : ''}
                href="/admin/products"
              >
                Товари
              </Link>
            </li>
            <li>
              <Link
                className={'users' === activeItem ? 'text-orange-500' : ''}
                href="/admin/users"
              >
                Користувачі
              </Link>
            </li>
          </ul>
        </div>
        <div className="md:col-span-4 px-4">{children} </div>
      </div>
    </div>
  )
}

export default AdminLayout
