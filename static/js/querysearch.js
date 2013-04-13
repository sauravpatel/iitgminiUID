{var divCounter = 1;
var nestCounter = 0;
var subdivCounter = 0;
var nestSubdivCounter = 0;
var whereCounter = 0;
var inputCounter = 0;
var counter = 0;
var counterText = 0;
var counterRadioButton = 0;
var counterCheckBox = 0;
var counterTextArea = 0;
}

// Global variables for JSON creation

window.query = new Object();
window.queryStack = new Object();
var currList;
var curIndex;

function addAllInputs(divName, inputType){
    var newdiv = document.createElement('div');
    switch(inputType) {
        case 'text':
            newdiv.innerHTML = " Add More " + (counterText + 1) + " <br><input type='text' name='myInputs[]'>";
            counterText++;
            break;
        case 'radio':
            newdiv.innerHTML = "Entry " + (counterRadioButton + 1) + " <br><input type='radio' >";
            counterRadioButton++;
            break;
        case 'checkbox':
            newdiv.innerHTML = "Add Filter <br><input type='checkbox'>";
            counterCheckBox++;
            break;
        case 'textarea':
            newdiv.innerHTML = "Entry " + (counterTextArea + 1) + " <br><textarea name='myTextAreas[]'>type here...</textarea>";
            counterTextArea++;
            break;
    }
    document.getElementById(divName).appendChild(newdiv);
}

function createNewElement(callerID,callerDivID)
{
    var inputRequired = true;
    //document.getElementById(id).disabled=true;
    var inputID = "input" + callerID;
    var inputType = "text"
    var attribute = document.getElementById( callerID );
    var attributeType = attribute.options[attribute.selectedIndex].text;
    // give special treatement to some attributes
    if ( attributeType.search( 'age' ) != -1 ){
        var options = new Array("==","<",">");
        createDropdown( callerDivID, inputID, options, "80px" );
    }
    if ( attributeType.search( 'gender' ) != -1 ){
        inputRequired = false;
        var options = new Array("male","female");
        createDropdown( callerDivID, inputID, options, "300px" );
    }
    if ( attributeType.search( 'type' ) != -1 ){
        inputRequired = false;
        var options = new Array("student","faculty","staff","others");
        createDropdown( callerDivID, inputID, options, "300px" );
    }

    if ( attributeType.search( 'bloodGroup' ) != -1 ){
        inputRequired = false;
        var options = new Array("AB+","AB-","O-","O+","A+","A-","B+","B-","Bombay");
        createDropdown( callerDivID, inputID, options, "300px" );
    }
    if ( attributeType.search( 'hostel' ) != -1 ){
        inputRequired = false;
        var options = new Array("Barak","Brahmaputra","Dibang","Dihing","Kameng","Kapili","Manas","Siang","Subansiri","Umiam");
        createDropdown( callerDivID, inputID, options, "300px" );
    }
    if ( attributeType.search( 'post' ) != -1 ){
        inputRequired = false;
        var options = new Array("assistant Professor","Associate","Professor");
        createDropdown( callerDivID, inputID, options, "300px" );
    }
    if ( attributeType.search( 'dob' ) != -1 ){
        inputType = "date";
    }

    if(document.getElementById(inputID) && inputRequired){
        // code to change input type needs to be WRITTEN here
        alert( "You cannot change selection now.");

    }
    else if (inputRequired){
        inputRequired = false;
        var newdiv = document.createElement("input");
        newdiv.setAttribute("name", inputID);
        newdiv.setAttribute("id", inputID);
        newdiv.setAttribute("type", inputType);
        newdiv.style.width = "300px";
        //newdiv.innerHTML = "is " + " <br><input type='text' id=" + ID + " name=" + ID + ">";
        document.getElementById(callerDivID).appendChild(newdiv);
    }
    if( !inputRequired){
        // create button for and/or
        var logicID = "logic"+ callerID;
        var option = new Array('','AND','OR');
        createDropdown( callerDivID, logicID, option, "100px");
        document.getElementById(logicID).onchange = function(){createNewOption(callerDivID, attributeType, inputID, logicID)};
        var br = document.createElement("br");
        document.getElementById(callerDivID).appendChild( br );
        //createNewOption();
        var node=document.createTextNode(" ");
        document.getElementById(callerDivID).appendChild(node);
    }
}

