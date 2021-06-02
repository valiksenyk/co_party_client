import {Component, OnInit} from "@angular/core";
import {IRoom, RoomsService} from "../../services/rooms.service";
import {Observable, Subject, throwError} from "rxjs";
import {catchError, map, switchMap} from "rxjs/operators";
import {Router} from "@angular/router";

@Component({
    selector: 'rooms-component',
    templateUrl: './rooms.component.html',
    styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {
    rooms$: Observable<IRoom[]>
    roomName: string;
    roomNameError: boolean;
    private readonly getRooms$: Subject<void> = new Subject<void>();
    constructor(private readonly roomsService: RoomsService, private readonly router: Router) {
    }

    ngOnInit() {
        this.rooms$ = this.getRooms$.pipe(
            switchMap(() => this.roomsService.getRooms()
                .pipe(
                    map(res => res.rooms)
                ))
        )

        setTimeout(() => {
            this.getRooms$.next();
        })
    }

    create() {
        this.roomsService.createRoom(this.roomName)
            .pipe(
                catchError(err => {
                    if (err && err.status === 409) {
                        this.roomNameError = true;
                    }

                    return throwError(err);
                })
            )
            .subscribe(room => {
                this.getRooms$.next();
                this.router.navigate([`/player/${room._id}`])
            })
    }
}
