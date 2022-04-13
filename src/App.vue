<script setup lang="ts">
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
</script>

<template>
  <header>
    <img
      alt="Vue logo"
      class="logo"
      src="@/assets/Netflix.png"
      width="125"
      height="125"
    />

    <div class="wrapper">
      <Main />
      <button class="subscribe-btn" @click.prevent="subscribeNetflix">
        subscribe
      </button>
    </div>
  </header>

  <RouterView />
</template>

<style>
@import "@/assets/base.css";

#app {
  max-width: 1380px;
  margin: 0 auto;
  padding: 2rem;

  font-weight: normal;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  width: 95px;
  height: 145px;
  margin: 0 auto 2rem;
}

a,
.green {
  text-decoration: none;
  color: hsla(160, 100%, 37%, 1);
  transition: 0.4s;
}

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

.wrapper .subscribe-btn {
  margin: 0px auto;
  margin-top: 40px;
  height: 50px;
  width: 100%;
  max-width: 340px;
  border-radius: 3px;
  cursor: pointer;

  font-size: 1.2rem;
  font-variant: small-caps;

  background-color: rgb(147, 0, 0);
  color: white;
  border: none;
  outline: none;
}

.subscribe-btn:hover {
  background-color: #ff0000;
}

@media (min-width: 1024px) {
  body {
    display: flex;
    place-items: center;
  }

  #app {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0 2rem;
  }

  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
