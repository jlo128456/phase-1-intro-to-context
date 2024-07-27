// Your code here
function createEmployeeRecord([firstName, familyName, title, payPerHour])
{
   return {
        firstName: firstName,
        familyName: familyName,
        title: title,
        payPerHour: payPerHour,
        timeInEvents: [],
        timeOutEvents: []

   }; 
}
//convert each nested arrays into employee record
function createEmployeeRecords(arrays)
{
  return arrays.map(createEmployeeRecord);
}
// Create a time in function to handle employee clock in
function createTimeInEvent(employee, dateStamp)
{
    let [date, hour] = dateStamp.split(' ');

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date
    });

     return employee;
}
//create Time out function to handle employee clock out
function createTimeOutEvent(employee, dateStamp)
{
    let [date, hour] = dateStamp.split(' ');

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date
    });
    return employee;
} 
//create a function to handle hours work given employee record
function hoursWorkedOnDate(employee,date)
{
    let timeIn = employee.timeInEvents.find(event => event.date === date);
    let timeOut = employee.timeOutEvents.find(event => event.date === date);

    return (timeOut.hour - timeIn.hour) /100;

}
//function to calculate the wage earned on that day
function wagesEarnedOnDate(employee, date)
{
    let hours = hoursWorkedOnDate(employee, date);
    return hours * employee.payPerHour;

}
// function to calculate all wages earned for that employee
function allWagesFor(employee)
{
    let dates = employee.timeInEvents.map(event => event.date);
    let totalWages = dates.reduce((total, date) => total + wagesEarnedOnDate(employee, date), 0);
    return totalWages;
}
//function to calculate sum of employere records
function calculatePayroll(employee)
{
    return employee.reduce((total, employee) => total + allWagesFor(employee), 0);

}
