function createEmployeeRecord(employeeArray) {
    const [firstName, familyName, title, payPerHour] = employeeArray
    return {
        firstName,
        familyName,
        title,
        payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(arrayOfArrays) {
    return arrayOfArrays.map((records) => createEmployeeRecord(records))
}

function createTimeInEvent(employeeRecord, dateStamp) {
    const [date, time] = dateStamp.split(' ');
    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(time, 10),
        date: date
    }) 
    return employeeRecord
}

function createTimeOutEvent(employeeRecord, dateStamp) {
    const [date, time] = dateStamp.split(' ');
    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(time, 10),
        date: date
    })
    return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, date) {
    const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
    const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);
  
    if (!timeInEvent || !timeOutEvent) {
      return 0;
    } else {
        return (timeOutEvent.hour - timeInEvent.hour) / 100;
    }    
  }

  function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    const payRate = employeeRecord.payPerHour    
    const payOwed = hoursWorked * payRate;
    return payOwed
  }

    function allWagesFor(employeeRecord) {
    const datesWorked = employeeRecord.timeOutEvents.map(event => event.date);
  
    let totalWages = 0;
    for (const date of datesWorked) {
      totalWages += wagesEarnedOnDate(employeeRecord, date);
    }
  
    return totalWages;
  }

  function calculatePayroll(employeeRecordsArray) {
    let payroll = 0
    for(const employeeRecord of employeeRecordsArray) {
      payroll += allWagesFor(employeeRecord)
    }
    return payroll
  }
  
