#!/usr/bin/env bash

rm -rf node_modules
rm package-lock.json
npm config set registry https://repo1.uhc.com/artifactory/api/npm/npm-virtual/
npm install
