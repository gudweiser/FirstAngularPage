import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {StudentService} from '../services/student.service';
import {Student} from '../interfaces/student.interface';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  students: Student[];

  constructor(private studentService: StudentService) {  }

  ngOnInit(): void {
    this.getStudents();
  }

  getStudents(): void {
    this.studentService.getStudents()
      .subscribe(students => {
        this.students = students
      });
  }

  delete(student: Student): void {

    this.studentService.deleteStudent(student).subscribe((result: Student) => {
      this.students = this.students.filter(s => s !== student);
    });
  }

  onStudentAddedListener(addedStudent: Student) {
    this.students.push(addedStudent);
  }

}






