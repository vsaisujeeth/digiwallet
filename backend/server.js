var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var bip39 = require('bip39')
var hdkey = require('hdkey')
var ethUtil = require('ethereumjs-util')
const Web3 = require('web3')
const web3 = new Web3('https://ropsten.infura.io/v3/98a343f00e164c0d9548f968e1792a9c');
var Tx = require('ethereumjs-tx')
var abi = require('human-standard-token-abi')


var mnemonic;
var address;
var privateKey;

function newAccount(){
    mnemonic = bip39.generateMnemonic()
    var seed = bip39.mnemonicToSeedSync(mnemonic).toString('hex')
    const root = hdkey.fromMasterSeed(Buffer.from(seed, 'hex'));
    const masterPrivateKey = root.privateKey.toString('hex');

    const addrNode = root.derive("m/44'/60'/0'/0/0");
    const pubKey = ethUtil.privateToPublic(addrNode._privateKey);
    privateKey = addrNode._privateKey.toString('hex');
    const addr = ethUtil.publicToAddress(pubKey).toString('hex');
    address = ethUtil.toChecksumAddress(addr);
}

// ************************** For Transactions **************

function newTransaction(fromAccount,fromPrivateKey,toAccount,Amount,res)
{
    web3.eth.getTransactionCount(fromAccount).then(txCount => {
    console.log('entereededdsddd')
    //define the amount to be sent
    var amount=Amount*1e18
    var a=amount.toString()
    
    const txData = {
    nonce: web3.utils.toHex(txCount),
    gasLimit: web3.utils.toHex(250000),
    gasPrice: web3.utils.toHex(10e9),
    to:toAccount,
    from:fromAccount,
    value: web3.utils.toHex(web3.utils.toWei(a, 'wei'))
    }
 
    const privateKey = new Buffer.from(fromPrivateKey, 'hex')
    const transaction = new Tx(txData)
    transaction.sign(privateKey)
    const serializedTx = transaction.serialize().toString('hex')
 
    web3.eth.sendSignedTransaction('0x' + serializedTx, function (err, transactionHash) {
    if (err){
    console.log(err['message']);
    res.status(500).send(err['message'].toString());
    }
    else{
    console.log(transactionHash);
    hash = transactionHash;
    res.status(200).send(transactionHash);
    }
   })
 }).catch(err =>{ console.log('************************');res.status(500).send(err['message'])})
}


//******************for token transaction */

function newTransactionToken(fromAccount,fromPrivateKey,toAccount,tokenAddress,amount,res)
{

    var token =new  web3.eth.Contract(abi,tokenAddress,{
        from: fromAccount , // default from address
        gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
    });

    
    web3.eth.getTransactionCount(fromAccount).then(txCount => {
    console.log('entered token')
    //define the amount to be sent
    let data = token.methods.transfer(toAccount, amount*1e18).encodeABI();
    let rawTx = {
    "nonce": web3.utils.toHex(txCount),
    "gasPrice": "0x3b9aca00",
    "gasLimit": web3.utils.toHex(250000),
    "to": tokenAddress,
    "value": "0x00",
    "data": data,
    }
    const privateKey = new Buffer.from(fromPrivateKey, 'hex')
    const tx = new Tx(rawTx)
    tx.sign(privateKey)
    const serializedTx = tx.serialize().toString('hex')
    
    web3.eth.sendSignedTransaction('0x' + serializedTx, function (err, transactionHash) {
    if (err){
    console.log(err);
    res.send(err);
    console.log('888888888888888888');
    }
    else{
    console.log(transactionHash);
    hash = transactionHash;
    res.send(transactionHash);
    }
   })
 }).catch(err =>{ console.log('************************' + err);res.send(err)})
}



const app = express();
const router=  express.Router();

app.use(bodyParser.json());
app.use(cors());


app.use('/',router);
app.post('/new',(req,res)=>{
    newAccount();
    res.json({
        'address': address,
        'mnemonic': mnemonic,
        'privateKey':privateKey
    })
})

app.post('/send',(req,res)=>{
   
    var fromAccount = req.body.fromAccount;
    var fromPrivateKey = req.body.fromPrivateKey;
    var toAccount = req.body.toAccount;
    var amount = req.body.amount;
    console.log(fromAccount,fromPrivateKey,toAccount,amount);
    newTransaction(fromAccount,fromPrivateKey,toAccount,amount,res);
    
})

app.post('/sendTokens',(req,res)=>{
   
    var fromAccount = req.body.fromAccount;
    var fromPrivateKey = req.body.fromPrivateKey;
    var toAccount = req.body.toAccount;
    var tokenAddress = req.body.tokenAddress;
    var amount = req.body.amount;
    console.log(fromAccount,fromPrivateKey,toAccount,tokenAddress,amount);
    newTransactionToken(fromAccount,fromPrivateKey,toAccount,tokenAddress,amount,res);
    
})

app.post('/balance',(req,res)=>{
    
   account = req.body.account;
   console.log('hi'+ account);
   //account='0x501938d5c17442c9a54b522021702101d9415d14'
    web3.eth.getBalance(account).then( data =>{ console.log(data);
    res.send(data)})

})

app.post('/balanceOf',(req,res)=>{
    console.log(req);
    fromAddress = req.body.fromAddress;
    tokenAddress = req.body.tokenAddress;
    console.log(fromAddress);
    console.log(tokenAddress);
    var token =new  web3.eth.Contract(abi,tokenAddress,{
        from: fromAddress , // default from address
        gasPrice: '20000000000' // default gas price in wei, 20 gwei in this case
    });

    token.methods.balanceOf(fromAddress).call()
    .then(function(result){
        hi= web3.utils.hexToNumber(result._hex);
        console.log(hi);
    res.send(hi.toString());
    });
 
 })
 
app.listen(4000,()=>console.log('exprsee server running'))