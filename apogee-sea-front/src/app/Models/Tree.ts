import {DataContingency} from "./DataContingency";

export class Tree {
  data: DataContingency;
  children: Tree[];
  expanded: boolean;
  leaf: boolean;

  constructor(data: DataContingency, leaf: boolean, children: Tree[]) {
    this.data = data;
    this.expanded = false;
    this.leaf = leaf;
    this.children = children
  }

}
