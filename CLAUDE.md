# CLAUDE.md — Dashboard CRM "Flash"

## Aperçu de l'objectif du projet

Application web légère (client-side uniquement, sans backend) permettant à un chef d'entreprise de visualiser instantanément la santé financière de son pipeline commercial à partir d'un export CSV. L'accent est mis sur la valeur des deals et l'urgence hebdomadaire.

Roadmap : MVP → V1 → V2 (voir `PRD.md` pour le détail).

---

## Aperçu de l'architecture globale

| Rôle | Technologie |
|---|---|
| Framework UI | React 18.x |
| Build tool | Vite 5.x |
| Styling | Tailwind CSS 3.x |
| Graphiques | Recharts |
| Parsing CSV | PapaParse |
| Composants UI | shadcn/ui |

- Mode : client-side uniquement, aucun backend
- Persistance : aucune (données en mémoire le temps de la session)
- Auth : aucune — accès direct sans authentification

---

## Style visuel

- Interface claire et minimaliste
- Pas de mode sombre pour le MVP
- Code couleur : rouge (retards), vert (gagné), bleu (pipeline en cours)

---

## Contraintes et Politiques

- NE JAMAIS exposer les clés API au client

---

## Dépendances

- Préférer les composants existants (shadcn/ui, Recharts, PapaParse) plutôt que d'ajouter de nouvelles bibliothèques UI

---

## Tests interface graphique

À la fin de chaque développement impliquant l'interface graphique, tester avec le skill `playwright-skill`. L'interface doit être :
- Responsive
- Fonctionnelle
- Conforme au besoin développé

---

## Documentation

- Spécifications fonctionnelles : [PRD.md](./PRD.md)
- Architecture technique : [ARCHITECTURE.md](./ARCHITECTURE.md)

---

## Context7

Utiliser systématiquement Context7 (outils MCP `mcp__context7__resolve-library-id` puis `mcp__context7__query-docs`) pour toute génération de code, étape de configuration/installation, ou documentation de bibliothèque/API — sans attendre une demande explicite.

---

## OpenSpec & Spécifications

Toutes les spécifications doivent être rédigées en français, y compris les specs OpenSpec (sections Purpose et Scenarios). Seuls les titres de Requirements doivent rester en anglais avec les mots-clés SHALL/MUST pour la validation OpenSpec.
