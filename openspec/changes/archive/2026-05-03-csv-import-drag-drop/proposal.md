## Why

L'application ne peut pas encore ingérer de données : sans module d'import CSV, le tableau de bord reste vide et sans valeur pour le chef d'entreprise. Cette fondation est indispensable avant toute visualisation du pipeline commercial.

## What Changes

- Ajout d'une zone de Drag & Drop (et sélection par clic) pour charger un fichier `.csv`.
- Parsing du fichier via PapaParse avec nettoyage automatique des données brutes.
- Conversion des colonnes de montants (suppression des symboles `€`, espaces, virgules) en `number`.
- Conversion des colonnes `Date Created` et `Due Date` en objets `Date` JavaScript.
- Mise à disposition des données nettoyées dans l'état global de l'application (React state / context).

## Capabilities

### New Capabilities

- `csv-dropzone`: Zone de dépôt et de sélection de fichier CSV avec retour visuel (drag-over, erreur, succès).
- `csv-parsing`: Lecture et nettoyage du fichier CSV — normalisation des montants et conversion des dates.

### Modified Capabilities

*(aucune — première fonctionnalité de l'application)*

## Impact

- **Nouveau composant** : `CsvDropzone` (zone de Drag & Drop).
- **Nouveau service/hook** : `useCsvParser` — orchestre PapaParse + nettoyage des données.
- **Dépendance** : PapaParse (déjà listée dans les dépendances du projet).
- **État global** : introduction d'un `AppContext` ou d'un store léger pour exposer les `deals` parsés aux futurs composants de visualisation.
