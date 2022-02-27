import IStudent from "../interfaces/IStudent";

export default function sortStudents(students: IStudent[]): IStudent[] {
  return students.sort((studentA, studentB) => {
    const studentAFullName = studentA.firstName + studentB.lastName;
    const studentBFullName = studentB.firstName + studentB.lastName;

    return studentAFullName.localeCompare(studentBFullName);
  })
}