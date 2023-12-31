import Provider from '@/components/my/Provider'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from "@/components/theme-provider"
import MenuNavigation from '@/components/my/MenuNavigation'
import { MobileNavigation } from '@/components/my/MobileNavigation'
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AllanDev Blog | DevFull',
  description: 'Bem-vindo ao AllanDev Blog, onde você encontrará artigos e tutoriais sobre programação, desenvolvimento de software e muito mais.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Provider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className='container'>
              <nav className='sm:hidden my-10'><MobileNavigation /></nav>
              <nav className='hidden sm:block my-10'><MenuNavigation /></nav>
              {children}
            </div>
          </ThemeProvider>
        </Provider>
        <Analytics />
      </body>
    </html>
  )
}
