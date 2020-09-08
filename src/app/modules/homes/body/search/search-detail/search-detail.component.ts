// import { Injectable } from '@angular/core';
import { IdControlService } from '../service/id-control-service/id-control.service';
import { Article } from "../../shared-module/common-search-result-document-list/article/article.interface";
import { ElasticsearchService } from 'src/app/modules/communications/elasticsearch-service/elasticsearch.service'
import { Component, OnInit, Inject } from '@angular/core';
// import { Article } from '../article/article.interface';
import { WordcloudService } from '../../../graphs/wordcloud/wordcloud.service';
import { CloudData, CloudOptions } from "angular-tag-cloud-module";
import { RecomandationService } from '../service/recommandation-service/recommandation.service';
import { AnalysisDatabaseService } from "../../../../communications/fe-backend-db/analysis-db/analysisDatabase.service";

@Component({
  selector: 'app-search-detail',
  templateUrl: './search-detail.component.html',
  styleUrls: ['./search-detail.component.less']
})
export class SearchDetailComponent implements OnInit {

  private article: Article;
  private cData: CloudData[];
  private isRelatedLoaded = 0;
  private isCloudLoaded = 0;
  private isDocInfoLoaded = 0;
  private rcmdList: Array<string>;
  private relateToggle: boolean = false;
  constructor(
    private rcmd: RecomandationService,
    private idControl: IdControlService,
    private wordcloud: WordcloudService,
    private es: ElasticsearchService,
    private db: AnalysisDatabaseService
  ) { }

  ngOnInit() {
    this.load_new_document();


  }
  goToDoc(r) {
    this.idControl.setIdChosen(this.rcmdList[r]["id"]);
    this.load_new_document();
  }

  load_new_document() {
    // this.isLoaded = 0;
    this.isRelatedLoaded = 0;
    this.isCloudLoaded = 0;
    this.isDocInfoLoaded = 0;

    let id = this.idControl.getIdChosen();

    this.db.load_related_docs(id).then(res => {
      this.rcmdList = res as [];
      this.isRelatedLoaded ++;
    });

    this.es.searchById(id).then((res) => {
      this.article = res["hits"]["hits"][0]["_source"];
      this.isDocInfoLoaded ++;

    })
    this.wordcloud.createCloud(id)
      .then((data) => {
        this.cData = data as CloudData[]
        this.isCloudLoaded ++;
      });
    // let id = this.idControl.getArticle()["_id"];

    // console.log(this.article);
  }

  // cldData: CloudData;
  options: CloudOptions = {
    // if width is between 0 and 1 it will be set to the size of the upper element multiplied by the value
    width: 1000,
    height: 600,
    // font : "bold",
    // overflow: true,
    // strict : true
    // randomizeAngle : true
  };



}
