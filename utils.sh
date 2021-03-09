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

img_size_folder(){
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
  img_size_folder HD 1064
  img_size_folder standard 532
  cd ..
}

fullWidth(){
  cd fullWidth
  img_size_folder desktopHD 2560
  img_size_folder tabletHD 1920
  img_size_folder desktop 1280
  img_size_folder tablet 960
  img_size_folder mobile 600
  img_size_folder micro 380
  cd ..
}

article(){
  cd article
  img_size_folder tabletHD 1200
  img_size_folder desktopHD 760
  img_size_folder tablet 600
  img_size_folder desktop 380
  cd ..
}

sampleReport(){
  cd sampleReport
  img_size_folder HD 640
  img_size_folder standard 320
  img_size_folder dashboardHD 1720
  img_size_folder dashboard 860
  cd ..
}

hero(){
  cd hero
  img_size_folder desktopHD 1400 png x
  img_size_folder mobileHD 1000 png x
  img_size_folder desktop 700 png x
  img_size_folder mobile 500 png x
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
}

"$@"