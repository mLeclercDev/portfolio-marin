// pages/[projectName].js

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { createClient } from 'contentful';
import gsap from "gsap"
import Head from 'next/head';
import Cursor from '../components/global/Cursor';
import Navbar from '../components/global/Navbar';
import Layer from '../components/global/Layer';
import Brief from '../components/Brief';
import Issues from '../components/Issues';
import Goals from '../components/Goals';
import Testimonial from '../components/Testimonial';
import HeroSectionProject from '../components/HeroSectionProject';
import TextSeparator from '../components/TextSeparator';
import Mockups from '../components/Mockups';
import Process from '../components/Process';
import MockupsSecond from '../components/MockupsSecond';
import MockupsThird from '../components/MockupsThird';
import ResponsiveMockups from '../components/ResponsiveMockups';
import NextProject from '../components/nextProject';
import Footer from '../components/global/Footer';
import '../styles/globals.scss'

function formatToUrl(title) {
  // Convertir en minuscules et remplacer les espaces par des tirets
  let url = title.toLowerCase().replace(/\s+/g, '-');
  // Supprimer les caractères spéciaux
  url = url.replace(/[^\w-]+/g, '');
  return url;
}

export async function getStaticPaths() {
  // Créez une instance du client Contentful
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  });

  try {
    // Récupérez tous les projets depuis Contentful
    const projects = await client.getEntries({ content_type: 'project' });

    // Générez les chemins dynamiques pour chaque projet
    const paths = projects.items.map((project) => ({
      params: { projectName: formatToUrl(project.fields.title) }, // Utilisez le titre du projet comme paramètre
    }));

    // Renvoyez les chemins générés
    return { paths, fallback: false }; // Définissez fallback sur false pour générer uniquement les pages existantes
  } catch (error) {
    console.error('Error fetching data from Contentful:', error);
    return { paths: [], fallback: false }; // En cas d'erreur, retournez une liste vide de chemins
  }
}

export async function getStaticProps() {
  // Créer une instance du client Contentful en utilisant les identifiants d'accès
  const client = createClient({
    space: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
  });

  try {
    // Récupérer les données depuis Contentful en utilisant différentes requêtes
    const projects = await client.getEntries({ content_type: 'project' });
    // Ajoutez d'autres requêtes pour chaque content type nécessaire

    // Renvoyer les données récupérées en tant que props
    return {
      props: {
        projects: projects.items,
        // Ajoutez d'autres propriétés pour chaque type de contenu récupéré
      },
    };
  } catch (error) {
    console.error('Error fetching data from Contentful:', error);
    return {
      props: {
        projects: [],
        // Initialisez d'autres propriétés à un tableau vide en cas d'erreur
      },
    };
  }
}

const ProjectDetailPage = ({projects}) => {
  const [isRendered, setIsRendered] = useState(false);
  const router = useRouter();
  const { projectName } = router.query;
  const [projectData, setProjectData] = useState(null);

  useEffect(() => { 
    const project = projects.find(project => formatToUrl(project.fields.title) === projectName);
    console.log("project : ", project)
    if (project) {
      setProjectData(project);
    }

  }, [projects]);

  useEffect(() => {
    window.scrollTo(0, 0);
    gsap.set(".layers__items", { className: "layers__items out" });
  }, [router.asPath]);

  if (!projectData) {
    return <div>Loading...</div>; // Afficher un indicateur de chargement tant que les données sont en cours de récupération
  }

  return (
    <>
      <Head>
        <title>{projectData.fields.titleSeo}</title>
        <meta name="description" content={projectData.fields.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico?v=2" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </Head>
    {/*   <Navbar /> */}
      <main key={router.asPath}>
        <HeroSectionProject image={projectData.fields.featured_image.fields.file.url}  title={projectData.fields.titleH1} />
        <TextSeparator content={" Brief client - "} />
        <Brief brief={projectData.fields.brief} />
        <Issues problematicTitle={projectData.fields.problematicTitle.content[0].content[0].value} problematic_content={projectData.fields.problematic_content} />
        <Goals goalsTitle={projectData.fields.goals_title.content[0].content[0].value} goals_content={projectData.fields.goals_content} />
        <Process process={projectData.fields.process} />
        {/* <MockupsSecond videos={projectData.fields.desktopMockups} /> */}
        <MockupsThird videos={projectData.fields.desktopMockups} />
        <Mockups images={projectData.fields.responsiveMockups} />
        <Testimonial testimonial={projectData.fields.testimonialClient} />
        <NextProject projects={projects} />
      </main>
      <Footer triggerSelector=".testimonial"  />
      <Layer />
    </>
  );
};

export default ProjectDetailPage;
