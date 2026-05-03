## Context

L'application est une SPA React 18 sans backend. Il n'existe actuellement aucun mécanisme pour charger des données : les composants de visualisation (KPI, graphiques) ne peuvent pas fonctionner sans un jeu de données en mémoire. Ce module constitue le point d'entrée unique des données pour toute la session.

Contraintes clés :
- Client-side uniquement — aucune requête serveur.
- PapaParse est déjà déclaré comme dépendance du projet.
- Les données parsées doivent être accessibles à tous les futurs composants (KPI, charts, tableaux).

## Goals / Non-Goals

**Goals:**
- Permettre à l'utilisateur de déposer ou sélectionner un fichier `.csv`.
- Parser le fichier et normaliser les colonnes critiques (montants, dates).
- Exposer les données nettoyées via un contexte React global.
- Fournir un retour visuel clair (drag-over, chargement, erreur, succès).

**Non-Goals:**
- Validation métier avancée du contenu CSV (hors scope MVP).
- Support multi-fichiers ou mise à jour incrémentale.
- Persistance des données entre sessions (pas de localStorage pour le MVP).
- Mapping dynamique des colonnes par l'utilisateur.

## Decisions

### 1. PapaParse pour le parsing

**Décision :** Utiliser `Papa.parse()` en mode `worker: false` (synchrone côté client).  
**Rationale :** PapaParse est déjà une dépendance du projet, gère les encodages courants, et son option `header: true` produit directement des objets indexés par nom de colonne.  
**Alternative écartée :** Parsing manuel avec `String.split()` — trop fragile face aux virgules dans les valeurs, aux guillemets, aux sauts de ligne dans les cellules.

### 2. Hook `useCsvParser` pour la logique de nettoyage

**Décision :** Isoler le parsing et le nettoyage dans un hook custom `useCsvParser(file)` qui retourne `{ data, error, isLoading }`.  
**Rationale :** Sépare la logique métier (parsing, nettoyage) de l'UI (dropzone), facilite les tests unitaires du hook indépendamment du composant visuel.  
**Alternative écartée :** Logique inline dans le composant `CsvDropzone` — couplage trop fort, difficile à tester.

### 3. React Context pour l'état global des deals

**Décision :** Créer un `DealsContext` (Provider + `useDeals` hook) pour distribuer les données parsées à l'ensemble de l'arbre de composants.  
**Rationale :** Solution native React, sans dépendance additionnelle, suffisante pour le volume de données d'un CSV de pipeline commercial (quelques centaines de lignes max).  
**Alternative écartée :** Zustand ou Redux — overkill pour le MVP, ajouterait une dépendance externe.

### 4. Nettoyage des données : approche par nom de colonne fixe

**Décision :** Cibler des noms de colonnes prédéfinis (`Amount`, `Date Created`, `Due Date`) pour le nettoyage.  
**Rationale :** Le format du CSV export est connu et stable (export depuis un CRM spécifique). Un mapping dynamique est hors scope MVP.  
**Risque accepté :** Si le CSV source change de nommage, il faudra mettre à jour les constantes de mapping.

## Risks / Trade-offs

- **[Risque] Encodage CSV non-UTF-8** → Mitigation : PapaParse détecte automatiquement l'encodage ; documenter dans l'UI que l'export doit être en UTF-8.
- **[Risque] Noms de colonnes variables selon le CRM source** → Mitigation : centraliser les noms de colonnes dans un fichier de constantes `src/config/csvColumns.ts` pour faciliter l'adaptation.
- **[Trade-off] React Context vs store** : le Context peut causer des re-renders globaux si mal utilisé — mitigation : mémoïser la valeur du contexte avec `useMemo`.
