## MODIFIED Requirements

### Requirement: Exposition des données parsées via un contexte global
Le système SHALL mettre à disposition les données nettoyées (tableau de `Deal`) via un `DealsContext` React accessible depuis n'importe quel composant enfant, ainsi que les métriques agrégées calculées à partir de ces données.

#### Scenario: Données disponibles après import réussi
- **WHEN** le parsing et le nettoyage d'un fichier CSV sont terminés sans erreur
- **THEN** le `DealsContext` est mis à jour avec le nouveau tableau de deals et tous les composants consommateurs sont re-rendus avec les nouvelles données

#### Scenario: Aucun fichier chargé
- **WHEN** l'application démarre sans import
- **THEN** le `DealsContext` expose un tableau vide `[]` et un état `isLoaded: false`

#### Scenario: Métriques agrégées disponibles après import
- **WHEN** le parsing du CSV est terminé avec au moins une ligne de données
- **THEN** le `DealsContext` expose `totalAmount` (somme de `Montant Deal`) et `dealsCount` (nombre de lignes) calculés à partir des données parsées
