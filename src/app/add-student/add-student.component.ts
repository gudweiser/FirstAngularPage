import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild, ViewEncapsulation} from '@angular/core';
import {Student} from '../interfaces/student.interface';
import {StudentService} from '../services/student.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css'],

})
export class AddStudentComponent implements OnInit {

  constructor(private studentService: StudentService) {
  }

  @ViewChild('newStudentForm')
  newStudentForm: NgForm;

  @Output()
  onStudentAdded = new EventEmitter<Student>();

  invalidName = false;
  emailIsBlank = false;
  invalidEmail = false;

  ngOnInit(): void {
  }

  onStudentFormSubmit() {
    console.log(this.newStudentForm)

    const name = this.newStudentForm.value.studentName;
    const email = this.newStudentForm.value.email;

    this.studentService.addStudent({name, email} as Student)
      .subscribe((student: Student) => {
        this.onStudentAdded.emit(student);
        this.newStudentForm.reset();
      });
  }
}
