import type { Metadata } from "next";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "DAEHO | Home",
  description: "DAEHO championship ring brand campaign home page"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var t=localStorage.getItem('daeho-theme');if(location.pathname==='/day')t='day';if(t!=='day'&&t!=='night')t='night';document.documentElement.dataset.siteTheme=t;document.documentElement.classList.add(t==='day'?'site-theme-day':'site-theme-night');history.scrollRestoration='manual';window.scrollTo(0,0);var h=location.pathname==='/'||location.pathname==='/day';var p=false;try{p=sessionStorage.getItem('daeho-opening-played')==='true'}catch(e){}if(h){if(p){document.documentElement.classList.add('is-opening-skipped')}else{document.documentElement.classList.add('is-opening-locked')}}}catch(e){}"
          }}
        />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
