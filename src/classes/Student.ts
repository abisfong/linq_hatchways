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

  getProp(prop: string): string[] | undefined {
    switch (prop) {
      case 'names':
        return this.names();
      case 'tags':
        return [];
    }
  }

  private names(): string[] {
    const fullname = `${this.firstName} ${this.lastName}`;
    return [this.firstName, this.lastName, fullname];
  }
}