#!/bin/bash

BRANCH_NAME=$(git branch --show-current)

case $BRANCH_NAME in
  "main")
    cp src/environments/environment.prod.ts src/environments/environment.ts
    ;;
  "staging")
    cp src/environments/environment.staging.ts src/environments/environment.ts
    ;;
  *)
    cp src/environments/environment.dev.ts src/environments/environment.ts
    ;;
esac
