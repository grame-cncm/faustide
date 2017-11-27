# fausteditorweb
The online  [Faust Editor](http://faust.grame.fr/editor) can be used to _edit_, _compile_ and _run_ Faust code from any recent Web Browser with [webassembly](http://webassembly.org) support. It works completely on the client side and it is therefore very convenient for situations with many simultaneous users (workshops, classrooms, etc.). It embeds the latest version of the Faust compiler with an efficient webassembly backend and offers polyphonic MIDI support.

![](/images/editor-help.png)

### Features

The editor engine is based on [codemirror](https://codemirror.net/). It provides _syntax highlighting_, _auto completion_ and direct access to the _online documentation_. The documentation command (ctrl-d) uses the function name at the cursor position to locate to the relevant information.

![](/images/editor-doc.png) 

### Recommended Browsers

The recommended browsers are the latest versions of Firefox and Chrome. Chrome is recommended for MIDI, but it requires an https connexion to use the audio inputs. On the other hand MIDI is not supported by Firefox.

### Useful links

- [https://faust.grame.fr/editor](https://faust.grame.fr/editor): the official link on the Faust website. 
- [https://grame-cncm.github.io/fausteditorweb/](https://grame-cncm.github.io/fausteditorweb/): the alternative link on github https server. Because it is an https address, audio inputs will work but not the export function.
- [https://github.com/grame-cncm/fausteditorweb](https://github.com/grame-cncm/fausteditorweb): the github repository
