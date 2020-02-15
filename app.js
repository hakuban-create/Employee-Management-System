const inquirer=require("inquirer");
const mysql=require("mysql");
const connection=require("./config/connection");
const orm=require("./config/orm");
const chalk=require("chalk");

/* Preparing the choices of the prompt */
var allOptions=["View All Employees", "View All Employees By Department",
                     "View All Employees By Manager", "Add Employee", "Remove Employee", 
                           "Update Employee", "Update Employee Manager"];
var allEmployeeNames=[];
var allDepartments=[];
var allManagers=[];
var allEmployeeObj=undefined;
var columnNamesArr=["id","first_name","last_name", "title", "name", "salary","manager"];

initallEmployeeObj();
initAllEmployeeNames();
initAllDepartments();



function initAllEmployeeNames() {
    orm.select("first_name, last_name", "employee", function(res){
        for (var i = 0; i < res.length; i++) {
            allEmployeeNames.push(res[i].first_name+" "+res[i].last_name);
          }
    });
  }
  function initAllDepartments() {
    orm.select("distinct name ", "department", function(res){
        for (var i = 0; i < res.length; i++) {
            allDepartments.push(res[i].name);
          }
    });
  }
  function initManagers() {
        for (var i = 0; i < allEmployeeObj.length; i++) {
            var eachManager=allEmployeeObj[i].manager;
            if(eachManager!=null)
            allManagers.push(eachManager);
          }

  }

  function initallEmployeeObj(){
    orm.getAllEmployee(function(data){
        allEmployeeObj=data;
        initManagers();
    });
  }

/* end */

function promptUser(){
inquirer
.prompt([
    {
        type: 'list',
        name: 'selected',
        message: chalk.red('What would you like to do?'),
        choices: allOptions,
    }
])
.then(answer=>{
  var request=answer.selected;

    if(request==allOptions[0]){
        viewAllEmployee();
    }else if(request==allOptions[1]){
        viewAllEmployeeByDep();
    }else if(request==allOptions[2]){
        viewAllEmployeeByManager();
    }else if(request==allOptions[3]){
        addEmployee();
    }else if(request==allOptions[4]){
        removeEmployee();
    }else if(request==allOptions[5]){
        updateEmployeeRole();
    }else if(request==allOptions[6]){
        updatedEmployeeManager();
    }
});


}


function viewAllEmployee(){
    printPretty(allEmployeeObj,columnNamesArr);
    promptUser();
}

function viewAllEmployeeByDep(){
    inquirer
    .prompt([
        {
            type: 'list',
            name: 'selected',
            message: chalk.red('Which department employees do you want to view?'),
            choices: allDepartments,
        }
    ])
    .then(answer=>{
        var department=answer.selected;
        var newData=[];
        for(var i=0; i<allEmployeeObj.length; i++){
            if(allEmployeeObj[i].name==department){
            newData.push(allEmployeeObj[i]);
            }
        }
        printPretty(newData,columnNamesArr);
        promptUser();
})
}

function viewAllEmployeeByManager(){
    console.log(allManagers);
    inquirer
    .prompt([
        {
            type: 'list',
            name: 'selected',
            message: chalk.red('Which manager do you want to view?'),
            choices: allManagers,
        }
    ])
    .then(answer=>{
        var manager=answer.selected;
        var newData=[];
        for(var i=0; i<allEmployeeObj.length; i++){
            if(allEmployeeObj[i].manager==manager){
            newData.push(allEmployeeObj[i]);
            }
        }
        printPretty(newData,columnNamesArr);
        promptUser();
})

}

function addEmployee(){

}

function removeEmployee(){
}

function updateEmployeeRole(){

}

function updatedEmployeeManager(){

}

function printPretty(data,columnNamesArr){
    console.log(columnNamesArr.join("\t"));
    for(var i=0; i<data.length; i++){
        var eachRow=[];
        for(var j=0; j<columnNamesArr.length; j++){
            eachRow.push(data[i][columnNamesArr[j]]);
        }
        console.log(eachRow.join("\t"));
    }

}




promptUser();