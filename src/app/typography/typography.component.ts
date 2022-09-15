import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { comment } from 'app/Models/Comment';
import { ChartsService } from 'app/services/charts.service';
import { FormBuilder } from '@angular/forms';
import { Chart, registerables } from 'chart.js';


declare var $: any;



@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.css']
})
export class TypographyComponent implements OnInit {
  
  chart: any = [];
  chart2: any = [];

  public checkoutForm = this.formBuilder.group({
    Text: '',
    Sentiment: 'String',
    Dialect: 'String',
    posting_date: new  Date()
    
  });
  public checkoutForm3 = this.formBuilder.group({
    Text: ''
  });
  public checkoutForm2 = this.formBuilder.group({
    Text: '',
    Sentiment: 'String',
    Dialect: 'String',
    posting_date: new  Date()
    
  });
  checkAdd: any;
  checkUpdate : any;
  res: any;
  text: any;
  sent: any;
  dial:any


  constructor(private router: Router,private service: ChartsService,private formBuilder: FormBuilder,private route:ActivatedRoute) {
    Chart.register(...registerables);
    Chart.defaults.color = "#444";
  }
  
  ngOnInit() {
    console.log(this.route.snapshot.params['text']);
    this.checkoutForm.setValue({
      Text :  this.route.snapshot.params['text'],
      Sentiment :  this.route.snapshot.params['sentiment'],
      Dialect :  this.route.snapshot.params['dialect'],
      posting_date :  this.route.snapshot.params['posting_date'],
      
    });
    console.log(this.route.snapshot.params['text']); 
    
  }

  

  addData() {
    this.checkAdd = this.checkoutForm2.value;
    
    console.log(this.checkAdd);
    
    this.service.add_data(this.checkAdd)
    .subscribe(response => {
      console.log(response)
    })
    this.router.navigateByUrl('/table-list');
    const type = ['info'];

      const color = Math.floor((Math.random() * 4) + 1);

      $.notify({
          icon: "notifications",
          message: "the row is successfully added"

      },{
          type: type[color],
          timer: 4000,
          placement: {
              from: "top",
              align: "center"
          },
          template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
            '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
            '<i class="material-icons" data-notify="icon">notifications</i> ' +
            '<span data-notify="title">{1}</span> ' +
            '<span data-notify="message">{2}</span>' +
            '<div class="progress" data-notify="progressbar">' +
              '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
            '</div>' +
            '<a href="{3}" target="{4}" data-notify="url"></a>' +
          '</div>'
      });
}
updateData(){
  this.checkUpdate = this.checkoutForm.value;
    
  console.log(this.route.snapshot.params['id']);
  
  this.service.update_data(this.route.snapshot.params['id'],this.checkUpdate)
  .subscribe(response => {
    console.log(response)
  })
  this.router.navigateByUrl('/table-list');

  const type = ['info'];

      const color = Math.floor((Math.random() * 4) + 1);

      $.notify({
          icon: "notifications",
          message: "the row is successfully updated"

      },{
          type: type[color],
          timer: 4000,
          placement: {
              from: "top",
              align: "center"
          },
          template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
            '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
            '<i class="material-icons" data-notify="icon">notifications</i> ' +
            '<span data-notify="title">{1}</span> ' +
            '<span data-notify="message">{2}</span>' +
            '<div class="progress" data-notify="progressbar">' +
              '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
            '</div>' +
            '<a href="{3}" target="{4}" data-notify="url"></a>' +
          '</div>'
      });
}
predict(){
  this.checkUpdate = this.checkoutForm3.value;
  this.text = Object.values(this.checkUpdate)[0];    
  this.service.predict(this.text)
  .subscribe(response => {
    console.log(Object.values(response)[4]);
    this.sent = Object.values(response)[0]; 
    this.dial = Object.values(response)[1]; 
    
    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: ['neg','pos'],
        datasets: [
          {
            label: "Sentiment",
            backgroundColor: ["#563CFC", "#22a7f0"],
            data: Object.values(response)[2],
          }
        ]
      }
      });

      this.chart2 = new Chart('canvas2', {
        type: 'bar',
        data: {
          labels: ['ARD','Arabizi','Fr','MSA'],
          datasets: [
            {
              label: "Dialect",
              backgroundColor: ["#563CFC", "#22a7f0","#06C4F6","#115f9a"],
              data: Object.values(response)[3],
            }
          ]
        }
        });
  })
 
  {this.chart.destroy();}
  {this.chart2.destroy();}
}

}


