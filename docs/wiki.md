## Faust Editor
To fully understand how Faust compiler works in web environment, you may read [Faust2WebAudio Wiki](https://github.com/Fr0stbyteR/faust2webaudio/wiki).

### Starting point
#### Faust, Faust2WebAudio
The Faust language provides possiblities to develop and deploy a DSP easily and efficiently. With [Faust2WebAudio](https://github.com/Fr0stbyteR/faust2webaudio), we can generate a DSP in a web browser environment using WebAudio API by Faust compiler's WebAssembly version. Based on Faust2WebAudio, we are able to create an IDE web application that can compile and run Faust DSP directly in a web browser.

#### Previous Faust Editor
An previous version of Faust Editor written by Grame was available online as a prototype of this IDE.
In this version, users can:

1. Edit Faust code in `CodeMirror` editor

    Highlight Faust language syntax

    Auto-completion

    Jump to documentation that corresponds current function pointed by cursor.

    Open / Save code

    View Faust block diagram

2. Run Faust DSP with different configurations

    use microphone and MIDI device as inputs

    choose to use ScriptProcessorNode or AudioWorkletNode

    change buffer size

    change number of voices in Faust's `poly` mode

    change parameters in real-time in a GUI

3. Compile to other architecture by uploading codes to Faust online compiling service server

    Download the compilation result by clicking or scanning a QR Code.

### Goal

We are going to offer a full IDE user experience that could provide more informations and details of a DSP through graphical representation in a web page. A DSP developer probably needs not only to hear how the DSP sounds, but also to test it with other audio inputs or to know precisely the time domain and frequency domain data of outputs. In general, we are adding several testing, visualisation and debugging tools into a basic code editor. 

- Things to add: 

    1. Audio probing tools: 

        Oscilloscope, 

        Spectroscope,

        Spectrogram,

        Data table

    2. Device options: 

        Use Computer keyboard as MIDI note input

        Use Audio File as audio input

        Choose between available MIDI or audio input devices

    3. Calculate independently DSP with another sample rate

    4. Share code with a link

- Things to improve

    1. Better Code Editor with code hinting and inline documentation

    2. Real-time Compilation and Faust block diagram

    3. A Progressive Web Application that may works offline

    4. User-friendly config and debugging panels

### Design

Inspired by modern IDEs, a dark theme is chosen for a professional look. The layout is responsive and configurable following the browser viewport dimension.

All options related to Faust code compilation are situated at left sidebar panel.

All options and displays related to DSP runtime as MIDI, audio inputs and quick signal probing are placed in right sidebar panel.

The remaining central region of the page is divided into two parts with configurable height: a code source code editor on the top and a multi-tab display panels which shows results of compilation, includes Faust block diagram, a larger signal scope, and DSP GUI.

### Tool-chain
For a better maintinability for other contributors and WebAudio developers, we decided not to use recent front-end rendering framework such as Angular, React or Vue, but keep jQuery and Bootstrap which was in the previous editor. For a better cross-browser compatibility, we are using Babel to pre-compile source codes written in TypeScipt, then bundle them with Webpack. 

#### Code Editor: Monaco Editor
Monaco Editor is a JavaScript package maintained by Microsoft, which is also the core of `Visual Studio Code (VSCode)`. By including Monaco Editor into the web page, Faust Editor can provide the same user experience for VSCode users.

However, Monaco Editor's syntax highlighting system `Monarch` is different from the VSCode one, a new syntax description file is written under `Monarch` structure. Then, in order to provide inline documentation on hover a faust function name or keyword, `Faust2MD` parser is ported to TypeScript. `Faust2MD` is originally created to generate `Markdown` format documentation of Faust functions which follows the [Standard convention](https://github.com/grame-cncm/faustlibraries) inside a Faust `*.dsp` file. The retrieved Markdown documentation can be directly served by the Monaco Editor.

#### Audio probes
##### Retrieving Data
To implement all four modes of signal visualisations: data table, oscilloscope (stacked and interleaved by channels), spectroscope and spectrogram, precise sample values are needed. Two ways to get audio output samples are available in the environment. The first one is to use WebAudio's `AnalyserNode` with its integrated methods:

    get​Byte​Frequency​Data()
    get​Byte​Time​Domain​Data()
    getFloatFrequencyData()
    get​Float​Time​Domain​Data() (does not exist in Safari)

These methods provides both sample values and a spectrum given by a FFT of current audio buffer. However, this way has several drawbacks. Firstly, the `AnalyserNode` has only one input, which means it needs an additional `ChannelSplitterNode` to retrieve the correct channel from the Faust DSP Node. Secondly, the Node analyse continuously regardless whether there are actual signal inputs, and the audio data are provided only on demand. Thus it is impossible to get precise data in a specific buffer calculated by Faust DSP.

The second solution is useful in this case, which is getting the sample values directly with a `plotHandler` callback in a Faust DSP node. These values are associated with its buffer index and an events list which contains every parameter changes happened in this buffer. To get the corresponding frequency domain data, a supplemental FFT is required. We choosed the [JavaScript version of KissFFT](https://github.com/j-funk/kissfft-js) for its high performance in [benchmarking](https://github.com/j-funk/js-dsp-test/) thanks to WebAssembly. We perform FFT in Faust Editor with 2 overlaps using Blackman window function. 

The first way is implemented for two scopes in right sidebar as it can also probe the audio input, the second way is used for the larger scope at the bottom. It is more flexible to adapt continuous or on-demand signal display.

Developers may need to have options on which part of signals they want to display. Faust Editor provides four plot modes to trigger differently the drawing function of the scopes: Offline, Continuous, On Event and Manual. 

1. Offline

    Faust2WebAudio offers an `OfflineProcessor` that is useful to allow a DSP to calculate first samples with any sample rate independent of the actual audio context aka `faust2plot`. This feature is implemented in this Offline mode.

2. Continuous

    Similar to normal audio scopes, this mode draws in real-time the most recent samples of the Faust DSP. Parameter change events will be shown in the scope. On a recent regular commercial notebook, Faust Editor is able to draw up to 1 million samples continuously without significant rendering lagging at under this mode.

3. On Event

    As Faust DSP usually come with a GUI to control its parameters, it is important to visualise the part of signals while parameter changes. In this mode, scope draws only when it captures parameter change events which is useful for debugging.

4. Manual

    In Manual mode, scope displays the lastest samples when user clicks on a button. 

