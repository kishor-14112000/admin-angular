import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminCourseServiceService {
  private apiUrl = 'http://localhost:3000/api';
  postData(arg0: string, courseDatas: any) {
    throw new Error('Method not implemented.');
  }
  constructor( private http: HttpClient ) { }

  deleteCourse(options: any){
    console.log(options,"options log");
    return this.http.delete('/api/DeleteData', options);
  }

  addCourseContent(courseContentData: any, formdata:any) {
    return this.http.post('/api/courseContentData', courseContentData, formdata);
  }

  addModule(ModuleData: any) {
    return this.http.post('/api/moduleData', ModuleData);
  }

  addNewCourse(course_create: any) {
    return this.http.post('/api/addNewCourse', course_create);
  }

  addQuiz(quiz_data: any) {
    return this.http.post('/api/quizData', quiz_data);
  }

  addRadio(radio: any) {
    return this.http.post('/api/quizRadio', radio);
  }

  addQuizcsv(quiz_csv_data: any) {
    return this.http.post('/api/quizCsvData', quiz_csv_data);
  }

  getData(){
    return this.http.get('/api/courseTable');
  }

  getCount(){
    return this.http.get('/api/courseTableCounts');
  }

  getModuleData(){
    return this.http.get('/api/moduleData_get');
  }

  getContentData(){
    return this.http.get('/api/contentData');
  }

  get_quizData(){
    return this.http.get('/api/quizDetails');
  }

  get_quizAnswers(){
    return this.http.get('/api/quizAnswers');
  }

  get_quizAnswersAdmin(){
    return this.http.get('/api/quizAnswersAdmin');
  }

  updateCourse(course:any){
    return this.http.put('/api/updateData', course);
  }

  updateCourseModule(coursemodule:any){
    return this.http.put('/api/updateModuleData', coursemodule);
  }

  updateCourseContent(coursecontent:any){
    return this.http.put('/api/updateContentData', coursecontent);
  }

}