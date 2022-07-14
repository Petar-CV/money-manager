import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { TableModule } from 'primeng/table';
import { FileUploadModule } from 'primeng/fileupload';

const modulesToExport = [
  ButtonModule,
  InputTextModule,
  MenubarModule,
  TableModule,
  FileUploadModule,
];

@NgModule({
  exports: [...modulesToExport],
})
export class PrimengModule {}
