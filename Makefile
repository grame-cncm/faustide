

EXSRC := $(shell find dist/examples -name "*.dsp")
DIST  := dist
FAUSTUI  := node_modules/faust-ui/dist
LIBFAUST := node_modules/faust2webaudio/dist

DEPS := $(DIST)/examples.json $(DIST)/faust-ui.html $(DIST)/faust-ui.js $(DIST)/faust-ui.js.map $(DIST)/libfaust-wasm.wasm $(DIST)/libfaust-wasm.data

.PHONY: dist

build: $(DEPS)
	npm run build

####################################################################
help:
	@echo "============================================================"
	@echo "                        Faust IDE"
	@echo "This Makefile is intended to generate the faust IDE web site"
	@echo "============================================================"
	@echo "Available targets are:"
	@echo "  build   : build the development version of the ide"
	@echo "  dist    : build the production version of the ide"
	@echo "  publish : prepare the docs folder publication (using github master/docs)"


dist: 
	npm run dist

publish:
#	make dist
	rm -rf docs/* 
	git checkout docs/CNAME
	cp -r $(DIST)/* docs
	@echo Check the docs folder and commit when ready and push


$(DIST)/examples.json: $(EXSRC)
	node ./src/listEx.js

$(DIST)/faust-ui.html: $(FAUSTUI)/index.html
	cp $< $@

$(DIST)/faust-ui.js: $(FAUSTUI)/faust-ui.js
	cp $< $@

$(DIST)/faust-ui.js.map: $(FAUSTUI)/faust-ui.js.map
	cp $< $@

$(DIST)/libfaust-wasm.wasm : $(LIBFAUST)/libfaust-wasm.wasm
	cp $< $@

$(DIST)/libfaust-wasm.data : $(LIBFAUST)/libfaust-wasm.data
	cp $< $@

