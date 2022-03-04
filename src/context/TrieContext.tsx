import { createContext } from "react";
import Trie from "../classes/Trie";

// Might create a new object every import
export default createContext<Trie>(new Trie());