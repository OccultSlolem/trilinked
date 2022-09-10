//SPDX-License-Identifier: MIT


pragma solidity ^0.8.0; 

contract TriLinked {
     

    //Events: ============================================

    //Merchant Events: 
    event RegisterMerchantEvent(
        string merchantName, 
        bytes32 merchantID,     //(hashed) 
        address merchantOwner 
    );

    event MerchantOwnerTransferred (

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

        uint256 merchantEarnings; 

        address merchantOwner; 

        Product[] products; 

    }

    struct Product {
        string productName;
        address merchantAddress;

        uint256 productID;
        uint subscriptionCost; 
        uint256 subscriptionInterval;
        uint256 productEarnings;  

        address[] currentSubscribers; // .length for gross current subscribers
        address[] pastSubscribers;    // .length for gross unsubscribers 
        Receipt[] receipts;
        

        mapping(address => bool) subscriberHasPayed; //change L8r

    }

    struct Subscriber {   
        address subscriberAddress;

        string subscriberName;

        mapping(uint256 => string) currentSubscriptions; // Filtering by projectName - human readable in query | .length sor gross #
        mapping(uint256 => string) pastSubscriptions;    // .length sor gross #
        mapping(uint256 => uint) subscriptionsDue;       // Unix timestamp of all due payments (contract ID => due second)
       
        uint256 subscriberGrossPayment; //Gross monthly payment of all subscriptions  

        
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

    //Getter Functions: =================================================================

    //Main Functions: ==================================================================

    function checkNameLength(string calldata str) public pure returns (uint) {
        return bytes(str).length; 
    }

    function hashID (string calldata y) public view returns (bytes32) { //collison hash 
        return keccak256(abi.encodePacked(y, block.timestamp)); 
    }

    function getTime () public view returns(uint256 time){
        return block.timestamp + 30 days;
    }

    function registerMerchant(address _merchantOwner, string calldata _merchantName) external {

        require (merchants[_merchantOwner].merchantID == 0, "Merchant Already Registered");
        require (checkNameLength(_merchantName) <= 25, "Maximum Name Length of 25 Characters Exceeded"); 
        require (msg.sender == _merchantOwner, "Wrong Wallet! Check Metamask Account"); 

        Merchant memory newMerchant;

        newMerchant.merchantName = _merchantName; 
        newMerchant.merchantID = hashID(_merchantName); 
        newMerchant.merchantOwner = _merchantOwner;  
        
        merchants[_merchantOwner] = newMerchant; 

        emit RegisterMerchantEvent (_merchantName, newMerchant.merchantID, _merchantOwner); // Define types up top L8r
    }

    function registerProject(string calldata _productName, uint256 _subscriptionInterval, uint256 _subscriptionCost) external {

        require (checkNameLength(_productName) <= 25, "Maximum Name Length of 25 Characters Exceeded");
        require (_subscriptionInterval >= 7 && _subscriptionInterval <= 31, "Subscription Interval Must Be Between 7 and 31 Days"); 
        require(_subscriptionCost >= 0 ether, "Subscription Cost Must Be > 0 ETHER");

        Product memory newProduct;

        newProduct.productName = _productName;
        newProduct.productID = hashID(_productName); 
        newProduct.subscriptionInterval = _subscriptionInterval; 
        newProduct.subscriptionCost = _subscriptionCost; 
       
        merchants[msg.sender].products.push();

    }
    

    /* 
        FireBase: 

        -Pros: Extremely Reduced Gas Cost -- async load times 
        
        -Cons: Mixed http request: 1/2 subgraph | 1/2 firebase -- Reverse engineere smart contract 

        --------------------------------------------------------------

        

    */
    
    //Setter Functions: ================================================================
    
    
}