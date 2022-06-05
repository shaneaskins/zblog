#!/bin/sh

# Globals
BASE_DIR=`pwd`

# Setup server
cd $BASE_DIR/server
npx knex migrate:rollback
npx knex migrate:latest
npx knex seed:run

# Begin
cd $BASE_DIR
node .