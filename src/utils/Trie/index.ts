import IStudent from "../../interfaces/IStudent";
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

  public search(input: string): Set<number> | undefined {
    let currNode: Node = this.root;

    for(const char of input) {
      if (!currNode.contains(char))
        return undefined;
      currNode = currNode.get(char);
    }

    return currNode.students;
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
    console.log(this.root);
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