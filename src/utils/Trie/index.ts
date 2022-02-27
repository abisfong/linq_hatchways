import IStudent from "../../interfaces/IStudent";
import sortStudents from "../sortStudents";
import Node from "./Node";

export default class Trie {
  private students: IStudent[] | undefined;
  private root: Node;
  
  constructor(students: IStudent[] | undefined) {
    this.students = students;
    this.root = new Node(null);
  }

  public setStudents(students: IStudent[]) {
    this.students = students;
  }

  public search(input: string): IStudent[] {
    let currNode: Node | undefined = this.root;

    for(let i = 0; i < input.length && currNode !== undefined; i++)
      currNode = currNode.get(input[i]);

    return sortStudents(Object.values(currNode.students));
  }

  public populate(): void {
    const names: Array<[string, IStudent]> = this.getStudentNames();

    names.forEach(pair => {
      const name = pair[0];
      const student = pair[1];
      let currNode = this.root;

      for (const char of name) {
        currNode.addChild(char, student);
        currNode = currNode.get(char);
      }
    })
  }

  private getStudentNames(): Array<[string, IStudent]> {
    const names: Array<[string, IStudent]> = [];

    this.students?.forEach(student => {
      const { firstName, lastName } = student;
      names.push([firstName.toLowerCase(), student]);
      names.push([lastName.toLowerCase(), student]);
      names.push([`${firstName} ${lastName}`, student]);
    });

    return names;
  }
}