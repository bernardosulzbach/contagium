npm install
gulp
git clone --depth 1 git@github.com:contagium/contagium.github.io.git
cp -r dist/* contagium.github.io/
cd contagium.github.io
git add .
git commit -am "Updated the website"
git push
cd ..
rm -rf contagium.github.io
