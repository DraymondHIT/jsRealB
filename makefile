js   := dist/jsRealB.js dist/jsRealB-node.js IDE/jsRealB-IDE.js 
minjs = $(patsubst %.js,%.min.js,$(js)) 

demos := demos/99BottlesOfBeer/index.html demos/Data2Text/batiment.html demos/Data2Text/building.html \
        demos/date/index.html demos/Evenements/index.html demos/ExercicesDeStyle/index.html demos/Inflection/index.html \
		demos/KilometresAPied/index.html demos/randomGeneration/french.html demos/randomGeneration/english.html \
		demos/VariantesDePhrases/index.html \
		documentation/user.html \
		Tutorial/tutorial.html \
		Tests/testAll.html

core := build/Constituent.js build/Phrase.js build/Terminal.js build/Date.js build/Number.js build/Utils.js
en   := data/lexicon-en.js data/rule-en.js 
fr   := data/lexicon-fr.js data/rule-fr.js 

.PHONY: demos clean

## create different versions of jsRealB by concatenating basic modules

info:
	echo "make JS to create files"

dist/datedCore.js : $(core)  ## add date of makefile
	cat $^ > $@
	echo "jsRealB_dateCreated=\""`date +"%F %H:%M"`'"' >>$@  

dist/jsRealB.js  : build/module-start.js dist/datedCore.js $(en) $(fr) build/module-exports.js build/module-end.js
	cat $^ > $@

dist/jsRealB-node.js : dist/datedCore.js $(en) $(fr) build/module-exports.js
	cat $^ > $@

IDE/jsRealB-IDE.js : dist/jsRealB-node.js IDE/nodeIDE.js
	cat $^ > $@

JS:  $(js) 

%.min.js : %.js
	terser $^ -c >$@

MINJS: $(minjs)

clean:
	rm -f $(js)

test-server: dist/jsRealB-server.js dist/testServer.py
	node dist/jsRealB-server.js & \
	PID=$$! ;\
	sleep 3 ; \
	python3 dist/testServer.py ;\
	kill $$PID

test-filter: dist/jsRealB-filter.js
	echo 'S(NP(D("the"),N("man")),VP(V("love")))' | node dist/jsRealB-filter.js

##  launch all demos in Safari on the mac, all demos and tests open in different tabs
demos : 
	open /Applications/Safari.app $(demos)