import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { StudentInterface } from '../../student-interface';
import { StudentService } from '../../student.service';

@Component({
  selector: 'categories-form',
  standalone: true,
  imports: [MatInputModule, MatCardModule, MatButtonModule, ReactiveFormsModule,],
  templateUrl: './form.component.html',
  styles: ``
})
export class CategoryFormComponent {
  @Output() enviarDado = new EventEmitter<StudentInterface>();
  private fb = inject(FormBuilder)
  id?: number

  @Input()
  set entradaEstudante(student: StudentInterface) {
    this.id = student.id;
    this.studentForm.controls.name.setValue(student.name);
    this.studentForm.controls.email.setValue(student.email);
    this.studentForm.controls.course.setValue(student.course);
  }


  studentForm = this.fb.group(
    {
      name: ['', [Validators.required]],
      email: [''],
      course: ['']
    }
  )


  submeter() {
    const editStudent = this.studentForm.value as StudentInterface;
    const estudanteEditado: StudentInterface = {
      id: this.id,
      name: editStudent.name,
      course: editStudent.course,
      email: editStudent.email
    }
    this.enviarDado.emit(estudanteEditado);
    this.limparCampos();
  }

  limparCampos() {
    this.studentForm.reset();

  }
}
