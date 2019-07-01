<template>
	<div data-view="Home">
		<div class="float left">
			<h1>User List</h1>
			<UserList :users="userData" @user_selected="userSelected" />
			<button id="newUserBtn" @click="CreateUser">Create New User</button>
		</div>
		<div class="float right">
			<h1 v-if="activeUserData !== null">User Detail</h1>
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
		userData() {
			return (this.$store.state.userData);
		},
		activeUser() {
			return (this.$store.state.activeUser);
		},
		activeUserData() {
			if (this.activeUser === -1) {
				return null;
			} else {
				return this.userData[this.activeUser];
			}
		}
	},
	mounted: function() {
		this.$core.CurView = this;
		this.$nextTick(this.init);
	},
	methods: {
		init: async function() {
			this.$store.commit('update', {
				property: 'userData',
				data: await this.$core.GetUserData()
			});
		},
		userSelected: function(idx) {
			this.$store.commit('update', {
				property: 'activeUser',
				data: idx
			});
		},
		CreateUser: async function() {
			let newUser = {
				id: -1,
				name: "",
				profileImage: ""
			};
			
			let result = await this.$core.SaveUser(newUser);
			if (result) {
				this.$store.commit('update', {
					property: 'userData',
					data: await this.$core.GetUserData()
				});
				this.$store.commit('update', {
					property: 'activeUser',
					data: (this.userData.length - 1)
				});
				await this.$core.Wait(100);
				document.getElementById('userName').focus();
			}
		}
	}
}
</script>

<style lang="scss">
@import './../core/_globals';

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
