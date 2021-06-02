import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

export interface IRoom {
    name: string,
    _id: string
    users?: any[]
}

@Injectable()
export class RoomsService {
    private readonly baseUrl = environment.apiUrl;

    constructor(private readonly httpClient: HttpClient) {}

    getRooms(): Observable<{count: number, rooms: IRoom[]}> {
        return this.httpClient.get<{count: number, rooms: IRoom[]}>(`${this.baseUrl}/rooms`);
    }

    createRoom(name: string): Observable<IRoom> {
        return this.httpClient.post<IRoom>(`${this.baseUrl}/rooms`, {name});
    }
}
