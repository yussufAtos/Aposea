FROM rtsi.inca.rte-france.com/apache:2.4.6-rhel7.2

USER root

# Si besoin d'un fichier de configuration apache spécfique
COPY proxy.conf /etc/httpd/conf.d/
RUN chown -R apache:apache /etc/httpd/conf.d/
USER apache  


# Exemple de copie de l'application Javascript
COPY dist /var/www/html/



# Optionnel : Ajout d'un entrypoint pour le remplacement de variable de configuration

# COPY entrypoint.sh /entrypoint.sh
# USER root
# RUN chmod 755 /entrypoint.sh \
# 	&& chown -R apache:apache /var/www/html/
# USER apache

# ENTRYPOINT [ "/entrypoint.sh" ] 
