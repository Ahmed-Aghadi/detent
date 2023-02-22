// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;
import "./Lock.sol";

contract Main {
    struct User {
        address lockAddress;
        string did;
        address userAddress;
        string cid;
    }

    mapping(address => User) public users;
    User[] public userArray;

    function registerLock(string memory did, string memory cid, uint price, uint time) public {
        // ILock lock = ILock(lockAddress);
        // require(lock.isOwner(msg.sender), "Not owner!");
        Lock lock = new Lock(price, time);
        lock.transferOwnership(msg.sender);
        User memory user = User(address(lock), did, msg.sender, cid);
        users[msg.sender] = user;
        userArray.push(user);
    }

    function getUsers() public view returns (User[] memory) {
        return userArray;
    }
}
