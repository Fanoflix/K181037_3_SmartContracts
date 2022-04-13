import { RouterLink, RouterView } from "vue-router";
import Main from "@/components/Main.vue";
import Web3 from "web3";
import { onMounted } from "vue";

let web3: Web3;
var contractAddress: string;

var abi = JSON.parse(`[
	{
		"constant": false,
		"inputs": [],
		"name": "subscribeNetflix",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	}
]`);

// contract instance
var contract: any;

// accounts
var account: string | null;

onMounted(async () => {
  web3 = new Web3(Web3.givenProvider || "ws://localhost:8545");
  contractAddress = "0xDDd8F291A1653FA7bbDC1fb9Ce2D06a8dfE769A1";
  contract = new web3.eth.Contract(abi, contractAddress);

  await window.ethereum.enable();

  let accounts = await web3.eth.getAccounts((err, accounts) => {
    if (err) {
      console.log(err);
    } else {
      account = accounts[0];
    }
  });
  console.log(account);
});

function subscribeNetflix() {
  let methods = contract.methods;
  console.log(account);
  console.log(methods);
  methods
    .subscribeNetflix()
    .send({ from: account, value: web3.utils.toWei("1", "ether") })
    .then(function (receipt: any) {
      console.log(receipt);
    });
}
