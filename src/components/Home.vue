<template>
        <section class="container-md py-100">
          <!-- row1 -->
            <div class="row">
                <div class="col-sm-4 col-xs-4" v-for="category in categories" :key="category.id">
                    <b-card class="text-center mb-4" >
                        <i :class="'fa fa-' + category.icon + ' fa-3x text-green mt-3 mb-3'"></i>
                        <h5 class="card-title mb-4"><strong>{{ category.title }}</strong></h5>
                        <label class="text-green mb-n1" @click="showArticles(category)" style="cursor: pointer">{{ category.totalArticle }} Articles</label><br>
                        <label class="text-muted">{{ lastUpdated(category.updatedOn) }}</label>
                    </b-card>
                </div>
            </div>
        </section>
</template>

<script>
import data from '../../data/data.json'
import { bus } from '../app.js'
const axios = require('axios')
import _ from 'lodash'
import moment from 'moment'
export default {
    data () {
      return {
        categories: []
      }
    },
    created () {
      bus.$on('search', (search) => {
        var category = _.find(this.categories, (cat) => { 
            var title = _.toLower(cat.title)
            return title.includes(_.toLower(search))
          });
        if(category) {
          this.showArticles(category)
        }
      })
    },
    mounted () {
      this.getCategory()
    },
    methods: {
      getCategory() {
        axios('/api/categories')
        .then(response => {
          var enabledCategories = _.filter(response.data, { 'enabled': true });

          this.categories = _.orderBy(enabledCategories, ['order'], ['asc'])
        }).catch(error => {
          this.categories = error.response.data
        })
      },
      showArticles (category) {
        bus.$emit('show-articles', { category: category, categories: this.categories })
      },
      lastUpdated (updatedOn) {
        return 'Last Updated ' + moment(updatedOn).fromNow()
      }
    },
}
</script>

<style lang="scss" scoped>

  .text-green {
		color: #03a84e;
  }

  .py-100 {
    padding: 100px 0 50px 0;
  }

  .card {
    border: 1px solid #eeeeee !important;
  }
</style>

