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

function printRecords(recordIds) {
  return studentRecords.filter(findStudents).sort(sortByName).forEach(formatStudentOutput);

  function findStudents(student) {
    return recordIds.find(findMatchingdId);

    function findMatchingdId(id) {return student.id == id;}
  }
}

function filterBy(list, filterCondition) {
  return studentRecords.filter(matchStudentIds).map(getId);

  function matchStudentIds(student) {
    return list.find(matchFilter);

    function matchFilter(id){ return filterCondition(id, student) }
  }
}

function formatStudentOutput(student) {
  console.log(`${student.name} (${student.id}) ${paidToString(student.paid)}`);

  function paidToString(paid) {
    return paid ? 'Paid' : 'Not paid';
  }
}

function sortByName(firstStudent, secondStudent) {
  return firstStudent.name > secondStudent.name ? 1 : -1;
}

function getId(student) { return student.id; }

function paidStudentsToEnroll() {
  return [...filterBy(currentEnrollment, filterNonStudentPaid), ...currentEnrollment];
}

function remindUnpaid(recordIds) {
  return filterBy(recordIds, filterStudentNonPaid);
}

function filterStudentNonPaid(id, student) {
  return id == student.id && student.paid == false;
}

function filterNonStudentPaid(id, student) {
  return id != student.id && student.paid;
}
