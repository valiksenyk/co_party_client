import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  inject,
  InjectionToken,
  Input
} from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { AUDIO_CONTEXT } from "@ng-web-apis/audio";
import { decode } from "../assets/decode";
import { KICK } from "../assets/kick";
import { SNARE } from "../assets/snare";
import { TICK } from "../tick.service";

// Because StackBlitz does not allow assets we have to encode our samples to Base64
export const KICK_BUFFER = new InjectionToken<Promise<AudioBuffer>>("Kick", {
  factory: () => inject(AUDIO_CONTEXT).decodeAudioData(decode(KICK))
});

export const SNARE_BUFFER = new InjectionToken<Promise<AudioBuffer>>("Snare", {
  factory: () => inject(AUDIO_CONTEXT).decodeAudioData(decode(SNARE))
});

@Component({
  selector: "beat",
  templateUrl: "./beat.template.html",
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BeatComponent {
  @Input() volume = 1;

  readonly kick$ = this.tick$.pipe(map(tick => tick % 4 < 2));

  readonly snare$ = this.tick$.pipe(map(tick => tick % 4 >= 2));

  constructor(
    @Inject(TICK) private readonly tick$: Observable<number>,
    @Inject(KICK_BUFFER) readonly kick: Promise<AudioBuffer>,
    @Inject(SNARE_BUFFER) readonly snare: Promise<AudioBuffer>,
  ) {}
}
