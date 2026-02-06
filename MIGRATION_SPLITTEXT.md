# Migration SplitText - Résumé des changements

## Problème identifié
Le portfolio utilisait un mélange de deux bibliothèques SplitText différentes :
- `@cyriacbr/react-split-text` (composant React)
- `gsap/dist/SplitText` (plugin GSAP)

Ce mélange créait des bugs intermittents de rendu de texte, notamment :
- Chevauchement de texte
- Lignes qui ne s'affichent pas correctement
- Problèmes de timing dans les animations

## Solution appliquée
Migration complète vers **GSAP SplitText** pour tous les composants.

### Avantages de GSAP SplitText :
1. ✅ Plus fiable et stable
2. ✅ Meilleur contrôle sur les animations
3. ✅ Pas de problèmes de timing React
4. ✅ Intégration native avec GSAP
5. ✅ Meilleure performance

## Fichiers modifiés

### Composants migrés (utilisation active de SplitText) :
1. **Presentation.js** - Migration complète avec gestion des deux textes
2. **Testimonial.js** - Migration avec support mobile/desktop
3. **Brief.js** - Migration avec FontFaceObserver
4. **PresentationSecond.js** - Migration avec délai d'animation
5. **HeroSectionProject.js** - Migration avec split par mots
6. **Tools.js** - Déjà migré, nettoyage des commentaires
7. **Reviews.js** - Déjà migré, nettoyage des commentaires

### Composants nettoyés (import inutilisé retiré) :
1. **HeroSection.js**
2. **Achievements.js**
3. **Goals.js**
4. **Issues.js**
5. **MockupsSecond.js**
6. **Process.js**
7. **Projects.js**
8. **TextSeparator.js**
9. **nextProject.js**

## Pattern de migration utilisé

### Ancien code (React SplitText) :
```jsx
import { SplitText } from "@cyriacbr/react-split-text";

<SplitText
  LineWrapper={({ children }) => <span className="line-wrapper"><span className="line">{children}</span></span>}
  WordWrapper={({ children }) => <span className='word'>{children}</span>}
  LetterWrapper={({ children }) => <>{children}</>}
>
  Votre texte ici
</SplitText>
```

### Nouveau code (GSAP SplitText) :
```jsx
import { SplitText } from "gsap/dist/SplitText";

// Dans le composant
const textRef = useRef(null);

useEffect(() => {
  if (!textRef.current) return;

  // Initialisation GSAP SplitText
  const split = new SplitText(textRef.current, { type: "lines", linesClass: "line-child" });

  // Wrap mask pour les lignes
  split.lines.forEach(line => {
    const wrapper = document.createElement('div');
    wrapper.className = 'line-wrapper';
    wrapper.style.overflow = 'hidden';
    wrapper.style.display = 'block';
    line.parentNode.insertBefore(wrapper, line);
    wrapper.appendChild(line);
    line.className = 'line';
  });

  // État initial
  gsap.set(split.lines, { y: "100%", rotate: 5 });

  // Animation
  gsap.to(split.lines, {
    y: "0%",
    rotate: 0,
    duration: 1,
    ease: "hyperBounce",
    stagger: 0.075,
    scrollTrigger: {
      trigger: rootRef.current,
      start: "top 85%",
    },
  });

  return () => {
    split.revert(); // Important : nettoyer le split
  };
}, [dependencies]);

// Dans le JSX
<div ref={textRef}>
  Votre texte ici
</div>
```

## Points clés de la migration

1. **Enregistrement du plugin** : Toujours ajouter `gsap.registerPlugin(SplitText)`
2. **Création des wrappers** : Créer manuellement les wrappers avec overflow hidden
3. **Cleanup** : Toujours appeler `split.revert()` dans le return du useEffect
4. **Refs** : Utiliser des refs pour cibler les éléments à splitter
5. **Timing** : Attendre que les fonts soient chargées avec FontFaceObserver si nécessaire

## Prochaines étapes

1. ✅ Tester le site sur tous les navigateurs
2. ✅ Vérifier les animations sur mobile et desktop
3. ✅ S'assurer qu'il n'y a plus de bugs de rendu
4. ⏳ Optionnel : Supprimer la dépendance `@cyriacbr/react-split-text` du package.json

## Commande pour supprimer l'ancienne dépendance (optionnel)
```bash
yarn remove @cyriacbr/react-split-text
```

---

**Date de migration** : 2026-02-06
**Développeur** : Marin Leclerc
**Assistant** : Antigravity AI
