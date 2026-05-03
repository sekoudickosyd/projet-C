## Why

Le chef d'entreprise a besoin d'une vue synthétique immédiate de la santé de son pipeline commercial dès le chargement du fichier CSV. Sans indicateurs agrégés en haut de page, l'utilisateur ne peut pas évaluer rapidement la valeur totale de ses opportunités, le ticket moyen ou le volume de prospects actifs.

## What Changes

- Ajout d'une section KPI en haut de la page principale, affichée après import CSV
- Calcul et affichage de trois métriques clés dérivées des données CSV importées :
  - **Pipeline Global** : somme de la colonne `Montant Deal`
  - **Panier Moyen** : montant total divisé par le nombre de lignes
  - **Volume de Prospects** : nombre total de dossiers (lignes) actifs

## Capabilities

### New Capabilities
- `kpi-dashboard` : Bandeau de KPIs en haut de page affichant Pipeline Global, Panier Moyen et Volume de Prospects, calculés dynamiquement à partir des données CSV chargées en mémoire.

### Modified Capabilities
- `csv-parsing` : La logique de parsing doit exposer les données agrégées (somme du montant, nombre de lignes) nécessaires aux KPIs.

## Impact

- **Composants** : nouveau composant `KpiBar` (ou `KpiCards`) à créer dans `src/components/`
- **État applicatif** : les données parsées doivent alimenter les calculs KPI
- **Dépendances** : aucune nouvelle bibliothèque — utilisation de Recharts/shadcn existants pour le rendu des cartes
- **Colonnes CSV attendues** : `Montant Deal` (numérique), présence d'au moins une ligne
