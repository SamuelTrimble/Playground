<template>
	<div data-view="Home">
		<h1>Users</h1>
		<div class="float left">
			<UserList :users="userData" @user_selected="userSelected" />
			<button id="newUserBtn">Create New User</button>
		</div>
		<div class="float right">
			<UserEdit :user="activeUserData" />
		</div>
	</div>
</template>

<script>
import UserList from '@/components/UserList'
import UserEdit from '@/components/UserEdit'

export default {
	name: 'Home',
	components: {
		UserList,
		UserEdit
	},
	computed: {
		activeUserData() {
			if (this.activeUser === -1) {
				return null;
			} else {
				return this.userData[this.activeUser];
			}
		}
	},
	data() {
		return {
			userData: [
				{
					id: 0,
					name: "Test Person",
					profileImage: ""
				},
				{
					id: 1,
					name: "Another Person",
					profileImage: ""
				},
				{
					id: 2,
					name: "One More",
					profileImage: ""
				}
			],
			activeUser: -1
		}
	},
	mounted: function() {
		this.$core.CurView = this;
		this.$nextTick(this.init);
	},
	methods: {
		init: function() {

		},
		userSelected: function(idx) {
			this.activeUser = idx;
		}
	}
}
</script>

<style lang="scss">
@import './../core/_globals.scss';

#view[data-view="Home"] {
	margin: 80px auto;
	padding: 0 80px;
	max-width: 1280px;

	.float {
		float: left;
		width: 45%;

		&.left {
			margin-right: 5%;
		}
	}

	&:after {
		display: block;
		clear: both;
	}
}

</style>
