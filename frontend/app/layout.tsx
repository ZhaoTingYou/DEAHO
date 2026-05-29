import type { Metadata } from "next";
import { cookies } from "next/headers";
import { ThemeProvider, type SiteTheme } from "@/components/layout/ThemeProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "DAEHO | Home",
  description: "DAEHO championship ring brand campaign home page"
};

function getInitialTheme(): SiteTheme {
  return cookies().get("daeho-theme")?.value === "day" ? "day" : "night";
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialTheme = getInitialTheme();

  return (
    <html lang="ko">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var r=document.documentElement;var path=location.pathname;var t=null;try{t=localStorage.getItem('daeho-theme')}catch(e){}if(!t){var c=('; '+document.cookie).split('; daeho-theme=');if(c.length>1)t=c.pop().split(';').shift()}if(path==='/day')t='day';if(t!=='day'&&t!=='night')t='night';r.dataset.siteTheme=t;r.classList.add(t==='day'?'site-theme-day':'site-theme-night');var light=path==='/day'||((path==='/'||path==='/chronicle'||path==='/golf'||path.indexOf('/news')===0)&&t==='day')||(path.indexOf('/legacy/credibility')===0&&t==='day');r.classList.add(light?'page-tone-light':'page-tone-dark');history.scrollRestoration='manual';window.scrollTo(0,0);var h=path==='/'||path==='/day';var p=false;try{p=sessionStorage.getItem('daeho-opening-played')==='true'}catch(e){}if(h){if(p){r.classList.add('is-opening-skipped')}else{r.classList.add('is-opening-locked')}}}catch(e){}"
          }}
        />
      </head>
      <body>
        <ThemeProvider initialTheme={initialTheme}>{children}</ThemeProvider>
      </body>
    </html>
  );
}
