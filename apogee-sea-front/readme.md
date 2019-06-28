## Projet Kit de démarrage : exemple front

[![Coverage](https://devin-qualite.rte-france.com/api/badges/measure?key=com.rte_france.apogee%3Aapogee-sea-front&metric=coverage)](https://devin-qualite.rte-france.com/component_measures/metric/coverage/list?id=com.rte_france.apogee%3Aapogee-sea-front) [![Quality Gate](https://devin-qualite.rte-france.com/api/badges/gate?key=com.rte_france.apogee%3Aapogee-sea-front)](https://devin-qualite.rte-france.com/dashboard?id=com.rte_france.apogee%3Aapogee-sea-front)

Kit de démarrage illustrant l'intégration d'une application Front Angular avec apache aux offres DevOps RTE.
Elle est munie:
* d'un [back en java](https://devin-source.rte-france.com/cetautomatix/cetautomatix-back/)
* d'un front Angular

> Les fichiers Jenkinsfile de Cetautomatix utilisent des fonctions des [Pipeline lib devin](https://devin-source.rte-france.com/devin/pipelines-lib) version **02.10.00 minimum**

### Organisation des sources

```sh
├── e2e                      # Tests end to end
├── src                      # Code source applicatif  
├── .angular-cli.json        # Configuration client angular                  
├── .editorconfig            # Configuration IDE
├── Dockerfile               # Image Docker                 
├── entrypoint.sh            # Entrypoint pour le remplacement de variables de configuration dans l'image docker
├── Jenkinsfile              # Implémentation de l'intégration continue       
├── karma.conf.js            # Configuration de Karma (TU)  
├── package.json             # Dépendances npm
├── protractor.conf.js       # Configuration de protractor (tests E2E)
├── proxy-dev.conf.json      # Configuration reverse proxy en environnement de dev
├── proxy.conf               # Configuration reverse proxy copié dans l'image docker
├── README.md
├── sonar-project.properties # exemple de configuration sonar, pour une analyse hors maven
├── tsconfig.json            # Configuration typescript
└── tslint.json              # Configuration linter typescript 
```

### Développement en local
Autoriser les requêtes Cross-Platform dans le but de pouvoir tester une API REST d'un serveur distant ou local.

* Modifier le fichier /package.json.
  * Il faut modifier la ligne de la commande "start" comme ceci:

```js
"start": "ng serve --proxy-config proxy-dev.conf.json"
```

#### Cas du backend en local
* Ajouter le fichier /proxy-dev.conf.json pour tester une API REST d'un serveur local. Voici le contenu de ce dernier:

```js
{
  "/api/*": {
    "target": "http://localhost:8080",
    "secure": false,
    "logLevel": "debug",
    "changeOrigin": true
   }
}
```
#### Cas du backend sur un serveur distant
* Faire de même que le point précédent en y remplaçant le contenu du fichier par:

```js
{
  "/api/*": {
    "target": "http://ip_du_backend_distant",
    "secure": false,
    "logLevel": "debug",
    "changeOrigin": true
   }
}
```

### Tests unitaires
Karma est configuré pour utiliser phantomJS au lieu de chrome, ce qui permet d'exécuter les TU sans navigateur.

* Pour tester

```sh
npm run-script test
```
