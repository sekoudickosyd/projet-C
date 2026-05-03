## Context

L'application dispose déjà d'un `DealsContext` qui expose le tableau de deals parsés depuis le CSV. Les données sont en mémoire uniquement pour la durée de la session. Le composant principal (`App.tsx` ou équivalent) orchestre l'affichage post-import.

L'objectif est d'ajouter un bandeau de trois cartes KPI en haut de la page, visible dès que des données sont chargées, sans nouveau backend ni persistance.

## Goals / Non-Goals

**Goals:**
- Afficher trois KPIs calculés côté client depuis `DealsContext` : Pipeline Global, Panier Moyen, Volume de Prospects
- Le calcul doit se rafraîchir automatiquement si les données changent (nouveau CSV chargé)
- Utiliser uniquement les composants shadcn/ui existants pour les cartes

**Non-Goals:**
- Filtrage ou segmentation des KPIs (appartient à V1+)
- Persistance des valeurs entre sessions
- Exportation des KPIs

## Decisions

### Décision 1 : Calcul dans le composant vs hook dédié
**Choix** : Hook personnalisé `useKpiMetrics(deals)` qui retourne `{ pipelineTotal, averageBasket, prospectsCount }`.

**Rationale** : Sépare la logique de calcul du rendu, facilite les tests unitaires futurs. Le composant `KpiBar` reste un composant de présentation pur.

**Alternative écartée** : Calcul inline dans `KpiBar` — couplage fort, logique non réutilisable.

### Décision 2 : Colonne source pour `Montant Deal`
**Choix** : Utiliser le champ `montantDeal` (ou la clé brute `Montant Deal` normalisée par PapaParse) tel qu'il est déjà converti en `number` par le parsing existant.

**Rationale** : La spec `csv-parsing` garantit déjà la conversion numérique des colonnes montant — aucune conversion supplémentaire nécessaire dans le KPI hook.

### Décision 3 : Affichage conditionnel
**Choix** : `KpiBar` n'est rendu que si `isLoaded === true` dans `DealsContext`.

**Rationale** : Évite d'afficher des zéros trompeurs avant tout import.

## Risks / Trade-offs

- [Nom de colonne variable] → Si le CSV de l'utilisateur n'utilise pas exactement `Montant Deal`, les KPIs afficheront 0. Mitigation : documenter la colonne attendue dans l'UI (placeholder du dropzone).
- [Division par zéro pour Panier Moyen] → Si le CSV est vide (0 lignes), retourner `0` plutôt que `NaN`. Mitigation : guard clause dans le hook.
