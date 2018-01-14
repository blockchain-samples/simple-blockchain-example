// -- import our block class
import Block from './block';

// -- initialize a starter (genesis) block
const InitialBlock = new Block(null);

// -- define a blockchain class with an initial starter block
class Blockchain {
  constructor(public chain: Block[] = [InitialBlock]) {}

  get latestBlock(): Block {
    return this.chain[this.chain.length - 1];
  }

  public addBlock(block: Block): void {
    block.previousHash = this.latestBlock.hash;
    block.hash = block.calculateHash();

    this.chain.push(block);
  }

  get isValid(): boolean {
    for (let i = 1; i < this.chain.length; i++) {
      const previousBlock = this.chain[i - 1];
      const currentBlock = this.chain[i];
      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

    }
    return true;
  }
}

// -- create a new instance of our blockchain class
const myNewBlockchain = new Blockchain();

// adding new blocks
myNewBlockchain.addBlock(new Block({amount: 55}));
myNewBlockchain.addBlock(new Block({amount: 41}));
myNewBlockchain.addBlock(new Block({amount: 17}));
myNewBlockchain.addBlock(new Block({amount: 22}));
myNewBlockchain.addBlock(new Block({amount: 63}));

// -- print out our blockchain
console.log(JSON.stringify(myNewBlockchain.chain, null, 2));

// -- check if blockchain is valid
console.log('Is given blockchain valid? ' + myNewBlockchain.isValid);

// -- try to make change in our blockchain
myNewBlockchain.chain[1].timestamp = Date.now();

// -- check if blockchain is valid again
console.log('Is given blockchain valid? ' + myNewBlockchain.isValid);
