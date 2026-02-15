import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'StoreFlow',
  description: 'E-commerce storefront with gifting and packaging workflows'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
