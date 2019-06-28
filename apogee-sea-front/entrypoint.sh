#!/bin/bash


# Remplacement d'une liste de variable par leur valeur
# arg 1 : le fichier concerné
# arg 2 : la liste de variable 
majConfiguration(){
    FILE=$1
    shift
    VARIABLES=($@)

    for variable in ${VARIABLES[@]}; do
        # Remplacement de {{variable}} par sa valeur
        sed -ri "s|[{]{2}$variable[}]{2}|${!variable}|g" ${FILE}
    done

}

start(){
    # lancement d'apache
    exec httpd -DFOREGROUND
}

# Récupération du fichier APP (le plus récent si il y'en a plusieurs)
JS_APP_FILE=`ls -1 /var/www/html/scripts/app-*.js | head -1`

# Exemple d'utilisation
# Remplacement du token {{URL_BACKEND}} présent dans les fichiers JS par la valeur de variable d'environnement du même nom
majConfiguration ${JS_APP_FILE} URL_BACKEND VARIABLE_EXEMPLE
# Lancement de l'application
start
