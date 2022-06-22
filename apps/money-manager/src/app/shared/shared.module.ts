import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PrimengModule } from './primeng.module';

@NgModule({
  imports: [CommonModule, PrimengModule],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, PrimengModule],
})
export class SharedModule {}
