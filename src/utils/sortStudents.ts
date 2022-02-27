import Student from "../classes/Student";

export default function sortStudents(students: Student[]): Student[] {
  return students.sort((studentA, studentB) => {
    const studentAFullName = studentA.firstName + studentB.lastName;
    const studentBFullName = studentB.firstName + studentB.lastName;

    return studentAFullName.localeCompare(studentBFullName);
  })
}