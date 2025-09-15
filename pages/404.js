// pages/404.tsx
import Head from 'next/head';
import Link from "next/link";
import '../styles/globals.scss';
import '../styles/components/global/404.scss';

export default function Custom404() {
  return (
    <>
    <Head>
        <title>Mon Portfolio</title>
        <meta name="description" content="Portfolio" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <main className='main-404'>
            <div className='error-wrapper'>
                <div>Erreur</div>
                <h1>404</h1>
                <div onClick={() => handleClick()} className='arrow-link cs-scale'>
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
    </>
  );
}
