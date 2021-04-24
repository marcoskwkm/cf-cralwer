// CHANGE ME

export const CPP_TEMPLATE_PATH =
  '/Users/marcos/repos/code/templates/template.cpp'

export const MAKEFILE = `
run:
\tg++-10 sol.cpp -Wall -Wshadow -O2 -std=c++17 -DHOME -g -o sol
\tfor f in sample.in*; do \\
\t\techo Sample \$\${f#sample.in}... ;\\
\t\ttime ./sol < $$f | diff -sNywbB - sample.out\$\${f#sample.in} ;\\
\tdone

clean:
\trm *~ sol
`
