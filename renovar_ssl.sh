
 #!/bin/bash 
 echo "restartando nginx_HA"
docker exec -it nginx_ha nginx -t && nginx -s reload
echo "Operação finalizada"
