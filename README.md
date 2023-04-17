# Faust IDE [![Badge](https://img.shields.io/badge/link-996.icu-%23FF4D5B.svg?style=flat-square)](https://996.icu/#/en_US)

The online [Faust IDE](https://faustide.grame.fr) can be used to _edit_, _compile_ and _run_ Faust code from any recent Web Browser with [webassembly](http://webassembly.org) support. It works completely on the client side and it is therefore very convenient for situations with many simultaneous users (workshops, classrooms, etc.). It embeds the latest version of the Faust compiler with an efficient webassembly backend and offers polyphonic MIDI support.

![](faustide.png)

## Features

#### Code Editing
The editor engine is based on [Monaco Editor](https://microsoft.github.io/monaco-editor/). It provides _syntax highlighting_, _auto completion_, _code hinting_ and direct access to the _online documentation_. The documentation command (Ctrl-D) uses the function name at the cursor position to locate to the relevant information.

#### Auto-Compiling
While the option is turning on, the diagram or the DSP UI will automatically be updated from the code. The editor will also try to tell if there is an error in your code.

#### MIDI input
MIDI Input is available for Chrome and Firefox browsers. You can also use the computer keyboard to input MIDI notes. We are using key map as Ablelon Live: A-line and Q-line for keys, ZX to move octave, CV to change velocity.

#### Audio Input
You can choose your audio device or use an audio file to simulate the audio input of DSP. Drap and drop your file to the waveform below to substitute the file.

#### Polyphonic mode
The polyphonic mode can be activated by selecting a number of voices in the _Poly Voices_ menu on the left. [Standard Polyphony Parameters](https://faustdoc.grame.fr/manual/midi/#standard-polyphony-parameters) have to be used in the DSP voice.

A global effect can be added using the `effect = foo;` [convention](https://faustdoc.grame.fr/manual/midi/#audio-effects-and-polyphonic-synthesizer). 

#### Audio analyzers
Tools to display audio signals are available in the left panel:

- **Mode** can be _Offline_, _Continuous_, _On Event_ (to synchronize visuaalisation with control event changes), and _Manual_ (to be triggered with the _Plot (Snapshot)_ button at the bottom)

- **Samples** changes the number of displayed samples (so corresponding to the window width) 

- **Sample Rate** displas the currently selected audio device sample rate

- **FFT Size** and **FFT Overlap** value are used whent using _Oscilloscope_ and _Spectroscope_ modes

In the _Plot_ Tab in the middle section, you can switch the visualization between _Data_, _Interleaved_, _Oscilloscope_ and _Spectroscope_.

Both input and output have an audio analyzer in the right panel. In the small audio output window at the bottom, you can switch the visualization between _Oscilloscope_ and _Spectroscope_, or change buffer size and channel. Three numbers showing at right side are current value, estimated frequency and RMS.

#### SVG Diagrams

The _Diagram_ tab allows to display the circuit SVG diagram. You can navigate inside it by clicking on the dark blue part to go down in the circuit hierarchy, or clicking on the diagram border to go up in the circuit hierarchy.

## Recommended Browsers

The recommended browsers are the latest versions of Chrome and Firefox for AudioWorklet and MIDI, but it requires an https connection to use the audio inputs.

## Building

Firstly ensure that you have [Git](https://git-scm.com/downloads) and [Node.js](https://nodejs.org/) installed.

Clone a copy of the repo then change to the directory:

```bash
git clone https://github.com/grame-cncm/faustide.git --depth 1
cd faustide
```
Beware: on Windows, before cloning the repository, and for the libfaust-wasm.data file line ending to be correctly handled, you'll have to do:

```bash
git config --global core.autocrlf false
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

## Launching the local editor

A local HTTP server has to be started with `npm run serve` (or something similar), then use `http://127.0.0.1:8000/dist/` to launch the local editor.

## Versioning

You'll have to raise the package version number in `package.json` before `npm run build` to properly work.

------

## Deployment

Deployment remains an operation that must take place under the user control. It must be made from the master branch. The procedure consists of:

1) generating the site
2) copying the contents of the `dist` directory into the `docs` directory
3) checking the proper functioning of the site from the `docs` directory

For 1), see **Building** section above
For 2), you can run:

```bash
npm run publish
```
If you run the copy manually, BE CAREFUL not to delete the files `CNAME` and `.nojekyll`.

For 3), you can launch a local web server from the `docs` directory:

```bash
npm run serve-docs
```

**WARNING: the following step is mandatory for the deployed site to properly work !**

Once the site is validated add (using `git add docs`) and commit the entire contents of the `docs` directory then push to git.

### Useful links

- [https://faustide.grame.fr](https://faustide.grame.fr): the official link on the Faust IDE website
- [https://github.com/grame-cncm/faustide](https://github.com/grame-cncm/faustide): the github repository

### Known problems and solutions

- evaluating a heavy DSP program may hang the IDE, which will stay in this state even if you open it again, if the **Real-time Compile** checkbox was set. You can deactivate the checkbox by opening the IDE with the `https://faustide.grame.fr/?realtime_compile=0` URL
- MIDI is only working in Chrome and Firefox
- a bug in the Safari/Webkit implementation (see https://bugs.webkit.org/show_bug.cgi?id=220038) makes the AudioWorklet mode fails or behaves incorrectly. You'll have to use the old ScriptProcessor mode for now
- the **ExpressVPN** browser extension runs a background loop when "Not Connected" which causes any instantiated FaustUI element to fail after a few seconds. Disabling the extension will solve this problem (not tested on Safari)
- some users report random problems when exporting the code, like missing labels when exporting on osx/coreaudio-qt. Clearing the browser's cache and cookies can fix the issue
