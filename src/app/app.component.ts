import {Component, OnInit} from "@angular/core";
import {Socket} from "ngx-socket-io";
import {SoundModel} from "./models/sound.model";
import {AudioBufferService} from "@ng-web-apis/audio";
import {Wave} from '@foobar404/wave';

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit {
  started = false;
  sound: SoundModel = {
    beat: 1,
    solo: 1,
    chords: 1,
    lead: 1,
  }
  wave: any;

  get text(): string {
    return this.started ? 'Stop' : 'Start AudioContext';
  }

  constructor(private readonly socket: Socket, private readonly audioService: AudioBufferService) {
  }

  ngOnInit() {
    this.socket.fromEvent('mix')
        .subscribe((sound: SoundModel) => {
          console.log('on mix', sound);
          this.sound = sound;
        })

    this.socket.fromEvent('start')
        .subscribe(() => {
      this.started = true;
    });

    this.socket.fromEvent('stop')
        .subscribe(() => {
          this.started = false;
        });

    this.wave = new Wave();
  }

  onSoundParamsChange(): void {
    this.socket.emit('mix', this.sound);
  }

  toggle() {
    this.started = !this.started;
    this.socket.emit(this.started ? 'start' : 'stop', this.started);
    console.log(this.audioService);
  }
}
