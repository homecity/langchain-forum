import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { Navbar } from '@/components/navbar'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'LangChain Forum RAG Dashboard',
  description: 'Support Engineer dashboard for LangChain forum analysis with RAG chatbot',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${jetbrainsMono.variable}`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          storageKey="langchain-theme"
        >
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
