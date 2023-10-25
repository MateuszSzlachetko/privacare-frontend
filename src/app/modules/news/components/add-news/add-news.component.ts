import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {NewsService} from "../../../../core/services/news.service";
import {NewsRequest} from "../../../../core/interfaces/news.interface";
import {HttpStatusCode} from "@angular/common/http";

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.scss']
})
export class AddNewsComponent {
  titleMaxLength: number = 32;
  newsForm = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(this.titleMaxLength)]],
    content: ['', Validators.required],
  });
  onLoad: boolean = false;
  displaySuccess = false;
  displayError: boolean = false;
  errors: string[] = [];

  constructor(private fb: FormBuilder, private newsService: NewsService) {
  }

  onSubmit() {
    if (this.newsForm.valid) {
      const newsRequest: NewsRequest = {
        creatorId: '9dbae116-3954-4a2c-9308-31fb971dc6fc',
        title: this.newsForm.value.title || '',
        content: this.newsForm.value.content || '',
      };

      this.onLoad = true;
      this.newsService.addNews(newsRequest).subscribe(response => {
          setTimeout(() => {
            this.onLoad = false;
            if (response.status === HttpStatusCode.Created) {
              this.displaySuccess = true;
              setTimeout(() => {
                this.displaySuccess = false;
              }, 2500)
            }

            if (response.status === HttpStatusCode.BadRequest) {
              this.displayError = true;
              this.errors = response.messages;
              setTimeout(() => {
                this.displayError = false;
              }, 6000)
            }
          }, 500)

          this.newsForm.reset({
            title: '',
            content: '',
          });
        }
      )
    }
  }
}

// todo refactor
