// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MessageContract{

    mapping (address => string) UserMessage;

    event MessageUpdated(address indexed sender, string newMessage);

    function setMessage(string memory __newMessage) public  {
        UserMessage[msg.sender] = __newMessage;
        emit MessageUpdated(msg.sender, __newMessage);
    }

    function getMessage() public view  returns(string memory) {
        return UserMessage[msg.sender];
    }

    function updateMessage(string memory __newMessage) public  {
        UserMessage[msg.sender] = __newMessage;
        emit MessageUpdated(msg.sender, __newMessage);
    }
    
}