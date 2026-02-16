"use client";

// pages/404.tsx
import Head from 'next/head';
import { useEffect, useState } from 'react';
import Layer from '../components/global/Layer';
import { useRouter } from "next/router";
import Link from "next/link";
import { animatePageOut } from "../utils/animations"

export default function Custom404() {
const router = useRouter();
const pathname = router.pathname;
    // Fonction à exécuter au clic sur un élément de class layers__item
  const layersIn = (href) => {    
    console.log("CLique")
    if (pathname !== href) {
      console.log("différent")
      animatePageOut(href, router)
    } 
  };
  return (
    <>
    <Head>
        <title>Page introuvable</title>
        <meta name="description" content="Portfolio" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />




        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />



      </Head>
        <main className='main-404'>
            <div className='error-wrapper'>
                <div>Erreur</div>
                <h1>404</h1>
                <div onClick={() => layersIn(`/`)} className='arrow-link cs-scale'>
                    <span className='arrow-span'>
                    Page d&apos;accueil
                    </span>
                    <div className="arrow">
                        <svg className="first" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 3.33333H14.31L0.143334 17.5L2.5 19.8567L16.6667 5.69V20H20V0H0V3.33333Z" fill="#FCFBF6"></path></svg>
                        <svg className="second" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 3.33333H14.31L0.143334 17.5L2.5 19.8567L16.6667 5.69V20H20V0H0V3.33333Z" fill="#FCFBF6"></path></svg>
                    </div>
                </div>
            </div>
        </main>
              <Layer />
    </>
  );
}
