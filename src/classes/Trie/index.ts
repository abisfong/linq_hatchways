import sortStudents from "../../utils/sortStudents";
import Student from "../Student";
import Node from "./Node";

export default class Trie {
  private root: Node;
  
  constructor(students: Student[] | undefined) {
    this.root = new Node(null);
  }

  public search(input: string): Student[] {
    let currNode: Node | undefined = this.root;

    for(let i = 0; i < input.length && currNode !== undefined; i++)
      currNode = currNode.get(input[i]);

    return currNode ? sortStudents(Object.values(currNode.students)) : [];
  }

  public insert(string: string, value: Student) {
    let currNode = this.root;

    for (const char of string) {
      currNode.addChild(char, value);
      currNode = currNode.get(char);
    }
  }
}