import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private unique_name$ = new BehaviorSubject<string>("");
  private role$ = new BehaviorSubject<string>("");

  constructor() { }

  public getRoleFromUSer(){
    return this.role$.asObservable();
  }
  public setRoleForUSer(role: string){
    this .role$.next(role);
  }

  public getFullName(){
   return this.unique_name$.asObservable();
  }

  public setFullName(fullname : string){
      this.unique_name$.next(fullname)
  
}

}
