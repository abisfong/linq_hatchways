import Student from "../Student";

export default class Node {
  public value: string | null;
  public students: { [key: string]: Student };
  public children: { [key: string]: Node };

  constructor(value: string | null) {
    this.value = value;
    this.students = {};
    this.children = {};
  }

  public addChild(value: string, student: Student) {
    const lowerCaseVar = value.toLowerCase();

    if (!this.children[lowerCaseVar])
      this.children[lowerCaseVar] = new Node(lowerCaseVar);
    this.children[lowerCaseVar].students[student.id] = student;
  }

  public getChild(value: string): Node {
    const lowerCaseVar = value.toLowerCase();

    return this.children[lowerCaseVar];
  }

  public contains(value: string): boolean {
    const lowerCaseVar = value.toLowerCase();

    return this.children[lowerCaseVar] !== undefined;
  }
}