import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { ICategory } from '../category-interface';

@Component({
  selector: 'category-form',
  standalone: true,
  imports: [
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule,
  ],
  templateUrl: './form.component.html',
  styles: ``
})
export class FormComponent {
  @Output() save = new EventEmitter<ICategory>();
  @Output() back = new EventEmitter<any>()
  private fb = inject(FormBuilder);
  
  categoryForm = this.fb.group(
    {
      id: [null],
      name: ['', Validators.required, Validators.minLength(3)],
      description: ['', Validators.required]
    }
  )

  onSubmit() {
    console.log('Submeteu');
    this.save.emit(this.categoryForm.value as ICategory);
  }

  onBackPressed(){
    this.back.emit();
  }

}
