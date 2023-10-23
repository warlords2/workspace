#!/bin/bash

git submodule init
git submodule update --force --recursive --init --remote
npm install
npm run mounted