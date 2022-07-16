import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputNumberModule } from 'primeng/inputnumber';
import { CardModule } from 'primeng/card';

const modulesToExport = [
  ButtonModule,
  InputTextModule,
  MenubarModule,
  TableModule,
  FileUploadModule,
  CalendarModule,
  DropdownModule,
  InputTextareaModule,
  InputNumberModule,
  CardModule,
];

@NgModule({
  exports: [...modulesToExport],
})
export class PrimengModule {}
