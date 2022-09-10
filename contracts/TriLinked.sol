//SPDX-License-Identifier: MIT


pragma solidity ^0.8.0; 

contract TriLinked {
     

    //Events: ============================================

    //Merchant Events: 

    event RegisterMerchantEvent(

    );

    event MerchantOwnerAdded (

    );

    event MerchantOwnerRemoved (

    );

    //Project Events:  

    event ProjectRegistered(

    ); 

    event ProjectDeleted (

    ); 

    //Subscriber Events: 

    event SubscriberReceipt(

    ); 

    event Subscribed (

    );

    event Unsubscribed (

    ); 



    //Structs: ============================================

   

    struct Merchant {
        string merchantName;

        bytes32 merchantID;
        uint256[] projectIDs; //.length for number of projects
        uint256 merchantEarnings; 

        address merchantOwner; 

    }

    struct Project {
        string projectName;
        address merchantAddress;

        uint256 projectID;
        uint256 monthlyCost; 
        uint256 blockStart; 
        uint256 blockEnd;
        uint256 projectEarnings;  

        address[] currentSubscribers; // .length for gross current subscribers
        address[] pastSubscribers;    // .length for gross unsubscribers 
        Receipt[] receipts;
        

        mapping(address => bool) subscriberHasPayed; //change l8r

    }

    struct Subscriber {   
        address subscriberAddress;

        string subscriberName;

        mapping(uint256 => string) currentSubscriptions; // Filtering by projectName - human readable in query | .length sor gross #
        mapping(uint256 => string) pastSubscriptions;    // .length sor gross #
       
        uint256 subscriberGrossPayment; //Gross monthly payment of all subscriptions  

        //Mappings for amount / dates payed for products indivisually - not sure if needed in struct 
    }

    struct Receipt {
        uint256 merchantID;
        uint256 productID;
        uint256 subscriberID;

        string merchantName;
        string productName;
        string subscriberName;

        address merchantAddress;
        address subscriberAddress;

        uint256 price;
        uint256 date;
    }
    
    mapping (address => Merchant) public merchants; 

    //Getter Function: =================================================================

    //Main Functions: ==================================================================

    function checkNameLength(string calldata str) public pure returns (uint) {
        return bytes(str).length; 
    }

    function hashID (string calldata y) public view returns (bytes32) { //collison hash 
        return keccak256(abi.encodePacked(y, block.timestamp)); 
    }

    function registerMerchant(address _merchantOwner, string calldata _merchantName) external {

        require (merchants[_merchantOwner].merchantID == 0, "Merchant Already Registered");
        require (checkNameLength(_merchantName) <= 25, "Maximum Name Length of 25 Characters Exceeded"); 

        Merchant memory newMerchant;

        newMerchant.merchantName = _merchantName; 
        newMerchant.merchantID = hashID(_merchantName); 
        newMerchant.merchantOwner = _merchantOwner;  
        
        merchants[_merchantOwner] = newMerchant; 

        //emit RegisterMerchantEvent (_merchantName, newMerchant.merchantID, _merchantOwner); // Define types up top L8r
    }
    

    //Setter Functions: ================================================================
    
}