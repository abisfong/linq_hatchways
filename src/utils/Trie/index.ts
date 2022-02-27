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

  public search(input: string): string[] {
    let currNode: Node = this.root;

    for(const char of input) {
      if (!currNode.contains(char))
        return [];
      currNode = currNode.get(char);
    }

    return Array.from(currNode?.names).sort();
  }

  public populate(): void {
    const names: string[] = this.getStudentNames();

    names.forEach(name => {
      let currNode = this.root;
      for (const char of name) {
        currNode.addChild(char, name);
        currNode = currNode.get(char);
      }
    })
    console.log(this.root);
  }

  private getStudentNames(): string[] {
    const names: string[] = [];

    this.students?.forEach(student => {
      names.push(student.firstName.toLowerCase());
      names.push(student.lastName.toLowerCase());
    });

    return names;
  }

  
}