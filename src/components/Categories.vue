<template>
    <div>
        <section class="container-md" id="article">
            <div class="row pt-5">
                <div class="col-sm-12">
                    <label><span class="text-green" @click="$emit('show-categories')">All categories</span><span class="text-muted"> > {{ category.title }}</span></label>
                </div>
                <div class="col-sm-4">
                    <b-card class="text-center mb-4"  no-body>
                      <b-list-group>
                        <b-list-group-item>
                          <i :class="'fa fa-' + category.icon + ' fa-3x text-green mt-3 mb-3'"></i>
                          <h6 class="card-title mb-4"><strong>{{ category.title }}</strong></h6>
                          <label class="text-green mb-n1">{{ category.totalArticle }} articles</label><br>
                          <label class="text-muted">{{ lastUpdatedAgo(category.updatedOn) }}</label>
                        </b-list-group-item>
                        <b-list-group-item>
                          <i :class="'fa fa-info-circle fa-2x text-green mb-3'"></i>
                          <p>{{ category.description }}</p>
                        </b-list-group-item>
                      </b-list-group>
                    </b-card>
                </div>
                <!-- lists -->
                <div class="col-sm-8">
                    <div class="row">
                      <div class="col-sm-12">
                          <b-card class="card mb-2" v-for="article in articles" :key="article.title">
                              <div class="row">
                                  <div class="col-sm-1">
                                      <i :class="'fa fa-' + article.icon + ' fa-2x text-green mt-1'"></i>
                                  </div>
                                  <div class="col-sm-9">
                                      <h6 class="mb-n1"><strong>{{ article.title }}</strong></h6>
                                      <label class="text-muted">{{ article.subtitle }}</label>
                                      <label class="text-muted">{{ lastUpdatedDate(article.updatedOn) }}</label>
                                  </div>
                                  <div class="col-sm-1">
                                    <b-button v-b-toggle="article.id" size="sm" variant="link">
                                      <i class="fa fa-chevron-right fa-2x text-green mt-1"></i>
                                    </b-button>
                                  </div>
                                  <!-- <b-collapse class="col-sm-12 ml-3 mr-3 mt-3" :id="article.id"  accordion="my-accordion" role="tabpanel">
                                    <b-card><p>{{ article.content }}</p></b-card>
                                  </b-collapse> -->
                              </div>
                          </b-card>
                      </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- other Categories -->
        <section class="container-sm">
          <hr class="mt-5 mb-4">
            <div class="row mb-4">
                <div class="col-sm-12 text-center">
                    <h5 class="text-muted">Other Categories</h5>
                </div>
            </div>
            <vueper-slides
            class="no-shadow"
            :visible-slides="3"
            slide-multiple
            :gap="3"
            :bullets="false"
            :slide-ratio="1 / 4"
            :dragging-distance="200"
            :breakpoints="{ 800: { visibleSlides: 2, slideMultiple: 2 } }">
            <vueper-slide v-for="(others, index) in otherCategories" :key="index + '-other'">
              <template v-slot:content>
              <div>
                  <b-card class="text-center mb-4" >
                      <i :class="'fa fa-' + others.icon + ' fa-3x text-green mt-3 mb-3'"></i>
                      <h5 class="card-title mb-4"><strong>{{ others.title }}</strong></h5>
                      <label class="text-green mb-n1" v-scroll-to="'#article'" @click="showArticles(others)" style="cursor: pointer">{{ others.totalArticle }} Articles</label><br>
                      <label class="text-muted">{{ 'Last' + lastUpdatedAgo(others.updatedOn) }}</label>
                  </b-card>
              </div>
              </template>
            </vueper-slide>
          </vueper-slides>
        </section>
    </div>
</template>

<script>
import data from '../../data/data.json'
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'
const axios = require('axios');
import moment from 'moment'
import { bus } from '../app.js'
export default {
  components: { VueperSlides, VueperSlide },
  data () {
    return {
      category: [],
      articles: [],
      categories: [],
      otherCategories: [],
      sliding: false,
      slide: 0
    }
  },
  created () {
    bus.$on('show-articles', (data) => {
      this.category = data.category
      this.categories = data.categories
      this.otherCategories = _.filter(data.categories, (cat) => { return cat.id != data.category.id })
      axios('/api/category/' + this.category.id)
        .then(response => {
          this.articles = _.filter(response.data, { 'status': 'published' })
        }).catch(error => {
          // this.samp = error.response.data
        })
    })
  },
  methods: {
    lastUpdatedAgo (updatedOn) {
      return 'Updated ' + moment(updatedOn).fromNow()
    },
    lastUpdatedDate (updatedOn) {
      return 'Updated ' + moment(updatedOn).format("MMM, D YYYY")
    },
    onSlideStart(slide) {
      this.sliding = true
    },
    onSlideEnd(slide) {
      this.sliding = false
    },
    showArticles (category) {
      bus.$emit('show-articles', { category: category, categories: this.categories })
    }
  }
}
</script>

<style lang="scss" scoped>

  .text-green {
    color: #03a84e;
  }
  .py-100 {
    padding: 100px 0 50px 0;
  }

  .carousel-control-prev {
    left: -100px;
  }
  .carousel-control-next {
    right: -100px;
  }

  .card {
    border: 1px solid #eeeeee !important;
  }

  .list-group {
    border: none !important;
  }

</style>