export default class Student {
  city: string;
  company: string;
  email: string;
  firstName: string;
  lastName: string;
  grades: string[];
  id: number;
  pic: string;
  skill: string;

  constructor(student: Student) {
    this.city = student.city;
    this.company = student.company;
    this.email = student.email;
    this.firstName = student.firstName;
    this.lastName = student.lastName;
    this.grades = student.grades;
    this.id = student.id;
    this.pic = student.pic;
    this.skill = student.skill;
  }

  get fullname() {
    return `${this.firstName} ${this.lastName}`;
  }
}