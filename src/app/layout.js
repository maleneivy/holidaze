import './globals.css';
import Navbar from '@/components/Navbar/Navbar';
import { AuthProvider } from './lib/authProvider';

export const metadata = {
  title: 'Holidaze - Book your next vacay',
  description: 'An accommodation booking site',
};

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <html lang="en" style={{ width: '100%', overflowX: 'hidden' }}>
        <head>
          <link rel="stylesheet" href="https://use.typekit.net/uwn0qvz.css" />
        </head>
        <body className="overflow-x-hidden">
          <Navbar />
          {children}
        </body>
      </html>
    </AuthProvider>
  );
}
