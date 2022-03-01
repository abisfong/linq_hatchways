import Student from "../classes/Student";

export const fetchStudents = async (): Promise<Student[]> => {
  return await fetch(`https://api.hatchways.io/assessment/students`)
    .then(async response => { 
      const { students  } = await response.json();

      return Student.fromArray(students);
    })
}