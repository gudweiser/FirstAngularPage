import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import { Student } from '../interfaces/student.interface';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../services/student.service';
import { Location } from '@angular/common';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})

export class StudentEditComponent implements OnInit {
  student: Student;

  constructor(
    private route: ActivatedRoute,
    private studentService: StudentService,
    private location: Location
  ) {}

  @ViewChild('studentUpdateForm')
  studentUpdateForm: NgForm;

  @Output()
  updateStudent = new EventEmitter<Student>();


  ngOnInit(): void {
    this.getStudent();
  }

  getStudent(): void {
    // Uzyskanie wartości parametru "id" i jego konwersja na liczbę
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Unary_plus
    const id = +this.route.snapshot.paramMap.get('id');
    this.studentService.getStudent(id)
      .subscribe(student => this.student = student);
  }

  goBack(): void {
    this.location.back();
  }

  updateStudentFormSubmit() {
    // Zapisuje dane i przekierowuje do poprzedniego widoku

    console.log("Hej")
    console.log(this.studentUpdateForm)

    const name = this.studentUpdateForm.value.studentName;
    const email = this.studentUpdateForm.value.email;

    this.studentService.updateStudent({name, email} as Student)
      .subscribe((student: Student) => {
        this.updateStudent.emit(student);

        this.goBack()
      });
  }

}
