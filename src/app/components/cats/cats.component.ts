import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Cat } from 'src/app/models/cat.model';
import { CatService } from 'src/app/services/cat.service';

@Component({
  selector: 'app-cats',
  templateUrl: './cats.component.html',
  styleUrls: ['./cats.component.css']
})
export class CatsComponent implements OnInit {

  catList: Cat[] = [];

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

}
