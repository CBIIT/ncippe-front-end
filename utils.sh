#!/bin/bash
# This script will generate responsive images for the given image type
# This script is dependent on imagemagick and imageoptim
# See also: https://hackernoon.com/save-time-by-transforming-images-in-the-command-line-c63c83e53b17
# usage: from the /public/assets/images folder - "{path to utils.sh file} {command}" 
#        e.g.: ~/GIT/ncippe-front-end/public/assets/images> ../../../utils.sh hello
# commands: hello, mediaCard, fullWidth, article, sampleReport, hero, createAll

hello(){
  echo "Hello"
}

make_images(){
  filetype=${3:-jpg}
  mkdir $1
  parent=${PWD##*/}
  cp ./_original/*.* $1
  cd $1
  if [ $filetype != png ]
  then
    mogrify -format jpg *.png
  fi
  if [ $filetype != png ]
  then
    rm *.png
  fi
  if [ $parent = article ]
  then
    mogrify -gravity center -crop 1.46:1 "*.$filetype"
  fi
  mogrify -resize $4$2 "*.$filetype"
  imageoptim "*.$filetype"
  cd ..
}

mediaCard(){
  cd mediaCard
  make_images HD 1064
  make_images standard 532
  cd ..
}

fullWidth(){
  cd fullWidth
  make_images desktopHD 2560
  make_images tabletHD 1920
  make_images desktop 1280
  make_images tablet 960
  make_images mobile 600
  make_images micro 380
  cd ..
}

article(){
  cd article
  make_images tabletHD 1200
  make_images desktopHD 760
  make_images tablet 600
  make_images desktop 380
  cd ..
}

body(){
  cd body
  make_images desktopHD 1200
  make_images desktop 600
  cd ..
}

sampleReport(){
  cd sampleReport
  make_images dashboardHD 1720
  make_images dashboard 860
  make_images HD 640
  make_images standard 320
  cd ..
}

hero(){
  cd hero
  make_images desktopHD 1400 png x
  make_images mobileHD 1000 png x
  make_images desktop 700 png x
  make_images mobile 500 png x
  cd ..
}

createAll(){
  echo "processing mediaCard images"
  mediaCard

  echo "processing fullWidth images"
  fullWidth

  echo "processing article images"
  article

  echo "processing sampleReports images"
  sampleReport

  echo "processing hero images"
  hero

  echo "processing body images"
  body
}

"$@"