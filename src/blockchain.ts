// -- import our block class
import Block from './block';

// -- initialize a starter block
const InitialBlock = new Block(null);

// -- define a blockchain class with an initial, starter block
class Blockchain {
  private difficulty = 3;

  constructor(public chain: Block[] = [InitialBlock]) {}

  get lastBlock(): Block {
    return this.chain[this.chain.length - 1];
  }

  public addBlock(block: Block): void {
    block.index = this.chain.length;
    block.previousHash = this.lastBlock.hash;
    block.mine(this.difficulty);

    this.chain.push(block);
  }

  get isValid(): boolean {
    // skipping the InitialBlock because it doesn't have a previous block
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

// add new blocks
myNewBlockchain.addBlock(new Block({url: 'www.google.com'}));
myNewBlockchain.addBlock(new Block({url: 'www.facebook.com'}));
myNewBlockchain.addBlock(new Block({url: 'www.twitter.com'}));

// -- print out our blockchain
console.log(JSON.stringify(myNewBlockchain.chain, null, 2));

// -- check if blockchain is valid
console.log('Is given blockchain valid? ' + myNewBlockchain.isValid);

// -- try to make change in our blockchain
myNewBlockchain.chain[1].data = {url: 'www.linkedin.com'}

// -- check if blockchain is valid again
console.log('Is given blockchain valid? ' + myNewBlockchain.isValid);
