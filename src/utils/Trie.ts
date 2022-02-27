import IStudent from "../interfaces/IStudent";

export default class Trie {
  private students: IStudent[] | undefined;
  private root: { [key: string]: {} };
  
  constructor(students: IStudent[] | undefined) {
    this.students = students;
    this.root = {};
  }

  public populate(students: IStudent[]): Trie {
    const names: string[] = this.getStudentNames();

    this.setStudents(students);

    names.forEach(name => {
      let currNode = this.root;
      for (const char of name) {
        const node = currNode[char] || {};
        currNode[char] = node;
        currNode = currNode[char];
      }
    })

    console.log(this.root);
    return this;
  }

  private getStudentNames(): string[] {
    const names: string[] = [];

    this.students?.forEach(student => {
      names.push(student.firstName);
      names.push(student.lastName);
    });

    return names;
  }

  private setStudents(students: IStudent[]) {

  }
}