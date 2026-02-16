import React from 'react';

const CollaborerSteps = ({ 
  steps = [
    {
      number: '01',
      title: 'Cadrage',
      description: 'Chaque projet commence par un brief précis. Maquettes, périmètre fonctionnel, contraintes techniques ou SEO, délais : tout est posé dès le départ. Je privilégie les projets où les objectifs et le périmètre sont clairs dès le départ, afin d’éviter les flous et les ajustements inutiles en cours de route.'
    },
    {
      number: '02',
      title: 'Organisation',
      description: 'Une fois le périmètre validé, j’estime le temps et le budget de manière réaliste, puis je planifie les différentes étapes du projet. Des points de validation sont définis en amont afin d’assurer un suivi fluide, limiter les allers-retours inutiles et éviter toute mauvaise surprise.'
    },
    {
      number: '03',
      title: 'Intégration',
      description: 'J’intègre des interfaces sur WordPress, Webflow et HubSpot, avec une exigence constante de qualité. Le design est respecté à la lettre, le code est propre, maintenable et performant. J’anticipe les contraintes techniques et signale les incohérences pour garantir un rendu fiable et une vraie autonomie après livraison.'
    },
    {
      number: '04',
      title: 'Validation',
      description: 'Avant la mise en ligne, le site fait l’objet d’une revue complète. Les ajustements sont ciblés et pertinents : pas de retouches sans fin, uniquement des améliorations qui ont un réel impact sur la qualité globale et l’expérience utilisateur.'
    },
    {
      number: '05',
      title: 'Suivi',
      description: 'Selon les besoins, je peux assurer un accompagnement après la livraison : corrections mineures, support technique ponctuel ou conseils pour la suite du projet. L’objectif est de vous laisser avec une base solide et durable.'
    }
  ]
}) => {
  return (
    <section className="collaborer-steps">
      <div className="container">
        {steps.map((step, index) => (
          <div key={index} className="collaborer-step">
            <div className="step-number">{step.number}</div>
            <div className="step-content">
              <h2 className="step-title">{step.title}</h2>
              <p className="step-description">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CollaborerSteps;
