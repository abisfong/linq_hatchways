import IStudent from "../interfaces/IStudent";

export const fetchStudents = async (): Promise<{ students: IStudent[] }> => {
  return await fetch(`https://api.hatchways.io/assessment/students`)
    .then(response => response.json())
}