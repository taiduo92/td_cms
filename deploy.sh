#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
# echo 'www.taiduo.vip' > CNAME

git init
git add -A
git commit -m 'deploy'

# if you are deploying to https://<td_cms.github.io>.github.io
# git push -f git@github.com:<td_cms.github.io>/<td_cms.github.io>.github.io.git master

# if you are deploying to https://<td_cms.github.io>.github.io/<REPO>
# git push -f git@github.com:<td_cms.github.io>/<REPO>.git master:gh-pages

cd -