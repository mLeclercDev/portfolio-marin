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

export default function Home({ projects, delayHero = 0, delayPresentation = 1000 }) {
  return (
    <>
      <Head>
        <title>Mon Portfolio</title>
        <meta name="description" content="Portfolio" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

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
