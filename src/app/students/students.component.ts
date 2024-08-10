import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatTableModule, MatTable, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { StudentsDataSource } from './students-datasource';
import { StudentInterface } from './student-interface';
import { StudentService } from './student.service';
import { lastValueFrom } from 'rxjs';
import { MatButton } from '@angular/material/button';
import { CategoryFormComponent } from './form/form/form.component';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styles: `
    .full-width-table {
      width: 100%;
    }
  `,
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MatButton, CategoryFormComponent]
})
export class StudentsComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<StudentInterface>;
  dataSource = new MatTableDataSource<StudentInterface>();
  estudanteComponentePrincipal: StudentInterface = { name: '', email: '', course: '' }
  constructor(private studentService: StudentService) { }

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'course', 'email', 'actions'];

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
    this.carregarDados();
  }

  async carregarDados() {
    const students = await lastValueFrom(await this.studentService.getAll());
    this.dataSource = new MatTableDataSource<StudentInterface>(students);
    this.table.dataSource = this.dataSource;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    console.log('carregou dados');
  }

  async apagarDado(student: StudentInterface) {
    await lastValueFrom(this.studentService.remove(student));
    console.log('apagou o usuário', student);
    await this.carregarDados();
  }

  async salvarDado(student: StudentInterface) {
    if (student.id != null) {
      await lastValueFrom(this.studentService.update(student));
      console.log('atualizou', student);
    } else {
      await lastValueFrom(this.studentService.save(student));
      console.log('criou novo', student);
    }
    this.estudanteComponentePrincipal = { name: '', email: '', course: '' };
    await this.carregarDados();
  }

  editarDado(student: StudentInterface) {
    this.estudanteComponentePrincipal = student;
  }


}
