# Présentation du projet PokAPI

J'ai voulu apprendre à crée une application mobile, autrement qu'avec Android Studio.

Je n’ai pas réussi à pleinement maîtriser Android Studio : trop complexe, débogage laborieux, et projets trop lourds dès la création (multiples fichiers natifs générés par défaut).

J’ai donc choisi de me tourner vers React Native avec Expo :

-   React Native permet la réutilisation du code entre Android et iOS, avec de bonnes performances grâce à la compilation en code natif.

-   Expo fournit un environnement prêt à l’emploi, simple à utiliser, qui évite la configuration fastidieuse des projets natifs.

Pour cette première application, j'ai suivi ce [tutoriel](https://grafikart.fr/tutoriels/react-native-pokedex-2245) de Grafikart.

L’objectif du projet est de créer une application mobile consommant l’API [PokéAPI](https://pokeapi.co/) afin d’afficher et présenter les différents Pokémon.

## Fonctionnalités de l’application

-   **Écran d’accueil** : liste des Pokémon par numéro, possibilité de filtrer par nom et barre de recherche pour trouver un Pokémon spécifique.

<img src="https://zupimages.net/up/25/33/p6fa.png" alt="Page d'accueil" width="40%"/>

-   **Page de détails** : fiche complète pour chaque Pokémon (types, statistiques, famille d’évolution, etc.), avec en bonus le cri du Pokémon en cliquant sur son image 🫣.

<img src="https://zupimages.net/up/25/33/kv4d.png" alt="Page de présentation de Pokémon" width="40%"/>

## Installation

```bash
git clone https://github.com/RandomElo/PokeAPI.git
cd PokeAPI
npm install
npx expo start
```

Scanner le QR code avec l'application Expo Go sur un téléphone, ou lancer `npm run android` avec un émulateur.

## Structure du projet

-   📂 .expo : configuration et cache internes générés par Expo

-   📂 app : pages principales de l’application

-   📂 assets/fonts : polices utilisées

-   📂 assets/images : icônes et images

-   📂 components : composants réutilisables (barre de recherche, boutons de filtre, etc.)

-   📂 components/pokemon : composants spécifiques aux Pokémon (stats, types, etc.)

-   📂 constants : valeurs constantes de l’application (couleurs, tailles, etc.)

-   📂 functions : fonctions utilitaires pour alléger le code des pages

-   📂 hooks : hooks personnalisés

-   📂 node_modules : dépendances du projet

-   .gitignore : fichiers/dossiers à ignorer par Git

-   app.json : configuration globale Expo

-   eas.json : configuration des builds Expo Application Services (EAS)

-   package.json & package-lock.json : gestion des dépendances Node.js

-   README.md : documentation du projet

-   tsconfig.json : configuration TypeScript
-   app.apk : fichier exécutable Android généré après build
