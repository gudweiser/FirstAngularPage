import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {StudentsComponent} from './students/students.component';
import {StudentEditComponent} from './student-edit/student-edit.component';

const routes: Routes = [
  {path: '', redirectTo: '/students', pathMatch: 'full'},
  {path: 'students', component: StudentsComponent},
  {path: 'edit/:id', component: StudentEditComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],

})
export class AppRoutingModule {
}
