<template>
	<div id="userList">
		<div class="userList-item" v-for="(item, idx) in users" :key="idx" v-bind:data-id="item.id" @click="selectItem(idx)" :class="{ active : (idx == curItemIdx) }">{{ item.name }}</div>
	</div>
</template>

<script>
export default {
	name: "UserList",
	props: {
		users: {
			type: Array,
			default: () => { return []; }
		}
	},
	data() {
		return {
			curItemIdx: -1
		}
	},
	methods: {
		selectItem: function(newIdx) {
			this.curItemIdx = newIdx;
			this.$emit('user_selected', newIdx);
		}
	}
}
</script>

<style lang="scss">
@import '../core/_globals';

#userList {
	width: 100%;
	height: 600px;

	border: 1px solid $black;
	overflow-x: hidden;
	overflow-y: auto;

	.userList-item {
		padding: 20px;
		height: 60px;

		cursor: pointer;

		font-family: Helvetica, sans-serif;
		font-size: 1.2rem;
		line-height: 20px;

		&:hover {
			background-color: rgba($grey, 0.5);
		}
		&.active {
			background-color: $grey;
		}
	}
}
</style>
