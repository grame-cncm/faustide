/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

importScripts(
  "precache-manifest.750fbc1cb28b0c5c792d1b917f8a68e7.js"
);

workbox.core.skipWaiting();

workbox.core.clientsClaim();

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "examples/ambisonics/fourSourcesToOcto.dsp",
    "revision": "c35f353d122330513b0bb3a156d22ca3"
  },
  {
    "url": "examples/ambisonics/oneSourceToStereo.dsp",
    "revision": "0e0a36594fc0b405b68c44410a21db16"
  },
  {
    "url": "examples/analysis/dbmeter.dsp",
    "revision": "6b99238fe379ed783ac3fc8ef8052446"
  },
  {
    "url": "examples/analysis/FFT.dsp",
    "revision": "90413b80aef0cd3bb430c8eb94581f13"
  },
  {
    "url": "examples/analysis/spectralLevel.dsp",
    "revision": "2a5558c61e3fde63685f929b3901ba39"
  },
  {
    "url": "examples/analysis/spectralTiltLab.dsp",
    "revision": "c8b98f4e2c67227e3a7d4a3559819181"
  },
  {
    "url": "examples/analysis/vumeter.dsp",
    "revision": "aa8e0a06d534b9e671ee6b2720a1def6"
  },
  {
    "url": "examples/bela/AdditiveSynth_Analog.dsp",
    "revision": "84964e080c0fc4fe0a0f171d97f32abd"
  },
  {
    "url": "examples/bela/AdditiveSynth.dsp",
    "revision": "6f6f44d46a2c71aa0bb8615793527975"
  },
  {
    "url": "examples/bela/crossDelay2.dsp",
    "revision": "e98e28a899eb69dfcf11c3d8a74d6b7b"
  },
  {
    "url": "examples/bela/Faust-complement.lib",
    "revision": "176974235ecb98204f97eeb7775e6bda"
  },
  {
    "url": "examples/bela/FMSynth2_Analog.dsp",
    "revision": "87d6a3b7d1586c43ffa3ad34e7e1ce65"
  },
  {
    "url": "examples/bela/FMSynth2_FX_Analog.dsp",
    "revision": "c5463839af3cfe3bfe60a32299e6497d"
  },
  {
    "url": "examples/bela/FMSynth2_FX.dsp",
    "revision": "9d7b91e13cc11a656484d6cbfe3f2875"
  },
  {
    "url": "examples/bela/FMSynth2.dsp",
    "revision": "3f0f43e98627269198f116717898cc70"
  },
  {
    "url": "examples/bela/FXChaine2.dsp",
    "revision": "f2787a3e07b0ee7d9b2b27ecf4075f60"
  },
  {
    "url": "examples/bela/GrainGenerator.dsp",
    "revision": "070ba42357a63a44aea8fe5f936fd7b7"
  },
  {
    "url": "examples/bela/granulator.dsp",
    "revision": "48a61f94576d77966b146b76804101d1"
  },
  {
    "url": "examples/bela/repeater.dsp",
    "revision": "5bcf8a0852f3bbaf06189ba8c7224bb8"
  },
  {
    "url": "examples/bela/simpleFX_Analog.dsp",
    "revision": "7aaaab7eeb33ebcf008fb833f12d3491"
  },
  {
    "url": "examples/bela/simpleFX.dsp",
    "revision": "ce9bcf351e0be8bb74643d1b7114eac7"
  },
  {
    "url": "examples/bela/simpleSynth_Analog.dsp",
    "revision": "4a87647e2b328e8a8f956014080babcd"
  },
  {
    "url": "examples/bela/simpleSynth_FX_Analog.dsp",
    "revision": "3c7fa36f8451a737d0b84321acf46fb0"
  },
  {
    "url": "examples/bela/simpleSynth_FX.dsp",
    "revision": "5f7a1d7c0ed565a2bc8e9a8d08f09b2a"
  },
  {
    "url": "examples/bela/simpleSynth.dsp",
    "revision": "1126ba1d0729af05c5cfdad80fc0c989"
  },
  {
    "url": "examples/bela/WaveSynth_Analog.dsp",
    "revision": "bcebe8722741af15b471173851897a06"
  },
  {
    "url": "examples/bela/WaveSynth_FX_Analog.dsp",
    "revision": "8545eadc7b618a25a9c85ede1cdf0438"
  },
  {
    "url": "examples/bela/WaveSynth_FX.dsp",
    "revision": "2ce139c945818a33f3ac61c54137091d"
  },
  {
    "url": "examples/bela/WaveSynth.dsp",
    "revision": "074c50ce1f12b9cb723a3f2dace0be08"
  },
  {
    "url": "examples/delayEcho/echo.dsp",
    "revision": "62315eb0632d93d36990b30f73129342"
  },
  {
    "url": "examples/delayEcho/quadEcho.dsp",
    "revision": "c86271cabfd914118268a2fe75010f0e"
  },
  {
    "url": "examples/delayEcho/smoothDelay.dsp",
    "revision": "586529956486d4264e6703ebc4732956"
  },
  {
    "url": "examples/delayEcho/stereoEcho.dsp",
    "revision": "5aada5b6cc03f3c174eba0b91d44549f"
  },
  {
    "url": "examples/delayEcho/tapiir.dsp",
    "revision": "9bb1333749bb77a705722f95b0bd43fc"
  },
  {
    "url": "examples/dynamic/compressor.dsp",
    "revision": "deb26c335be6e61835d3d86b9918d45e"
  },
  {
    "url": "examples/dynamic/distortion.dsp",
    "revision": "3c48c133b4493d506e2882fbf1eed991"
  },
  {
    "url": "examples/dynamic/gateCompressor.dsp",
    "revision": "82e7dfeb3f3861176ea2f027d8f6bd8e"
  },
  {
    "url": "examples/dynamic/noiseGate.dsp",
    "revision": "5cef3465eb2445dbce4672a55e4c0af1"
  },
  {
    "url": "examples/dynamic/volume.dsp",
    "revision": "3b0febd96a24dbcf252b271516e5ce9d"
  },
  {
    "url": "examples/filtering/APF.dsp",
    "revision": "e7997002c33fbbebcdcf9708ee00e9b6"
  },
  {
    "url": "examples/filtering/bandFilter.dsp",
    "revision": "732b013fc7e6a036e7e4de4fee5dd5d7"
  },
  {
    "url": "examples/filtering/BPF.dsp",
    "revision": "bcd6ebfd66a6a83770418c6f999e678c"
  },
  {
    "url": "examples/filtering/cryBaby.dsp",
    "revision": "a5e420786671c5fb0f4d7b2e690c78b0"
  },
  {
    "url": "examples/filtering/DNN.dsp",
    "revision": "bbf5fa9890ceb398ef6619ad27cc2709"
  },
  {
    "url": "examples/filtering/filterBank.dsp",
    "revision": "0e2203517b85214063bc29660bec1474"
  },
  {
    "url": "examples/filtering/graphicEqLab.dsp",
    "revision": "c29aab7b38d5239a5bbfef8db8dc545b"
  },
  {
    "url": "examples/filtering/highShelf.dsp",
    "revision": "7d4996280530be2f08cfdcc933ccc746"
  },
  {
    "url": "examples/filtering/HPF.dsp",
    "revision": "59c67ce105ccefa6d421aff98aa6ddc3"
  },
  {
    "url": "examples/filtering/lfBoost.dsp",
    "revision": "2de5015a15f4d168b7188965067550b9"
  },
  {
    "url": "examples/filtering/lowBoost.dsp",
    "revision": "38dce5f90edc3fd1baebdbe02758a2f3"
  },
  {
    "url": "examples/filtering/lowCut.dsp",
    "revision": "5198795081c6cb44b644f0a4c37d14fb"
  },
  {
    "url": "examples/filtering/lowShelf.dsp",
    "revision": "f6bfbf6bddd3eb4c55d51542aececd8c"
  },
  {
    "url": "examples/filtering/LPF.dsp",
    "revision": "eb5ab62470d21be58af3ec9464d99b4a"
  },
  {
    "url": "examples/filtering/moogVCF.dsp",
    "revision": "708340d07f59f9738222321ce453d159"
  },
  {
    "url": "examples/filtering/multibandFilter.dsp",
    "revision": "e66a350bd2a51501ff84fbbf2d770aaf"
  },
  {
    "url": "examples/filtering/notch.dsp",
    "revision": "cb0c2ef5f17b3a80f289627d36f17e2f"
  },
  {
    "url": "examples/filtering/parametricEqLab.dsp",
    "revision": "155dff6d4d61ec232518296474319dbf"
  },
  {
    "url": "examples/filtering/parametricEqualizer.dsp",
    "revision": "3a59ee719929e0b0f6dc08f969051cd9"
  },
  {
    "url": "examples/filtering/peakingEQ.dsp",
    "revision": "4ab2bc731b8c0a5c9cb0f27019b085ed"
  },
  {
    "url": "examples/filtering/peakNotch.dsp",
    "revision": "8ac3cc5375d2fd3c424b63296e800366"
  },
  {
    "url": "examples/filtering/spectralTilt.dsp",
    "revision": "f7d64e8e05e39e46470ee93b1185558c"
  },
  {
    "url": "examples/filtering/vcfWahLab.dsp",
    "revision": "23c5c539b49195b962237452327f17ba"
  },
  {
    "url": "examples/filtering/vocoder.dsp",
    "revision": "f3d6ba1056313b8ece4eabb7bcbe1f6d"
  },
  {
    "url": "examples/filtering/wahPedal.dsp",
    "revision": "d56078a56ce09c7866219cd53449b416"
  },
  {
    "url": "examples/gameaudio/bubble.dsp",
    "revision": "6cdae531c2bbfe335d336d5beb38c238"
  },
  {
    "url": "examples/gameaudio/rain.dsp",
    "revision": "91e9c6697efe368a4491bd1152b2fef4"
  },
  {
    "url": "examples/gameaudio/wind.dsp",
    "revision": "50699dbb58a8d7741bae427e36485271"
  },
  {
    "url": "examples/generator/filterOsc.dsp",
    "revision": "17177d2dd10d8ec116ac64a1628fcc1a"
  },
  {
    "url": "examples/generator/noise.dsp",
    "revision": "3ff6895039fcc9bce42fabb2dc9fd235"
  },
  {
    "url": "examples/generator/noiseMetadata.dsp",
    "revision": "efa1e5bf64e800a480e66f1b74b39a50"
  },
  {
    "url": "examples/generator/osc.dsp",
    "revision": "b50f738cf5e789298dc4011157b3c094"
  },
  {
    "url": "examples/generator/osci.dsp",
    "revision": "74fbc457b01c3230e48abac8aa3c3fc0"
  },
  {
    "url": "examples/generator/sawtoothLab.dsp",
    "revision": "bcec64f0f0b2e66a0b41db6d3b11b6d0"
  },
  {
    "url": "examples/generator/virtualAnalog.dsp",
    "revision": "55b40461b2aa734549882fcfbfd1e374"
  },
  {
    "url": "examples/generator/virtualAnalogLab.dsp",
    "revision": "57bd8159053e642ad03328df31cba231"
  },
  {
    "url": "examples/misc/capture.dsp",
    "revision": "4fa1f1c6ef91b2aaf09c995b8c2697c7"
  },
  {
    "url": "examples/misc/guitarix.dsp",
    "revision": "3ab16a4515f32595d12a94a587a2e3e6"
  },
  {
    "url": "examples/misc/matrix.dsp",
    "revision": "c32c77af3482a70522921a91dea50950"
  },
  {
    "url": "examples/misc/midiTester.dsp",
    "revision": "3d4694924bf8b97e30d1cb6993b059e9"
  },
  {
    "url": "examples/misc/mixer.dsp",
    "revision": "9ace0651dfa39d392decff6d34899e42"
  },
  {
    "url": "examples/misc/switcher.dsp",
    "revision": "0bc27727e0199856322977d9e511dc1e"
  },
  {
    "url": "examples/misc/tester.dsp",
    "revision": "ff8e7e603a3e94eb8ef353cc73c1a54b"
  },
  {
    "url": "examples/misc/tester2.dsp",
    "revision": "0a609f428a9a6f10d6cc6a7f90305e6f"
  },
  {
    "url": "examples/misc/UITester.dsp",
    "revision": "1ca60a8b2274c0ad7d27d444b3f7e8c9"
  },
  {
    "url": "examples/phasing/flanger.dsp",
    "revision": "ea139603b7884145abfd0d6721f57d65"
  },
  {
    "url": "examples/phasing/phaser.dsp",
    "revision": "73044da544428540382aca7f44cf62a1"
  },
  {
    "url": "examples/phasing/phaserFlangerLab.dsp",
    "revision": "f70de8abbd6cf517c0ccb50b5334799b"
  },
  {
    "url": "examples/physicalModeling/brass.dsp",
    "revision": "bd3fc5fe909f391f9a96fb3e12995d89"
  },
  {
    "url": "examples/physicalModeling/brassMIDI.dsp",
    "revision": "5136e77f3778426c96910edd8198bf13"
  },
  {
    "url": "examples/physicalModeling/churchBell.dsp",
    "revision": "6043efb045c8e54da03a5cd15b6b1f76"
  },
  {
    "url": "examples/physicalModeling/clarinet.dsp",
    "revision": "b2027e1b734891e0a2d3b47d3f482b66"
  },
  {
    "url": "examples/physicalModeling/clarinetMIDI.dsp",
    "revision": "abe52b7c7ba655eae1f42a5386d8a13c"
  },
  {
    "url": "examples/physicalModeling/djembeMIDI.dsp",
    "revision": "eaec700f3be75c8148ed22cc235a1528"
  },
  {
    "url": "examples/physicalModeling/elecGuitarMIDI.dsp",
    "revision": "4da3367d1d8c010dc60f2da5e01a171f"
  },
  {
    "url": "examples/physicalModeling/englishBell.dsp",
    "revision": "15477dac0af3e96e0e8a6782139c4751"
  },
  {
    "url": "examples/physicalModeling/faust-stk/bass.dsp",
    "revision": "70f99854e2819a60a798510d5d9af96c"
  },
  {
    "url": "examples/physicalModeling/faust-stk/blowBottle.dsp",
    "revision": "d7ffd2d473e279244771f212e85095e4"
  },
  {
    "url": "examples/physicalModeling/faust-stk/bowed.dsp",
    "revision": "f9d751ad37e52c16eac841ad4d9a1c42"
  },
  {
    "url": "examples/physicalModeling/faust-stk/brass.dsp",
    "revision": "b89e834b881f686edd332ee79ca16418"
  },
  {
    "url": "examples/physicalModeling/faust-stk/clarinet.dsp",
    "revision": "ae1dcfe0288b78b6054d9ee3c2432e68"
  },
  {
    "url": "examples/physicalModeling/faust-stk/flute.dsp",
    "revision": "ff1514b7f9a02ca225b30952d0520632"
  },
  {
    "url": "examples/physicalModeling/faust-stk/fluteStk.dsp",
    "revision": "3df72dedf1ffdfa009964f6899e072f6"
  },
  {
    "url": "examples/physicalModeling/faust-stk/glassHarmonica.dsp",
    "revision": "366a7eb1f1688fba887264cbf7855ea1"
  },
  {
    "url": "examples/physicalModeling/faust-stk/harpsi.dsp",
    "revision": "a6de1a788e404903d1f825012b104ef6"
  },
  {
    "url": "examples/physicalModeling/faust-stk/modalBar.dsp",
    "revision": "e29ce141112ab1adbdfd141440c80e5d"
  },
  {
    "url": "examples/physicalModeling/faust-stk/NLFeks.dsp",
    "revision": "68cb0e78a4ff8c1b8c57ca5fb639bcfc"
  },
  {
    "url": "examples/physicalModeling/faust-stk/NLFfm.dsp",
    "revision": "c9667c4fe04e52a35622a56000c460ed"
  },
  {
    "url": "examples/physicalModeling/faust-stk/piano.dsp",
    "revision": "86c4bf0649511cfd53567a35f76086f2"
  },
  {
    "url": "examples/physicalModeling/faust-stk/saxophony.dsp",
    "revision": "b3de4eee3c5c2981b3257d98de8d8249"
  },
  {
    "url": "examples/physicalModeling/faust-stk/sitar.dsp",
    "revision": "48b4fdbc45324ce4174df17ebd836334"
  },
  {
    "url": "examples/physicalModeling/faust-stk/tibetanBowl.dsp",
    "revision": "f3d2c82c84d2c95cac15356c6037dcf0"
  },
  {
    "url": "examples/physicalModeling/faust-stk/tunedBar.dsp",
    "revision": "bbb888faf3512066ca22588cca348b84"
  },
  {
    "url": "examples/physicalModeling/faust-stk/uniBar.dsp",
    "revision": "1c0d63b2a050bc2d61a6466383254e2d"
  },
  {
    "url": "examples/physicalModeling/faust-stk/voiceForm.dsp",
    "revision": "e57f4b98947f560a641efaffe1fcb2c1"
  },
  {
    "url": "examples/physicalModeling/flute.dsp",
    "revision": "bec08ca4c3210aabfc32565f0ccb6491"
  },
  {
    "url": "examples/physicalModeling/fluteMIDI.dsp",
    "revision": "0e2d15be0b32e62288a412afd17e7430"
  },
  {
    "url": "examples/physicalModeling/frenchBell.dsp",
    "revision": "4b395546783aec36275ac6854d1f9070"
  },
  {
    "url": "examples/physicalModeling/germanBell.dsp",
    "revision": "92031c3fad7703400ea9982c4e8119e9"
  },
  {
    "url": "examples/physicalModeling/guitarMIDI.dsp",
    "revision": "2cf72776ff10deb41dd988f9eb25be38"
  },
  {
    "url": "examples/physicalModeling/karplus.dsp",
    "revision": "3244d94466fe47f91c918ba0f4c88371"
  },
  {
    "url": "examples/physicalModeling/marimbaMIDI.dsp",
    "revision": "994e23f90cca0519dcb490c4826abfe4"
  },
  {
    "url": "examples/physicalModeling/modularInterpInstrMIDI.dsp",
    "revision": "09850a48259b6ab63e73bcd19edbdd27"
  },
  {
    "url": "examples/physicalModeling/nylonGuitarMIDI.dsp",
    "revision": "19ed80bd495e6e6d1a723fa273f00329"
  },
  {
    "url": "examples/physicalModeling/russianBell.dsp",
    "revision": "3a83da099c9f0ea802d217fb18686606"
  },
  {
    "url": "examples/physicalModeling/standardBell.dsp",
    "revision": "8f6e7c017b8c147fcee85b5163cf13d8"
  },
  {
    "url": "examples/physicalModeling/violin.dsp",
    "revision": "d6a25f8817c94455647c2154f0ad01b6"
  },
  {
    "url": "examples/physicalModeling/violinMIDI.dsp",
    "revision": "37bf2502257fd238b729797ebf2a576a"
  },
  {
    "url": "examples/physicalModeling/vocalBP.dsp",
    "revision": "58defda1583a40b5cb62a6b189ad2f6c"
  },
  {
    "url": "examples/physicalModeling/vocalBPMIDI.dsp",
    "revision": "aeb4e19510ea80d96742964f0bf99845"
  },
  {
    "url": "examples/physicalModeling/vocalFOF.dsp",
    "revision": "99eebcc7ecaa2ddf0edd0cf6f24c2c70"
  },
  {
    "url": "examples/physicalModeling/vocalFOFMIDI.dsp",
    "revision": "fad3be64e05371954e5b8d94329e8b93"
  },
  {
    "url": "examples/pitchShifting/pitchShifter.dsp",
    "revision": "8af78d1b6193065479a66db5e250616e"
  },
  {
    "url": "examples/psychoacoustic/harmonicExciter.dsp",
    "revision": "eebb583e71557b35bdab830722f3dedc"
  },
  {
    "url": "examples/reverb/fdnRev.dsp",
    "revision": "2f6d09723ecb770a3cf5ec15cfca7206"
  },
  {
    "url": "examples/reverb/freeverb.dsp",
    "revision": "28c1a2f015bb6d04245de4e61f337904"
  },
  {
    "url": "examples/reverb/reverbDesigner.dsp",
    "revision": "673a0195e3326efe239a6a08cddcaad4"
  },
  {
    "url": "examples/reverb/reverbTester.dsp",
    "revision": "4b9a72d08197c0fe387735bfe85b9190"
  },
  {
    "url": "examples/reverb/zitaRev.dsp",
    "revision": "60ed38c2a7b89b9ac2ba894e4da7fb0b"
  },
  {
    "url": "examples/reverb/zitaRevFDN.dsp",
    "revision": "7cf60a969ab20f197a395e743eb88da1"
  },
  {
    "url": "examples/SAM/16_channel_volume/16_channel_volume.dsp",
    "revision": "b23d1ecc4e0ecb0d904b1a905f79c990"
  },
  {
    "url": "examples/SAM/16_channel_volume/layout.dsp",
    "revision": "9573d7064cdf6a9f956ea75744c85d09"
  },
  {
    "url": "examples/SAM/chorus/chorus.dsp",
    "revision": "1ba8532ecbe1b1736282d4829e110d46"
  },
  {
    "url": "examples/SAM/chorus/chorusForBrowser.dsp",
    "revision": "6c035c3091e8474ea9bd104a2a0286e1"
  },
  {
    "url": "examples/SAM/chorus/layout2.dsp",
    "revision": "12586fadff5974927ef4422134c9486c"
  },
  {
    "url": "examples/SAM/echo/echo.dsp",
    "revision": "b777b81da4d263360a4bddb6de8dd68a"
  },
  {
    "url": "examples/SAM/echo/echoForBrowser.dsp",
    "revision": "12c6f48302eff01856d73ca39ddf3be7"
  },
  {
    "url": "examples/SAM/echo/layout2.dsp",
    "revision": "12586fadff5974927ef4422134c9486c"
  },
  {
    "url": "examples/SAM/effects/chorus.dsp",
    "revision": "d3ef91c592c343876b63527acad96ad6"
  },
  {
    "url": "examples/SAM/effects/echo.dsp",
    "revision": "f5f56f672dc3c7638bc505d58f7cfa9d"
  },
  {
    "url": "examples/SAM/effects/effects.dsp",
    "revision": "2c4cd40523f87a4cf431dfe783cc394c"
  },
  {
    "url": "examples/SAM/effects/effectsForBrowser.dsp",
    "revision": "c8944ecd65d2e467bc2e1c84bdb50a03"
  },
  {
    "url": "examples/SAM/effects/flanger.dsp",
    "revision": "cec246e31cca874231164b4126fa53e6"
  },
  {
    "url": "examples/SAM/effects/freeverb.dsp",
    "revision": "83b32c9914237dee9f5ae70fc98f74f0"
  },
  {
    "url": "examples/SAM/effects/layout2.dsp",
    "revision": "12586fadff5974927ef4422134c9486c"
  },
  {
    "url": "examples/SAM/flanger/flanger.dsp",
    "revision": "7c95b96672323f7cd0b66a3d6613512c"
  },
  {
    "url": "examples/SAM/flanger/flangerForBrowser.dsp",
    "revision": "b23663d2d4f5782a40b12656ec7a93cd"
  },
  {
    "url": "examples/SAM/flanger/layout2.dsp",
    "revision": "12586fadff5974927ef4422134c9486c"
  },
  {
    "url": "examples/SAM/freeverb/freeverb.dsp",
    "revision": "456a3b3b7f157e3c86cf4be980f4e7ce"
  },
  {
    "url": "examples/SAM/freeverb/freeverbForBrowser.dsp",
    "revision": "b55d3b2f7c0e94d3713fe1229753c355"
  },
  {
    "url": "examples/SAM/freeverb/layout2.dsp",
    "revision": "12586fadff5974927ef4422134c9486c"
  },
  {
    "url": "examples/SAM/sawtooth_synth/sawtooth_synth.dsp",
    "revision": "2078b3cb87b19fd698f843c2649166dc"
  },
  {
    "url": "examples/SAM/sine_synth/sine_synth.dsp",
    "revision": "106939549c8e66c41be3c438b1cc7cd2"
  },
  {
    "url": "examples/SAM/virtualAnalog/layout2.dsp",
    "revision": "12586fadff5974927ef4422134c9486c"
  },
  {
    "url": "examples/SAM/virtualAnalog/virtualAnalog.dsp",
    "revision": "e81aebf319bec39714b12eed421ebbae"
  },
  {
    "url": "examples/SAM/virtualAnalog/virtualAnalog.touchosc",
    "revision": "17f4e72940cb158c4418809690f3c6dc"
  },
  {
    "url": "examples/SAM/virtualAnalog/virtualAnalogForBrowser.dsp",
    "revision": "1e99a343f48b2d5d4077b5e0225802c5"
  },
  {
    "url": "examples/SAM/virtualAnalog/virtualAnalogWithEffectsForBrowser.dsp",
    "revision": "1c1e99fa75d401f2f10cb7e2a0ffbb09"
  },
  {
    "url": "examples/SAM/volume/volume.dsp",
    "revision": "5727473d3ccfbe555034c9a5b099af92"
  },
  {
    "url": "examples/smartKeyboard/acGuitar.dsp",
    "revision": "6f84fc6835ba5d85c00bab72a17ff639"
  },
  {
    "url": "examples/smartKeyboard/associatedEffects/elecGuitarEffect.dsp",
    "revision": "4e80b7bb5db377f79f2f26d2e131944d"
  },
  {
    "url": "examples/smartKeyboard/associatedEffects/myEffect.dsp",
    "revision": "d44367415a756c2043b6c74c2bde2f4e"
  },
  {
    "url": "examples/smartKeyboard/associatedEffects/reverb.dsp",
    "revision": "d44367415a756c2043b6c74c2bde2f4e"
  },
  {
    "url": "examples/smartKeyboard/bells.dsp",
    "revision": "5354a5c4629691c6e516ec2c83873515"
  },
  {
    "url": "examples/smartKeyboard/bowed.dsp",
    "revision": "136d7d8ab82f63b05ffbc718cf1b365a"
  },
  {
    "url": "examples/smartKeyboard/brass.dsp",
    "revision": "2e879bedbabad599c171b79aa4bad80c"
  },
  {
    "url": "examples/smartKeyboard/clarinet.dsp",
    "revision": "f95a7b669d4eef692c434681a411adfc"
  },
  {
    "url": "examples/smartKeyboard/crazyGuiro.dsp",
    "revision": "fb6f5a3db8c7321012805771cd6f94d0"
  },
  {
    "url": "examples/smartKeyboard/drums.dsp",
    "revision": "7ceb354987dc673c47d4903d31d1085d"
  },
  {
    "url": "examples/smartKeyboard/dubDub.dsp",
    "revision": "3e226b244cd5bd54b9eedf7b2c1cf9f8"
  },
  {
    "url": "examples/smartKeyboard/elecGuitar.dsp",
    "revision": "be26a0dd292be8b795a65c476fde0475"
  },
  {
    "url": "examples/smartKeyboard/fm.dsp",
    "revision": "38c1a726632c134b6b9d9193ef8eda71"
  },
  {
    "url": "examples/smartKeyboard/frog.dsp",
    "revision": "7dd55eefcfcafadda69ce3a522d08d45"
  },
  {
    "url": "examples/smartKeyboard/harp.dsp",
    "revision": "a93f1c0c7ceb6c3de2e5af1b86138565"
  },
  {
    "url": "examples/smartKeyboard/midiOnly.dsp",
    "revision": "e2f03382937f57177df4a06299a3f60c"
  },
  {
    "url": "examples/smartKeyboard/multiSynth.dsp",
    "revision": "cc9c66161d53dec81afe7756c3a8f231"
  },
  {
    "url": "examples/smartKeyboard/toy.dsp",
    "revision": "ab76328f0eea94fed284ce907df2ed2f"
  },
  {
    "url": "examples/smartKeyboard/trumpet.dsp",
    "revision": "f5a49c93646060b84352054a5c93f7f7"
  },
  {
    "url": "examples/smartKeyboard/turenas.dsp",
    "revision": "7c8317cbd80093ec8e4af3a835960c20"
  },
  {
    "url": "examples/smartKeyboard/violin.dsp",
    "revision": "d8992d89218b94f8a3e743cd0598d1f7"
  },
  {
    "url": "examples/smartKeyboard/violin2.dsp",
    "revision": "72733e07a11571f48eaf7628e409f954"
  },
  {
    "url": "examples/smartKeyboard/vocal.dsp",
    "revision": "4b5a8c16313c24f9bb4310125bbf0751"
  },
  {
    "url": "examples/spat/panpot.dsp",
    "revision": "5fd41980ba09303d50c5898230bb01ac"
  },
  {
    "url": "examples/spat/spat.dsp",
    "revision": "8753c9b409ae2331139d94356c952112"
  },
  {
    "url": "faust-ui.html",
    "revision": "306d3323c9d939985f17a8c8aa3dfc5b"
  },
  {
    "url": "faust-ui.js",
    "revision": "a8e4e96683ab61a37216ca079b1b292a"
  },
  {
    "url": "faust-ui.js.map",
    "revision": "4beb427c2bf3041f9136f02dd5cd35ac"
  },
  {
    "url": "libfaust-wasm.data",
    "revision": "46428c4c37c26fa96364f60e5960b3b0"
  },
  {
    "url": "libfaust-wasm.wasm",
    "revision": "627178a82427e5046655c14478f2a3e9"
  },
  {
    "url": "index.html",
    "revision": "d5c27b90d6007acbd6d4d6def1c5d8c3"
  },
  {
    "url": "favicon.png",
    "revision": "8c793ef1d04148eb48e9595e54950310"
  },
  {
    "url": "icon/icon_192.png",
    "revision": "ee7ec1719955d2f9c0bbea290b088d20"
  },
  {
    "url": "02-XYLO1.mp3",
    "revision": "362ebc964769a515510a0a67f59232e7"
  },
  {
    "url": "primitives.lib",
    "revision": "27152c0ce5169d607ce0667196b1b858"
  },
  {
    "url": "examples.json",
    "revision": "2945f413ac48fea4621af7c22b88bc19"
  },
  {
    "url": "manifest.json",
    "revision": "a05913b0ec3de887aff05ceba84f3048"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
