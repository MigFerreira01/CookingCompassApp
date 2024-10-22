import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserDTO } from 'src/models/user';

@Injectable({
    providedIn:'root',
})
export class UserService {
    apiUrl = 'https://localhost:5022'

    constructor(private httpClient: HttpClient){}

    getAll(): Observable<UserDTO[]> {
        return this.httpClient.get<UserDTO[]>(this.apiUrl + '/CookingCompassAPI/User');
    }

    getUserById(id: number) {
        return this.httpClient.get<UserDTO>(this.apiUrl + '/CookingCompassAPI/User/userId/' + id)
    }

    save(userDTO: UserDTO): Observable<UserDTO> {

        return this.httpClient.post<UserDTO>(this.apiUrl + '/CookingCompassAPI/User', userDTO);
      }

    delete(id: number) {
        return this.httpClient.delete(this.apiUrl + '/CookingCompassAPI/User/' + id);
    }
}
