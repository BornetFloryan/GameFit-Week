<template>
  <div>
    <h1>Number</h1>

    <span>Number</span><input v-model="number">
    <button @click="getAccountAmount({number})" :disabled="!isValidAccountNumber">Get Amount</button>
    <button @click="getAccountTransaction({number})" :disabled="!isValidAccountNumber">Get Transactions</button>

    <p v-if="accountAmount">{{accountAmount}}</p>
    <ul v-if="accountTransactions && accountTransactions.length">
      <li v-for="(transaction, index) in accountTransactions" :key="index">
        Account: {{ transaction.account }}<br>
        Amount: {{ transaction.amount }}<br>
        Date: {{ formatDate(transaction.date.$date) }}<br>
        UUID: {{ transaction.uuid }}
      </li>
    </ul>
  </div>
</template>

<script>
import {mapState, mapActions} from 'vuex'
export default {
  name: 'BankAccountView',
  data: () => ({
    number: '',
  }),
  computed: {
    ...mapState(['accountAmount', 'accountTransactions']),
    isValidAccountNumber() {
      const regex = /^[a-zA-Z0-9]{22}-\d{7}$/;
      return regex.test(this.number);
    }
  },
  methods: {
    ...mapActions(['getAccountAmount', 'getAccountTransaction']),
    formatDate(dateString){
      const date = new Date(dateString);
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const seconds = date.getSeconds().toString().padStart(2, '0');
      return `${day}/${month}/${year} at ${hours}:${minutes}:${seconds}`;
    }
  }
}
</script>