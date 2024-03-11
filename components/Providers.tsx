import { SessionProvider } from 'next-auth/react'
import { auth } from '@/lib/auth'
import ClientProviders from './ClientProviders'
import {ThemeProvider} from "@/components/theme-provider";
import {Toaster} from "sonner";

export default async function Providers({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  return (
      <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
      >
          <Toaster richColors />
          <SessionProvider session={session}>
          <ClientProviders>{children}</ClientProviders>
        </SessionProvider>
      </ThemeProvider>

  )
}
