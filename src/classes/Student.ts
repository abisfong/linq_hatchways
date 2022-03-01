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
  tags: string[];

  static fromArray(students: Student[]): Student[] {
    return students.map(student => new Student(student))
  }

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
    this.tags = [];
  }

  public names(): string[] {
    const fullname = `${this.firstName} ${this.lastName}`;
    return [this.firstName, this.lastName, fullname];
  }
}