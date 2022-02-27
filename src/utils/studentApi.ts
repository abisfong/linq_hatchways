import Student from "../classes/Student";

export const fetchStudents = async (): Promise<{ students: Student[] }> => {
  return await fetch(`https://api.hatchways.io/assessment/students`)
    .then(response => response.json())
}