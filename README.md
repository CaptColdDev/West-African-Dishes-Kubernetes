Process
I'll use a video to demonstrate the project
Create a GCP Account
k8s-microservices-demo
Directories and files created for Frontend, Backend, Secrets, Database and k8s.
Frontend —> LoadBalancer –> React → Deployment + service files → App file + Dockerfile
Backend —-> ClusterIP –> node.js + Express → Deployment + service files →  App file + Dockerfile
Database —-> ClusterIP –> mySQL → statefulset + service files + secrets → App file + Dockerfile (Where is the mysql?)
West African Dish App

Command used
Build the Image: docker build -t sekou4991/african-menu-api:v1 .
Push to DockerHub (registry): docker push sekou4991/african-menu-api:v1
Docker info
Docker images
echo -n "mysql-service" | base64
echo -n "sekou" | base64
echo -n "password" | base64

Accessing the mySQL pod and add data

kubectl get pods
kubectl exec -it mysql-0 -- bash
mysql -u sekou -p
Select the database: USE dishes_db;
Create table dishes
Insert data into the table dishes
verify : SELECT * FROM dishes;

Create the react app on the front-end: npx create-react-app .
npm start    # for development
npm run build  # for production build
Set the resource limit and request due to GCP limited deals
To test connectivity of the frontend: kubectl exec -it <frontend-pod-name> -- /bin/sh
Curl the backend: curl http://backend-service:5000/dishes
kubectl logs <frontend-pod-name>
kubectl logs <backend-pod-name>
Quick internal test for the backend:
kubectl run tmp-shell --rm -i --tty --image=alpine -- /bin/sh
apk add curl
curl http://backend-service:5000/dishes
Coding and rebuilding the Docker image with new version
docker build -t sekou4991/mankan-menu:v2 .
docker push sekou4991/mankan-menu:v2
Edit deployment with the yaml file:
image: sekou4991/mankan-menu:v2
kubectl apply -f mankan-frontend.yaml
Or
kubectl set image deployment/mankan-menu \
mankan-frontend=sekou4991/mankan-menu:v2
Check the backend logs
kubectl logs -l app=backend-api
Test mySQL connection from backend pod
kubectl exec -it <backend-pod> -- sh
apk add mysql-client
mysql -h mysql-service -u <user> -p
Test mySQL connection from backend pod
kubectl exec -it $(kubectl get pod -l app=backend-api -o jsonpath="{.items[0].metadata.name}") -- sh
apk add mysql-client
mysql -h mysql-service -u sekou -p
Connect to the mySQL properly (ignored SSL)
kubectl exec -it mysql-0 -- mysql -u root -p --ssl-mode=DISABLED
Go inside the mySQL
kubectl exec -it mysql-0 -- mysql -u root -p
Go inside the backend pod
kubectl exec -it $(kubectl get pod -l app=backend-api -o jsonpath="{.items[0].metadata.name}") -- sh
Grant Privilege to user “sekou”
GRANT ALL PRIVILEGES ON dishes_db.* TO 'sekou'@'%';
FLUSH PRIVILEGES;
SELECT user, host FROM mysql.user;

Make curl useful in the k8s folder
kubectl exec -it $(kubectl get pod -l app=backend-api -o jsonpath="{.items[0].metadata.name}") -- sh
apk add curl
curl http://localhost:5000/dishes
