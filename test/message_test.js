const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { expect } = require("chai");

describe("Lock", function () {

  async function deployFixture() {

    const [owner, otherAccount] = await ethers.getSigners();

    const MessageContract = await ethers.getContractFactory("MessageContract");
    const messageContract = await MessageContract.deploy();

    return { messageContract, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should set the message", async function () {
      const {messageContract, owner, otherAccount, MessageContract} = await loadFixture(deployFixture);
      const newMessage = "Hello, World!";

      // Set a new message
      await messageContract.setMessage(newMessage, { from: owner.getAddress() });
      expect(await messageContract.getMessage()).to.be.equal(newMessage)
    });

    it("Should get the message", async function () {
      const {messageContract, owner, otherAccount, MessageContract} = await loadFixture(deployFixture);
      await messageContract.connect(owner).setMessage("OSK")
    });

    it("Should update the message", async function () {
      const {messageContract, owner, otherAccount, MessageContract} = await loadFixture(deployFixture);

      const initialMessage = "Initial Message";
      const updatedMessage = "Updated Message";
  
      // Set an initial message
      await messageContract.setMessage(initialMessage, { from: owner.getAddress() });
  
      // Update the message
      await messageContract.updateMessage(updatedMessage, { from: owner.getAddress()});
  
      // Retrieve the updated message
      expect(await messageContract.getMessage()).to.be.equal(updatedMessage)
  
    });

    it("Should set the message with Other User", async function () {
      const {messageContract, owner, otherAccount, MessageContract} = await loadFixture(deployFixture);
      const newMessage = "ssHello, World!";
      await messageContract.connect(otherAccount).setMessage(newMessage)
      expect(await messageContract.connect(otherAccount).getMessage()).to.be.equal(newMessage)
    });
  });


    describe("Events", function () {
      it("Should emit an event on withdrawals", async function () {
        const {messageContract, owner, otherAccount, MessageContract} = await loadFixture(deployFixture);
        const newMessage = "ssHello, World!";
        await expect(messageContract.connect(owner).setMessage(newMessage)).to.emit(messageContract, "MessageUpdated").withArgs(await owner.getAddress(),newMessage)

      });
    });

  });
