import { Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ChartsService } from 'app/services/charts.service';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {formatDate} from '@angular/common';
import { FormGroup, FormControl, Validator, Validators } from "@angular/forms";
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent{
  result: any;
  fromDate:any;
  toDate : any;
  check:any;
  sentimentKey: any;
  sentimentValue: any;
  DialectKey: any;
  DialectValue: any;
  chart: any = [];
  chartPie: any=[];
  chartBar: any=[];


 public checkoutForm = this.formBuilder.group({
    fromDate: new DatePipe('en-US'),
    toDate: new DatePipe('en-US')
    
  });

  constructor(private service: ChartsService, private formBuilder: FormBuilder,  private route: ActivatedRoute,private router:Router
    ) {
    Chart.register(...registerables);
    Chart.defaults.color = "#444";
  }
  
  onSubmit(): void {
    function convertDate(inputFormat) {
      function pad(s) { return (s < 10) ? '0' + s : s; }
      var d = new Date(inputFormat)
      return [ d.getFullYear(), pad(d.getMonth()+1), pad(d.getDate())].join('-')
    }
    // Process checkout data here
    console.warn('Your order has been submitted', this.checkoutForm.value);
    this.check = this.checkoutForm.value;
    this.fromDate = Object.values(this.check)[0];
    this.toDate = Object.values(this.check)[1];
    //convert the format date
    this.fromDate = convertDate(this.fromDate);
    this.toDate = convertDate(this.toDate)
    

    //this.checkoutForm.reset();

      this.service.cryptoData(this.fromDate,this.toDate).subscribe(response => {
        
        this.result = response;
        this.sentimentKey = Object.keys(this.result.Sentiment);    
        this.sentimentValue = Object.values(this.result.Sentiment);
  
        this.DialectKey = Object.keys(this.result.Dialect);    
        this.DialectValue = Object.values(this.result.Dialect);
        
        // console.log(this.coinPrice);
        // console.log(this.coinName);
        //console.log(Object.values(this.result.Sentiment));
        
        this.chart = new Chart('canvas', {
          type: 'bar',
          data: {
            labels: this.sentimentKey,
            datasets: [
              {
                label: "Sentiment",
                backgroundColor: ["#563CFC", "#22a7f0"],
                data: this.sentimentValue,
              }
            ]
          }
          });
  
          this.chartPie = new Chart('canvas2',{
            type: 'pie',
            data: {
              labels: this.sentimentKey,
              datasets: [{
                label: "Sentiment",
                backgroundColor: ["#563CFC", "#06C4F6"],
                data: this.sentimentValue
              }]
            },
            options: {
              maintainAspectRatio: false,
              responsive:true,
          }
            
        });
  
        this.chartBar = new Chart('canvas3',{
          type: 'bar',
          data: {
            labels: this.DialectKey,
            datasets: [{
              label: "Dialect",
              backgroundColor: ["#3e95cd", "#06C4F6","#115f9a","#563CFC","#06C4F6"],
              data: this.DialectValue
            }]
          },
          options: {
            maintainAspectRatio: false,
            responsive:true,
        }
          
      });
  
      
      
      });
      {this.chart.destroy();}
      {this.chartPie.destroy();}
      {this.chartBar.destroy();}
      
    
  }

  ngOnInit() {

    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['dashboard']);
  }); 
  
    this.service.AllData().subscribe(response => {
      
      this.result = response;
      this.sentimentKey = Object.keys(this.result.Sentiment);    
      this.sentimentValue = Object.values(this.result.Sentiment);

      this.DialectKey = Object.keys(this.result.Dialect);    
      this.DialectValue = Object.values(this.result.Dialect);
      
      // console.log(this.coinPrice);
      // console.log(this.coinName);
      //console.log(Object.values(this.result.Sentiment));

      this.chart = new Chart('canvas', {
        type: 'bar',
        data: {
          labels: this.sentimentKey,
          datasets: [
            {
              label: "Sentiment",
              backgroundColor: ["#563CFC", "#22a7f0"],
              data: this.sentimentValue,
            }
          ]
        }
        });

        this.chartPie = new Chart('canvas2',{
          type: 'pie',
          data: {
            labels: this.sentimentKey,
            datasets: [{
              label: "Sentiment",
              backgroundColor: ["#563CFC", "#06C4F6"],
              data: this.sentimentValue
            }]
          },
          options: {
            maintainAspectRatio: false,
            responsive:true,
        }
          
      });

      this.chartBar = new Chart('canvas3',{
        type: 'bar',
        data: {
          labels: this.DialectKey,
          datasets: [{
            label: "Dialect",
            backgroundColor: ["#3e95cd", "#06C4F6","#115f9a","#563CFC","#06C4F6"],
            data: this.DialectValue
          }]
        },
        options: {
          maintainAspectRatio: false,
          responsive:true,
      }
        
    });

    
    
    });

      {this.chart.destroy();}
      {this.chartPie.destroy();}
      {this.chartBar.destroy();}
  }
  
}
