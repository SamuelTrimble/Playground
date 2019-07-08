<template>
	<div id="userEdit">
		<div id="userData" v-if="user !== null" v-bind:data-id="user.id">
			<input id="userName" v-bind:value="user.name">
			<div id="userImage" v-bind:style="{ backgroundImage: 'url(' + user.profileImage + ')' }">
				<div id="dropTarget" v-if="user.profileImage == ''">drag &amp; drop image here</div>
				<input id="fileField" type="file">
			</div>
			<button id="deleteUser" @click="DeleteUser">Delete User</button>
			<button id="saveUser" @click="SaveUser">Save User</button>
		</div>
	</div>
</template>

<script>
export default {
	name: "UserEdit",
	props: {
		user: {
			type: Object,
			default: () => { return null; }
		}
	},
	methods: {
		SaveUser: async function() {
			let updatedUser = {
				id: document.getElementById('userData').getAttribute('data-id'),
				name: document.getElementById('userName').value,
				profileImage: document.getElementById('userImage').style.backgroundImage
			};
			
			let result = await this.$core.SaveUser(updatedUser);
			if (result) {
				this.$store.commit('update', {
					property: 'userData',
					data: await this.$core.GetUserData()
				});
				this.$store.commit('update', {
					property: 'activeUser',
					data: -1
				});
			}
		},
		DeleteUser: async function() {
			let id = document.getElementById('userData').getAttribute('data-id');

			let result = await this.$core.DeleteUser(id);
			if (result) {
				this.$store.commit('update', {
					property: 'userData',
					data: await this.$core.GetUserData()
				});
				this.$store.commit('update', {
					property: 'activeUser',
					data: -1
				});
			}
		}
	}
}
</script>

<style lang="scss">
@import './../core/_globals';

#userName {
	display: block;
	margin-bottom: 40px;
	width: 100%;

	font-size: 2em;
}
#userImage {
	display: flex;
	position: relative;
	width: 200px;
	height: 200px;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	background-position: center center;
	background-repeat: no-repeat;
	background-size: contain;
	border: 2px dashed $black;
	border-radius: 50%;

	> #fileField {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0;

		cursor: pointer;

		border-radius: 50%;
	}
}
</style>
