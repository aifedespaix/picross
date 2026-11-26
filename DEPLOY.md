# Déployer Picross sur Dokploy (avec votre nom de domaine)

Ce guide installe l'application complète (front Nuxt + API + base SQLite) sur un serveur avec
[Dokploy](https://dokploy.com), derrière **HTTPS automatique** (Let's Encrypt).

**Ce que vous aurez à la fin** : `https://picross.mondomaine.fr` (français) et `https://picross.mondomaine.fr/en`
(anglais), sitemap et robots.txt prêts pour Google.

---

## 0. Prérequis

- Un serveur (VPS) avec **Dokploy déjà installé** et accessible (`http://IP_DU_SERVEUR:3000` au départ).
- Un **nom de domaine** dont vous gérez la zone DNS (OVH, Gandi, Cloudflare…).
- Le dépôt GitHub `aifedespaix/picross` (branche `master` une fois la branche de migration fusionnée).
- Un terminal pour générer un secret : `openssl rand -base64 48`.

> Dokploy occupe lui-même les ports 80 et 443 (Traefik) : **ne publiez aucun port** pour Picross, tout passe
> par Traefik. C'est déjà le cas dans `compose.yaml` (`expose` seulement).

---

## 1. DNS : pointer le domaine vers le serveur

Chez votre registrar / hébergeur DNS, créez un enregistrement pour le sous-domaine voulu :

| Type               | Nom       | Valeur                   | TTL  |
| ------------------ | --------- | ------------------------ | ---- |
| `A`                | `picross` | `IP_PUBLIQUE_DU_SERVEUR` | 3600 |
| `AAAA` (optionnel) | `picross` | IPv6 du serveur          | 3600 |

Pour un domaine nu (`mondomaine.fr`) : enregistrement `A` avec le nom `@`. Pour que `www.` redirige aussi :
ajoutez un `A` (ou `CNAME`) `www` vers la même cible, puis voir l'étape 6.

Vérifiez la propagation (peut prendre quelques minutes) :

```bash
dig +short picross.mondomaine.fr     # doit afficher l'IP du serveur
```

> **Cloudflare** : laissez le nuage **gris (DNS only)** le temps d'obtenir le certificat, ou passez le SSL en
> mode « Full (strict) » si vous gardez le proxy orange.

---

## 2. Créer le projet dans Dokploy

1. Dokploy → **Projects** → **Create Project** → nom : `picross`.
2. Dans le projet : **Create Service** → **Compose**.
3. Nom : `picross` · **Compose Type : Docker Compose**.
4. Onglet **General** → **Provider : Github** (ou _Git_) :
   - connectez GitHub si besoin (_Settings → Git_), choisissez le dépôt `aifedespaix/picross`,
   - **Branch** : `master`,
   - **Compose Path** : `./compose.yaml`,
   - **Trigger Type** : `On Push` (redéploiement automatique à chaque `git push`).
5. **Save**.

---

## 3. Variables d'environnement

Onglet **Environment** du service, collez (en adaptant) :

```env
SITE_URL=https://picross.mondomaine.fr
JWT_SECRET=<résultat de: openssl rand -base64 48>
ADMIN_EMAILS=vous@mondomaine.fr
AUTO_VALIDATE=false
```

| Variable        | À savoir                                                                                                     |
| --------------- | ------------------------------------------------------------------------------------------------------------ |
| `SITE_URL`      | **Exactement** l'URL publique finale, en `https://`, **sans slash final**. Sert au SEO (canonical, sitemap). |
| `JWT_SECRET`    | Obligatoire. Ne le changez plus ensuite (cela déconnecte tout le monde). Ne le commitez jamais.              |
| `ADMIN_EMAILS`  | Le compte inscrit avec cet email devient administrateur (page « Modération »).                               |
| `AUTO_VALIDATE` | `true` = les grilles des joueurs sont publiées directement ; `false` = validation manuelle par un admin.     |

**Save**. (`COOKIE_SECURE` reste à `true` par défaut : le site doit donc être servi en HTTPS, ce que fait Traefik.)

---

## 4. Déployer

1. Bouton **Deploy** (onglet _General_). Suivez les logs dans l'onglet **Deployments**.
2. Premier build : 3 à 6 minutes (installation des dépendances, build Nuxt, image API).
3. Attendu dans les logs de l'API : `[api] 5 grilles de départ insérées` puis `[api] à l'écoute sur :3000`.
4. Dans **Monitoring** / **Containers**, `api` et `web` doivent être **healthy**.

---

## 5. Attacher le domaine (HTTPS)

Onglet **Domains** du service → **Add Domain** :

| Champ              | Valeur                        |
| ------------------ | ----------------------------- |
| **Service Name**   | `web` ← important (pas `api`) |
| **Host**           | `picross.mondomaine.fr`       |
| **Path**           | `/`                           |
| **Container Port** | `3000`                        |
| **HTTPS**          | activé                        |
| **Certificate**    | `Let's Encrypt`               |

**Save**, puis **redéployez** (Dokploy ajoute les labels Traefik au compose au déploiement). Après une minute,
le certificat est émis : ouvrez `https://picross.mondomaine.fr`.

> Ne créez **jamais** de domaine pour le service `api` : il doit rester interne. Le front le joint tout seul
> via `NUXT_API_URL=http://api:3000`.

---

## 6. (Optionnel) Rediriger `www` vers le domaine principal

Ajoutez un second domaine `www.mondomaine.fr` sur le service `web` (port 3000, HTTPS), puis, dans Dokploy →
**Traefik → File System** ou via la case de redirection du domaine, redirigez-le vers le domaine principal
(301). Un seul domaine canonique évite le contenu dupliqué : c'est ce que déclarent déjà les balises
`canonical` générées à partir de `SITE_URL`.

---

## 7. Vérifications après déploiement

```bash
curl -I https://picross.mondomaine.fr/                 # 200 + en-têtes de sécurité (CSP, HSTS…)
curl -s https://picross.mondomaine.fr/api/health        # {"status":"ok"}
curl -s https://picross.mondomaine.fr/robots.txt        # Sitemap: https://picross.mondomaine.fr/sitemap_index.xml
curl -s https://picross.mondomaine.fr/sitemap_index.xml # liste des sitemaps FR/EN (+ grilles)
curl -sI -H 'Accept-Language: en' https://picross.mondomaine.fr/   # 302 vers /en
```

Puis dans le navigateur :

1. `/` : page d'accueil ; « Jouer maintenant » ouvre une grille ; la partie se joue et se gagne.
2. Créez un compte avec l'email de `ADMIN_EMAILS` → l'entrée **Modération** apparaît dans le menu.
3. Créez une grille → en `AUTO_VALIDATE=false`, validez-la depuis _Modération_ ; elle apparaît dans la galerie.
4. Changez de langue (pied de page) : l'URL devient `/en/...`, et le choix est mémorisé.

**SEO** : testez avec le [test des résultats enrichis](https://search.google.com/test/rich-results) (FAQ) puis
déclarez `https://picross.mondomaine.fr/sitemap_index.xml` dans **Google Search Console** et Bing Webmaster Tools.

---

## 8. Données et sauvegardes

La base est **un seul fichier SQLite** dans le volume Docker nommé `picross-data` (`/data/picross.db`).

- **Sauvegarde Dokploy** : _Volume Backups_ (onglet **Volume Backups** du service) → ajoutez `picross-data`
  avec une destination S3 et une planification (ex. tous les jours).
- **Sauvegarde manuelle** (cohérente, sans arrêter le service) :

  ```bash
  docker exec $(docker ps -qf name=picross-api) \
    node -e "const D=require('better-sqlite3');new D('/data/picross.db').backup('/data/backup.db').then(()=>console.log('ok'))"
  docker cp $(docker ps -qf name=picross-api):/data/backup.db ./picross-backup.db
  ```

- **Restauration** : arrêter le service, remplacer `/data/picross.db` dans le volume, redémarrer.
- Ne supprimez pas le volume en recréant le service (option _Delete volumes_ de Dokploy).

---

## 9. Mises à jour

- Avec **Trigger : On Push**, chaque `git push` sur `master` redéploie automatiquement (les migrations de base
  s'appliquent au démarrage de l'API).
- Sinon : bouton **Deploy** manuel. Le **Rollback** de Dokploy permet de revenir à une version précédente.
- Pour passer un compte en admin plus tard : ajoutez son email à `ADMIN_EMAILS`, redéployez, puis le compte
  se reconnecte.

---

## 10. Dépannage

| Symptôme                                               | Cause probable / solution                                                                                                   |
| ------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| `502 Bad Gateway` / `404 page not found` (Traefik)     | Domaine sur le mauvais service ou mauvais port : **Service `web`, port `3000`**. Redéployer après modification.             |
| Certificat non émis                                    | DNS pas encore propagé, ports 80/443 fermés, ou proxy Cloudflare orange pendant l'émission.                                 |
| « required variable SITE_URL / JWT_SECRET is missing » | Variable absente de l'onglet _Environment_.                                                                                 |
| Impossible de rester connecté                          | Site servi en HTTP alors que `COOKIE_SECURE=true` : utilisez HTTPS (ou `COOKIE_SECURE=false` pour un test).                 |
| Tout le monde est déconnecté après un déploiement      | `JWT_SECRET` modifié ou absent. Il doit rester identique.                                                                   |
| « Trop de tentatives » en boucle                       | Rate limiting : l'API ne reçoit pas l'IP réelle. Vérifiez que `TRUST_PROXY=true` (déjà dans `compose.yaml`).                |
| Canonical / sitemap avec `localhost`                   | `SITE_URL` incorrect ou absent. Corrigez, redéployez.                                                                       |
| Aucune grille dans la galerie                          | Grilles en attente : validez-les (_Modération_) ou mettez `AUTO_VALIDATE=true`. Les 5 grilles de départ sont déjà validées. |
| Build Docker lent / échoue sur `pnpm install`          | Vérifiez l'accès réseau du serveur (registre npm) et l'espace disque (`docker system prune`).                               |

Logs : Dokploy → service → **Logs** (choisir le conteneur `web` ou `api`).

---

## Test en local avant de déployer (facultatif)

```bash
SITE_URL=http://localhost:8080 JWT_SECRET=un-secret-de-test-assez-long-0123456789 \
  docker compose -f compose.yaml -f compose.local.yaml up --build
# → http://localhost:8080
```
