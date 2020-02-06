import { Component, OnInit } from '@angular/core';
import { ElasticsearchService } from '../../search/service/elasticsearch.service';
import { Router } from '@angular/router';
import { ArticleSource } from '../../search/article/article.interface';


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.less']
})
export class SearchBarComponent implements OnInit {

  private static readonly INDEX = 'nkdboard';
  private static readonly TYPE = 'nkdboard';

  private queryText = '';
 
  private lastKeypress = 0;

  articleSources: ArticleSource[];

  constructor(public _router: Router, private es: ElasticsearchService) {
    this.queryText='';
   }

  ngOnInit() {
    
  }


  onKey($event){
    this.queryText=$event.target.value;
  }
  sendResult(){

    this.es.getResult(this.articleSources);
    this.es.setKeyword(this.queryText);
    this.toResultPage();
  }

  toResultPage(){
    this._router.navigateByUrl("search");
  }


}