import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'United Contractors Organisation (UCO)',
  description: 'The Collective Voice of the Construction & Infrastructure Industry. A premier, pan-India professional body representing contractors, infrastructure developers, consultants and allied professionals.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
