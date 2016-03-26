gulp
cp -r dist/* ../contagium.github.io/
cd ../contagium.github.io
git add .
git commit -am "Updated the website"
git push
