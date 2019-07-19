<template>
	<div id="userEdit">
		<div id="userData" v-if="user !== null" v-bind:data-id="user.id">
			<input id="userName" v-bind:value="user.name">
			<div id="userImage" @click="ClickFileField" v-bind:style="{ backgroundImage: 'url(' + user.profileImage + ')' }" v-bind:data-img="user.profileImage">
				<div id="dropTarget" v-bind:class="{ hide : user.profileImage !== '' }">drag &amp; drop image here</div>
				<input id="fileField" type="file" accept="image/*" @change="UploadNewImage">
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
		ClickFileField: function() {
			document.getElementById('fileField').click();
		},
		UploadNewImage: async function() {
			let fileField = document.getElementById('fileField');

			if (fileField.files[0]) {
				let formData = new FormData();
				formData.append('profileImage', document.getElementById('fileField').files[0]);

				let result = await this.$core.UploadUserImage(formData);
				if (result.isSuccess) {
					this.user.profileImage = result.url;
				} else {
					this.user.profileImage = "";
				}
			} else {
				this.user.profileImage = "";
			}
		},
		SaveUser: async function() {
			let updatedUser = {
				id: document.getElementById('userData').getAttribute('data-id'),
				name: document.getElementById('userName').value,
				profileImage: document.getElementById('userImage').getAttribute('data-img')
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

	cursor: pointer;

	background-position: center center;
	background-repeat: no-repeat;
	background-size: contain;
	border: 2px dashed $black;
	border-radius: 50%;

	> #dropTarget {
		&.hide {
			opacity: 0;
		}
	}
	> #fileField {
		display: none;
	}
}
</style>
