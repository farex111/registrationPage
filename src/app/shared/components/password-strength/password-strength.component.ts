import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { AbstractControl, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-password-strength",
  templateUrl: "./password-strength.component.html",
  styleUrls: ["./password-strength.component.scss"],
})
export class PasswordStrengthComponent implements OnInit, OnChanges {
  private _strength!: number;

  criteriaMap = new Map<string, any>();
  validators: Array<string> = ["minLength", "lowerCase", "upperCase", "digitChar", "specialChar"];
  passwordFormControl!: AbstractControl;
  containMinLength: boolean = false;
  containAtLeastOneLowerCaseLetter: boolean = false;
  containAtLeastOneUpperCaseLetter: boolean = false;
  containAtLeastOneDigit: boolean = false;
  containAtLeastOneSpecialChar: boolean = false;

  @Input() password!: string;
  @Input() minLength: number = 0;
  @Input() hasUpperCase: boolean = false;
  @Input() hasLowerCase: boolean = false;
  @Input() hasNumber: boolean = false;
  @Input() hasSpecialChar: boolean = false;
  @Output() onStrengthChanged: EventEmitter<number> = new EventEmitter<number>();

  constructor(){
  }

  ngOnInit(): void{
  }

  ngOnChanges(changes: SimpleChanges): void{
    if(changes["password"].currentValue) {
      this.setCriteriaValues();
      if(this.password && this.password.length > 0) {
        this.calculatePasswordStrength();
      }
    } else {
      this.reset();
    }
  }

  get strength(): number{
    return this._strength ? this._strength : 0;
  }

  private setCriteriaValues(){
    if(this.minLength > 0) {
      const minLength = `^.{${ this.minLength },65}$`;
      this.criteriaMap.set("minLength", RegExp(minLength));
    }
    if(this.hasLowerCase) {
      this.criteriaMap.set("lowerCase", RegExp(/^(?=.*?[a-z])/));
    }
    if(this.hasUpperCase) {
      this.criteriaMap.set("upperCase", RegExp(/^(?=.*?[A-Z])/));
    }
    if(this.hasNumber) {
      this.criteriaMap.set("digitChar", RegExp(/^(?=.*?[0-9])/));
    }
    if(this.hasSpecialChar) {
      this.criteriaMap.set("specialChar", RegExp(/^(?=.*?[" !"#$%&'()*+,-./:;<=>?@[\]^_`{|}~"])/));
    }

    this.passwordFormControl = new FormControl("",
      [...this.validators.map(criteria => Validators.pattern(this.criteriaMap.get(criteria)))]);
  }

  private _containMinLength(): boolean{
    this.containMinLength = this.password.length >= this.minLength;
    return this.containMinLength;
  }

  private _containAtLeastOneLowerCaseLetter(): boolean{
    this.containAtLeastOneLowerCaseLetter = this.criteriaMap.get("lowerCase").test(this.password);
    return this.containAtLeastOneLowerCaseLetter;
  }

  private _containAtLeastOneUpperCaseLetter(): boolean{
    this.containAtLeastOneUpperCaseLetter = this.criteriaMap.get("upperCase").test(this.password);
    return this.containAtLeastOneUpperCaseLetter;
  }

  private _containAtLeastOneDigit(): boolean{
    this.containAtLeastOneDigit = this.criteriaMap.get("digitChar").test(this.password);
    return this.containAtLeastOneDigit;
  }

  private _containAtLeastOneSpecialChar(): boolean{
    this.containAtLeastOneSpecialChar = this.criteriaMap.get("specialChar").test(this.password);
    return this.containAtLeastOneSpecialChar;
  }

  calculatePasswordStrength(): void{
    const requirements: Array<boolean> = [];
    if(this.hasUpperCase) {
      requirements.push(this._containAtLeastOneUpperCaseLetter());
    }
    if(this.hasLowerCase) {
      requirements.push(this._containAtLeastOneLowerCaseLetter());
    }
    if(this.hasNumber) {
      requirements.push(this._containAtLeastOneDigit());
    }
    if(this.hasSpecialChar) {
      requirements.push(this._containAtLeastOneSpecialChar());
    }
    if(this.minLength > 0) {
      requirements.push(this._containMinLength());
    }

    const unit = 100 / requirements.length;
    this._strength = requirements.filter(v => v).length * unit;
    this.onStrengthChanged.emit(this.strength);
  }

  reset(): void{
    this._strength = 0;
    this.containMinLength =
      this.containAtLeastOneLowerCaseLetter =
        this.containAtLeastOneUpperCaseLetter =
          this.containAtLeastOneDigit =
            this.containAtLeastOneSpecialChar = false;
  }
}
