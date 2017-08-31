#!/usr/bin/env bash
cd /universe/Neeis/

grep -R --exclude-dir=logs --exclude-dir=target  "$1"  .
echo "grep -R --exclude-dir=logs --exclude-dir=target "
echo "$1"
pwd