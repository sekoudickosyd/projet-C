## ADDED Requirements

### Requirement: Parsing du fichier CSV avec PapaParse
Le système SHALL utiliser PapaParse pour lire le contenu du fichier CSV avec l'option `header: true`, produisant un tableau d'objets indexés par nom de colonne.

#### Scenario: Fichier CSV bien formé
- **WHEN** l'utilisateur dépose un fichier CSV valide avec des en-têtes
- **THEN** PapaParse retourne un tableau d'objets où chaque objet représente une ligne du CSV avec les noms de colonnes comme clés

#### Scenario: Fichier CSV vide ou sans lignes de données
- **WHEN** le fichier CSV ne contient que les en-têtes ou est vide
- **THEN** le système retourne un tableau vide et signale une erreur "Aucune donnée trouvée dans le fichier"

### Requirement: Nettoyage et conversion des colonnes de montants
Le système SHALL convertir en `number` les colonnes contenant des montants financiers en supprimant tout symbole monétaire (`€`, `$`), les espaces, et en normalisant le séparateur décimal (`,` → `.`).

#### Scenario: Montant avec symbole euro et espace
- **WHEN** une cellule de la colonne `Amount` contient une valeur comme `"1 500 €"` ou `"€1500,00"`
- **THEN** la valeur est convertie en nombre JavaScript `1500` ou `1500.00`

#### Scenario: Montant déjà numérique
- **WHEN** une cellule de la colonne `Amount` contient une valeur numérique sans formatage
- **THEN** la valeur est convertie en `number` sans transformation supplémentaire

#### Scenario: Montant manquant ou non parseable
- **WHEN** une cellule de montant est vide ou contient une valeur non convertible
- **THEN** la valeur est remplacée par `0` et la ligne reste incluse dans les résultats

### Requirement: Conversion des colonnes de dates en objets Date
Le système SHALL convertir les colonnes `Date Created` et `Due Date` en objets `Date` JavaScript valides.

#### Scenario: Date au format ISO 8601
- **WHEN** une cellule de `Date Created` ou `Due Date` contient une date au format `YYYY-MM-DD`
- **THEN** la valeur est convertie en objet `Date` JavaScript valide correspondant à cette date

#### Scenario: Date au format DD/MM/YYYY
- **WHEN** une cellule contient une date au format `DD/MM/YYYY`
- **THEN** la valeur est correctement parsée et convertie en objet `Date` JavaScript valide

#### Scenario: Date manquante ou invalide
- **WHEN** une cellule de date est vide ou contient une chaîne non parseable
- **THEN** la valeur est remplacée par `null` et la ligne reste incluse dans les résultats

### Requirement: Exposition des données parsées via un contexte global
Le système SHALL mettre à disposition les données nettoyées (tableau de `Deal`) via un `DealsContext` React accessible depuis n'importe quel composant enfant.

#### Scenario: Données disponibles après import réussi
- **WHEN** le parsing et le nettoyage d'un fichier CSV sont terminés sans erreur
- **THEN** le `DealsContext` est mis à jour avec le nouveau tableau de deals et tous les composants consommateurs sont re-rendus avec les nouvelles données

#### Scenario: Aucun fichier chargé
- **WHEN** l'application démarre sans import
- **THEN** le `DealsContext` expose un tableau vide `[]` et un état `isLoaded: false`
