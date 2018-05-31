#!/usr/bin/env bash

cd ./lib/data
npm install
cd ../..
ln -s ../lib ./node_modules/_
