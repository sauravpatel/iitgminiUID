function getResidentType(i)
{
var r=confirm("Are you sure you want to change the type field ?? You will loose all the changes you have made.!");
if(r==true)
{
var x=document.getElementById("residentTypeSelect");
var residentType=(x.options[x.selectedIndex].text);
if(x.selectedIndex==i+0){
self.location="register_student";}
else if(x.selectedIndex==i+1){
self.location="register_faculty";}
else if(x.selectedIndex==i+2){
self.location="register_staff";}
else if(x.selectedIndex==i+3){
self.location="register_other";}
else{
self.location="typeError";}
}
}