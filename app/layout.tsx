import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './theme-config.css'
import './globals.css'
import '@radix-ui/themes/styles.css';
import { Container, Theme, ThemePanel } from '@radix-ui/themes';
import NavBar from './NavBar'
import AuthProvider from './auth/Provider';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Issue Tracker',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <AuthProvider>
          <Theme appearance="light" accentColor="violet">
            <NavBar />
            <main className='p-4'>
              <Container>
                {children}
              </Container>
            </main>
            {/* <ThemePanel /> */}
          </Theme>
        </AuthProvider>
      </body>
    </html>
  )
}
