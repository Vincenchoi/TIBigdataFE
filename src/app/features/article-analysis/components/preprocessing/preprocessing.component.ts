import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { PaginationModel } from "src/app/core/models/pagination.model";
import { ArticleService } from "src/app/core/services/article-service/article.service";
import { PaginationService } from "src/app/core/services/pagination-service/pagination.service";
import { UserSavedDocumentService } from 'src/app/core/services/user-saved-document-service/user-saved-document.service';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { MyDocsComponent } from "src/app/features/userpage/components/my-docs/my-docs.component";
import { MydocModel } from "src/app/core/models/mydoc.model";

@Component({
  selector: "app-preprocessing",
  templateUrl: "./preprocessing.component.html",
  styleUrls: ["./preprocessing.component.less"],
})

export class PreprocessingComponent implements OnInit {

  private _savedDocs: Array<MydocModel>;

  private _isSavedDocsLoaded: boolean = false;
  private _isSavedDocsEmpty: boolean;
  private _totalSavedDocsNum: number;
  private _totalSavedKeywordsNum: number;
  
  private _isDataPreprocessed: boolean = false;
  private _preprocessedData: Array<string>;

  constructor(
    private userSavedDocumentService: UserSavedDocumentService,
    private articleService: ArticleService,
    private router: Router,
    )   {;
    }

  ngOnInit(): void {
    this.loadSavedDocs();
  }

  
  /**
   * @description Load saved documents from userSavedDocumentService
   * @param pageNum
   */
   async loadSavedDocs(): Promise<void> {
    // this.isSavedDocsLoaded = false;
    // this.totalSavedDocsNum = await this.userSavedDocumentService.getTotalDocNum(this.keyword, this.savedDate);
    // this.isSavedDocsEmpty = (this.totalSavedDocsNum === 0);
    // if (this.isSavedDocsEmpty) return;

    this.savedDocs = await this.userSavedDocumentService.getAllMyDocs();
    // this.setCheckbox();
    this.isSavedDocsLoaded = true;
  }

  toMiddleWare(){
    const http_req = new XMLHttpRequest();
    http_req.open("POST", "https://kubic.handong.edu:15000/preprocessing");
    http_req.setRequestHeader('Content-Type', 'application/json');

    var data = {
      userEmail:"sujinyang@handong.edu", 
      keyword:"북한", 
      savedDate:"2021-07-08T11:46:03.973Z",
      synonym: true,
      stopword: true,
      compound: true,
      wordclass: "010" //(100) 동사, 010(명사), 001(형용사)
    };

    http_req.send(JSON.stringify(data));
    // let data = http_req.responseText("result");
    http_req.onload = () => {
      console.log("응답:"+ JSON.parse(http_req.responseText).result[0].slice(0,50));
      this.preprocessedData = JSON.parse(http_req.responseText).result[0].slice(0,50);
      // console.log("Flask 서버로부터의 응답은: " + http_req.responseText);
      this.isDataPreprocessed =true;
    }
    // if(http_req.status==200)
  //   $(function () {
  //   var data = {userEmail:"sujinyang@handong.edu", keyword:"북한", savedDate:"2021-07-08T11:46:03.973Z"};
  //   $.ajax({
  //       type: "POST",
  //       data :JSON.stringify(data),
  //       url: "http://kubic.handong.edu:15000/preprocessing",
  //       contentType: "application/json",
        
  //   });
  // });
  }

  previewPreprocessedData(){
    document.getElementById("pop").style.display='inline';
    // var url = "popup.html";
    // var name = "preview data";
    // var option = "width = 500, height = 500, top = 100, left = 200, location = no, scrollbars=yes";
    // window.open(url, name, option);
  }

  public get savedDocs(): Array<MydocModel> {
    return this._savedDocs;
  }
  public set savedDocs(value: Array<MydocModel>) {
    this._savedDocs = value;
  }

  public get isSavedDocsLoaded() {
    return this._isSavedDocsLoaded;
  }
  public set isSavedDocsLoaded(value) {
    this._isSavedDocsLoaded = value;
  }

  public get isSavedDocsEmpty() {
    return this._isSavedDocsEmpty;
  }
  public set isSavedDocsEmpty(value) {
    this._isSavedDocsEmpty = value;
  }
  
  
  public get isDataPreprocessed() {
    return this._isDataPreprocessed;
  }
  public set isDataPreprocessed(value) {
    this._isDataPreprocessed = value;
  }

  
  public get preprocessedData(){
    return this._preprocessedData;
  }

  public set preprocessedData(value){
    this._preprocessedData = value;
  }
}