import './globals.css'
import 'bootstrap/dist/css/bootstrap.css';
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Proof App',
  description: 'Manage your Projects, Tasks, and Time.',
}

export default function RootLayout({ children }) {

  

  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
