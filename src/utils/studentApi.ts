import IStudent from "../interfaces/IStudent";

export const fetchStudents = (id: number) => {
  return async (): Promise<IStudent> => {
    return await fetch(`https://studentApi.co/api/v2/pokemon/${id}/`)
      .then(response => response.json())
  }
}