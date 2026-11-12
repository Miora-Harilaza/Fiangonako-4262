# App template

Runable copies this Bun and Turborepo project into each new sandbox.

The root package commands are the external contract:

- `bun run dev` starts the web app.
- `bun run dev:desktop` and `bun run dev:mobile` start platform clients.
- `bun run build` builds every package.
- `bun run start` starts or restarts the production server.
- `bun run stop` stops the production server.
- `bun run lint` and `bun run typecheck` validate the project.
- The `db:generate`, `db:migrate`, and `db:push` commands manage the database.

Deployment tools depend on these command names. Their implementations may change, but the names must remain stable.

The web package owns the API, database, and shared web interface. The mobile package is an Expo client. The desktop package is an Electron shell around the web app. Services use the fixed ports defined in `__ports.cjs`, and the web health endpoint is `/api/health`.

Secrets belong in the root `.env` file. Browser values must use the `VITE_` prefix. Commands prefixed with `internal:` are for template maintenance.

## FJKM ANTSOMAFI

Site public en malagasy : `/`, `/momba`, `/hetsika`, `/vondrona`, `/toriteny`, `/sary`, `/fifandraisana`. Gestion privée sur `/admin` : Google (Runable managed auth) ou email/mot de passe, avec autorisation administrateur explicite côté serveur.

### Activer un administrateur
1. Le propriétaire crée son compte sur `/admin` (ou se connecte avec Google).
2. Après vérification de l’identité du compte par le propriétaire du projet, un opérateur autorisé exécute depuis `packages/web` :
   `bun --env-file=../../.env scripts/authorize-admin.ts ADRESSE_EMAIL`
3. Le titulaire recharge `/admin`. Aucun compte n’est automatiquement administrateur. Il n’y a pas de route publique pour attribuer ce rôle.

### Contenu à finaliser
- Horaire fourni : 09h00 ; le jour reste à préciser.
- Adresse fournie : Antsongo, Antsirabe ; le lien de carte cherche le quartier, pas un emplacement GPS vérifié.
- Téléphone, mail de contact, histoire et noms des responsables à fournir.
- Les trois événements initiaux et les textes de fisaintsainana sont des exemples. Les groupes sont proposés à confirmer.
- Photos d’illustration issues de la recherche Unsplash, à remplacer par les photos autorisées de l’église. Les légendes l’indiquent.
- Logo proposé : `packages/web/public/logo-antsomafi.svg`, non officiel.

### Vérifications réalisées
Compilation TypeScript/build, lint, navigation desktop/mobile, filtres d’événements, export ICS, lecture des textes et galerie, inscription email, protections API 401/403, ajout/modification/suppression événements et membres avec persistance. Les comptes et données de test sont supprimés. Le parcours Google est intégré au broker ; la connexion à un véritable compte Google doit être validée par son titulaire.
