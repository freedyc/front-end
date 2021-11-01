#!/bin/bash

cp -r ../dist ./

docker build -t freedyc .

rm -rf ./dist

docker rm -f freedyc

docker run --name freedyc -p 80:80 -d freedyc
