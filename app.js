const inquirer=require("inquirer");
const mysql=require("mysql");
const connection=require("./config/connection");
const orm=require("./config/orm");
const chalk=require("chalk");
var columnify = require('columnify')

/* Preparing the choices of the prompt */
var allOptions=["View All Employees", "View All Employees By Department",
                     "View All Employees By Manager", "Add Employee", "Remove Employee", 
                           "Update Employee Role", "Update Employee Manager"];
var allEmployeeNames=[];
var allDepartments=[];
var allManagers=[];
var roleArr=[];
var allEmployeeObj=undefined;
var columnNamesArr=["id","first_name","last_name", "title", "department", "salary","manager"];

initAll();

function initAll(){
    initallEmployeeObj();
    initAllEmployeeNames();
    initAllDepartments();
    initRoleArr();
}

function initAllEmployeeNames() {
    allEmployeeNames=[];
    orm.select("first_name, last_name", "employee", function(res){
        for (var i = 0; i < res.length; i++) {
            allEmployeeNames.push(res[i].first_name+" "+res[i].last_name);
          }
    });
  }
  function initAllDepartments() {
      allDepartments=[];
    orm.select("distinct department ", "department", function(res){
        for (var i = 0; i < res.length; i++) {
            allDepartments.push(res[i].department);
          }
    });
  }
  function initManagers() {
      allManagers=[];
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

  function initRoleArr(){
      roleArr=[];
    orm.select("title", "role", function(data){
        for(var index in data){
            roleArr.push(data[index].title);
        }
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
    orm.getAllEmployee(function(data){
        allEmployeeObj=data;
        initManagers();
    printPretty(allEmployeeObj,columnNamesArr);
    promptUser();
});
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
            if(allEmployeeObj[i].department==department){
            newData.push(allEmployeeObj[i]);
            }
        }
        printPretty(newData,columnNamesArr);
        promptUser();
})
}

function viewAllEmployeeByManager(){
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
    allEmployeeNames.push("No manager");
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'firstName',
            message: chalk.red('Enter the first name: '),
        },
        {
            type: 'input',
            name: 'lastName',
            message: chalk.red('Enter the last name: '),
        },
        {
            type: 'list',
            name: 'role',
            message: chalk.red('Choose the role:'),
            choices: roleArr,
        },
        {
            type: 'list',
            name: 'manager',
            message: chalk.red('Choose the manager:'),
            choices: allEmployeeNames,
        },
    ])
    .then(answer=>{
        var manager=answer.manager;
        var managerfirstName=manager.substring(0,manager.indexOf(" "));
        var managerlastName=manager.substring(manager.indexOf(" ")+1);

        orm.selectWithCondition("id", "role", "title='"+answer.role+"'", function(data){
            var roleId=data[0].id;
            orm.selectWithCondition("id", "employee", "first_name='"+managerfirstName+"' and last_name='"+managerlastName+"'", function(data){
                var managerId=data[0].id;
                orm.insertEmployee(answer.firstName, answer.lastName, roleId, managerId);
                console.log(chalk.green("Successfully added the new employee: "+answer.firstName+" "+answer.lastName));
                initAll();
                promptUser();
            })
        })
})
}


function removeEmployee(){
    inquirer
    .prompt([
        {
            type: 'list',
            name: 'selected',
            message: chalk.red('Which employee do you want to remove?'),
            choices: allEmployeeNames,
        }
    ])
    .then(answer=>{
        var employee=answer.selected;
        var firstName=employee.substring(0,employee.indexOf(" "));
        var lastName=employee.substring(employee.indexOf(" ")+1);
        orm.delete(firstName, lastName, "employee");
        console.log(chalk.green("Successfully removed employee: "+employee));
        initAll();
        promptUser();
})
}


function updateEmployeeRole(){
    inquirer
    .prompt([
        {
            type: 'list',
            name: 'selected',
            message: chalk.red('Which employee\'s role do you want to update?'),
            choices: allEmployeeNames,
        },
        {
            type: 'list',
            name: 'newRole',
            message: chalk.red('Choose the new role:'),
            choices: roleArr,
        },
    ])
    .then(answer=>{
        var employee=answer.selected;
        var firstName=employee.substring(0,employee.indexOf(" "));
        var lastName=employee.substring(employee.indexOf(" ")+1);
        orm.selectWithCondition("id", "role", "title='"+answer.newRole+"'", function(data){
            var newRoleId=data[0].id;
            orm.update("employee", "role_id", newRoleId, "first_name='"+firstName+"' and last_name='"+lastName+"'");
            console.log(chalk.green("Successfully updated employee "+answer.selected+" role to "+answer.newRole));
            initAll();
            promptUser();
        });
    })
}

function updatedEmployeeManager(){
    inquirer
    .prompt([
        {
            type: 'list',
            name: 'selected',
            message: chalk.red('Which employee\'s manager do you want to update?'),
            choices: allEmployeeNames,
        },
        {
            type: 'list',
            name: 'newManager',
            message: chalk.red('Choose the new manager:'),
            choices: allEmployeeNames,
        },
    ])
    .then(answer=>{
        var employee=answer.selected;
        var newManager=answer.newManager;
        var employeefirstName=employee.substring(0,employee.indexOf(" "));
        var employeelastName=employee.substring(employee.indexOf(" ")+1);
        var managerfirstName=newManager.substring(0,newManager.indexOf(" "));
        var managerlastName=newManager.substring(newManager.indexOf(" ")+1);
        orm.selectWithCondition("id", "employee", "first_name='"+managerfirstName+"' and last_name='"+managerlastName+"'", function(data){
            var newManagerId=data[0].id;
            console.log(newManagerId)
            orm.update("employee", "manager_id", newManagerId, "first_name='"+employeefirstName+"' and last_name='"+employeelastName+"'");
            console.log(chalk.green("Successfully updated employee "+answer.selected+" manager to "+answer.newManager));
            initAll();
            promptUser();
        });
})

}

function printPretty(data,columnNamesArr){
    // console.log(columnNamesArr.join("\t\t"));
    // for(var i=0; i<data.length; i++){
    //     var eachRow=[];
    //     for(var j=0; j<columnNamesArr.length; j++){
    //         eachRow.push(data[i][columnNamesArr[j]]);
    //     }
    //     console.log(eachRow.join("\t"));
    // }

     
    var columns = columnify(data, {
        columns: columnNamesArr
    })
    
    console.log(columns)

}




promptUser();