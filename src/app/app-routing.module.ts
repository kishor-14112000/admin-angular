import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminCourseContentComponent } from './admin-course/admin-course.component';
import { AdminCourseComponent } from './admin-course-contents/admin-course-contents.component';
import { QuizComponent } from './quiz/quiz.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { CourseModuleComponent } from './course-module/course-module.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [

  {path: 'course-content/:module_no', component: AdminCourseComponent},
  
  {path: '', component: AdminCourseContentComponent},
  
  {path: 'sidebar', component: SidenavComponent},

  {path: 'admin-course', component: AdminCourseContentComponent},

  {path: 'quiz/:content_id', component: QuizComponent},

  {path: 'course-module/:course_id', component: CourseModuleComponent},
  
  {path: 'login', component: LoginComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
