import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { WebAudioModule } from "@ng-web-apis/audio/fesm2015/ng-web-apis-audio";

import { AppComponent } from "./app.component";

import { AdsrPipe } from "./adsr.pipe";

import { BeatComponent } from "./beat/beat.component";
import { ChordsComponent } from "./chords/chords.component";
import { LeadComponent } from "./lead/lead.component";
import { SoloComponent } from "./solo/solo.component";
import {SocketIoConfig, SocketIoModule} from "ngx-socket-io";

const config: SocketIoConfig = { url: 'http://192.168.0.103:3000', options: { path: '/socket.io', transports: ['websocket'] } };

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    WebAudioModule,
    SocketIoModule.forRoot(config)
  ],
  declarations: [
    AppComponent,
    BeatComponent,
    ChordsComponent,
    LeadComponent,
    SoloComponent,
    AdsrPipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
