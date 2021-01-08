#!/bin/bash
# executa os containers do nginx e nginx_HA
#
echo "Executando containers do nginx"
docker-compose up -d

echo "Operação efetuada com sucesso"
