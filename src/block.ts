import * as CryptoJS from 'crypto-js';
const SHA256 = CryptoJS.SHA256;

class Block {
  public timestamp: number;
  public previousHash: string;
  public hash: string;

  constructor(public data: any) {
    this.timestamp = Date.now();
    this.previousHash = null;
    this.hash = this.calculateHash();
  }

  public calculateHash() {
    return SHA256(
      this.timestamp +
      JSON.stringify(this.data) +
      this.previousHash
    ).toString();
  }
}

export default Block;