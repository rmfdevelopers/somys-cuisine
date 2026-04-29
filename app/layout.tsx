import { Cormorant_Garamond, Inter } from 'next/font/google';
import './globals.css';

const heading = Cormorant_Garamond({ 
  subsets: ['latin'], 
  variable: '--font-heading',
  weight: ['300', '400', '500', '600', '700']
});

const body = Inter({ 
  subsets: ['latin'], 
  variable: '--font-body',
  weight: ['300', '400', '500', '600', '700']
});

export const metadata = {
  title: "Somy’s Cuisine | The Art of Gourmet Grazing",
  description: "Bespoke event catering and luxury food trays in Lagos, Nigeria.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${heading.variable} ${body.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}