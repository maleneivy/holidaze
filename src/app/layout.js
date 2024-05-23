import './globals.css';
import Navbar from '@/components/Navbar/Navbar';
import { AuthProvider } from './lib/authProvider';

export const metadata = {
  title: {
    template: '%s | Holidaze',
    default: 'Holidaze',
  },
  description: 'Book your next vacation here',
};

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <html lang="en" style={{ width: '100%', overflowX: 'hidden' }}>
        <body className="overflow-x-hidden">
          <Navbar />
          {children}
        </body>
      </html>
    </AuthProvider>
  );
}
