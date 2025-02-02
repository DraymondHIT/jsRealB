#!/usr/bin/env bash
### CAUTION:: RUN this script from the "demos" the demo directory because file name are relative
## tests demos with separate loading of each file, 
##  by commenting the single file loading
##  by uncommenting the separate loading

## to test demos with the single loading use the MAKEFILE (make demos)

function testDemo(){
    inFile=$1
    outFile=${inFile%.html}-test.html
    sed  -e '\%<script src="../../dist/jsRealB.js"></script>%s//<!--&-->/' \
         -e '\%-/-%s//--/' \
         $inFile > $outFile
    open $outFile
    sleep 5  # leave time for the browser to display the temp file and the user to see it
    rm $outFile
}

## if an argument is given, test only this one
if [[ $# -eq 1 ]] ; then
    testDemo $1
    exit 0
fi

## test all demos
allDemos=(  99BottlesOfBeer/index.html \
            Augmentation/Augmentation.html \
            Data2Text/batiment.html \
            Data2Text/building.html \
            date/index.html \
            e2eChallenge/index.html \
            Evaluation/index.html \
            Evenements/index.html \
            ExercicesDeStyle/index.html \
            ExercicesOrthographe/index-fr.html\
            Inflection/index.html \
            KilometresAPied/index.html \
            PetitChaperonRouge/LittleRedRidingHood.html \
            PetitChaperonRouge/PetitChaperonRouge.html \
            Pronoms/index.html \
            randomGeneration/French.html \
            randomGeneration/English.html \
            VariantesDePhrases/index.html \
            ../Tutorial/metro.html)

for demo in ${allDemos[*]}
do
    testDemo $demo
done

## for testing Weather demo written in Python
