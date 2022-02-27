import IStudent from "../../interfaces/IStudent";

export default class Node {
  public value: string | null;
  public students: { [key: string]: IStudent };
  public children: { [key: string]: Node };

  constructor(value: string | null) {
    this.value = value;
    this.students = {};
    this.children = {};
  }

  public addChild(char: string, student: IStudent) {
    const lowerCaseChar = char.toLowerCase();

    if (!this.children[lowerCaseChar])
      this.children[lowerCaseChar] = new Node(lowerCaseChar);
    this.children[lowerCaseChar].students[student.id] = student;
  }

  public get(char: string): Node {
    const lowerCaseChar = char.toLowerCase();

    return this.children[lowerCaseChar];
  }

  public contains(char: string): boolean {
    const lowerCaseChar = char.toLowerCase();

    return this.children[lowerCaseChar] !== undefined;
  }
}