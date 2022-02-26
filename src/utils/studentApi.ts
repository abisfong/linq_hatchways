import IStudent from "../interfaces/IStudent";

export const fetchStudents = (id: number) => {
  return async (): Promise<IStudent> => {
    return await fetch(`https://api.hatchways.io/assessment/students`)
      .then(response => response.json())
  }
}