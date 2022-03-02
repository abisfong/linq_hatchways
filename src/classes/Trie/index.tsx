import sortStudents from "../../utils/sortStudents";
import Student from "../Student";
import Node from "./Node";

export default class Trie {
  private root: { [key: string]: Node };
  
  constructor() {
    this.root = {};
  }

  public search(branchName: string, input: string): Student[] {
    let currNode: Node | undefined = this.root[branchName];

    for(let i = 0; i < input.length && currNode !== undefined; i++)
      currNode = currNode.get(input[i]);

    return currNode ? sortStudents(Object.values(currNode.students)) : [];
  }

  public insert(branchName: string, string: string, value: Student) {
    let currNode = this.root[branchName] || (this.root[branchName] = new Node(null));

    for (const char of string) {
      currNode.addChild(char, value);
      currNode = currNode.get(char);
    }
  }
}