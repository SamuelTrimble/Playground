<template>
	<div class="view" data-view="Home">
		
	</div>
</template>

<script>
export default {
	name: 'Home',
	mounted: function() {
		this.$core.CurView = this;
		this.$nextTick(this.init);
	},
	methods: {
		init: function() {

		}
	}
}
</script>

<style lang="scss">
@import './../core/_globals.scss';

</style>
