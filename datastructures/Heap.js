class Heap {
  constructor(comparator = ((a, b) => a - b)) {
    this.heap = [];
    this.comparator = comparator;
  }

  // Add an element to the heap.
  insert(element) {
    this.heap.push(element);
    this.heapifyUp();
  }

  // Remove the maximum element from the heap.
  remove() {
    const max = this.heap[0];
    this.heap[0] = this.heap[this.heap.length - 1];
    this.heap.pop();
    this.heapifyDown();
    return max;
  }

  // Restore the heap property after adding an element.
  heapifyUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.comparator(this.heap[index], this.heap[parentIndex]) < 0) {
        this.swap(index, parentIndex);
        index = parentIndex;
      } else {
        break;
      }
    }
  }

  // Restore the heap property after removing an element.
  heapifyDown() {
    let index = 0;
    while (index < this.heap.length) {
      const leftChildIndex = 2 * index + 1;
      const rightChildIndex = 2 * index + 2;
      let largestChildIndex = index;
      if (leftChildIndex < this.heap.length && this.comparator(this.heap[leftChildIndex], this.heap[largestChildIndex]) < 0) {
        largestChildIndex = leftChildIndex;
      }
      if (rightChildIndex < this.heap.length && this.comparator(this.heap[rightChildIndex], this.heap[largestChildIndex]) < 0) {
        largestChildIndex = rightChildIndex;
      }
      if (largestChildIndex !== index) {
        this.swap(index, largestChildIndex);
        index = largestChildIndex;
      } else {
        break;
      }
    }
  }

  // Swap two elements in the heap.
  swap(index1, index2) {
    const temp = this.heap[index1];
    this.heap[index1] = this.heap[index2];
    this.heap[index2] = temp;
  }

  // Get the maximum element in the heap.
  peek() {
    return this.heap[0];
  }

  // Check if the heap is empty.
  isEmpty() {
    return this.heap.length === 0;
  }

  size() {
    return this.heap.length;
  }
}

// Example usage:

const comparator = (a, b) => b - a; // Compare two numbers in descending order.

const heap = new Heap(comparator);

heap.insert(5);
heap.insert(3);
heap.insert(7);

console.log(heap.peek()); // 7

heap.remove();

console.log(heap.peek()); // 5
