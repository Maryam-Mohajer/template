'use client'

import { OrderContextProvider } from "@/core/context/OrderContext";
import "../styles/globals.css";
import type { Metadata } from "next";
import Providers from "@/components/Providers/Providers";
import { AuthenticationContextProvider } from "@/core/context/AuthenticationContext";

// ** Emotion Imports
import createCache from '@emotion/cache'
import { CacheProvider } from '@emotion/react'

// ** RTL Plugin
import stylisRTLPlugin from 'stylis-plugin-rtl'

const styleCache = () =>
  createCache({
    key: 'rtl',
    prepend: true,
    stylisPlugins: [stylisRTLPlugin]
  })

// export const metadata: Metadata = {
//   title: "Cafe Soo",
//   description: "CafeSoo",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CacheProvider value={styleCache()}>
      <Providers>
        <html dir="rtl">
          <body>
            <AuthenticationContextProvider>
              <OrderContextProvider>
                {children}
              </OrderContextProvider>
            </AuthenticationContextProvider>
          </body>
        </html>
      </Providers>
    </CacheProvider>
  );
}
