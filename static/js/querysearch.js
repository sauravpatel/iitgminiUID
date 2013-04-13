var divCounter = 1;
var nestCounter = 0;
var subdivCounter = 0;
var whereCounter = 0;
var inputCounter = 0;
var counter = 0;
var counterText = 0;
var counterRadioButton = 0;
var counterCheckBox = 0;
var counterTextArea = 0;
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
    //if ( attribute){
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

    //}
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
        alert("TT    :" + callerDivID);
        document.getElementById(logicID).onchange = function(){createNewOption(callerDivID)};
        var br = document.createElement("br");
        document.getElementById(callerDivID).appendChild( br );
        //createNewOption();
        var node=document.createTextNode(" ");
        document.getElementById(callerDivID).appendChild(node);
    }
}

function createNewOption(callerDivID)
{
    alert(callerDivID);
    whereCounter++;
    var whereID = "where" + callerDivID + whereCounter;
    //ID = "where11";
    var fields= new Array();
    var x=document.getElementById("where");
    for (var i=0;i<x.length;i++){ 
        fields[i]=x.options[i].text;
    }
    createDropdown(callerDivID, whereID, fields, "220px");
    document.getElementById(whereID).onchange = function(){createNewElement(whereID, callerDivID)};
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

function startNest(callerDivID)
{
    nestCounter++;
    subdivCounter++;
    whereCounter++ ;
    var divID = "div" + divCounter;
    var subDivID = "subdiv" + callerDivID + subdivCounter;
    var whereID = "where" + callerDivID + whereCounter;
    //alert(subDivID);
    //addAllInputs("div1", "text");
    var subdiv = document.createElement('div');
    subdiv.setAttribute("id",subDivID);
    subdiv.setAttribute("name", subDivID);
    //subdiv.setAttribute("type", "div");
    document.getElementById(callerDivID).appendChild(subdiv);
    
    var endNestID = "endNest" + callerDivID;
    var newendNest = document.createElement("input");
    newendNest.setAttribute("id",endNestID);
    newendNest.setAttribute("type","button");
    newendNest.setAttribute("name",endNestID);
    newendNest.setAttribute("value","End Nesting");
    document.getElementById(callerDivID).appendChild(newendNest);
    document.getElementById(endNestID).onclick = function(){endNest(callerDivID)};
    //= "Start Nesting <input type='checkbox' onchange='startNest()'>";
    //document.getElementById("div1").appendChild(newdiv);
    var fields= new Array();
    var x=document.getElementById("where");
    for (var i=0;i<x.length;i++){ 
        fields[i]=x.options[i].text;
    }
    //createNewOption();
    createDropdown(subDivID, whereID, fields, "220px");
    document.getElementById(whereID).onchange = function(){createNewElement(whereID, subDivID)};

    // Add code for next level nesting
    var nextStartNestID = "nextStartNest" + callerDivID;
    var nextStartNest = document.createElement("input");
    nextStartNest.setAttribute("id",nextStartNestID);
    nextStartNest.setAttribute("type","button");
    nextStartNest.setAttribute("name",nextStartNestID);
    nextStartNest.setAttribute("value","Next level Nesting");
    document.getElementById(callerDivID).appendChild(nextStartNest);
    // instead of startNest call some other function which does exactly like endNest
    // i.e. create new div and call createNewOption
    document.getElementById(nextStartNestID).onclick = function(){startNest(callerDivID)};
        
    var br = document.createElement("br");
    document.getElementById(callerDivID).appendChild( br );

    // Remove previous start nest id
    var x = document.getElementById("startNest" + callerDivID);
    x.parentNode.removeChild(x);
}

function endNest(callerDivID)
{
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
    document.getElementById(startNestID).onclick = function(){startNest(divID)};
    var x = document.getElementById("endNest" + callerDivID);
    x.parentNode.removeChild(x);
}
/*
function newQuery()
{
}

// Do when internet is working
function redirect()
{
    self.location="showResult";
}
*/
