import IStudent from "../../interfaces/IStudent";

export default class Node {
  public value: string | null;
  public students: Set<number>;
  public children: { [key: string]: Node };

  constructor(value: string | null) {
    this.value = value;
    this.students = new Set();
    this.children = {};
  }

  public addChild(char: string, student: IStudent) {
    if (!this.children[char])
      this.children[char] = new Node(char);
    this.children[char].students.add(student.id);
  }

  public get(char: string): Node {
    return this.children[char];
  }

  public contains(char: string): boolean {
    return this.children[char] !== undefined;
  }
}