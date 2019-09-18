# fausteditorweb [![Badge](https://img.shields.io/badge/link-996.icu-%23FF4D5B.svg?style=flat-square)](https://996.icu/#/en_US)

The online [Faust Editor](https://fr0stbyter.github.io/fausteditorweb/dist) can be used to _edit_, _compile_ and _run_ Faust code from any recent Web Browser with [webassembly](http://webassembly.org) support. It works completely on the client side and it is therefore very convenient for situations with many simultaneous users (workshops, classrooms, etc.). It embeds the latest version of the Faust compiler with an efficient webassembly backend and offers polyphonic MIDI support.

### Features

#### Code Editing
The editor engine is based on [Monaco Editor](https://microsoft.github.io/monaco-editor/). It provides _syntax highlighting_, _auto completion_, _code hinting_ and direct access to the _online documentation_. The documentation command (Ctrl-D) uses the function name at the cursor position to locate to the relevant information.

#### Auto-Compiling
While the option is turning on, the diagram or the DSP UI will automatically be updated from the code. The editor will also try to tell if there is an error in your code. 

#### MIDI API
MIDI Input is available for Chrome Browser, you can also use the computer keyboard to input MIDI notes. We are using key map as Ablelon Live: A-line and Q-line for keys, ZX to move octave, CV to change velocity.

#### Audio Input
You can choose your audio device or use an audio file to simulate the audio input of DSP. Drap and drop your file to the waveform below to substitute the file. 

#### Analyzer
Both input and output have an audio analyzer. You can switch the visualization between oscilloscope and spectroscope, or change buffer size and channel. Three numbers showing at right side are current value, estimated frequency and RMS.

### Recommended Browsers

The recommended browsers are the latest versions of Chrome for AudioWorklet, MIDI, but it requires an https connection to use the audio inputs.

## Building

Firstly ensure that you have [Git](https://git-scm.com/downloads) and [Node.js](https://nodejs.org/) installed.

Clone a copy of the repo then change to the directory:

```bash
git clone https://github.com/Fr0stbyteR/fausteditorweb.git
cd fausteditorweb
```
Install dev dependencies:

```bash
npm install
```

Possibly:

```bash
npm update
```

To build everything (using Webpack 4, Babel 7, TypeScript), this will produce `dist/index.js`
```bash
npm run build
```

To test, put the directory in a local server, then open page: `./dist/index.html`

If you need to update the editor's version using `git pull`, as the repository has other dependencies hosted on Github, you may run `npm update` to make sure everything is up to date.

### Useful links

- [Faust Editor](https://fr0stbyter.github.io/fausteditorweb/dist)

## Versioning 

You'll have to raise the package version number in `package.json`, `webpack.config.js` and `src/index.ts` for `npm run update` to properly work.

