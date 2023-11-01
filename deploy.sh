echo "Switching to branch master"
git checkout master

echo "Building app..."
npm run build

echo "Deploying files to server..."
scp -r dist/* react@95.179.190.14:/var/www/95.179.190.14/

echo "Done"