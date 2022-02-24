#!/bin/bash
COMPOSER_VERSION="2.0"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

help() {
  echo -e "${YELLOW}COMMANDS:"
  echo -e "${GREEN}./project.sh app"
  echo -e "./project.sh serve --stop-others"
  echo -e "${NC}"
}

if test "$1" = "app"
then
  docker-compose exec app bash
elif test "$1" = "serve"
then
  if test "$2" = "--stop-others"
  then
    docker stop $(docker ps -a -q)
  fi
  docker-compose -f docker-compose.yml up -d
else
  help
fi