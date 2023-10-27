import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {NewsService} from "../../../../core/services/news.service";
import {NewsEditRequest, NewsInterface, NewsRequest} from "../../../../core/interfaces/news.interface";
import {HttpStatusCode} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-news-form',
  templateUrl: './news-form.component.html',
  styleUrls: ['./news-form.component.scss']
})
export class NewsFormComponent implements OnInit {
  isEditMode: boolean = false;
  newsToEdit?: NewsInterface;
  titleMaxLength: number = 32;
  isLoading: boolean = false;
  displaySuccess: boolean = false;
  displayError: boolean = false;
  errors: string[] = [];
  newsForm = this.fb.group({
    title: ['', [Validators.required, Validators.maxLength(this.titleMaxLength)]],
    content: ['', Validators.required],
  });

  constructor(private fb: FormBuilder, private newsService: NewsService, private route: ActivatedRoute,) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.isEditMode = true;
        this.isLoading = true;
        this.newsService.getNewsBy(id).subscribe(data => {
          this.newsToEdit = data;
          this.newsForm.patchValue(data);
          this.isLoading = false;
        });
      }
    });
  }

  onSubmit() {
    if (!this.newsForm.valid) {
      return;
    }

    this.isLoading = true;

    if (!this.isEditMode) {
      const newsRequest: NewsRequest = {
        creatorId: '9dbae116-3954-4a2c-9308-31fb971dc6fc',
        title: this.newsForm.value.title || '',
        content: this.newsForm.value.content || '',
      };
      this.addNews(newsRequest)
    } else {
      const newsEditRequest: NewsEditRequest = {
        id: this.newsToEdit?.id || '',
        title: this.newsForm.value.title || '',
        content: this.newsForm.value.content || '',
      };
      console.log(newsEditRequest)
      this.editNews(newsEditRequest)
    }
  }

  resetForm() {
    this.newsForm.reset({
      title: '',
      content: '',
    });
  }

  addNews(newsRequest: NewsRequest) {
    this.newsService.addNews(newsRequest).subscribe(response => {
        setTimeout(() => {
          this.isLoading = false;
          if (response.status === HttpStatusCode.Created) {
            this.onSuccess();
            this.resetForm();
          }
          if (response.status === HttpStatusCode.BadRequest) {
            this.onError(response.messages)
          }
        }, 500)
      }
    )
  }

  editNews(newsEditRequest: NewsEditRequest) {
    this.newsService.editNews(newsEditRequest).subscribe(response => {
        setTimeout(() => {
          this.isLoading = false;
          if (response.status === HttpStatusCode.Ok) {
            this.onSuccess();
          }
          if (response.status === HttpStatusCode.BadRequest) {
            this.onError(response.messages)
          }
        }, 500)
      }
    )
  }

  onSuccess() {
    this.displaySuccess = true;
    setTimeout(() => {
      this.displaySuccess = false;
    }, 2500)
  }

  onError(messages: string[]) {
    this.displayError = true;
    this.errors = messages;
    setTimeout(() => {
      this.displayError = false;
    }, 6000)
  }
}
