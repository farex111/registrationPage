import { Component } from "@angular/core";

@Component({
  selector: "app-auth",
  templateUrl: "auth.component.html",
  styleUrls: ['auth.component.scss']
})
export class AuthComponent {
  imagesAddress: Array<string> = [
    '../../assets/images/female-11.jpg',
    "../../assets/images/female-18.jpg",
    "../../assets/images/male-09.jpg",
    "../../assets/images/male-16.jpg"
  ]
}
