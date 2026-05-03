## ADDED Requirements

### Requirement: Affichage de la zone de dépôt
L'application SHALL afficher une zone de dépôt de fichier visible et identifiable sur l'écran principal, permettant à l'utilisateur de déposer un fichier CSV ou de le sélectionner via un clic.

#### Scenario: Zone visible au démarrage
- **WHEN** l'utilisateur ouvre l'application sans données chargées
- **THEN** la zone de dépôt est affichée en position centrale avec un texte d'invite ("Déposez votre fichier CSV ici ou cliquez pour parcourir")

#### Scenario: Sélection par clic
- **WHEN** l'utilisateur clique sur la zone de dépôt
- **THEN** le sélecteur de fichier natif du navigateur s'ouvre, filtré sur les fichiers `.csv`

### Requirement: Retour visuel lors du survol (drag-over)
La zone de dépôt SHALL changer d'apparence visuellement lorsqu'un fichier est glissé au-dessus d'elle.

#### Scenario: Survol avec un fichier valide
- **WHEN** l'utilisateur fait glisser un fichier au-dessus de la zone
- **THEN** la zone affiche un style de survol distinct (bordure en pointillés bleue, fond légèrement coloré)

#### Scenario: Fin du survol sans dépôt
- **WHEN** l'utilisateur quitte la zone sans déposer le fichier
- **THEN** la zone retrouve son apparence initiale

### Requirement: Validation du type de fichier déposé
La zone de dépôt SHALL rejeter tout fichier qui n'est pas de type `.csv` et informer l'utilisateur de l'erreur.

#### Scenario: Dépôt d'un fichier non-CSV
- **WHEN** l'utilisateur dépose un fichier dont l'extension n'est pas `.csv`
- **THEN** la zone affiche un message d'erreur ("Format non supporté. Veuillez importer un fichier .csv.") et le fichier n'est pas traité

#### Scenario: Dépôt d'un fichier CSV valide
- **WHEN** l'utilisateur dépose un fichier `.csv`
- **THEN** le fichier est transmis au module de parsing et la zone affiche un indicateur de chargement

### Requirement: Retour visuel après chargement réussi
La zone de dépôt SHALL indiquer clairement que le chargement et le parsing ont réussi.

#### Scenario: Parsing réussi
- **WHEN** le fichier CSV est parsé sans erreur
- **THEN** la zone affiche le nom du fichier chargé et le nombre de lignes importées

#### Scenario: Erreur de parsing
- **WHEN** le parsing du fichier échoue (fichier vide, colonnes manquantes critiques)
- **THEN** la zone affiche un message d'erreur explicite et permet à l'utilisateur de retenter un import
