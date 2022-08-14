/**
 * Copyright 2018 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// If the loader is already loaded, just stop.
if (!self.define) {
  const singleRequire = name => {
    if (name !== 'require') {
      name = name + '.js';
    }
    let promise = Promise.resolve();
    if (!registry[name]) {
      
        promise = new Promise(async resolve => {
          if ("document" in self) {
            const script = document.createElement("script");
            script.src = name;
            document.head.appendChild(script);
            script.onload = resolve;
          } else {
            importScripts(name);
            resolve();
          }
        });
      
    }
    return promise.then(() => {
      if (!registry[name]) {
        throw new Error(`Module ${name} didn’t register its module`);
      }
      return registry[name];
    });
  };

  const require = (names, resolve) => {
    Promise.all(names.map(singleRequire))
      .then(modules => resolve(modules.length === 1 ? modules[0] : modules));
  };
  
  const registry = {
    require: Promise.resolve(require)
  };

  self.define = (moduleName, depsNames, factory) => {
    if (registry[moduleName]) {
      // Module is already loading or loaded.
      return;
    }
    registry[moduleName] = Promise.resolve().then(() => {
      let exports = {};
      const module = {
        uri: location.origin + moduleName.slice(1)
      };
      return Promise.all(
        depsNames.map(depName => {
          switch(depName) {
            case "exports":
              return exports;
            case "module":
              return module;
            default:
              return singleRequire(depName);
          }
        })
      ).then(deps => {
        const facValue = factory(...deps);
        if(!exports.default) {
          exports.default = facValue;
        }
        return exports;
      });
    });
  };
}
define("./service-worker.js",['./workbox-11808712'], function (workbox) { 'use strict';

  /**
  * Welcome to your Workbox-powered service worker!
  *
  * You'll need to register this file in your web app.
  * See https://goo.gl/nhQhGp
  *
  * The rest of the code is auto-generated. Please don't update this file
  * directly; instead, make changes to your Workbox build configuration
  * and re-run your build process.
  * See https://goo.gl/2aRDsh
  */

  workbox.setCacheNameDetails({
    prefix: "1.0.801660465641048"
  });
  workbox.skipWaiting();
  workbox.clientsClaim();
  /**
   * The precacheAndRoute() method efficiently caches and responds to
   * requests for URLs in the manifest.
   * See https://goo.gl/S9QRab
   */

  workbox.precacheAndRoute([{
    "url": "02-XYLO1.mp3",
    "revision": "362ebc964769a515510a0a67f59232e7"
  }, {
    "url": "assets/0c6bfc668a72935760178f91327aed3a.eot",
    "revision": "0c6bfc668a72935760178f91327aed3a"
  }, {
    "url": "assets/1a575a4138e5f366474f0e7c5bd614a5.woff",
    "revision": "1a575a4138e5f366474f0e7c5bd614a5"
  }, {
    "url": "assets/1d5619cd804367cefe6da2d79289218a.svg",
    "revision": "1d5619cd804367cefe6da2d79289218a"
  }, {
    "url": "assets/37bc7099f6f1ba80236164f22e905837.svg",
    "revision": "37bc7099f6f1ba80236164f22e905837"
  }, {
    "url": "assets/513aa607d398efaccc559916c3431403.ttf",
    "revision": "513aa607d398efaccc559916c3431403"
  }, {
    "url": "assets/592643a83b8541edc52063d84c468700.eot",
    "revision": "592643a83b8541edc52063d84c468700"
  }, {
    "url": "assets/766913e6c0088ab8c9f73e18b4127bc4.ttf",
    "revision": "766913e6c0088ab8c9f73e18b4127bc4"
  }, {
    "url": "assets/a609dc0f334a7d4e64205247c4e8b97c.ttf",
    "revision": "a609dc0f334a7d4e64205247c4e8b97c"
  }, {
    "url": "assets/b0e2db3b634d1bc3928e127458d993d8.eot",
    "revision": "b0e2db3b634d1bc3928e127458d993d8"
  }, {
    "url": "assets/b91d376b8d7646d671cd820950d5f7f1.woff2",
    "revision": "b91d376b8d7646d671cd820950d5f7f1"
  }, {
    "url": "assets/b9625119ce4300f0ef890a8f3234c773.ttf",
    "revision": "b9625119ce4300f0ef890a8f3234c773"
  }, {
    "url": "assets/c5d109be8edd3de0f60eb472bd9ef691.svg",
    "revision": "c5d109be8edd3de0f60eb472bd9ef691"
  }, {
    "url": "assets/d1d7e3b4c219fde0f7376c6facfd7149.woff",
    "revision": "d1d7e3b4c219fde0f7376c6facfd7149"
  }, {
    "url": "assets/d745348d289b149026921f197929a893.woff",
    "revision": "d745348d289b149026921f197929a893"
  }, {
    "url": "assets/d824df7eb2e268626a2dd9a6a741ac4e.woff2",
    "revision": "d824df7eb2e268626a2dd9a6a741ac4e"
  }, {
    "url": "assets/ed311c7a0ade9a75bb3ebf5a7670f31d.woff2",
    "revision": "ed311c7a0ade9a75bb3ebf5a7670f31d"
  }, {
    "url": "editor.worker.js",
    "revision": "297989b7c93044ced25f888fa4e979e1"
  }, {
    "url": "examples.json",
    "revision": "7f527540355e65867fe8495474d83dff"
  }, {
    "url": "examples/LIBRARIES/aanl.lib",
    "revision": "56db3a9bf284b85ec2a604e21a060471"
  }, {
    "url": "examples/LIBRARIES/all.lib",
    "revision": "66c3831e0c42ea3438c4a17ed42cf81b"
  }, {
    "url": "examples/LIBRARIES/analyzers.lib",
    "revision": "5c2d95592c02b743096301f62ac32e9c"
  }, {
    "url": "examples/LIBRARIES/basics.lib",
    "revision": "55b88d162bcd3fc15534f69464618930"
  }, {
    "url": "examples/LIBRARIES/compressors.lib",
    "revision": "05d7388791a693ff28cf0d824f90512d"
  }, {
    "url": "examples/LIBRARIES/delays.lib",
    "revision": "6f2da80c28a349c5946d564e7c2d083d"
  }, {
    "url": "examples/LIBRARIES/demos.lib",
    "revision": "931405beb3205854f57ac5d509b75f2d"
  }, {
    "url": "examples/LIBRARIES/dx7.lib",
    "revision": "0f97e305d1c15025e7596e3395629c50"
  }, {
    "url": "examples/LIBRARIES/envelopes.lib",
    "revision": "190d6cfdd330144a61fb6c2b22f05a48"
  }, {
    "url": "examples/LIBRARIES/fds.lib",
    "revision": "5d4430a394e9d860a8465cb527796a98"
  }, {
    "url": "examples/LIBRARIES/filters.lib",
    "revision": "82573339e1aefbbeafa2d8889d21a01a"
  }, {
    "url": "examples/LIBRARIES/hoa.lib",
    "revision": "3e5cc74023a40ff1cf2c15e0e67ca536"
  }, {
    "url": "examples/LIBRARIES/instruments.lib",
    "revision": "e234e29db3098b5ef5dad4bf733cbf0c"
  }, {
    "url": "examples/LIBRARIES/interpolators.lib",
    "revision": "fdd62f359921d10ee1bb7f47946b5af7"
  }, {
    "url": "examples/LIBRARIES/maths.lib",
    "revision": "156bd741ca5b035d93d0c9d1e670989e"
  }, {
    "url": "examples/LIBRARIES/maxmsp.lib",
    "revision": "1e84e292cc55a426fdfd13cf7045dbf6"
  }, {
    "url": "examples/LIBRARIES/mi.lib",
    "revision": "70b38e1089bc745765c960f83aa23554"
  }, {
    "url": "examples/LIBRARIES/misceffects.lib",
    "revision": "faf9405c528b2aba02c9bda071113e1f"
  }, {
    "url": "examples/LIBRARIES/noises.lib",
    "revision": "9a82189027d4e1cb7abf96dfdc1c39e6"
  }, {
    "url": "examples/LIBRARIES/oscillators.lib",
    "revision": "9530dd6469eb851c7de7cf3430b77ca0"
  }, {
    "url": "examples/LIBRARIES/phaflangers.lib",
    "revision": "a4113988b3a73cfb0de7020db3bea160"
  }, {
    "url": "examples/LIBRARIES/physmodels.lib",
    "revision": "61d3f4ec7b1c041c7a1d2becbd806c88"
  }, {
    "url": "examples/LIBRARIES/platform.lib",
    "revision": "a10deb2b7e95251b84e0e26caf1288ed"
  }, {
    "url": "examples/LIBRARIES/quantizers.lib",
    "revision": "2245fc3c6aa6de3df94193c828d49fe2"
  }, {
    "url": "examples/LIBRARIES/reducemaps.lib",
    "revision": "b38a8408c0cedaf85a2aec476a604184"
  }, {
    "url": "examples/LIBRARIES/reverbs.lib",
    "revision": "f95c9d1e9fdaef849ec467d5c141085d"
  }, {
    "url": "examples/LIBRARIES/routes.lib",
    "revision": "a77fda0b8c5f8d242d3556c2007c512d"
  }, {
    "url": "examples/LIBRARIES/sf.lib",
    "revision": "0591d285b0940ae0dec7406b1e827240"
  }, {
    "url": "examples/LIBRARIES/signals.lib",
    "revision": "7894db60138ef807f3ff104b5bcaca17"
  }, {
    "url": "examples/LIBRARIES/soundfiles.lib",
    "revision": "03e06c4b37fe30a3b3293f504c593f7e"
  }, {
    "url": "examples/LIBRARIES/spats.lib",
    "revision": "46577c8189bd2a6dc79443a974c673f5"
  }, {
    "url": "examples/LIBRARIES/stdfaust.lib",
    "revision": "207cb1b00e7834e9e426770d5251a32a"
  }, {
    "url": "examples/LIBRARIES/synths.lib",
    "revision": "f84a4cbad5a258cafaeda94826468de2"
  }, {
    "url": "examples/LIBRARIES/tonestacks.lib",
    "revision": "7c680b0c167053c0ed0c3d444ca8c6d5"
  }, {
    "url": "examples/LIBRARIES/tubes.lib",
    "revision": "a12e2a2ea1c59abfea704c80fb8ab8cd"
  }, {
    "url": "examples/LIBRARIES/vaeffects.lib",
    "revision": "34c1b7c1832bab177e39fd3602d33b1c"
  }, {
    "url": "examples/LIBRARIES/version.lib",
    "revision": "6a56023847f842bdefdc3a59da3df095"
  }, {
    "url": "examples/LIBRARIES/wdmodels.lib",
    "revision": "d60300d837a37509428a7fadf33c0dcd"
  }, {
    "url": "examples/LIBRARIES/webaudio.lib",
    "revision": "f822f1872a92675d03e3cf9e86004f14"
  }, {
    "url": "examples/SAM/16_channel_volume/16_channel_volume.dsp",
    "revision": "b23d1ecc4e0ecb0d904b1a905f79c990"
  }, {
    "url": "examples/SAM/16_channel_volume/layout.dsp",
    "revision": "9573d7064cdf6a9f956ea75744c85d09"
  }, {
    "url": "examples/SAM/chorus/chorus.dsp",
    "revision": "1ba8532ecbe1b1736282d4829e110d46"
  }, {
    "url": "examples/SAM/chorus/chorusForBrowser.dsp",
    "revision": "6c035c3091e8474ea9bd104a2a0286e1"
  }, {
    "url": "examples/SAM/chorus/layout2.dsp",
    "revision": "12586fadff5974927ef4422134c9486c"
  }, {
    "url": "examples/SAM/echo/echo.dsp",
    "revision": "b777b81da4d263360a4bddb6de8dd68a"
  }, {
    "url": "examples/SAM/echo/echoForBrowser.dsp",
    "revision": "12c6f48302eff01856d73ca39ddf3be7"
  }, {
    "url": "examples/SAM/echo/layout2.dsp",
    "revision": "12586fadff5974927ef4422134c9486c"
  }, {
    "url": "examples/SAM/effects/chorus.dsp",
    "revision": "d3ef91c592c343876b63527acad96ad6"
  }, {
    "url": "examples/SAM/effects/echo.dsp",
    "revision": "f5f56f672dc3c7638bc505d58f7cfa9d"
  }, {
    "url": "examples/SAM/effects/effects.dsp",
    "revision": "2c4cd40523f87a4cf431dfe783cc394c"
  }, {
    "url": "examples/SAM/effects/effectsForBrowser.dsp",
    "revision": "c8944ecd65d2e467bc2e1c84bdb50a03"
  }, {
    "url": "examples/SAM/effects/flanger.dsp",
    "revision": "cec246e31cca874231164b4126fa53e6"
  }, {
    "url": "examples/SAM/effects/freeverb.dsp",
    "revision": "83b32c9914237dee9f5ae70fc98f74f0"
  }, {
    "url": "examples/SAM/effects/layout2.dsp",
    "revision": "12586fadff5974927ef4422134c9486c"
  }, {
    "url": "examples/SAM/flanger/flanger.dsp",
    "revision": "7c95b96672323f7cd0b66a3d6613512c"
  }, {
    "url": "examples/SAM/flanger/flangerForBrowser.dsp",
    "revision": "b23663d2d4f5782a40b12656ec7a93cd"
  }, {
    "url": "examples/SAM/flanger/layout2.dsp",
    "revision": "12586fadff5974927ef4422134c9486c"
  }, {
    "url": "examples/SAM/freeverb/freeverb.dsp",
    "revision": "456a3b3b7f157e3c86cf4be980f4e7ce"
  }, {
    "url": "examples/SAM/freeverb/freeverbForBrowser.dsp",
    "revision": "b55d3b2f7c0e94d3713fe1229753c355"
  }, {
    "url": "examples/SAM/freeverb/layout2.dsp",
    "revision": "12586fadff5974927ef4422134c9486c"
  }, {
    "url": "examples/SAM/sawtooth_synth/sawtooth_synth.dsp",
    "revision": "2078b3cb87b19fd698f843c2649166dc"
  }, {
    "url": "examples/SAM/sine_synth/sine_synth.dsp",
    "revision": "6134db55a32f030f50a284d08ba8de8f"
  }, {
    "url": "examples/SAM/virtualAnalog/layout2.dsp",
    "revision": "12586fadff5974927ef4422134c9486c"
  }, {
    "url": "examples/SAM/virtualAnalog/virtualAnalog.dsp",
    "revision": "74cda607108ed914c9ffba7ce34319f7"
  }, {
    "url": "examples/SAM/virtualAnalog/virtualAnalog.touchosc",
    "revision": "17f4e72940cb158c4418809690f3c6dc"
  }, {
    "url": "examples/SAM/virtualAnalog/virtualAnalogForBrowser.dsp",
    "revision": "5a37f7bdaf1a6d0f0da75ff9554716c4"
  }, {
    "url": "examples/SAM/virtualAnalog/virtualAnalogWithEffectsForBrowser.dsp",
    "revision": "cf6e91f80e6e835a9f41afbd06df869b"
  }, {
    "url": "examples/SAM/volume/volume.dsp",
    "revision": "5727473d3ccfbe555034c9a5b099af92"
  }, {
    "url": "examples/ambisonics/fourSourcesToOcto.dsp",
    "revision": "c35f353d122330513b0bb3a156d22ca3"
  }, {
    "url": "examples/ambisonics/oneSourceToStereo.dsp",
    "revision": "0e0a36594fc0b405b68c44410a21db16"
  }, {
    "url": "examples/analysis/FFT.dsp",
    "revision": "90413b80aef0cd3bb430c8eb94581f13"
  }, {
    "url": "examples/analysis/dbmeter.dsp",
    "revision": "6b99238fe379ed783ac3fc8ef8052446"
  }, {
    "url": "examples/analysis/spectralLevel.dsp",
    "revision": "2a5558c61e3fde63685f929b3901ba39"
  }, {
    "url": "examples/analysis/spectralTiltLab.dsp",
    "revision": "c8b98f4e2c67227e3a7d4a3559819181"
  }, {
    "url": "examples/analysis/vumeter.dsp",
    "revision": "aa8e0a06d534b9e671ee6b2720a1def6"
  }, {
    "url": "examples/bela/AdditiveSynth.dsp",
    "revision": "3684a5047e34ae51e8de425a14fcb215"
  }, {
    "url": "examples/bela/AdditiveSynth_Analog.dsp",
    "revision": "5e7938d264c274d8e7f99233e998502c"
  }, {
    "url": "examples/bela/FMSynth2.dsp",
    "revision": "b8f831feeb090cf7e41e75dc6d11daf5"
  }, {
    "url": "examples/bela/FMSynth2_Analog.dsp",
    "revision": "fa357019e74f690094c8e4e40335734b"
  }, {
    "url": "examples/bela/FMSynth2_FX.dsp",
    "revision": "4f7d9e79e45b2d85f54470d4d7acc412"
  }, {
    "url": "examples/bela/FMSynth2_FX_Analog.dsp",
    "revision": "a08876f9bc8557721c880f2fb0dd2d1c"
  }, {
    "url": "examples/bela/FXChaine2.dsp",
    "revision": "aa96863646b6d03aaa991d17c7e03fc5"
  }, {
    "url": "examples/bela/Faust-complement.lib",
    "revision": "1cce7f46cea6d60aee3a02ea5e65ba5a"
  }, {
    "url": "examples/bela/GrainGenerator.dsp",
    "revision": "acf9ad0948ad6994f05ddf495f294fdd"
  }, {
    "url": "examples/bela/WaveSynth.dsp",
    "revision": "4ee091bfb2f0ee9f6f1e368e36e4ca9c"
  }, {
    "url": "examples/bela/WaveSynth_Analog.dsp",
    "revision": "c6f075b6f03af7b04996586d1e8a4e67"
  }, {
    "url": "examples/bela/WaveSynth_FX.dsp",
    "revision": "6da063c108b4f098bdad383e8d694c14"
  }, {
    "url": "examples/bela/WaveSynth_FX_Analog.dsp",
    "revision": "452060418f39ee5fbd3fbf7b560190a4"
  }, {
    "url": "examples/bela/crossDelay2.dsp",
    "revision": "846ebd21681312771dba0b301c345dce"
  }, {
    "url": "examples/bela/granulator.dsp",
    "revision": "a98b1d817ba305a916ec82ce4bd2b4c8"
  }, {
    "url": "examples/bela/repeater.dsp",
    "revision": "e9443be37f5df97d1e6942bf06611931"
  }, {
    "url": "examples/bela/simpleFX.dsp",
    "revision": "ce9bcf351e0be8bb74643d1b7114eac7"
  }, {
    "url": "examples/bela/simpleFX_Analog.dsp",
    "revision": "46aec578a8f735f40af7cfb97cd66902"
  }, {
    "url": "examples/bela/simpleSynth.dsp",
    "revision": "b9f06e66e59d1fbece4570964da565fc"
  }, {
    "url": "examples/bela/simpleSynth_Analog.dsp",
    "revision": "5cf58590f483e8485a9fd6e6b1976685"
  }, {
    "url": "examples/bela/simpleSynth_FX.dsp",
    "revision": "8f3dcb7da48dd80431f5fa5bca73a588"
  }, {
    "url": "examples/bela/simpleSynth_FX_Analog.dsp",
    "revision": "a84e365e73b172369b965291527906dd"
  }, {
    "url": "examples/delayEcho/echo.dsp",
    "revision": "62315eb0632d93d36990b30f73129342"
  }, {
    "url": "examples/delayEcho/quadEcho.dsp",
    "revision": "c86271cabfd914118268a2fe75010f0e"
  }, {
    "url": "examples/delayEcho/smoothDelay.dsp",
    "revision": "586529956486d4264e6703ebc4732956"
  }, {
    "url": "examples/delayEcho/stereoEcho.dsp",
    "revision": "5aada5b6cc03f3c174eba0b91d44549f"
  }, {
    "url": "examples/delayEcho/tapiir.dsp",
    "revision": "5005016ecf00e7ffc9022ca95a7835e8"
  }, {
    "url": "examples/dynamic/compressor.dsp",
    "revision": "deb26c335be6e61835d3d86b9918d45e"
  }, {
    "url": "examples/dynamic/distortion.dsp",
    "revision": "3c48c133b4493d506e2882fbf1eed991"
  }, {
    "url": "examples/dynamic/gateCompressor.dsp",
    "revision": "82e7dfeb3f3861176ea2f027d8f6bd8e"
  }, {
    "url": "examples/dynamic/noiseGate.dsp",
    "revision": "5cef3465eb2445dbce4672a55e4c0af1"
  }, {
    "url": "examples/dynamic/volume.dsp",
    "revision": "3b0febd96a24dbcf252b271516e5ce9d"
  }, {
    "url": "examples/filtering/APF.dsp",
    "revision": "e7997002c33fbbebcdcf9708ee00e9b6"
  }, {
    "url": "examples/filtering/BPF.dsp",
    "revision": "bcd6ebfd66a6a83770418c6f999e678c"
  }, {
    "url": "examples/filtering/DNN.dsp",
    "revision": "bbf5fa9890ceb398ef6619ad27cc2709"
  }, {
    "url": "examples/filtering/HPF.dsp",
    "revision": "59c67ce105ccefa6d421aff98aa6ddc3"
  }, {
    "url": "examples/filtering/LPF.dsp",
    "revision": "eb5ab62470d21be58af3ec9464d99b4a"
  }, {
    "url": "examples/filtering/bandFilter.dsp",
    "revision": "732b013fc7e6a036e7e4de4fee5dd5d7"
  }, {
    "url": "examples/filtering/cryBaby.dsp",
    "revision": "a5e420786671c5fb0f4d7b2e690c78b0"
  }, {
    "url": "examples/filtering/diodeLadder.dsp",
    "revision": "9bd5311aeae2069c9f484a2187a0cac1"
  }, {
    "url": "examples/filtering/filterBank.dsp",
    "revision": "0e2203517b85214063bc29660bec1474"
  }, {
    "url": "examples/filtering/graphicEqLab.dsp",
    "revision": "c29aab7b38d5239a5bbfef8db8dc545b"
  }, {
    "url": "examples/filtering/highShelf.dsp",
    "revision": "7d4996280530be2f08cfdcc933ccc746"
  }, {
    "url": "examples/filtering/korg35HPF.dsp",
    "revision": "dfb8e5089ff7d9493885b59eeda391d0"
  }, {
    "url": "examples/filtering/korg35LPF.dsp",
    "revision": "70bb92bdb74dca9d5fd0f97b3e4d5d39"
  }, {
    "url": "examples/filtering/lfBoost.dsp",
    "revision": "2de5015a15f4d168b7188965067550b9"
  }, {
    "url": "examples/filtering/lowBoost.dsp",
    "revision": "38dce5f90edc3fd1baebdbe02758a2f3"
  }, {
    "url": "examples/filtering/lowCut.dsp",
    "revision": "5198795081c6cb44b644f0a4c37d14fb"
  }, {
    "url": "examples/filtering/lowShelf.dsp",
    "revision": "f6bfbf6bddd3eb4c55d51542aececd8c"
  }, {
    "url": "examples/filtering/moogHalfLadder.dsp",
    "revision": "8953899c75cf06c982d52fd474e683a3"
  }, {
    "url": "examples/filtering/moogLadder.dsp",
    "revision": "558fd596b20b8099623f92b4f49e7a2b"
  }, {
    "url": "examples/filtering/moogVCF.dsp",
    "revision": "708340d07f59f9738222321ce453d159"
  }, {
    "url": "examples/filtering/multibandFilter.dsp",
    "revision": "6c9134ccae9632f20695f5e8c9a594c2"
  }, {
    "url": "examples/filtering/notch.dsp",
    "revision": "cb0c2ef5f17b3a80f289627d36f17e2f"
  }, {
    "url": "examples/filtering/oberheim.dsp",
    "revision": "6b0435b55b32d2b3f6a59b5cf562b4bd"
  }, {
    "url": "examples/filtering/oberheimBPF.dsp",
    "revision": "03e9637b29c0d3a5854e3154495e1c71"
  }, {
    "url": "examples/filtering/oberheimBSF.dsp",
    "revision": "4d24cbbce7034b91956ca675d2952821"
  }, {
    "url": "examples/filtering/oberheimHPF.dsp",
    "revision": "077fa7e14c462b662bb4d573879ad30b"
  }, {
    "url": "examples/filtering/oberheimLPF.dsp",
    "revision": "ea0fb373d3e93439ed12e631e6c7dd14"
  }, {
    "url": "examples/filtering/parametricEqLab.dsp",
    "revision": "155dff6d4d61ec232518296474319dbf"
  }, {
    "url": "examples/filtering/parametricEqualizer.dsp",
    "revision": "3a59ee719929e0b0f6dc08f969051cd9"
  }, {
    "url": "examples/filtering/peakNotch.dsp",
    "revision": "8ac3cc5375d2fd3c424b63296e800366"
  }, {
    "url": "examples/filtering/peakingEQ.dsp",
    "revision": "4ab2bc731b8c0a5c9cb0f27019b085ed"
  }, {
    "url": "examples/filtering/sallenKey2ndOrder.dsp",
    "revision": "dda20093d5573cde4ee28b48be4716fb"
  }, {
    "url": "examples/filtering/sallenKey2ndOrderBPF.dsp",
    "revision": "1563279ac037ea830cf577efaf1586d8"
  }, {
    "url": "examples/filtering/sallenKey2ndOrderHPF.dsp",
    "revision": "9be5b182130ba75dc069e2baae70696c"
  }, {
    "url": "examples/filtering/sallenKey2ndOrderLPF.dsp",
    "revision": "b95bf25dc6f12e81f11db9b14f00ef3c"
  }, {
    "url": "examples/filtering/sallenKeyOnePole.dsp",
    "revision": "46cb4cefd4378095aad2c1a9ec7eb3e0"
  }, {
    "url": "examples/filtering/sallenKeyOnePoleHPF.dsp",
    "revision": "609817e756b23df54e303dea27c8c550"
  }, {
    "url": "examples/filtering/sallenKeyOnePoleLPF.dsp",
    "revision": "b628f58cdf954420ed8d29cb0fd84043"
  }, {
    "url": "examples/filtering/spectralTilt.dsp",
    "revision": "f7d64e8e05e39e46470ee93b1185558c"
  }, {
    "url": "examples/filtering/vcfWahLab.dsp",
    "revision": "23c5c539b49195b962237452327f17ba"
  }, {
    "url": "examples/filtering/vocoder.dsp",
    "revision": "f3d6ba1056313b8ece4eabb7bcbe1f6d"
  }, {
    "url": "examples/filtering/wahPedal.dsp",
    "revision": "d56078a56ce09c7866219cd53449b416"
  }, {
    "url": "examples/gameaudio/bubble.dsp",
    "revision": "6cdae531c2bbfe335d336d5beb38c238"
  }, {
    "url": "examples/gameaudio/rain.dsp",
    "revision": "91e9c6697efe368a4491bd1152b2fef4"
  }, {
    "url": "examples/gameaudio/wind.dsp",
    "revision": "50699dbb58a8d7741bae427e36485271"
  }, {
    "url": "examples/generator/filterOsc.dsp",
    "revision": "17177d2dd10d8ec116ac64a1628fcc1a"
  }, {
    "url": "examples/generator/noise.dsp",
    "revision": "3ff6895039fcc9bce42fabb2dc9fd235"
  }, {
    "url": "examples/generator/noiseMetadata.dsp",
    "revision": "efa1e5bf64e800a480e66f1b74b39a50"
  }, {
    "url": "examples/generator/osc.dsp",
    "revision": "c45be4e432d219c71af5622f7efaa4c9"
  }, {
    "url": "examples/generator/osci.dsp",
    "revision": "4ce510671a7bfee73cf81c9b432621df"
  }, {
    "url": "examples/generator/sawtoothLab.dsp",
    "revision": "bcec64f0f0b2e66a0b41db6d3b11b6d0"
  }, {
    "url": "examples/generator/virtualAnalog.dsp",
    "revision": "55b40461b2aa734549882fcfbfd1e374"
  }, {
    "url": "examples/generator/virtualAnalogLab.dsp",
    "revision": "57bd8159053e642ad03328df31cba231"
  }, {
    "url": "examples/misc/UITester.dsp",
    "revision": "1ca60a8b2274c0ad7d27d444b3f7e8c9"
  }, {
    "url": "examples/misc/capture.dsp",
    "revision": "e7acfb2d353f6efe806b8e136229aafb"
  }, {
    "url": "examples/misc/guitarix.dsp",
    "revision": "dac4fb0721902282accefa422dcdd926"
  }, {
    "url": "examples/misc/matrix.dsp",
    "revision": "c32c77af3482a70522921a91dea50950"
  }, {
    "url": "examples/misc/midiTester.dsp",
    "revision": "153567b14c82e0fb929993af1526c949"
  }, {
    "url": "examples/misc/mixer.dsp",
    "revision": "9ace0651dfa39d392decff6d34899e42"
  }, {
    "url": "examples/misc/switcher.dsp",
    "revision": "0bc27727e0199856322977d9e511dc1e"
  }, {
    "url": "examples/misc/tester.dsp",
    "revision": "ff8e7e603a3e94eb8ef353cc73c1a54b"
  }, {
    "url": "examples/misc/tester2.dsp",
    "revision": "0a609f428a9a6f10d6cc6a7f90305e6f"
  }, {
    "url": "examples/phasing/flanger.dsp",
    "revision": "ea139603b7884145abfd0d6721f57d65"
  }, {
    "url": "examples/phasing/phaser.dsp",
    "revision": "73044da544428540382aca7f44cf62a1"
  }, {
    "url": "examples/phasing/phaserFlangerLab.dsp",
    "revision": "f70de8abbd6cf517c0ccb50b5334799b"
  }, {
    "url": "examples/physicalModeling/brass.dsp",
    "revision": "bd3fc5fe909f391f9a96fb3e12995d89"
  }, {
    "url": "examples/physicalModeling/brassMIDI.dsp",
    "revision": "5136e77f3778426c96910edd8198bf13"
  }, {
    "url": "examples/physicalModeling/churchBell.dsp",
    "revision": "6043efb045c8e54da03a5cd15b6b1f76"
  }, {
    "url": "examples/physicalModeling/clarinet.dsp",
    "revision": "b2027e1b734891e0a2d3b47d3f482b66"
  }, {
    "url": "examples/physicalModeling/clarinetMIDI.dsp",
    "revision": "abe52b7c7ba655eae1f42a5386d8a13c"
  }, {
    "url": "examples/physicalModeling/djembeMIDI.dsp",
    "revision": "eaec700f3be75c8148ed22cc235a1528"
  }, {
    "url": "examples/physicalModeling/elecGuitarMIDI.dsp",
    "revision": "4da3367d1d8c010dc60f2da5e01a171f"
  }, {
    "url": "examples/physicalModeling/englishBell.dsp",
    "revision": "15477dac0af3e96e0e8a6782139c4751"
  }, {
    "url": "examples/physicalModeling/faust-stk/NLFeks.dsp",
    "revision": "68cb0e78a4ff8c1b8c57ca5fb639bcfc"
  }, {
    "url": "examples/physicalModeling/faust-stk/NLFfm.dsp",
    "revision": "d1ea99193ffb60358083e2b696dd7797"
  }, {
    "url": "examples/physicalModeling/faust-stk/bass.dsp",
    "revision": "70f99854e2819a60a798510d5d9af96c"
  }, {
    "url": "examples/physicalModeling/faust-stk/blowBottle.dsp",
    "revision": "d7ffd2d473e279244771f212e85095e4"
  }, {
    "url": "examples/physicalModeling/faust-stk/bowed.dsp",
    "revision": "f9d751ad37e52c16eac841ad4d9a1c42"
  }, {
    "url": "examples/physicalModeling/faust-stk/brass.dsp",
    "revision": "b89e834b881f686edd332ee79ca16418"
  }, {
    "url": "examples/physicalModeling/faust-stk/clarinet.dsp",
    "revision": "ae1dcfe0288b78b6054d9ee3c2432e68"
  }, {
    "url": "examples/physicalModeling/faust-stk/flute.dsp",
    "revision": "443e84f96002fd8b4ca8fd5bbf445a50"
  }, {
    "url": "examples/physicalModeling/faust-stk/fluteStk.dsp",
    "revision": "ba158454ff62bdebe31fca07fbf4b835"
  }, {
    "url": "examples/physicalModeling/faust-stk/glassHarmonica.dsp",
    "revision": "49a803a1056961f3542ea0c91f8e452f"
  }, {
    "url": "examples/physicalModeling/faust-stk/harpsi.dsp",
    "revision": "a6de1a788e404903d1f825012b104ef6"
  }, {
    "url": "examples/physicalModeling/faust-stk/modalBar.dsp",
    "revision": "e29ce141112ab1adbdfd141440c80e5d"
  }, {
    "url": "examples/physicalModeling/faust-stk/piano.dsp",
    "revision": "86c4bf0649511cfd53567a35f76086f2"
  }, {
    "url": "examples/physicalModeling/faust-stk/saxophony.dsp",
    "revision": "b3de4eee3c5c2981b3257d98de8d8249"
  }, {
    "url": "examples/physicalModeling/faust-stk/sitar.dsp",
    "revision": "48b4fdbc45324ce4174df17ebd836334"
  }, {
    "url": "examples/physicalModeling/faust-stk/tibetanBowl.dsp",
    "revision": "8ac929532618d6c35caf2c792444ea33"
  }, {
    "url": "examples/physicalModeling/faust-stk/tunedBar.dsp",
    "revision": "a7585a8f4b69d5248553c7259241ddc0"
  }, {
    "url": "examples/physicalModeling/faust-stk/uniBar.dsp",
    "revision": "4b39716334902ad17e16d627045a2a30"
  }, {
    "url": "examples/physicalModeling/faust-stk/voiceForm.dsp",
    "revision": "e57f4b98947f560a641efaffe1fcb2c1"
  }, {
    "url": "examples/physicalModeling/fds/1dDampedWaveEquation.dsp",
    "revision": "67980a7e58795bea946baf7b307e54fa"
  }, {
    "url": "examples/physicalModeling/fds/2dKirchhoffThinPlate.dsp",
    "revision": "4a44d8aec7542606c3d18d7ecb4dd34b"
  }, {
    "url": "examples/physicalModeling/fds/BowedString.dsp",
    "revision": "72a7933a41d2d1690f4a0a31be71accd"
  }, {
    "url": "examples/physicalModeling/fds/ControllableNonPhysicalString.dsp",
    "revision": "1cf71502b9675a35a55da3966df1ab83"
  }, {
    "url": "examples/physicalModeling/fds/HammeredString.dsp",
    "revision": "62c338f1ae766a6038dd730273355979"
  }, {
    "url": "examples/physicalModeling/fds/PianoHammeredString.dsp",
    "revision": "07be031bdd72f48d1819186762532dab"
  }, {
    "url": "examples/physicalModeling/fds/StiffString.dsp",
    "revision": "1f242ed86042a7a0bde2561b6cac92c7"
  }, {
    "url": "examples/physicalModeling/flute.dsp",
    "revision": "bec08ca4c3210aabfc32565f0ccb6491"
  }, {
    "url": "examples/physicalModeling/fluteMIDI.dsp",
    "revision": "0e2d15be0b32e62288a412afd17e7430"
  }, {
    "url": "examples/physicalModeling/frenchBell.dsp",
    "revision": "4b395546783aec36275ac6854d1f9070"
  }, {
    "url": "examples/physicalModeling/germanBell.dsp",
    "revision": "92031c3fad7703400ea9982c4e8119e9"
  }, {
    "url": "examples/physicalModeling/guitarMIDI.dsp",
    "revision": "2cf72776ff10deb41dd988f9eb25be38"
  }, {
    "url": "examples/physicalModeling/karplus.dsp",
    "revision": "3244d94466fe47f91c918ba0f4c88371"
  }, {
    "url": "examples/physicalModeling/marimbaMIDI.dsp",
    "revision": "994e23f90cca0519dcb490c4826abfe4"
  }, {
    "url": "examples/physicalModeling/modularInterpInstrMIDI.dsp",
    "revision": "09850a48259b6ab63e73bcd19edbdd27"
  }, {
    "url": "examples/physicalModeling/nylonGuitarMIDI.dsp",
    "revision": "19ed80bd495e6e6d1a723fa273f00329"
  }, {
    "url": "examples/physicalModeling/russianBell.dsp",
    "revision": "3a83da099c9f0ea802d217fb18686606"
  }, {
    "url": "examples/physicalModeling/standardBell.dsp",
    "revision": "8f6e7c017b8c147fcee85b5163cf13d8"
  }, {
    "url": "examples/physicalModeling/violin.dsp",
    "revision": "d6a25f8817c94455647c2154f0ad01b6"
  }, {
    "url": "examples/physicalModeling/violinMIDI.dsp",
    "revision": "37bf2502257fd238b729797ebf2a576a"
  }, {
    "url": "examples/physicalModeling/vocalBP.dsp",
    "revision": "58defda1583a40b5cb62a6b189ad2f6c"
  }, {
    "url": "examples/physicalModeling/vocalBPMIDI.dsp",
    "revision": "aeb4e19510ea80d96742964f0bf99845"
  }, {
    "url": "examples/physicalModeling/vocalFOF.dsp",
    "revision": "99eebcc7ecaa2ddf0edd0cf6f24c2c70"
  }, {
    "url": "examples/physicalModeling/vocalFOFMIDI.dsp",
    "revision": "fad3be64e05371954e5b8d94329e8b93"
  }, {
    "url": "examples/pitchShifting/pitchShifter.dsp",
    "revision": "8af78d1b6193065479a66db5e250616e"
  }, {
    "url": "examples/psychoacoustic/harmonicExciter.dsp",
    "revision": "eebb583e71557b35bdab830722f3dedc"
  }, {
    "url": "examples/reverb/dattorro.dsp",
    "revision": "74bf9ec3b48bec59f186631dfa7d4f4c"
  }, {
    "url": "examples/reverb/fdnRev.dsp",
    "revision": "2f6d09723ecb770a3cf5ec15cfca7206"
  }, {
    "url": "examples/reverb/freeverb.dsp",
    "revision": "28c1a2f015bb6d04245de4e61f337904"
  }, {
    "url": "examples/reverb/greyhole.dsp",
    "revision": "6e7b2560602fe7a329acb008f35ddcde"
  }, {
    "url": "examples/reverb/jprev.dsp",
    "revision": "746df8139c2bbae68aefeae0ebfa06d1"
  }, {
    "url": "examples/reverb/reverbDesigner.dsp",
    "revision": "673a0195e3326efe239a6a08cddcaad4"
  }, {
    "url": "examples/reverb/reverbTester.dsp",
    "revision": "4b9a72d08197c0fe387735bfe85b9190"
  }, {
    "url": "examples/reverb/zitaRev.dsp",
    "revision": "60ed38c2a7b89b9ac2ba894e4da7fb0b"
  }, {
    "url": "examples/reverb/zitaRevFDN.dsp",
    "revision": "7cf60a969ab20f197a395e743eb88da1"
  }, {
    "url": "examples/smartKeyboard/acGuitar.dsp",
    "revision": "6f84fc6835ba5d85c00bab72a17ff639"
  }, {
    "url": "examples/smartKeyboard/associatedEffects/elecGuitarEffect.dsp",
    "revision": "4e80b7bb5db377f79f2f26d2e131944d"
  }, {
    "url": "examples/smartKeyboard/associatedEffects/myEffect.dsp",
    "revision": "d44367415a756c2043b6c74c2bde2f4e"
  }, {
    "url": "examples/smartKeyboard/associatedEffects/reverb.dsp",
    "revision": "d44367415a756c2043b6c74c2bde2f4e"
  }, {
    "url": "examples/smartKeyboard/bells.dsp",
    "revision": "5354a5c4629691c6e516ec2c83873515"
  }, {
    "url": "examples/smartKeyboard/bowed.dsp",
    "revision": "136d7d8ab82f63b05ffbc718cf1b365a"
  }, {
    "url": "examples/smartKeyboard/brass.dsp",
    "revision": "2e879bedbabad599c171b79aa4bad80c"
  }, {
    "url": "examples/smartKeyboard/clarinet.dsp",
    "revision": "f95a7b669d4eef692c434681a411adfc"
  }, {
    "url": "examples/smartKeyboard/crazyGuiro.dsp",
    "revision": "fb6f5a3db8c7321012805771cd6f94d0"
  }, {
    "url": "examples/smartKeyboard/drums.dsp",
    "revision": "7ceb354987dc673c47d4903d31d1085d"
  }, {
    "url": "examples/smartKeyboard/dubDub.dsp",
    "revision": "3e226b244cd5bd54b9eedf7b2c1cf9f8"
  }, {
    "url": "examples/smartKeyboard/elecGuitar.dsp",
    "revision": "be26a0dd292be8b795a65c476fde0475"
  }, {
    "url": "examples/smartKeyboard/fm.dsp",
    "revision": "38c1a726632c134b6b9d9193ef8eda71"
  }, {
    "url": "examples/smartKeyboard/frog.dsp",
    "revision": "7dd55eefcfcafadda69ce3a522d08d45"
  }, {
    "url": "examples/smartKeyboard/harp.dsp",
    "revision": "a93f1c0c7ceb6c3de2e5af1b86138565"
  }, {
    "url": "examples/smartKeyboard/midiOnly.dsp",
    "revision": "09e1d9967d7daa792de2fea3e6981f20"
  }, {
    "url": "examples/smartKeyboard/multiSynth.dsp",
    "revision": "e61eb4d284ef24d3cdfd192e82da8289"
  }, {
    "url": "examples/smartKeyboard/toy.dsp",
    "revision": "ab76328f0eea94fed284ce907df2ed2f"
  }, {
    "url": "examples/smartKeyboard/trumpet.dsp",
    "revision": "5811096cf3c60a5eb0a211f286fd99df"
  }, {
    "url": "examples/smartKeyboard/turenas.dsp",
    "revision": "7c8317cbd80093ec8e4af3a835960c20"
  }, {
    "url": "examples/smartKeyboard/violin.dsp",
    "revision": "d8992d89218b94f8a3e743cd0598d1f7"
  }, {
    "url": "examples/smartKeyboard/violin2.dsp",
    "revision": "72733e07a11571f48eaf7628e409f954"
  }, {
    "url": "examples/smartKeyboard/vocal.dsp",
    "revision": "4b5a8c16313c24f9bb4310125bbf0751"
  }, {
    "url": "examples/spat/panpot.dsp",
    "revision": "5fd41980ba09303d50c5898230bb01ac"
  }, {
    "url": "examples/spat/spat.dsp",
    "revision": "8753c9b409ae2331139d94356c952112"
  }, {
    "url": "faust-ui/index.d.ts",
    "revision": "30bf9aeb24b57cf973c2efe9baaab312"
  }, {
    "url": "faust-ui/index.html",
    "revision": "ed0bb4ef2ded005f6f0cf7351ea21406"
  }, {
    "url": "faust-ui/index.js",
    "revision": "ab2ddfd41213cf174731f94eb45bd3de"
  }, {
    "url": "favicon.png",
    "revision": "8c793ef1d04148eb48e9595e54950310"
  }, {
    "url": "icon/icon_192.png",
    "revision": "ee7ec1719955d2f9c0bbea290b088d20"
  }, {
    "url": "icon/icon_512.png",
    "revision": "b22ed1b5b20db59704b843dd46076aa5"
  }, {
    "url": "index.html",
    "revision": "db07022757cf774639ee3500fb6789a6"
  }, {
    "url": "index.js",
    "revision": "a4c31a831b56b866be4c880fe58e07f7"
  }, {
    "url": "js/1296cd460800e09aa429.js",
    "revision": "6f2ccc6f555de33957dade4a2ccccc06"
  }, {
    "url": "js/1bb2de333acac7f4e574.js",
    "revision": "d5fba5a07ab9f363917963f17d16b4ad"
  }, {
    "url": "js/64a85437241412580b08.js",
    "revision": "eac1eea79d32cd0c12f79bd6d26b72b3"
  }, {
    "url": "libfaust-wasm.data",
    "revision": "685698af8b94d1c2f07fa4a22b544684"
  }, {
    "url": "libfaust-wasm.wasm",
    "revision": "fa6abe265782093fd20a486a17fcfe92"
  }, {
    "url": "manifest.json",
    "revision": "f3d06b397bb5cb600d762d38b076fc44"
  }, {
    "url": "primitives.lib",
    "revision": "6a13ae246aad4364d4be41de71c122a7"
  }], {});
  workbox.cleanupOutdatedCaches();

});
//# sourceMappingURL=service-worker.js.map
