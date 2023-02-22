// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Lock is ERC721, Ownable {
    struct subscriber {
        uint256 id;
        uint256 date;
    }

    mapping(address => subscriber) internal subscribers;

    uint256 public s_subscriberCount;
    uint256 public price;
    uint public time;

    constructor(uint priceArg, uint timeArg) ERC721("Lock", "LOCK") {
        price = priceArg;
        time = timeArg;
    }

    function ifExpired() internal view returns (bool) {
        if (subscribers[msg.sender].id != 0) {
            if ((block.timestamp) - (subscribers[msg.sender].date) < time) {
                return false;
            } else {
                return true;
            }
        } else {
            return true;
        }
    }

    function subscribe() external payable {
        require(ifExpired() == true, "your current plan hasn't expired yet");
        require(msg.value == price, "please send the correct amount of BITS");
        s_subscriberCount++;
        subscribers[msg.sender] = subscriber(s_subscriberCount, block.timestamp);
        if (subscribers[msg.sender].id != 0) {
            _burn(subscribers[msg.sender].id);
        }
        _safeMint(msg.sender, s_subscriberCount);
    }

    function isUserSubscribed(address user) external view returns (bool) {
        if (subscribers[user].id != 0) {
            if ((block.timestamp) - (subscribers[user].date) < time) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    }

    function balance() public view onlyOwner returns (uint) {
        return address(this).balance;
    }

    function withdraw(uint256 amount) external onlyOwner {
        (bool success, ) = payable(owner()).call{value: amount}("");
        require(success, "transfer failed");
    }
}
