<template>
	<div id="app" :class="{ prod : isProd }">
		<router-view/>
	</div>
</template>

<script>
export default {
	name: "App",
	computed: {
		isProd() {
			return (process.env.NODE_ENV === "production");
		}
	},
	mounted: function() {
		this.$core.App = this;
		this.$nextTick(this.init);
	},
	methods: {
		init: function() {

		}
	}
}
</script>

<style lang="scss">
@import './core/_globals.scss';

*:not(input):not(textarea) {
	outline: none !important;
}
*,
*:before,
*:after {
	box-sizing: border-box;
}

</style>
