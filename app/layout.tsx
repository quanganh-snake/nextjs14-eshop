import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import { Header } from './components/header';
import { Footer } from './components/footer';
import { ClerkProvider } from '@clerk/nextjs';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loading-skeleton/dist/skeleton.css';
import 'animate.css';
import { CartProvider } from './context/CartContext';

const roboto = Roboto({ weight: ['400', '700'], subsets: ['latin'] });
export const metadata: Metadata = {
    title: 'EShop NextJS14',
    description: 'Generated by create next app',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <CartProvider>
                <html suppressHydrationWarning={true} lang="en">
                    <body suppressHydrationWarning={true} className={roboto.className}>
                        <Header />
                        <main className="py-10">{children}</main>
                        <Footer />
                        <ToastContainer position="top-center" autoClose={1500} />
                    </body>
                </html>
            </CartProvider>
        </ClerkProvider>
    );
}
