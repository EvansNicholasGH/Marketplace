pragma solidity ^0.4.17;

contract CoinListing {

    uint entryFee= 1000;
    
    struct Image {
        string Hash;
        string Ipfs;
    }   

    struct ListItem {
        address addr;
        string kind;
        Image  logo;
        uint price;
        string description;
        bool open;
        uint id;              
    }

    mapping(uint => ListItem) public items;
    mapping(address => bool) public registeredUsers;
    mapping(address => uint) public balances;
    mapping(address => uint[]) public purchases;
    mapping(address => uint[]) public listings;
  
    uint listItemID=0;

    function listItem(address _addr, string _kind, string _hash, string _ipfs, uint _price, string _description) public {
        
        items[listItemID] = ListItem(_addr, _kind, Image(_hash, _ipfs),_price, _description,true, listItemID);
        listings[_addr].push(listItemID);
        listItemID += 1;
    }
  
    function getListItem(uint _id) public view returns(address, string, string, string, uint, string, bool, uint) {
        ListItem memory item = items[_id];
        return (item.addr, item.kind, item.logo.Hash, item.logo.Ipfs, item.price, item.description, item.open, item.id);
    }

    function checkUserVerified(address _user) public view returns (bool) {
        return(registeredUsers[_user]);
    }

    function getEntryFee() public view returns (uint) {
        return entryFee;
    }

    function register() public payable returns (bool) {
        require(msg.value >= entryFee);
        registeredUsers[msg.sender] = true;
        return true;
    }

    function purchaseItem(uint _itemID) public payable returns (bool) {
        require(msg.value >= items[_itemID].price);
        require(items[_itemID].open == true);
        items[_itemID].open = false;
        purchases[msg.sender].push(_itemID);       
        balances[msg.sender] += msg.value;
        return true;
    }

    function purchaseWithBalance(uint _itemID)public payable returns (bool) {
        require(balances[msg.sender] >= items[_itemID].price);
        require(items[_itemID].open == true);
        items[_itemID].open = false;
        purchases[msg.sender].push(_itemID);       
        balances[msg.sender] -= items[_itemID].price;
        return true;
    }

    function withdrawFunds() public returns (bool) {
        uint balance = balances[msg.sender];
        require(balance>0);
        balances[msg.sender] = 0;
        msg.sender.transfer(balance);
        return true;
    }

    function updatePrice(uint _id, uint _newPrice) public {
        require(msg.sender == items[_id].addr);
        items[_id].price = _newPrice;
    }

    function closeListing(uint _id) public {
        require(msg.sender == items[_id].addr);
        items[_id].open = false;
    }
    
    function getNumberOfItems() public view returns(uint) {
        return listItemID;
    }

    function getBalance()public view returns (uint) {
        return balances[msg.sender];
    }   
     function getUserBalance(address _addr)public view returns (uint) {
        return balances[_addr];
    }   

    function getUserPurchases()public view returns (uint[]) {
        return purchases[msg.sender];
    }

     function getUserPurchasesFA(address _addr)public view returns (uint[]) {
        return purchases[_addr];
    }

    function getUserListings() public view returns (uint[]) {
        return listings[msg.sender];
    }

    function getUserListingsFA(address _addr) public view returns (uint[]) {
        return listings[_addr];    
    }
}

