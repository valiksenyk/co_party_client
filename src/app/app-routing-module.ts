import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RoomsComponent} from "./pages/rooms/rooms.component";
import {PlayerPageComponent} from "./pages/player-page/player-page.component";

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'rooms'
    },
    {
        path: 'rooms',
        component: RoomsComponent
    },
    {
        path: 'player/:id',
        component: PlayerPageComponent
    },
    {
        path: '**',
        redirectTo: ''
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
