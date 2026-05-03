## ADDED Requirements

### Requirement: Affichage du Pipeline Global
Le système SHALL calculer et afficher la somme de tous les montants de la colonne `Montant Deal` des lignes chargées en mémoire, formatée en euros.

#### Scenario: Données CSV chargées avec montants valides
- **WHEN** l'utilisateur importe un CSV contenant plusieurs lignes avec des valeurs numériques dans `Montant Deal`
- **THEN** le KPI "Pipeline Global" affiche la somme totale formatée (ex : "125 000 €")

#### Scenario: Tous les montants sont à zéro ou absents
- **WHEN** toutes les lignes ont un `Montant Deal` nul ou non renseigné
- **THEN** le KPI "Pipeline Global" affiche "0 €"

### Requirement: Affichage du Panier Moyen
Le système SHALL calculer et afficher le montant moyen par dossier (Pipeline Global / nombre de lignes), formaté en euros, avec un garde contre la division par zéro.

#### Scenario: CSV avec plusieurs lignes
- **WHEN** le CSV contient N lignes avec des montants
- **THEN** le KPI "Panier Moyen" affiche le résultat de la division arrondi à l'euro près

#### Scenario: CSV vide (0 lignes de données)
- **WHEN** le CSV ne contient aucune ligne de données après parsing
- **THEN** le KPI "Panier Moyen" affiche "0 €" sans erreur de division par zéro

### Requirement: Affichage du Volume de Prospects
Le système SHALL afficher le nombre total de lignes présentes dans les données chargées, représentant le volume de dossiers actifs.

#### Scenario: CSV importé avec succès
- **WHEN** un CSV valide est chargé avec N lignes de données
- **THEN** le KPI "Volume de Prospects" affiche le nombre N

#### Scenario: Aucun fichier chargé
- **WHEN** l'application est ouverte sans import CSV
- **THEN** le bandeau KPI n'est pas affiché (état masqué)

### Requirement: Affichage conditionnel du bandeau KPI
Le système SHALL afficher le bandeau KPI uniquement lorsque des données sont disponibles (`isLoaded === true`), et le masquer dans le cas contraire.

#### Scenario: Avant tout import
- **WHEN** l'utilisateur n'a pas encore importé de fichier CSV
- **THEN** le bandeau KPI est absent de la page

#### Scenario: Après import réussi
- **WHEN** le parsing du CSV est terminé sans erreur
- **THEN** le bandeau KPI apparaît en haut de la page avec les trois métriques calculées
