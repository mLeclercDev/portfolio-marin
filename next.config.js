// next.config.js
const path = require('path');

module.exports = {
  webpack: (config, { isServer }) => {
    // Ajouter le chargeur Sass pour la gestion des fichiers .scss
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader',
      ],
      include: path.resolve(__dirname, './styles'),
    });


    // Ajouter le chargeur CSS pour la gestion des fichiers .css
    config.module.rules.push({
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader',
      ],
    });

    return config;
  },
  images: {
    domains: ['images.ctfassets.net'],
  },
};