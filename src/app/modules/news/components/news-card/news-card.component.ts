import {Component, Input} from '@angular/core';
import {NewsInterface} from "../../../../core/interfaces/news.interface";
import {MatDialog} from "@angular/material/dialog";
import {DeleteConfirmationComponent} from "../../../../components/delete-confirmation/delete-confirmation.component";
import {NewsService} from "../../../../core/services/news.service";

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss']
})
export class NewsCardComponent {
  @Input({required: true}) news!: NewsInterface;
  contentLengthThreshold: number = 50;
  seeMore: boolean = false;

  constructor(public dialog: MatDialog, private newsService: NewsService) {
  }

  toggleContent() {
    this.seeMore = !this.seeMore;
  }

  onDelete() {
    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      data: 'Are you sure you want to delete this news?',
      width: '300',
      height: '300'
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        console.log('Deleting')
        this.newsService.deleteNews(this.news.id);
      } else {
        console.log('Deletion canceled.');
      }
    });
  }
}
