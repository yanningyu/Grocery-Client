import { FileService } from './services/file.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  exports:[
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers:[
    FileService
  ]

})
export class SharedModule { }
