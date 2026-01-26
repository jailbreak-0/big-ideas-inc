
import type { Metadata } from 'next';
import './globals.css';
import { CartProvider } from '../context/CartContext';
import Header from '../components/Header';
import Footer from '../components/Footer';

export const metadata: Metadata = {
    title: 'Big Ideas Inc',
    description: 'Professional Audio Gear',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&display=swap" rel="stylesheet" />
                <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
            </head>
            <body className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display">
                <CartProvider>
                    <div className="min-h-screen flex flex-col">
                        <Header />
                        <main className="flex-1">
                            {children}
                        </main>
                        <Footer />
                    </div>
                </CartProvider>
            </body>
        </html>
    );
}
