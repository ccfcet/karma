#!/usr/bin/env bash

cd ./lib/data
npm install
cd ../..

cd ./lib/authentication
npm install
cd ../..

ln -s ../lib ./node_modules/_
