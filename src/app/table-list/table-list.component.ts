import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { comment } from 'app/Models/Comment';
import { ChartsService } from 'app/services/charts.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit, AfterViewInit {
  comments: comment[] = [];
  dataSource= new MatTableDataSource<comment>(this.comments);
  displayedColumns: string[] = ['id' , 'Text' , 'Sentiment' , 'Dialect','PostingDate','Options'];
  ngOnInit() {
    this.retreive_comment();
  }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  ngAfterViewInit(){
    this.dataSource.data = this.comments;
    this.dataSource.paginator = this.paginator;
  }

  constructor(private service: ChartsService) {}

  

  retreive_comment(){
    this.service.retrieve_comments().subscribe(response => {
      this.comments = response;
      this.dataSource.data = response;    
    }
    )
  }
  delete(comment:comment){
    this.service.delete_comment(comment.id).subscribe(response => {
      this.comments = this.comments.filter(item => {
        return item.id !== comment.id;
      });
    })
}


  
  }

