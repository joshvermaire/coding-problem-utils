/**
 * Union-Find data structure
 * 
 * Time Complexities:
 *  constructor: O(n)
 *  union(): O(log n) amortized time complexity
 *  find(): O(log n) amortized time complexity
 *  isConnected(): O(log n) amortized time complexity
 *  reset(): O(1)
 */

class UnionFind {
    constructor(n) {
        this.parents = [...new Array(n).keys()];
        this.rank = new Array(n).fill(0);
    }

    union(x, y) {
        let rootX = this.find(x);
        let rootY = this.find(y);
        if (rootY === rootX) return;
        
        if (this.rank[rootX] < this.rank[rootY]) {
            this.parents[rootX] = this.parents[rootY];
        } else if (this.rank[rootX] > this.rank[rootY]) {
            this.parents[rootY] = this.parents[rootX];
        } else {
            this.parents[rootX] = this.parents[rootY];
            this.rank[rootY]++;
        }
    }

    find(x) {
        if (this.parents[x] !== x) {
            this.parents[x] = this.find(this.parents[x]);
        }
        return this.parents[x];
    }

    isConnected(x, y) {
        return this.find(x) === this.find(y);
    }

    reset(x) {
        this.parents[x] = x;
    }
}