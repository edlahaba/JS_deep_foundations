function printRecords(recordIds) {
  return studentRecords.filter(student => {
    return recordIds.find(x => { return student.id == x; });
  }).sort((firstStudent, secondStudent) => {
    return firstStudent.name > secondStudent.name ? 1 : -1;
  }).forEach(student => {
     console.log(`${student.name} (${student.id}) ${isPaidToString(student.paid)}`);
  });

  function isPaidToString(paid) {
    return paid ? 'Paid' : 'Not paid';
  }
}

function filterBy(list, filterCondition) {
 return studentRecords.filter(student => {
    return list.find(id => { return filterCondition(id, student) });
  }).map(student => { return student.id; });
}

function paidStudentsToEnroll() {
  return filterBy(currentEnrollment, (id, student) => {
    return id != student.id && student.paid;
  }).concat(currentEnrollment);
}

function remindUnpaid(recordIds) {
  return filterBy(recordIds, (id, student) => {
    return id == student.id && student.paid == false;
  });
}


// ********************************

var currentEnrollment = [ 410, 105, 664, 375 ];

var studentRecords = [
	{ id: 313, name: "Frank", paid: true, },
	{ id: 410, name: "Suzy", paid: true, },
	{ id: 709, name: "Brian", paid: false, },
	{ id: 105, name: "Henry", paid: false, },
	{ id: 502, name: "Mary", paid: true, },
	{ id: 664, name: "Bob", paid: false, },
	{ id: 250, name: "Peter", paid: true, },
	{ id: 375, name: "Sarah", paid: true, },
	{ id: 867, name: "Greg", paid: false, },
];

printRecords(currentEnrollment);
console.log("----");
currentEnrollment = paidStudentsToEnroll();
printRecords(currentEnrollment);
console.log("----");
printRecords(remindUnpaid(currentEnrollment));

/*
	Bob (664): Not Paid
	Henry (105): Not Paid
	Sarah (375): Paid
	Suzy (410): Paid
	----
	Bob (664): Not Paid
	Frank (313): Paid
	Henry (105): Not Paid
	Mary (502): Paid
	Peter (250): Paid
	Sarah (375): Paid
	Suzy (410): Paid
	----
	Bob (664): Not Paid
	Henry (105): Not Paid
*/
