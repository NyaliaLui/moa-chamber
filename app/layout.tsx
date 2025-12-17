import './globals.css';
import Footer from '@app/components/Layout/Footer';
import Header from '@app/components/Layout/Header';
import { ICO_IMAGE } from '@app/constants';

/**
 * Using force dynamic so changes in business assets (e.g. services) are immediately reflected.
 * If you prefer having it reflected only after redeploy (not recommended) please remove it
 * **/
export const revalidate = 0;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Promoting economic growth and a progressive community</title>
        <meta
          name="description"
          content="Promoting economic growth and a progressive community"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href={ICO_IMAGE.outline.light} />
      </head>
      <body>
        {process.env.NEXT_PUBLIC_WIX_CLIENT_ID ? (
          <>
            <Header />
            <main className="min-h-150">{children}</main>
            <Footer />
          </>
        ) : (
          <div className="min-h-150 max-w-5xl mx-auto p-5">
            Page not available. Please add an environment variable called
            NEXT_PUBLIC_WIX_CLIENT_ID, containing the client ID, to your
            deployment provider.
          </div>
        )}
      </body>
    </html>
  );
}
