#/bin/bash
IMAGE=$(docker container ls | grep pm_db | awk '{print $1}')
echo $IMAGE
echo $(date +"%Y-%m-%d_%T")
docker exec $IMAGE sh -c 'exec mysqldump -uroot -p"$MYSQL_ROOT_PASSWORD" pm3' > /home/pmadmin/pm/backup/pm3_$(date +"%Y-%m-%d_%T").sql
echo ""

