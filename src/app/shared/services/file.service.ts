import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class FileService {

  constructor() { }
  private dataSubject = new Subject<any[]>();
  data$ = this.dataSubject as Observable<any[]>;

  readCSVFile = (file) => {
    const reader = new FileReader();
    reader.readAsText(file);

    reader.onload = (event) => {
      if (event.target.result !== undefined) {
        const csv = event.target.result; // Content of CSV file
        this.extractData(csv); //Here you can call the above function.
      }
    }
  }

  downLoadFile = (data: any) => {
    const replacer = (key, value) => value === null ? '' : value; // specify how you want to handle null values here
    const header = Object.keys(data[0]);
    const csv = data.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
    csv.unshift(header.join(','));
    let csvArray = csv.join('\r\n');

    const a = document.createElement('a');
    const blob = new Blob([csvArray], {type: 'text/csv' }),
    url = window.URL.createObjectURL(blob);

    a.href = url;
    a.download = 'myFile.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }
  private extractData = (data) => { // Input csv data to the function

    const csvData = data;
    const allTextLines = csvData.split(/\r\n|\n/);
    const headers = allTextLines[0].split(',');
    const lines = [];

    for (let i = 1; i < allTextLines.length; i++) {
      // split content based on comma
      let data = allTextLines[i].split(',');
      if (data.length === headers.length) {
        const tarr = [];
        for (let j = 0; j < headers.length; j++) {
          tarr.push(data[j].replace('"', '').replace('"', ''));
        }
        lines.push(tarr);
      }
    }

    this.dataSubject.next(lines);
    console.log(lines); //The data in the form of 2 dimensional array.
  }
}
