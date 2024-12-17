import './globals.css';
import '../../public/logo.png';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>Adventure Tours</title>
         <link rel="icon" href="./logo.png" />
      </head>
      <body>{children}</body>
    </html>
  )
  
}