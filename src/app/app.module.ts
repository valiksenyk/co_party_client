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
import {RoomsComponent} from "./pages/rooms/rooms.component";
import {RouterModule} from "@angular/router";
import {PlayerPageComponent} from "./pages/player-page/player-page.component";
import {AppRoutingModule, routes} from "./app-routing-module";
import {RoomsService} from "./services/rooms.service";
import {HttpClientModule} from "@angular/common/http";
import {environment} from "../environments/environment";

const config: SocketIoConfig = { url: environment.apiUrl, options: { path: '/socket.io', transports: ['websocket'] } };

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    WebAudioModule,
    SocketIoModule.forRoot(config),
    RouterModule.forRoot(routes),
    AppRoutingModule,
    HttpClientModule
  ],
  declarations: [
    AppComponent,
    BeatComponent,
    ChordsComponent,
    LeadComponent,
    SoloComponent,
    AdsrPipe,
    RoomsComponent,
    PlayerPageComponent
  ],
  bootstrap: [AppComponent],
  providers: [RoomsService]
})
export class AppModule {}
