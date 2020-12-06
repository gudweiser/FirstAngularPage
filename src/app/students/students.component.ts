import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {StudentService} from '../services/student.service';
import {Student} from '../interfaces/student.interface';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  @ViewChild('name')
  nameInput: ElementRef;
  @ViewChild('email')
  emailInput: ElementRef;



  invalidName = false;
  emailIsBlank = false;
  invalidEmail = false;

  students: Student[] = [{id: 1, name: "Dominik", email: "zdjasinski@gmail.com"}]

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
  add(name: string, email: string): void {
    // Usunięcie białych znaków z danych
    name = name.trim();
    email = email.trim();

    // Zaprzestanie wykonywania, kiedy pola są puste
    this.invalidName = !name;
    this.emailIsBlank = !email;

    // Zaprzestanie wykonywania, kiedy adres e-mail nie zawiera "@"
    if (email.indexOf('@') < 1) {
      this.emailIsBlank = true;
    } else this.emailIsBlank = false;

    if(this.invalidEmail || this.emailIsBlank || this.invalidEmail) {
      return;
    }

    this.invalidName = false;
    this.emailIsBlank = false;
    this.invalidEmail = false;

    // Przesłanie danych do serwera i zaktualizowanie lokalnej tablicy
    this.studentService.addStudent({ name, email } as Student)
      .subscribe(student=> {
        this.students.push(student);

        this.nameInput.nativeElement.value = '';
        this.emailInput.nativeElement.value = '';
      });
  }



}
