import './globals.css';
import './favicon.ico'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>Adventure Tours</title>
         <link rel="icon" href="./favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  )
  
}