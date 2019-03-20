#!/bin/bash

set -e

NWVERSION="v0.37.0"
V="v1.0.0"
N="vector"
PREFIX=""

# command line arguments
while [[ $# -gt 1 ]]
do
key="$1"

case $key in
  -n|--name)
  N="$2"
  shift
  ;;
  -p|--prefix)
  PREFIX="$2"
  shift
  ;;
  -w|--nwversion)
  NWVERSION="$2"
  shift
  ;;
  -v|--version)
  V="$2"
  shift
  ;;
  *)
  ;;
esac
shift
done

URL="http://dl.nwjs.io/"$NWVERSION
NWV=$PREFIX$NWVERSION

urlget() {
    if ! [ -f "$2" ]; then
        if hash wget 2>/dev/null; then
            wget "$1" -O "$2"
        elif hash curl 2>/dev/null; then
            curl "$1" -o "$2"
        else
            echo "wget or curl must be installed."
            exit 1
        fi
    fi
}

cp riscv-v-spec/*.svg page/
cp riscv-v-spec/*.svg nwapp/

node ./bin/build-nwapp.js
node ./bin/build.js

mkdir -p build

rm -rf build/*

# make app
# pushd nwapp && zip -r ../build/"${N}"-${V}.nw * && popd

mkdir -p cache
rm -rf cache/*/*

# get and unpack NWJS packages
for P in linux-x64
do
  urlget ${URL}/nwjs-${NWV}-${P}.tar.gz cache/nwjs-${NWV}-${P}.tar.gz
  tar -xvf cache/nwjs-${NWV}-${P}.tar.gz -C cache
  sleep 1
#  ./cache/nwjs-${NWV}-${P}/nw build/vector-v1.0.0.nw
  ./cache/nwjs-${NWV}-${P}/nw nwapp
done
