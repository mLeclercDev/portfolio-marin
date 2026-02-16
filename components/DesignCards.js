import React from 'react';

const DesignCards = ({
  cards = [
    { number: '01', title: 'Cadrage du projet', description: 'On clarifie ensemble l’essentiel : objectifs du site, priorités, contraintes et contexte. Ce cadrage permet d’éviter les choix flous et les ajustements inutiles en cours de route.' },
    { number: '02', title: 'Structure & contenus', description: 'On définit la structure du site et les contenus à prévoir : pages, messages clés, hiérarchie de l’information. Cette étape garantit un design utile et cohérent, pensé pour les utilisateurs comme pour les objectifs du projet.' },
    { number: '03', title: 'Design accompagné', description: 'Je vous mets en relation avec des designers de confiance, habitués à travailler en lien étroit avec l’intégration et les contraintes techniques. Si besoin, je facilite les échanges pour assurer une collaboration fluide et un cadre clair.' },
    { number: '04', title: 'Intégration & mise en œuvre', description: 'Une fois les maquettes validées, j’interviens dans un cadre précis pour une intégration fidèle, propre et durable. Le résultat : un site fiable, performant et facile à prendre en main après livraison.' }
  ]
}) => {
  return (
    <section className="design">
      <div className="container">
        <h2 className="design-title">Pas encore <br></br> de maquettes ?</h2>
        
        <div className="design-grid">
          {cards.map((card, index) => (
            <div key={index} className="design-card">
              <div className='index'>{card.number}</div>
              <div>{card.title}</div>
              <p dangerouslySetInnerHTML={{ __html: card.description }}></p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DesignCards;
