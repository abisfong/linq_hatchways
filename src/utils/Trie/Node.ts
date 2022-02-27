export default class Node {
  public value: string | null;
  public names: Set<string>;
  public children: { [key: string]: Node };

  constructor(value: string | null) {
    this.value = value;
    this.names = new Set();
    this.children = {};
  }

  public addChild(char: string, name: string) {
    if (!this.children[char])
      this.children[char] = new Node(char);
    this.children[char].names.add(name);
  }

  public get(char: string): Node {
    return this.children[char];
  }

  public contains(char: string): boolean {
    return this.children[char] !== undefined;
  }
}