import { Suspense } from 'react';
import './globals.css';
import Footer from '@app/components/Layout/Footer';
import Header from '@app/components/Layout/Header';
import { ICO_IMAGE } from '@app/constants';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Chamber of Commerce - Meriden/Ozawkie Area</title>
        <meta
          name="description"
          content="Chamber of Commerce - Meriden/Ozawkie Area"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={ICO_IMAGE.outline.light} />
      </head>
      <body>
        {/* Header is in a Suspense boundary because it accesses
            dynamic/uncached data like the pathname. */}
        {process.env.NEXT_PUBLIC_WIX_CLIENT_ID ? (
          <>
            <Suspense>
              <Header />
            </Suspense>
            <main className="min-h-150">{children}</main>
            <Footer />
          </>
        ) : (
          <section className="w-full h-dvh flex items-center justify-center bg-[#1a56db]">
            <div className="container mx-auto text-center">
              <h1 className="text-4xl font-bold text-white mb-4">
                Something went wrong
              </h1>
              <p className="text-lg text-white mb-6">
                There was a problem connecting to Wix
              </p>
            </div>
          </section>
        )}
      </body>
    </html>
  );
}
