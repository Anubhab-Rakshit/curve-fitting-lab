import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title:'Curve Fitting Lab',
  description:'A web application for curve fitting and data analysis',
  icons:{
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
