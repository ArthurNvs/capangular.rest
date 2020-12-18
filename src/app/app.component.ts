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

  catList: Cat[] = [];

  error: boolean = false;
  hasCat: boolean = false;

  errorMessage: string = "";

  constructor(private service: CatService) { }

  ngOnInit(): void {
    this.service.getCats().subscribe(
      (response: any) => {
        this.catList = response;
        this.catList.map(result => {
          this.service.getCat(result.name)
            .subscribe(res => result = res[0]), (error: HttpErrorResponse) => console.log(error);
        })
      }
    );
  }

  onSubmit(form: NgForm) {

    if (form.valid) {
      this.service.getCat(form.value.cat)
        .subscribe((response: any) => {
          this.error = false;
          this.hasCat = true;
          this.cat = response[0];

          if (this.cat == undefined) {
            this.error = true;
            this.hasCat = false;
            this.errorMessage = "What the hell is that?! Well, definetly is not a cat!";
          }
        }, (error: HttpErrorResponse) => {
          if (error.status == 404) {
            this.error = true;
            this.hasCat = false;

            this.errorMessage = "Error 404";
            console.log(error);
          }
        });
    }

    this.error = true;
    this.hasCat = false;
    this.errorMessage = "If you don't insert a cat breed, how can I guess??"
    console.log(this.cat.image.url);

  }
}