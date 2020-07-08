<template>
	<section id="header">
		<div class="row justify-content-md-center">
			<div class="col col-md-auto">
				<h1 class="display-4 title">Knowledge base doesn't have to be boring</h1>
				<h5 class="description text-center">Everything you need to Manage your Messaging</h5>
			</div>
		</div>

		<div class="row justify-content-md-center mb-5">
			<div class="col col-md-5">
				<b-input-group size="lg" class="mt-3">
					<b-form-input placeholder="Search for answers" v-model="search"></b-form-input>
					<b-input-group-append>
					<b-button variant="success" @click="searchCategory()"><i class="fa fa-search"></i></b-button>
					</b-input-group-append>
				</b-input-group>
			</div>
		</div>
	</section>
</template>

<script>
import { bus } from '../app.js'

export default {
	data () {
		return {
			search: ''
		}
	},
	methods: {
		searchCategory () {
			bus.$emit('search', this.search);
		}
	}
}
</script>

<style lang="scss" scoped>
	#header {
		margin-top: 10rem;

		.title {
			font-weight: 900;
			font-size: 2rem;
		}

		.description {
			font-weight: 600;
		}
	}
</style>
