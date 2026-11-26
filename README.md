# Picross

Jeu de picross (nonogrammes) : résolvez des grilles, créez les vôtres, likez celles des autres.

Monorepo **pnpm** :

| Dossier           | Rôle                                                                                      |
| ----------------- | ----------------------------------------------------------------------------------------- |
| `apps/web`        | Front — Vue 3 (`<script setup>`), Vite, Pinia, vue-i18n, Tailwind CSS 4                   |
| `apps/api`        | API REST — Hono, Drizzle ORM, SQLite (better-sqlite3), validation zod                     |
| `packages/shared` | Code partagé front/back : schémas zod, calcul des indices, types d'API, grilles de départ |

## Développement

Prérequis : Node ≥ 22.12 et pnpm (`corepack enable`).

```bash
pnpm install
cp apps/api/.env.example apps/api/.env   # secret + email admin de dev
pnpm dev                                  # API :3000 + front :5173 (proxy /api)
```

Ouvrir http://localhost:5173. Un compte dont l'email figure dans `ADMIN_EMAILS` est administrateur
(page « Modération »).

```bash
pnpm check        # lint + typecheck + tests + build (ce que fait la CI)
pnpm test         # vitest : domaine du jeu, composants, API (SQLite en mémoire)
pnpm --filter @picross/api db:generate   # nouvelle migration après un changement de schéma
```

## Déploiement (Dokploy / Docker Compose)

Un seul `compose.yaml` : **web** (nginx : front statique + proxy `/api`) et **api** (Node), la base
SQLite vivant dans le volume `picross-data`. Seul `web` est exposé ; front et API partagent donc la
même origine (pas de CORS, cookie de session `HttpOnly; SameSite=Lax; Secure`).

Dans Dokploy : _Compose_ → dépôt Git → fichier `compose.yaml`, puis :

1. **Variables d'environnement** : `JWT_SECRET` (obligatoire, `openssl rand -base64 48`), `ADMIN_EMAILS`,
   éventuellement `AUTO_VALIDATE=true` (voir `.env.example`).
2. **Domaine** : service `web`, port `80`, HTTPS activé (le cookie est `Secure`).
3. Déployer. Les migrations s'appliquent au démarrage de l'API ; les 5 grilles de départ sont
   insérées si la base est vide.

Test local de la stack complète :
`JWT_SECRET=test-test-test-test-test-test-test-test docker compose -f compose.yaml -f compose.local.yaml up --build`
→ http://localhost:8080.

**Sauvegarde** : toute la base est le fichier `/data/picross.db` du volume `picross-data`
(sauvegarde de volume Dokploy, ou `sqlite3 picross.db ".backup backup.db"`).
SQLite convient tant qu'il y a **une seule instance** de l'API (c'est le cas ici).

## Fonctionnement

- **Jeu** : clic gauche = remplir, clic droit = croix, glisser = tracer une ligne (le trait se verrouille
  sur la ligne ou la colonne et s'annule en revenant en arrière). Au clavier : flèches, `Espace`, `X`,
  `Ctrl+Z`. La grille est gagnée quand toutes les lignes et colonnes respectent leurs indices.
- **Grilles** : une grille créée est visible de son auteur ; elle devient publique après validation d'un
  admin (ou tout de suite avec `AUTO_VALIDATE=true`). Hors ligne, le front joue les grilles de départ.
- **API** : voir `apps/api/src/routes` (`/api/auth/*`, `/api/picrosses/*`). Les contrats partagés sont
  dans `packages/shared/src/dto.ts`.
