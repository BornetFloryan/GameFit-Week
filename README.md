# GameFit Week

Bienvenue dans le projet **GameFit Week** !

## Prérequis

Avant de commencer, vous devez vous assurer que vous avez installé les outils suivants :

- **Node.js** : Le runtime JavaScript pour exécuter le projet.
- **npm** : Le gestionnaire de paquets pour installer les dépendances.

Vous pouvez vérifier si ces outils sont installés sur votre machine en exécutant les commandes suivantes :

```bash
node -v
npm -v
```

Si Node.js ou npm n'est pas installé, vous pouvez télécharger et installer la dernière version de Node.js depuis [leur site officiel](https://nodejs.org/).

## Setup du projet

Suivez les étapes ci-dessous pour cloner et configurer le projet sur votre machine.

### 1. Clonez le dépôt GitHub

Commencez par cloner ce projet sur votre machine en utilisant la commande suivante dans votre terminal :

```bash
git clone https://github.com/BornetFloryan/GameFit-Week.git
```

### 2. Accédez au dossier du projet

Après avoir cloné le dépôt, déplacez-vous dans le dossier du projet :

```bash
cd GameFit-Week
```

### 3. Installez les dépendances

Ensuite, installez toutes les dépendances nécessaires au projet avec npm :

```bash
npm install
```

Cette commande téléchargera et installera toutes les bibliothèques et dépendances spécifiées dans le fichier `package.json`.

### 4. Lancez le serveur de développement

Une fois les dépendances installées, vous pouvez démarrer le serveur local pour exécuter l'application. Exécutez la commande suivante :

```bash
npm run serve
```

Le projet sera alors accessible à l'adresse suivante : [http://localhost:8080](http://localhost:8080) dans votre navigateur.

## Problèmes fréquents

Voici quelques solutions aux problèmes fréquemment rencontrés :

- **Erreur : 'npm install' échoue** : si `npm install` échoue, essayez de supprimer le dossier `node_modules` et le fichier `package-lock.json`, puis réessayez avec les commandes suivantes :

    ```bash
    rm -rf node_modules
    rm package-lock.json
    npm install
    ```

- **Problème de port déjà occupé** : Si le port 8080 est déjà utilisé par une autre application, vous pouvez changer de port en modifiant les fichiers de configuration du projet ou en spécifiant un autre port via la commande :

    ```bash
    npm run serve -- --port 3000
    ```
