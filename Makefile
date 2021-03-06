GUP=tools/gup

all: phony ${GUP}
	@+${GUP} all

%: phony ${GUP}
	@+${GUP} $@

# remove rules that would otherwise be recursive:
Makefile: ;
${GUP}: ;

# hacky target to list all known targets
# (doesn't count wildcard targets, but you don't usually make those manually)
targets: phony
	@find . -name 'gup' -type d -exec \
		find {} -name '*.gup' -type f \; \
		| sed -e 's/\/gup\//\//' -e 's/\.gup$$//' -e 's/^\.\///'

# always rebuild everything
.PHONY: phony
