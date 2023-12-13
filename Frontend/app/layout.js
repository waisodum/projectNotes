import '../Styles/globals.css'


export const metadata = {
  title: 'Campus Chronicle',
  description: '...',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning >{children}</body>
    </html>
  )
}