function createNewOption(callerDivID, attributeType, inputID, logicID)
{
    makeQuery( attributeType, inputID, logicID);
    var newDivID = "queryDiv" + callerDivID;
    var newDiv = document.createElement('div');
    newDiv.setAttribute("id",newDivID);
    newDiv.setAttribute("name", newDivID);
    document.getElementById(callerDivID).appendChild(newDiv);
    
    whereCounter++;
    var whereID = "where" + callerDivID + whereCounter;
    //ID = "where11";
    var fields= new Array();
    var x=document.getElementById("where");
    for (var i=0;i<x.length;i++){ 
        fields[i]=x.options[i].text;
    }
    createDropdown(newDivID, whereID, fields, "220px");
    document.getElementById(whereID).onchange = function(){createNewElement(whereID, newDivID)};
}


function createDropdown( subDivID, fieldid , fields, width)
{
    var ID = fieldid;
    var select = document.createElement("select");
    select.setAttribute("name", ID);
    select.setAttribute("id", ID);
    select.style.width = width;
    var option;
    for (var i=0;i<fields.length;i++)
    {
        option = document.createElement("option");
        option.setAttribute("value", fields[i] );
        option.innerHTML = fields[i];
        select.appendChild(option);
    }
    document.getElementById(subDivID).appendChild(select);
}

function insertQuery(query)
{
    var textFieldID = "queryOutput";
    var queryText = document.getElementById(textFieldID).value;
    var newValue = queryText + query;
    document.getElementById(textFieldID).value=newValue;
    //document.getElementById(textFieldID).style.border = "4px solid red";
}

function startNest(callerID, callerDivID)
{
    window.query1 = new Object();
    //var oldquery=document.getElementById("unique");
    //oldquery.value = oldquery.value + "[ ";
    nestCounter++;
    subdivCounter++;
    whereCounter++ ;
    var divID = "div" + divCounter;
    var subDivID = "subdiv" + callerDivID + subdivCounter;
    var subdiv = document.createElement('div');
    subdiv.setAttribute("id",subDivID);
    subdiv.setAttribute("name", subDivID);
    //subdiv.setAttribute("type", "div");
    document.getElementById(callerDivID).appendChild(subdiv);
    
    createNewOption(subDivID);
    // Add code for next level nesting
    var nextStartNestID = "nextStartNest" + callerDivID;
    var nextStartNest = document.createElement("input");
    nextStartNest.setAttribute("id",nextStartNestID);
    nextStartNest.setAttribute("type","button");
    nextStartNest.setAttribute("name",nextStartNestID);
    nextStartNest.setAttribute("value","start Sub Nesting");
    nextStartNest.style.margin="20px";
    document.getElementById(callerDivID).appendChild(nextStartNest);
    document.getElementById(nextStartNestID).onclick = function(){startSubNest(nextStartNestID, subDivID)};
        
    var br = document.createElement("br");
    document.getElementById(callerDivID).appendChild( br );
    
    
    var newEndNestID = "endNest" + callerDivID;
    var newEndNest = document.createElement("input");
    newEndNest.setAttribute("id",newEndNestID);
    newEndNest.setAttribute("type","button");
    newEndNest.setAttribute("name",newEndNestID);
    newEndNest.setAttribute("value","End Nesting");
    document.getElementById(callerDivID).appendChild(newEndNest);
    document.getElementById(newEndNestID).onclick = function(){endNest(newEndNestID, callerDivID)};

    // Remove previous start nest id
    var x = document.getElementById(callerID);
    x.parentNode.removeChild(x);
}

function endNest(callerID, callerDivID)
{
    var oldquery=document.getElementById("unique");
    oldquery.value = oldquery.value + "] ";
    divCounter++;
    var divID = "div" + divCounter;
    nestCounter++;
    var newDiv = document.createElement('div');
    newDiv.setAttribute("id",divID);
    newDiv.setAttribute("name", divID);
    var div = document.getElementById('div1');
    div.parentNode.appendChild(newDiv);
    //div.appendChild(document.createTextNode("SSSSSS"));
    //document.body.appendChild(msgContainer);
    //document.getElementById(divID).innerHTML += "Start Nesting&nbsp; ";
    var startNestID = "startNest" + divID;
    var newstartNest = document.createElement("input");
    newstartNest.setAttribute("id",startNestID);
    newstartNest.setAttribute("type","button");
    newstartNest.setAttribute("name",startNestID);
    newstartNest.setAttribute("value","start Nesting");
    document.getElementById(divID).appendChild(newstartNest);
    document.getElementById(startNestID).onclick = function(){startNest(startNestID, divID)};
    var x = document.getElementById(callerID);
    x.parentNode.removeChild(x);
}


