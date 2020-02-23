import { IDownloadFruit } from './../../interface/i-download-fruit';
import { FruitService } from './../services/fruit.service';
import { IFruit } from '../../interface/i-fruit';
import { FileService } from './../../shared/services/file.service';
import { Component, OnInit } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import * as moment from 'moment';
import * as _ from 'underscore';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements OnInit {

  constructor(
    private fileService: FileService,
    private fruitService: FruitService
  ) { }
  private fruitSubject = new Subject<IFruit[]>();
  fruits$ = this.fruitSubject as Observable<IFruit[]>;
  pageTitle = 'Upload Fruit';

  private hasMergeDataSubject = new Subject<boolean>();
  hasMergeData$ = this.hasMergeDataSubject as Observable<boolean>;
  ngOnInit() {

  }
  upload = (evt) => {
    this.hasMergeData$ = of(false);
    const files = evt.target.files; // FileList object
    const file = files[0];
    this.fileService.readCSVFile(file);
    this.fruits$ =
      this.fileService.data$.pipe(
        map((dataArray: []) => {
          let fruits: IFruit[] = [] as any;
          dataArray.forEach((data) => {
            const fruit: IFruit = {} as any;
            fruit.fruit = data[0];
            fruit.price = +data[1],
              fruit.quantity = +data[2];
            fruit.updatedDate = moment(data[3], 'DD/MM/YYYY').toDate();
            fruits.push(fruit);
          });
          fruits = _.sortBy(fruits, 'updatedDate');
          return fruits;
        })
      );

  }
  update = (fruits: IFruit[]) => {

  }

  download = (fruits: IFruit[]) => {
    const downloadFruits: IDownloadFruit[] = [];
    fruits.forEach((fruit: IFruit) => {
      let model: IDownloadFruit = {} as any;
      model.fruit = fruit.fruit;
      model.price = fruit.price;
      model.quantity = fruit.quantity;
      model.updatedDate = moment(fruit.updatedDate).format('DD/MM/YYYY');
      downloadFruits.push(model);
    });

    this.fileService.downLoadFile(downloadFruits);
  }
  merge = (fruits: IFruit[]) => {
    this.fruits$ = this.fruitService.merge(fruits);
    this.hasMergeData$ = of(true);
  }
}
