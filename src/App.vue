<template>
	<div id="tawk-app">
		<tawk-header></tawk-header>
    <div id="home">
      <transition  name="fade">
		    <tawk-home v-show="!articles"></tawk-home>
      </transition>
      <transition name="fade">
        <tawk-category v-show="articles" @show-categories="showCategories"></tawk-category>
      </transition>
    </div>
		

	</div>
</template>

<script>
import Header from './components/Header.vue'
import Home from './components/Home.vue'
import Category from './components/Categories.vue'
import data from '../data/data.json'
import { bus } from './app.js'
const axios = require('axios');


export default {
	components:{
		'tawk-header': Header,
		'tawk-home': Home,
		'tawk-category': Category
	},
	data () {
		return {
      articles: false,
      categoryId: ''
		}
  },
  created () {
    bus.$on('show-articles', (data) => {
      this.articles = true
    })
  },
  methods: {
    showCategories () {
      this.articles = false
    }
  }
}
</script>

<style lang="scss" scoped>
  @import 'scss/main.scss';

  #home {
		background: #fafafa
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

</style>
