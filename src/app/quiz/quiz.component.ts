import { Component, ElementRef, ViewChild } from '@angular/core';
import { AdminCourseServiceService } from '../service/admin-course-service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent {
  @ViewChild('fileInput') fileInput!: ElementRef;
  
  showRadio: boolean = false;
  showCheckbox: boolean = false;
  selectedAnswerTypes: string = '';
  selectedOptionIndex: number[] = [];
  selectedItems: string = '';
  selectedItems_module: string = '';
  left: any[] = [];
  right: any[] = [];
  ans: any[] = [];
  notFalseLeftData: any[] = [];
  radioButtonItems: any[] = [];
  checkButtonItems: any[] = [];
  radio_text: any[] = [];
  checkStatus = '';
  radioStatus = '';
  radioTexts = '';
  checkTexts = '';
  selectedRadio: any;
  selectedCheck: any;
  radio_answer: any;
  checkbox_answer: any;
  all_quiz_data: any;
  quiz_answer: any;
  filteredData: any;
  AllData: any;
  options: any;
  quiz_question: any;
  content_data: any;
  module_data: any;
  quiz_question_exp: any;
  selectedOption: any;
  quiz_answer_exp: any;
  selectedCourseModules: number[] = [];
  correctAnswer: any[] = [];
  correctAnswers: any[] = [];
  selectedValue: any;
  i: number = 0;
  radioOptions: {
    label: string;
    checked: boolean;
    text: string;
    name: string;
    value: string;
  }[] = [
    { label: '1', checked: false, text: '', name: 'radio_1', value: 'ra_1' },
    { label: '2', checked: false, text: '', name: 'radio_2', value: 'ra_2' },
    { label: '3', checked: false, text: '', name: 'radio_3', value: 'ra_3' },
    { label: '4', checked: false, text: '', name: 'radio_4', value: 'ra_4' },
  ];

  checkboxOptions: {
    label: string;
    checked: boolean;
    text: string;
    name: string;
  }[] = [
    { label: '1', checked: false, text: '', name: 'checkbox-1' },
    { label: '2', checked: false, text: '', name: 'checkbox-2' },
    { label: '3', checked: false, text: '', name: 'checkbox-3' },
    { label: '4', checked: false, text: '', name: 'checkbox-4' },
  ];
  myClass = 'dropdown-menu';

  just_clicked() {
    if (this.myClass === 'dropdown-menu') {
      this.myClass = 'dropdown-menu show';
    } else {
      this.myClass = 'dropdown-menu';
    }
  }

  hide_class = 'dropdown-item';

  hide_click() {
    if (this.hide_class === 'dropdown-item') {
      this.myClass = 'dropdown-menu';
    } else {
      this.myClass = 'dropdown-item';
    }
  }

  // ====

  myClass_module = 'dropdown-menu';

  just_clicked_module() {
    if (this.myClass_module === 'dropdown-menu') {
      this.myClass_module = 'dropdown-menu show';
    } else {
      this.myClass_module = 'dropdown-menu';
    }
  }

  hide_class_module = 'dropdown-item';

  hide_click_module() {
    if (this.hide_class_module === 'dropdown-item') {
      this.myClass_module = 'dropdown-menu';
    } else {
      this.myClass_module = 'dropdown-item';
    }
  }

  private filePath = '/path/to/local/file';
  public errorMsg!: string;
  public fileName!: string;
  selectedFile!: File;
  last: any;

  constructor(
    private service: AdminCourseServiceService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.get_quizAns_FromAPI();
    this.get_content_data();
    this.selectedOption = 'Select answer type';
  }

  onAnswerTypeSelected(event: any) {
    this.selectedAnswerTypes = event.target.value;
  }

  selectItem(item: string) {
    this.selectedItems = item;
  }

  selectItem_module(items: string) {
    this.selectedItems_module = items;
  }

  public downloadFiles(): void {
    const link = document.createElement('a');
    link.setAttribute('target', '_blank');
    link.setAttribute('href', this.filePath);
    link.setAttribute('download', 'file_name');
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  getModulesForCourse(courseId: number): number[] {
    const modules = this.content_data
      .filter((data: any) => data.course_id === courseId)
      .map((data: any) => data.module_no);
    return modules;
  }

  onSubmit() {
    let options_text: string = '';
    let options_value: string = '';

    if (this.selectedAnswerTypes === '1') {
      const radioStatus = this.radioButtonItems
        .map((item) => (item.radio ? 1 : 0))
        .join(',');
      const radioTexts = this.radioButtonItems
        .map((item) => item.text)
        .join(',');
      options_text = radioTexts;
      options_value = radioStatus;
    } else if (this.selectedAnswerTypes === '2') {
      const checkStatus = this.checkButtonItems
        .map((item) => (item.checked ? 1 : 0))
        .join(',');
      const checkTexts = this.checkButtonItems
        .map((item) => item.text)
        .join(',');
      options_text = checkTexts;
      options_value = checkStatus;
    }

    const quizData = {
      quiz_question: this.quiz_question,
      quiz_question_exp: this.quiz_question_exp,
      selectedOption: this.selectedOption,
      quiz_answer_exp: this.quiz_answer_exp,
      vq_name: this.selectedItems,
      options_text: options_text,
      options_value: options_value,
    };

    this.service.addQuiz(quizData).subscribe((response) => {
      console.log(response, 'quiz_dtaa');
    });
  }

  uploadCSV() {
    const formData = new FormData();
    formData.append('csv', this.selectedFile);
    this.service.addQuizcsv(formData).subscribe((response) => {
      console.log(response);
    });
  }

  openModal(i: any) {
    this.selectedValue = this.quiz_answer[i];
    this.selectedValue[i] = true;
  }

  new_button() {
    this.radioButtonItems.push({
      radio: true,
      text: '',
    });
  }

  new_button_check() {
    this.checkButtonItems.push({
      checked: false,
      text: '',
    });
  }

  remove_button(index: number) {
    this.radioButtonItems.splice(index, 1);
  }

  remove_button_check(index: number) {
    this.checkButtonItems.splice(index, 1);
  }

  uncheckOtherRadios(index: number) {
    for (let i = 0; i < this.radioButtonItems.length; i++) {
      if (i !== index) {
        this.radioButtonItems[i].radio = false;
      } else {
        this.radioButtonItems[i].radio = true;
        this.radioStatus = this.radioButtonItems
          .map((item, index) => {
            return index === i ? '1' : '0';
          })
          .join(';');
      }
    }
  }

  uncheckOtherCheck(index: number) {
    for (let i = 0; i < this.checkButtonItems.length; i++) {
      if (i !== index) {
        this.checkButtonItems[i].radio = false;
      } else {
        this.checkButtonItems[i].radio = true;
        this.checkStatus = this.checkButtonItems
          .map((item, index) => {
            return index === i ? '1' : '0';
          })
          .join(';');
      }
    }
  }

  // get data

  extractCorrectAnswer(options: string): string | undefined {
    const optionArray = options.split(',');
    for (let i = 0; i < optionArray.length; i++) {
      const [option, isCorrect] = optionArray[i].split('|');
      if (isCorrect === '1') {
        return option;
      }
    }
    return undefined; // no correct answer found
  }

  get_quizAns_FromAPI() {
    this.service.get_quizAnswersAdmin().subscribe(
      (response: any) => {
        this.quiz_answer = response.data;
        console.log(this.quiz_answer, 'Answer datas');
        const correctAnswers: any[] = [];
        for (let i = 0; i < this.quiz_answer.length; i++) {
          const ques_id = this.quiz_answer[i].ques_id;
          const options = this.quiz_answer[i].options;
          const optionArray = options.split(',');
          const questionCorrectAnswers = [];
          for (let j = 0; j < optionArray.length; j++) {
            const [option, isCorrect] = optionArray[j].split('|');
            if (isCorrect === '1') {
              questionCorrectAnswers.push(option);
            }
          }
          this.correctAnswers[ques_id] = questionCorrectAnswers;
          this.ans[i] = optionArray.map(
            (option: string) => option.split('|')[0]
          );
          this.left[i] = this.ans[i];
        }
      },
      (error) => {
        console.log('Error is:', error);
      }
    );
  }

  get_content_data() {
    this.service.getContentData().subscribe(
      (response: any) => {
        this.content_data = response.data;
        console.log(this.content_data, 'Course Data kishor');
      },
      (error) => {
        console.log('Error is:', error);
      }
    );
  }
}