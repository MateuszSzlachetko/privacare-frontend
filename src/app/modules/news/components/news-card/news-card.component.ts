import {Component, Input} from '@angular/core';
import {NewsInterface} from "../../../../core/interfaces/news.interface";
import {MatDialog} from "@angular/material/dialog";
import {DeleteConfirmationComponent} from "../../../../components/delete-confirmation/delete-confirmation.component";
import {NewsService} from "../../../../core/services/news.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss']
})
export class NewsCardComponent {
  @Input({required: true}) news!: NewsInterface;
  contentLengthThreshold: number = 50;
  seeMore: boolean = false;

  constructor(private dialog: MatDialog,
              private newsService: NewsService,
              private router: Router) {
  }

  toggleContent() {
    this.seeMore = !this.seeMore;
  }

  onDelete() {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      data: 'Are you sure you want to delete this news?',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm')
        this.newsService.deleteNews(this.news.id);
    });
  }

  onEdit() {
    this.router.navigate(['news/edit', this.news.id]).then(() => {
    });
  }
}
