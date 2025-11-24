import React from 'react';
import Head from 'next/head';
import { createClient } from 'contentful';
import Layer from '../components/global/Layer';
import HeroSecond from '../components/HeroSecond';
import TextSeparator from '../components/TextSeparator';
import Presentation from '../components/Presentation';
import Tools from '../components/Tools';
import Achievements from '../components/Achievements';
import ProjectsFive from '../components/ProjectsFive';
import Reviews from '../components/Reviews';
import Footer from '../components/global/Footer';
import LoaderSecond from '../components/LoaderSecond';
import '../styles/globals.scss';

export async function getStaticProps() {
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  });

  try {
    const projects = await client.getEntries({ content_type: 'project' });
    return { props: { projects: projects.items } };
  } catch (error) {
    console.error('Error fetching data from Contentful:', error);
    return { props: { projects: [] } };
  }
}

export default function Home({ projects, delayHero = 0, delayPresentation = 1000, showLoader, lenisRef }) {
  return (
    <>
      <Head>
        <title>Marin Leclerc – Développeur Web Freelance spécialisé WordPress, Webflow & HubSpot</title>
        <meta name="description" content="Portfolio" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script defer src="https://cloud.umami.is/script.js" data-website-id="5ff730a5-9ee9-49bb-a24e-5773e82d776a"></script>
        <link rel="icon" href="/favicon.ico?v=2" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </Head>

      {showLoader && <LoaderSecond />}
      <main>
        {/* HeroSecond prend un delayHero pour gérer l'animation */}
        <HeroSecond delay={delayHero} />
        <TextSeparator content=" Qui je suis - " />
        <Presentation delayPresentation={delayPresentation} />
        <Tools />
        <Achievements />
        <ProjectsFive projects={projects} />
        <Reviews />
      </main>

      <Footer triggerSelector=".reviews" />
      <Layer />
    </>
  );
}
