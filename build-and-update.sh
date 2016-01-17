gulp
cp -r dist/* ../infection-website/
cd ../infection-website
git add .
git commit -am "Updated the website"
git push
