import { Component } from "@angular/core";
import { GeneralRequestService } from "../shared/services/general-request.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent{
  constructor(private generalRequestService: GeneralRequestService, private router: Router){
  }
  logout(){
    this.generalRequestService.clearToken();
    this.router.navigate([""])
  }
}
