
class Node {
  constructor(data = null, left = null, right = null) {
    this.data = data
    this.left = left
    this.right = right
  }
}

class Tree {
  constructor(arr) {
    this.root = this.buildTree(arr)
  }

  // We asume that the array is already sorted
  buildTree(arr) {
    if (arr.length === 0) return null
    const mid = Math.floor(arr.length / 2);
    const node = new Node(arr[mid])
    node.left = this.buildTree(arr.slice(0, mid))
    node.right = this.buildTree(arr.slice(mid + 1))
    return node
  }

  insert(value, root = this.root) {
    if (value === root) return
    if (root == null) {
      let node = new Node(value)
      return node
    }
    if (value < root.data) {
      root.left = this.insert(value, root.left)
    } else {
      root.right = this.insert(value, root.right)
    }
    return root
  }

  // Asuming the value to delete is in the tree
  delete(value, root = this.root, prev = null) {
    
    if (value === root.data) {
      
      // Case 1. node has no childrens.
      if (!root.left && !root.right) {
        if (prev.data > value) {
          prev.left = null
        } else {
          prev.right = null
        }
      }

      // Case 2. node has one children
      if (!root.left ^ !root.right) {
        if (value > prev.data) {
          if (root.right) {
            prev.right = root.right
          } else {
            prev.right = root.left
          }
        } else {
          if (root.right) {
            prev.left = root.right
          } else {
            prev.left = root.left
          }
        }
      }

      // Case 3. node has both childrens
      if (root.left && root.right) {
        
        function findReplacement(node, beforeNext = null) {
          if (node.left) {
            return findReplacement(node.left, node)
          }
          return node, beforeNext
        }

        let next = findReplacement(root.right)
        console.log('value', root)
        console.log('next',next.node)
        console.log('beforeNext', next.beforeNext)

        console.log('prev', prev)

        // Need to replace the 'next' node with the node to eliminate

        if (value > prev.data) { 
          let tmp = root
          prev.right = next.node
          if (next.node.right) {
            tmp.right.left = next.node.right
          } else {
            tmp.right.left = null
          }
          next.node.right = tmp.right
          next.node.left = tmp.left
  
        } else {
          let tmp = root
          prev.left = next.node
          if (next.node.right) {
            tmp.right.left = next.node.right
          } else {
            tmp.right.left = null
          }
          next.node.left = tmp.left
          //next.right = tmp.right
        }
        
      }
      return root
    } else if (value < root.data) {
      this.delete(value, root.left, root)
    } else {
      this.delete(value, root.right, root)
    }
    return root
  }

  PreOrder(node = this.root, arr = []) {
    if (node == null) return
    arr.push(node.data)
    this.PreOrder(node.left, arr)
    this.PreOrder(node.right, arr)
    return arr
  }

  InOrder(node = this.root, arr = []) {
    if (node == null) return
    this.InOrder(node.left, arr) 
    arr.push(node.data)
    this.InOrder(node.right, arr)
    return arr
  }

  PostOrder(node = this.root, arr = []) {
    if (node == null) return
    this.PostOrder(node.left, arr)
    this.PostOrder(node.right, arr)
    arr.push(node.data)
    return arr
  }
}


const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};


const sortedArray = [1,3,4,5,7,8,9,23,67,324,6345]
const otherArray = [20,30,32,34,36,40,50,60,65,70,75,80,85]
const longArray = [1,2,4,6,8,9,12,14,17,23,26,27,28,29,30,34,35,39,41,50,55,60,61,62,63,]

let newTree = new Tree(longArray)
console.log(newTree)
prettyPrint(newTree.root)

// newTree.insert(82, newTree)
// prettyPrint(newTree.root)
// // newTree.delete(20)
// // prettyPrint(newTree.root)
// newTree.delete(23)
// console.log(newTree)
// prettyPrint(newTree.root)

console.log(newTree.PreOrder())
console.log(newTree.InOrder())
console.log(newTree.PostOrder())