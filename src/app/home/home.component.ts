import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Car } from '../model/car';
import{CarServiceService} from '../service/car-service.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 
cars:Array<Car>;
car:Car;
editCar: FormGroup;
addCar:FormGroup;
carId:Number;
search:string;
message:string;
constructor(private carService:CarServiceService){

this.editCar = new FormGroup({
  name:  new FormControl('',[Validators.required, Validators.minLength(4)]),
  color:  new FormControl ('',[Validators.required,Validators.minLength(4)]),
  model:  new FormControl('',[Validators.required,Validators.minLength(5)]),
  owner:  new FormControl('', [Validators.required,Validators.minLength(5)]),
  hideMe:new FormControl(''),
 
});
this.addCar = new FormGroup({
  name:  new FormControl('',[Validators.required, Validators.minLength(4)]),
  color:  new FormControl ('',[Validators.required,Validators.minLength(4)]),
  model:  new FormControl('',[Validators.required,Validators.minLength(5)]),
  owner:  new FormControl('', [Validators.required,Validators.minLength(5)]),
  hideMe:new FormControl(),

 
});
this.car={
  id:0,
  name:'',
  color:'',
  model:'',
  owner:'',
  hideMe:0,
}
}
  ngOnInit(): void {
    this.carService.getAllCars().subscribe(data=>{
      this.cars=data;
    
    })
    
   
  }
  filterByName(){
    this.carService.FilterByNameOrModel('name').subscribe(data=>{
      this.cars=data;
    });
  }
  filterByModel(){
    this.carService.FilterByNameOrModel('model').subscribe(data=>{
      this.cars=data;
    });
  }
  
 onclick(e){
  console.log(e);
  for (let entry of this.cars) {
   if(entry.name==e){  
     this.car=entry;
     
       }
    }
   
    
}
get f(){
    
  return this.editCar.controls;

}
get f2(){

return this.addCar.controls;

}
delete(e){
  this.carId=e;
}
deleteCar(){
  console.log(this.carId)
  this.carService.deleteCar(this.carId).subscribe();
 
  document.getElementById("delte").click();
  this.refresh();
}
refresh(): void {
  window.location.reload();
}
onSubmit() {

  this.car.name = this.editCar.get('name').value;
  this.car.color = this.editCar.get('color').value;
  this.car.model = this.editCar.get('model').value;
  this.car.owner = this.editCar.get('owner').value;
  this.car.hideMe=this.editCar.get('hideMe').value;
  this.carService.addCar( this.car).subscribe(data=>{
      if(data.message=='success'){
        console.log('welcome');
        
        document.getElementById("edit").click();
          document.getElementById("tedit").click();
         
          }
         
  },(val)=>{
    this.message=val.error.message;  
    document.getElementById("edit").click();
    document.getElementById("fedit").click();
  });
}
onSubmit2() {

  this.car.name = this.addCar.get('name').value;
  this.car.color = this.addCar.get('color').value;
  this.car.model = this.addCar.get('model').value;
  this.car.owner = this.addCar.get('owner').value;
  this.car.hideMe=this.addCar.get('hideMe').value;
  this.carService.addCar( this.car).subscribe(data=>{
      if(data.message=='success'){
        console.log('welcome');
        
        document.getElementById("add").click();
        document.getElementById("tadd").click();
      
      
     
      }
    
       
        
        
       
      
  },(val)=>{
    this.message=val.error.message;  
    document.getElementById("add").click();
    document.getElementById("fadd").click();
  });
}
Change(event){
  this.search=event.target.value;
}
Serch(){
  this.carService.SerchByNameOrModel(this.search).subscribe(data=>{
    this.cars=data;
  
  })
}
}
