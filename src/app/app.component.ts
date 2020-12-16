import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Cat } from './models/cat.model';
import { CatService } from './services/cat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'api-arthur';

  cat: Cat = {
    name: "", image: {
      height: 0,
      id: "strng",
      url: "sting",
      width: 0
    }
  };

  error: boolean = false;
  errorMessage: string = "";

  constructor(private service: CatService) { }

  onSubmit(form: NgForm) {
   
    if (form.valid) {
      this.service.getCat(form.value.cat)
        .subscribe((response: any) => {
          this.error = false;
          this.cat = response[0];
          console.log();
        }, (error: HttpErrorResponse) => {
          if (error.status == 404) {
            this.error = true;
            this.errorMessage = "Error 404";
            console.log(error);
          }
        });
    } else {
      if (!this.cat.name.valueOf()) {
        this.error = true;
        this.errorMessage = "What the hell is that?! Well, definetly is not a cat!";
      }
    }

    this.error = true;
    this.errorMessage = "If you don't insert a cat breed, how can I guess??"

  }
}
