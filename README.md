# Picross

Jeu de **picross** (nonogrammes) en ligne : résolvez des grilles pixel art, créez les vôtres, likez celles de
la communauté. Gratuit, sans publicité, sans compte pour jouer. Français 🇫🇷 / English 🇬🇧.

> Monorepo unique : ce dépôt contient **tout** (front, API, code partagé, déploiement). Les anciens dépôts
> `picross-backend` et `F-Picross` ne sont plus utilisés.

## Sommaire

- [Aperçu](#aperçu) · [Stack](#stack) · [Architecture](#architecture) · [Structure du dépôt](#structure-du-dépôt)
- [Démarrer en local](#démarrer-en-local) · [Scripts](#scripts) · [Variables d'environnement](#variables-denvironnement)
- [Internationalisation](#internationalisation) · [SEO](#seo) · [Sécurité](#sécurité)
- [API](#api) · [Tests](#tests) · [Déploiement](#déploiement) · [Licence](#licence)

## Aperçu

| Page                    | FR                           | EN                          | Rendu                              |
| ----------------------- | ---------------------------- | --------------------------- | ---------------------------------- |
| Accueil (hero + FAQ)    | `/`                          | `/en`                       | SSR, indexée                       |
| Jouer                   | `/jouer`                     | `/en/play`                  | SSR (grille au hasard, noindex)    |
| Une grille              | `/jouer/:id`                 | `/en/play/:id`              | SSR, indexée (une page par grille) |
| Galerie                 | `/galerie`                   | `/en/gallery`               | SSR (1ʳᵉ page) + client            |
| Créer une grille        | `/creer`                     | `/en/create`                | connecté, noindex                  |
| Compte / Modération     | `/compte`, `/admin`          | `/en/account`, `/en/admin`  | connecté, noindex                  |
| Connexion / Inscription | `/connexion`, `/inscription` | `/en/login`, `/en/register` | noindex                            |

Fonctionnalités : glisser pour tracer une ligne (souris, doigt), clic droit = croix, annulation illimitée,
clavier complet (flèches, `Espace`, `X`, `Ctrl+Z`), minuteur, écran de victoire, likes, éditeur de grilles
(3×3 à 15×15) avec indices calculés automatiquement, modération par un admin, thème clair/sombre/système,
sons optionnels, mode hors ligne (grilles de départ) si l'API est injoignable.

## Grilles de départ et difficulté

- **105 grilles** livrées (`packages/shared/src/starters.ts`), du 5×5 au 15×15 : formes (cœur, ancre, château…),
  objets du quotidien et clins d'œil (« Réunion qui aurait pu être un mail », « Cerbère (trois fois plus gentil) »…).
  Titres en français et en anglais ; insérées au démarrage de l'API, sans doublon (`slug` stable, version dans la
  table `meta`) — pour en ajouter : compléter `STARTER_PUZZLES` et incrémenter `STARTERS_VERSION`.
- **Aucune devinette** : un solveur ligne par ligne (`solver.ts`) vérifie dans les tests que chaque grille livrée se
  résout par pure logique.
- **Difficulté** (facile / moyen / difficile / expert) calculée automatiquement par `rateDifficulty` : surface de la
  grille (≤ 56, ≤ 100, ≤ 150, au-delà), relevée d'un cran si la logique seule ne suffit pas. Appliquée aussi aux
  grilles créées par les joueurs ; filtre et tri dans la galerie.

## Stack

| Couche  | Technologies                                                                                                   |
| ------- | -------------------------------------------------------------------------------------------------------------- |
| Front   | **Nuxt 4** (SSR), Vue 3 `<script setup>`, Pinia, Tailwind CSS 4, `@nuxtjs/i18n`, sitemap / robots / schema.org |
| API     | **Hono** (Node 22), Drizzle ORM, **libSQL** (SQLite local ou Turso), zod                                       |
| Partagé | `packages/shared` : schémas zod, calcul des indices, contrats d'API, grilles de départ                         |
| Outils  | pnpm workspaces, TypeScript strict, ESLint 9, Prettier, Vitest, GitHub Actions, Docker                         |

## Architecture

```
Navigateur ──HTTPS──▶  Traefik (Dokploy)  ──▶  web (Nuxt SSR :3000) ──/api/*──▶  api (Hono :3000) ──▶ SQLite
                         certificat TLS         pages HTML + proxy               REST + sessions       volume /data
```

- **Une seule origine publique** : le navigateur ne parle qu'à Nuxt. `/api/*` est relayé vers l'API interne
  (`server/api/[...].ts`). Pas de CORS, cookie de session `HttpOnly; SameSite=Lax; Secure`, API jamais exposée.
- **SSR avec identité** : pendant le rendu serveur, le cookie du visiteur est relayé à l'API
  (`useRequestFetch`) : le HTML reçu est déjà « connecté » ou « déconnecté », sans clignotement.
- **Pourquoi SQLite** : volumétrie de jeu amateur, une seule instance d'API, sauvegarde = copier un fichier.
  À remplacer par PostgreSQL si l'API devait un jour être répliquée.

## Structure du dépôt

```
apps/
  web/                 Nuxt 4
    app/
      pages/           routes (index, play/[[id]], gallery, create, profile, admin, login, register)
      components/      Board (plateau), ClueLine, HeroBoard, AppHeader/Footer, dialogues…
      composables/     useBoard (état du plateau), usePlayableGame, useApi, useFormErrors, useSound
      domain/          logique pure du jeu (grille, traits, victoire) — testée, sans Vue
      stores/          Pinia : auth, settings (cookies)
      middleware/      auth, admin, guest
    i18n/locales/      fr.json, en.json
    server/            proxy /api, CSP par hachage, source du sitemap
  api/                 Hono
    src/routes/        auth.ts, picrosses.ts
    src/db/schema.ts   tables users / picrosses / likes   ·   drizzle/ : migrations SQL (embarquées dans le code par `db:generate`)
packages/shared/       code commun front/back
compose.yaml           déploiement (web + api + volume)
DEPLOY.md              guide de déploiement Dokploy pas à pas
```

## Démarrer en local

Prérequis : **Node ≥ 22.12** et **pnpm** (`corepack enable`).

```bash
pnpm install
cp apps/api/.env.example apps/api/.env      # secret de dev + email admin
pnpm dev                                    # API :3000  +  Nuxt :5173 (proxy /api automatique)
```

Ouvrir <http://localhost:5173>. Créez un compte avec l'email de `ADMIN_EMAILS` (`admin@example.com` par
défaut) pour accéder à la page de modération. Cinq grilles de départ sont insérées au premier lancement.

## Scripts

| Commande                                                          | Effet                                                    |
| ----------------------------------------------------------------- | -------------------------------------------------------- |
| `pnpm dev`                                                        | API + front en mode développement                        |
| `pnpm check`                                                      | lint + typecheck + tests + build (identique à la CI)     |
| `pnpm lint` / `pnpm format`                                       | ESLint / Prettier                                        |
| `pnpm typecheck`                                                  | `vue-tsc` (front) et `tsc` (API, shared)                 |
| `pnpm test`                                                       | Vitest dans les 3 packages                               |
| `pnpm --filter @picross/api db:generate`                          | nouvelle migration SQL après modification de `schema.ts` |
| `docker compose -f compose.yaml -f compose.local.yaml up --build` | stack complète sur <http://localhost:8080>               |

## Variables d'environnement

**Compose / Dokploy** (voir `.env.example`) :

| Variable        | Obligatoire | Rôle                                                                     |
| --------------- | :---------: | ------------------------------------------------------------------------ |
| `SITE_URL`      |     oui     | URL publique sans slash final (canonical, hreflang, sitemap, Open Graph) |
| `JWT_SECRET`    |     oui     | Signature des sessions, ≥ 32 caractères (`openssl rand -base64 48`)      |
| `ADMIN_EMAILS`  |     non     | Emails (séparés par des virgules) promus administrateurs à la connexion  |
| `AUTO_VALIDATE` |     non     | `true` : grilles publiées sans modération (défaut `false`)               |
| `COOKIE_SECURE` |     non     | `false` uniquement pour tester en HTTP simple                            |

**API** (`apps/api/src/env.ts`) : `PORT`, `DATABASE_URL` / `DATABASE_AUTH_TOKEN`, `SESSION_DAYS`, `TRUST_PROXY`, `CORS_ORIGIN`.
**Web** : `NUXT_PUBLIC_SITE_URL`, `NUXT_API_URL` (adresse interne de l'API, `http://api:3000` dans le compose).

## Internationalisation

- Le **français est la langue par défaut, sans préfixe** (`/galerie`) ; l'anglais vit sous `/en` (`/en/gallery`).
- Les **slugs sont traduits** (`/jouer` ↔ `/en/play`) : voir `i18n.pages` dans `apps/web/nuxt.config.ts`.
- **Détection** : à la première visite sur `/` uniquement, le visiteur est redirigé selon la langue de son
  navigateur (`Accept-Language`). Le choix explicite (sélecteur de langue du pied de page ou des réglages)
  est mémorisé dans le cookie `picross_lang` et prime ensuite. Les autres URL ne sont jamais redirigées
  (bon pour le référencement : une URL = une langue).
- **Ajouter une langue** : créer `i18n/locales/xx.json` (copie de `fr.json`), l'ajouter à `i18n.locales` et
  aux `pages` dans `nuxt.config.ts`, ajouter son préfixe aux chemins privés de `PRIVATE_PATHS`.

## SEO

- **Rendu serveur** de toutes les pages publiques (contenu complet dans le HTML, pas de page vide à JS).
- `<title>` et `meta description` uniques par page et par langue ; **canonical** absolu ; **hreflang**
  `fr` / `en` / `x-default` croisés (balises `<link>` **et** sitemap).
- **Sitemap** (`/sitemap_index.xml`) : pages publiques + **une URL par grille** de la galerie (source
  dynamique `server/routes/__sitemap__/urls.ts`) ; **robots.txt** généré ; pages privées en `noindex` et
  interdites.
- **Open Graph + X Card** (`/og.png` 1200×630), `og:locale`, `theme-color`, manifest PWA, favicons.
- **Données structurées JSON-LD** : `WebSite`, `WebPage`, `WebApplication` (gratuite), `FAQPage` (rich results).
- Sémantique et accessibilité : un seul `h1` par page, hiérarchie de titres, `<nav>`/`<main>`/`<footer>`,
  lien d'évitement, contrastes AA, `lang` correct, mouvements réduits respectés.
- Performance : pas de police externe, JS par route, assets fingerprintés servis `immutable`, compression.
- Après déploiement : déclarer `https://votre-domaine/sitemap_index.xml` dans Google Search Console et Bing.

## Sécurité

- Sessions par cookie **HttpOnly / SameSite=Lax / Secure** (JWT HS256, secret obligatoire en production).
- Mots de passe hachés avec **scrypt** ; réponses identiques pour « email inconnu » et « mauvais mot de passe ».
- **Rate limiting** des connexions/inscriptions et de la création de grilles ; corps de requête limité à 64 Ko ;
  corps non-JSON refusé.
- Validation stricte côté serveur (zod) de toutes les entrées ; autorisations vérifiées côté serveur
  (propriétaire / admin) ; un like par utilisateur et par grille.
- **CSP stricte sans `unsafe-inline` pour les scripts** (empreintes SHA-256 calculées à chaque réponse,
  `server/plugins/security.ts`), plus HSTS, `X-Frame-Options`, `nosniff`, `Referrer-Policy`, `Permissions-Policy`.
- Conteneurs non-root, secrets uniquement par variables d'environnement.

## API

REST JSON sous `/api` (contrats dans `packages/shared/src/dto.ts`).

| Méthode & chemin                             | Accès        | Rôle                                                                     |
| -------------------------------------------- | ------------ | ------------------------------------------------------------------------ |
| `POST /auth/register` · `/login` · `/logout` | public       | inscription, connexion, déconnexion                                      |
| `GET /auth/me`                               | public       | utilisateur courant ou `null`                                            |
| `GET /picrosses`                             | public       | liste (`search`, `sort`, `limit`, `offset`; `status=pending\|all` admin) |
| `GET /picrosses/random`                      | public       | grille validée au hasard (`exclude=<id>`)                                |
| `GET /picrosses/:id`                         | public\*     | une grille (\*non validée : auteur et admin)                             |
| `GET /picrosses/mine`                        | connecté     | mes grilles                                                              |
| `POST /picrosses`                            | connecté     | créer une grille                                                         |
| `DELETE /picrosses/:id`                      | auteur/admin | supprimer                                                                |
| `PUT /picrosses/:id/like`                    | connecté     | `{ "liked": true \| false }`                                             |
| `PUT /picrosses/:id/validation`              | admin        | `{ "validated": true \| false }`                                         |
| `GET /health`                                | public       | sonde de santé                                                           |

## Tests

`pnpm test` : domaine du jeu (traits, victoire, indices), composables, composant `Board` (pointeur, clavier),
schémas partagés et **API de bout en bout** (inscription, droits, likes, modération, rate limit) sur SQLite en
mémoire.

## Déploiement

Deux cibles, même code : **Docker Compose** (Dokploy, API en service séparé + SQLite sur volume) ou **Vercel** (API
embarquée dans Nuxt + base Turso).
**Voir [DEPLOY.md](DEPLOY.md)** (DNS, domaine, HTTPS, variables,
sauvegardes, mises à jour, dépannage).

## Licence

Voir [LICENSE](LICENSE). Contributions : [CONTRIBUTING.md](CONTRIBUTING.md).
