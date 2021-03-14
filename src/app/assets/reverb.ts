import { InjectionToken, inject } from "@angular/core";
import { AUDIO_CONTEXT } from "@ng-web-apis/audio";
import { decode } from "./decode";
import { RESPONSE } from "./response";

export const REVERB = new InjectionToken<Promise<AudioBuffer>>("Response", {
  factory: () => inject(AUDIO_CONTEXT).decodeAudioData(decode(RESPONSE))
});
