// pages/[projectName].js

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { createClient } from 'contentful';
import Head from 'next/head';
import gsap from "gsap"
import SmoothScrolling from "../components/global/SmoothScrolling"
import Navbar from '../components/global/Navbar';
import Footer from '../components/global/Footer';
import HeroProject from '../components/HeroProject';
import ProjectContent from '../components/ProjectContent';
import ProjectImages from '../components/ProjectImages';
import NextProject from '../components/nextProject';
import Layers from '../components/global/Layers';
import '../styles/components/navbar.scss'
import '../styles/components/footer.scss'
import '../styles/components/hero-project.scss'
import '../styles/components/project-content.scss'
import '../styles/components/project-images.scss'
import '../styles/components/next-project.scss'
import '../styles/components/layers.scss'
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
    const projects = await client.getEntries({ content_type: 'projects' });

    // Générez les chemins dynamiques pour chaque projet
    const paths = projects.items.map((project) => ({
      params: { projectName: formatToUrl(project.fields.titleProject) }, // Utilisez le titre du projet comme paramètre
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
    const projects = await client.getEntries({ content_type: 'projects' });
    const footer = await client.getEntries({ content_type: 'footer' });
    // Ajoutez d'autres requêtes pour chaque content type nécessaire

    // Renvoyer les données récupérées en tant que props
    return {
      props: {
        projects: projects.items,
        footer: footer.items,
        // Ajoutez d'autres propriétés pour chaque type de contenu récupéré
      },
    };
  } catch (error) {
    console.error('Error fetching data from Contentful:', error);
    return {
      props: {
        projects: [],
        footer: [],
        // Initialisez d'autres propriétés à un tableau vide en cas d'erreur
      },
    };
  }
}

const ProjectDetailPage = ({projects, footer}) => {
  const [isRendered, setIsRendered] = useState(false);
  const router = useRouter();
  const { projectName } = router.query;
  const [projectData, setProjectData] = useState(null);

  useEffect(() => { 
    gsap.set("main", { opacity: 1 })  
    gsap.set(".layers__item", { className: "layers__item" })
    // Recherchez le projet correspondant dans les données projet chargées
    const project = projects.find(project => formatToUrl(project.fields.titleProject) === projectName);

    if (project) {
      setProjectData(project);
    }
  }, [projectName, projects, router.query]);

  if (!projectData) {
    return <div>Loading...</div>; // Afficher un indicateur de chargement tant que les données sont en cours de récupération
  }

  return (
    <div>
      <Head>
        <title>{projectData.title}</title> {/* Utilisez le titre du projet comme titre de la page */}
      </Head>
      <SmoothScrolling infinite={false}>
      <Navbar />
      <main className="">
            <div className='container'>
            <HeroProject image={projectData.fields.coverImage.fields.file.url} title={projectData.fields.titleProject} />
            <ProjectContent introduction={projectData.fields.introduction.content[0].content[0].value} description={projectData.fields.description.content[0].content[0].value} />
            <ProjectImages images={projectData.fields.images} descriptions={projectData.fields.projectsDescription} subDescriptions={projectData.fields.projectsSubDescription} />
            <NextProject projects={projects} />
            </div>
      </main>
      <Footer word={footer[0].fields.leftWord} description={footer[0].fields.description.content[0].content[0].value} informations={footer[0].fields.textItem} />
      <Layers />
      </SmoothScrolling>
    </div>
  );
};

export default ProjectDetailPage;
