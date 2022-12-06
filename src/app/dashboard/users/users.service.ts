import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

export interface UserModel {
  email: string;
  name: string;
  personalId: string;
  date: Date;
  status: string;
  category: string;
  id?: number;
}

export interface StatusModel {
  status: string;
  id: number;
}

export interface CategoryModel {
  category: string;
  id: number;
}

@Injectable({
  providedIn: "root",
})
export class UsersService {
  constructor(private http: HttpClient){
  }

  addUser(user: UserModel): Observable<UserModel>{
    return this.http.post<UserModel>("http://localhost:3000/users", user);
  }

  addStatus(status: string): Observable<StatusModel>{
    return this.http.post<StatusModel>("http://localhost:3000/statuses", { status });
  }

  addCategory(category: string): Observable<CategoryModel>{
    return this.http.post<CategoryModel>("http://localhost:3000/category", { category });
  }

  deleteUser(id: number): Observable<Object>{
    return this.http.delete<Object>(`http://localhost:3000/users/${ id }`);
  }

  getUsers(): Observable<Array<UserModel>>{
    return this.http.get<Array<UserModel>>("http://localhost:3000/users ");
  }

  filterUsers(params: any): Observable<Array<UserModel>>{
    return this.http.get<Array<UserModel>>(`http://localhost:3000/users`, {params});
  }

  getStatuses(): Observable<Array<StatusModel>>{
    return this.http.get<Array<StatusModel>>("http://localhost:3000/statuses");
  }

  getCategoryList(): Observable<Array<CategoryModel>>{
    return this.http.get<Array<CategoryModel>>("http://localhost:3000/category");
  }
}

