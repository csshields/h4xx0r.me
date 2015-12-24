<template lang="jade">

.edit-view
	h1 Edit Hacker Stuff

	.row(v-if='!auth')
		.col.s12
			button.btn.waves-effect.waves-light(v-on:click='doLogin') Login
	.row(v-else)
		.col.s12
			h5 UID: {{auth.uid}}
		.col.s6
			h2 Prefixes
			form(v-on:submit.prevent="addPrefix")
				input(type='text' v-model="newPrefix" placeholder='New Prefix')
			ul.collection
				li.collection-item(v-for="p in prefixes") 
					| {{p}}
					a.secondary-content(href="#!" v-on:click.prevent="removePrefix($key)")
						i.material-icons delete
		.col.s6
			h2 Suffixes
			form(v-on:submit.prevent="addSuffix")
				input(type='text' v-model="newSuffix" placeholder='New Suffix')
			ul.collection
				li.collection-item(v-for="s in suffixes") 
					| {{s}}
					a.secondary-content(href="#!" v-on:click.prevent="removeSuffix($key)")
						i.material-icons delete

</template>

<script>

import Firebase from 'firebase'
import { Promise } from 'es6-promise'

var api = new Firebase('https://h4xx0r.firebaseio.com/');

function getPrefixes() {
	return new Promise((resolve, reject) => {
		api.child('prefixes').on('value', s => resolve(s.val()));
	});
}
function getSuffixes() {
	return new Promise((resolve, reject) => {
		api.child('suffixes').on('value', s => resolve(s.val()));
	});
}

export default {
	data: function () {

		var result = { 
			prefixes: [], 
			suffixes: [],
			newPrefix: '',
			auth: api.getAuth()
		};

		api.child('suffixes').on('value', s => {
			result.suffixes = s.val();
		});

		api.child('prefixes').on('value', s => {
			result.prefixes = s.val();
		});

		return result;
	},
	methods: {
		addPrefix: function () {
			api.child('prefixes').push(this.newPrefix);
			this.newPrefix = '';
		},
		addSuffix: function () {
			api.child('suffixes').push(this.newSuffix);
			this.newSuffix = '';
		},
		removePrefix: function (key) {
			api.child('prefixes').child(key).remove();
		},
		removeSuffix: function (key) {
			api.child('suffixes').child(key).remove();
		},
		doLogin: function () {
			api.authWithOAuthPopup("github", (error, auth) => {
				if (error) console.log("Login Failed!", error);
				else this.auth = api.getAuth();
			});
		}
	}
}
</script>