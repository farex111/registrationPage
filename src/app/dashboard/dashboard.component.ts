import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { GeneralRequestService } from "../shared/services/general-request.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent{
  constructor(private generalRequestService: GeneralRequestService, private router: Router){
  }

  logOut(){
    this.generalRequestService.clearToken();
    this.router.navigate([""])
  }
}
