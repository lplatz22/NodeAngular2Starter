cd ../
ng build --env=prod
cf api https://api.ng.bluemix.net
cf login -u USER@EXAMPLE.COM -o ORG_NAME -s SPACE_NAME -sso
cf push -f manifest.yml