function startSubNest(callerID,callerDivID)
{
    nestSubdivCounter++;
    var subdivID = "nestSubdiv" + nestSubdivCounter;
    //nestCounter++;
    var subdiv = document.createElement('div');
    subdiv.setAttribute("id",subdivID);
    subdiv.setAttribute("name", subdivID);
    subdiv.style.margin = "20px";
    var div = document.getElementById(callerDivID);
    div.appendChild(subdiv);
    //div.appendChild(document.createTextNode("SSSSSS"));
    //document.body.appendChild(msgContainer);
    //document.getElementById(divID).innerHTML += "Start Nesting&nbsp; ";
    createNewOption(subdivID);
    
    var newStartSubNestID = "nextSubNest" + subdivID;
    var newStartSubNest = document.createElement("input");
    newStartSubNest.setAttribute("id",newStartSubNestID);
    newStartSubNest.setAttribute("type","button");
    newStartSubNest.setAttribute("name",newStartSubNestID);
    newStartSubNest.setAttribute("value","start Sub Nesting");
    newStartSubNest.style.marginLeft="40px";
    newStartSubNest.style.marginBottom="20px";
    document.getElementById(callerDivID).appendChild(newStartSubNest);
    document.getElementById(newStartSubNestID).onclick = function(){startSubNest(newStartSubNestID, subdivID)};
    
    var br = document.createElement("br");
    document.getElementById(callerDivID).appendChild( br );
    
    var x = document.getElementById(callerID);
    x.parentNode.removeChild(x);
    var newEndSubNestID = "endNest" + subdivID;
    var newEndSubNest = document.createElement("input");
    newEndSubNest.setAttribute("id",newEndSubNestID);
    newEndSubNest.setAttribute("type","button");
    newEndSubNest.setAttribute("name",newEndSubNestID);
    newEndSubNest.style.marginLeft="20px";
    newEndSubNest.setAttribute("value","End Sub Nesting");
    document.getElementById(callerDivID).appendChild(newEndSubNest);
    document.getElementById(newEndSubNestID).onclick = function(){endSubNest(newEndSubNestID, callerDivID)};
    
    // Remove previous start nest id
    var x = document.getElementById(callerID);
    x.parentNode.removeChild(x);
}

function endSubNest(callerID, callerDivID)
{
    var oldquery=document.getElementById("unique");
    oldquery.value = oldquery.value + "] ";
    var nextStartNestID = "nextStartNest" + callerDivID;
    var nextStartNest = document.createElement("input");
    nextStartNest.setAttribute("id",nextStartNestID);
    nextStartNest.setAttribute("type","button");
    nextStartNest.setAttribute("name",nextStartNestID);
    nextStartNest.setAttribute("value","start Sub Nesting");
    nextStartNest.style.marginLeft="20px";
    document.getElementById(callerDivID).appendChild(nextStartNest);
    document.getElementById(nextStartNestID).onclick = function(){startSubNest(nextStartNestID, callerDivID)};
    divCounter++;
    var divID = "div" + divCounter;
    nestCounter++;
    var newDiv = document.createElement('div');
    newDiv.setAttribute("id",divID);
    newDiv.setAttribute("name", divID);
    var div = document.getElementById('div1');
    div.parentNode.appendChild(newDiv);
    //div.appendChild(document.createTextNode("SSSSSS"));
    //document.body.appendChild(msgContainer);
    //document.getElementById(divID).innerHTML += "Start Nesting&nbsp; ";
    var x = document.getElementById(callerID);
    x.parentNode.removeChild(x);
}


function makeQuery(attributeType, inputID, logicID)
{
    var equals=["allResidents.uid","allResidents.gender","allResidents.type","allResidents.emergencyPh","allResidents.fbLink","allResidents.personalPh","interestedIn","allResidents.bloodGroup","allResidents.dob"];
    var contain=["allResidents.name","allResidents.fbLink","allResidents.interestedIn"];
    var oneQuery;
    if(attributeType && logicID && inputID){
        var value = document.getElementById(inputID).value;
        if( equals.indexOf(attributeType) != -1){
            oneQuery = "[ " + attributeType + " , " + value + " , == ] , ";
        }
        else if( contain.indexOf(attributeType) != -1){
         oneQuery = "[ " + attributeType + " , " + value + " , contains ] , ";
        }
        else{
            oneQuery = " ";
        }
        var oldquery=document.getElementById("unique");
        oldquery.value = oldquery.value + oneQuery;
        var operator = document.getElementById("operator");
        var newop = document.getElementById(logicID).value;
        operator.value = operator.value + newop + " , " ;
    }
    else{
        alert(attributeType);
        var oneQuery = "[ ";
        var oldquery=document.getElementById("unique");
        oldquery.value = oldquery.value + oneQuery;
    }
}
/*
// Do when internet is working
function redirect()
{
    self.location="showResult";
}
*/
