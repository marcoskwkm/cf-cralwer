# Installation

Clone this repository and run `npm i -g .` at the root folder.

# Usage

## Downloading samples

`cf-crawler samples --platform=cf --id=1516`

or simply

`cf-crawler -p=cf -i=1516`

This creates one folder for each problem, each containing your template CPP code and the sample files.

## Submitting solutions

You first need to start the submission server.

`cf-crawler server --platform=cf`

or

`cf-crawler server -p=cf`

It will ask for your username and password. Once it successfully logs in, you need keep the process running as it is running a server that will submit your solutions to the selected platform.

To submit a solution, run

`cf-crawler submit --platform=cf --id=1516 --problem=A solution.cpp`

or

`cf-crawler submit -p=cf -i=1516 -P=A solution.cpp`

If you used the `samples` command, the `Makefile` in each problem's folder has a command to submit your code, so you can simply do `make submit`.

# Supported platforms

So far the only implemented platform is Codeforces. I have plans of implementing this for Google competitions as well (Kickstart / GCJ), but I'm too lazy at the moment.

