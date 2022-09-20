//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0; 

//import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Strings.sol";

contract TriLinked {
    //using Strings for uint256; 

    event registerMerchantEvent (
        string merchantName,
        bytes32 merchantID, 
        address merchantAddress 
    ); 

    event registerProductEvent (
        string productName,
        bytes32 productID,
        uint256[] planTimes,
        uint256[] planCosts
    ); 

    //Structs:  =====================================================================================

    struct Merchant {

        string merchantName; 

        bytes32 merchantID;
        uint256 merchantEarnings; 
        uint256 numberOfProducts; 

    }

    mapping (address => Merchant) public merchants;  // Merchant Address is the key 

    struct Product {

        address merchantAddress; 
        address[] subscribers; 

        string productName; 
                                            
        bytes32 productID;
        bytes32[] planIDs; 
        
        uint256[] planTimes; 
        uint256[] planCosts;
    }

    mapping (bytes32 => mapping (bytes32 => mapping (uint256 => uint256))) public productPlans; //Product ID => Plan ID => Time => Cost 
    
    

    struct Subscribers {

        address payable subscriberAddress;                 
                                                            
        mapping (uint256 => string) currentSubscriptions;  
                                                                                                   
        uint256 subscriberGrossPayments; //incrememnt 

    }

    // Helper Functions =====================================================================================

    function checkNameLength(string calldata str) public pure returns (uint) {  //Merchant and Product names 
        return bytes(str).length; 
    }

    function hashIDStr (string calldata y) public view returns (bytes32) { //collison hash 
        return keccak256(abi.encodePacked(y, block.timestamp)); 
    }

    function hashIDUint (uint256 y) public view returns (bytes32) { //collison hash 
        return keccak256(abi.encodePacked(y, block.timestamp)); 
    }
 

    /*
    function isNumeric (string[] calldata x)  public view returns (bool) {

        //Takes in _price and _time from the registerProduct function
        // Since the mapping is a uint256 => string we are checking if the user-end string input was numerical

        for (uint256 i; i < x.length; i++) {
            bytes memory y = bytes(x[i]);

            for (uint256 j; j < y.length; j++) {
                if(
                    !(y[j] >= 0x30 && y[j] <= 0x39)
                )
                return false; 
            }
        }
        return true; 
    }
    */ 
    
    // Main Functions ======================================================================================

    //register merchant function 
    function registerMerchant (string calldata _merchantName) public {

        require (checkNameLength(_merchantName) <= 30, "Maximum name length of 25 characters exceeded."); 
        
        Merchant memory newMerchant; // Creating a new merchant  

        newMerchant.merchantName = _merchantName; //Name assign
        newMerchant.merchantID = hashIDStr(_merchantName); //ID assaign based on hashed name & time

        require (merchants[msg.sender].merchantID == 0, "You have already been registered!"); //Takes msg.sender addr as a key and scans struct for pre-existing merchant ID 

        merchants[msg.sender] = newMerchant; 

        //emitted event 
        emit registerMerchantEvent (newMerchant.merchantName, newMerchant.merchantID, msg.sender); 
    } 

    //register product function 
    function registerProduct (string calldata _productName, uint256[] calldata _planTimes, uint256[] calldata _planCosts) public {
        
        require (merchants[msg.sender].merchantID != 0, "You are not a registered merchant!");
        require (checkNameLength(_productName) <= 30, "Maximum name length of 25 characters exceeded.");  
        require (_planTimes.length == _planCosts.length, "Inadequate data, one time and one price per plan!"); 

        Product memory newProduct; //New product instance

        newProduct.productName = _productName;  //Name assign
        newProduct.productID = hashIDStr(_productName); //ID assign
        newProduct.planTimes = _planTimes;  //Time assign
        newProduct.planCosts = _planCosts;  //Cost assign 

        //Iterates i throught _planTimes.length to assign planIDs, planTimes, and planCost to productID key
        for (uint256 i = 0; i < _planTimes.length; i++) {

            bytes32 planID = hashIDUint(i); //Ran uint256 i, along with block.timestamp to generate hash through the uint256 => bytes32 func

            newProduct.planIDs[i] = planID; //Adds the plan ID to the plan IDs array within the new product
            productPlans[newProduct.productID][planID][_planTimes[i]] = _planCosts[i]; //Pushes all into the productPlans nested mapping

            merchants[msg.sender].numberOfProducts = merchants[msg.sender].numberOfProducts + 1; //Updates the merchants number of products on each interation
        }
        
        //emitted event 
        emit registerProductEvent (newProduct.productName, newProduct.productID, newProduct.planTimes, newProduct.planCosts); 
    }

    
    //subscribe function
    function subscribe (address payable _subscriberAddresss) public {

         
    }

    //refund  

}

/*
    // (subscription period|cost|start time)
    //mapping (uint256 => mapping (uint256 => string)) // productID => Time Out Blockstamp => productName
    // productID => plan | plan looks like "3|0.3|1663217802" ("3 [units of time]|0.3 [eth]|1663217802")
*/ 