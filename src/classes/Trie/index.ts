import sortStudents from "../../utils/sortStudents";
import Student from "../Student";
import Node from "./Node";

export default class Trie {
  private students: Student[] | undefined;
  private root: Node;
  
  constructor(students: Student[] | undefined) {
    this.students = students;
    this.root = new Node(null);
  }

  public setStudents(students: Student[]) {
    this.students = students;
  }

  public search(input: string): Student[] {
    let currNode: Node | undefined = this.root;

    for(let i = 0; i < input.length && currNode !== undefined; i++)
      currNode = currNode.get(input[i]);

    return currNode ? sortStudents(Object.values(currNode.students)) : [];
  }

  public populate(prop:string): void {
    const names: Array<[string, Student]> = this.getStudentProp(prop);

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

  addWord(word, value) {
    
  }

  private getStudentProp(prop: string): Array<[string, Student]> {
    const values: Array<[string, Student]> = [];

    this.students?.forEach(student => {
      // const { firstName, lastName } = student;
      // names.push([firstName.toLowerCase(), student]);
      // names.push([lastName.toLowerCase(), student]);
      // names.push([`${firstName} ${lastName}`, student]);
      student.getProp(prop)?.forEach(value => {
        values.push([value, student]);
      })
    });

    return values;
  }
}