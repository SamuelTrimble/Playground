<template>
	<div id="app" :class="{ prod : isProd }">
		<router-view id="view" />
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

html,
body {
	position: relative;
	margin: 0;
	padding: 0;
	width: 100%;
	height: 100%;

	color: $black;
	@include font-regular();
	font-size: 100%;

	background: $white;
}

</style>
