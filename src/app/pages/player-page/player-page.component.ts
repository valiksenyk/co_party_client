import {Component, OnDestroy, OnInit} from "@angular/core";
import {Socket} from "ngx-socket-io";
import {SoundModel} from "../../models/sound.model";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'player-page',
    templateUrl: './player-page.component.html',
    styleUrls: ['./player-page.component.scss']
})
export class PlayerPageComponent implements OnInit, OnDestroy {
    started = false;
    sound: SoundModel = {
        beat: 1,
        solo: 1,
        chords: 1,
        lead: 1,
    }
    wave: any;
    clientsCount = 0;
    private roomId: string;

    get text(): string {
        return this.started ? 'Stop' : 'Start AudioContext';
    }

    constructor(
        private readonly socket: Socket,
        private readonly route: ActivatedRoute
    ) {
        this.roomId = this.route.snapshot.params.id;
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

        this.socket.fromEvent('roomClientsCountUpdate')
            .subscribe(({count}: {count: number}) => {
                this.clientsCount = count;
            })

        this.socket.emit('joinRoom', {username: 'valik', roomId: this.roomId})
        this.socket.emit('getClientsCountForRoom', {roomId: this.roomId});
    }

    onSoundParamsChange(): void {
        this.socket.emit('mix', {roomId: this.roomId, soundParams: this.sound});
    }

    toggle() {
        this.started = !this.started;
        this.socket.emit(this.started ? 'start' : 'stop', {roomId: this.roomId});
    }

    ngOnDestroy() {
        this.socket.emit('leaveRoom', {roomId: this.roomId});
    }
}
