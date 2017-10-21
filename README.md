# fausteditorweb
The online Faust Editor can be used to edit and run Faust code from any recent Web Browser with WebAssembly support. It works completely on the client side and it is therefore very convenient for situations with many simultaneous users (workshops, classrooms, etc.). It embeds the latest version of the Faust compiler with a [WebAssembly](http://webassembly.org) backend and can run code in MIDI polyphonic mode.

![](/images/editor-help.png)

### Features
The editor engine is based on [codemirror](https://codemirror.net/). It offers syntax highlighting, auto completion and access to the Faust online documentation access. The online documentation access uses the function name at the cursor position to locate to the relevant information.

![](/images/editor-doc.png) 

### Recommended Browsers

The recommended browsers are the latest versions of Firefox and Chrome with WebAssembly support. Chrome is recommended for MIDI, but it requires an https connexion to use the audio inputs. MIDI will not work with Firefox.

### Useful links

- [http://faust.grame.fr/editor](http://faust.grame.fr/editor): the official link on the Faust website. 
- [https://grame-cncm.github.io/fausteditorweb/](https://grame-cncm.github.io/fausteditorweb/): the alternative link on github https server. Because it is an https address, audio inputs will work but not the export function.
- [https://github.com/grame-cncm/fausteditorweb](https://github.com/grame-cncm/fausteditorweb): the github repository