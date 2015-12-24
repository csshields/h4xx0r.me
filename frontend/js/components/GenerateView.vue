<template lang="jade">

.generate-view
	h1 Generate Hacker Alias
	.row
		.col.s6
			button.btn.waves-effect.waves-light(v-on:click='generate') Generate
				i.material-icons.right loop
		.col.s6
			p {{name}}

</template>

<script>

import Firebase from 'firebase'
import { Promise } from 'es6-promise'

var api = new Firebase('https://h4xx0r.firebaseio.com/');

function getPrefixes() {
	return new Promise((resolve, reject) => {
		api.child('prefixes').once('value', s => resolve(s.val()));
	});
}
function getSuffixes() {
	return new Promise((resolve, reject) => {
		api.child('suffixes').once('value', s => resolve(s.val()));
	});
}

export default {
	name: 'Generate Component',
	data: function () {
		return { name: '' };
	},
	route: {
		data: function ({ to }) {

			this.generate();
			
		}
	},
	methods: {
		generate: function () {
			return Promise.all([getPrefixes(), getSuffixes()])
			.then(([prefixes, suffixes]) => {
				var skeys = Object.keys(suffixes);
				var pkeys = Object.keys(prefixes);
				var randSuffKey = skeys[Math.floor(Math.random() * skeys.length)];
				var randPreKey = pkeys[Math.floor(Math.random() * pkeys.length)];

				this.name = [ prefixes[randPreKey], suffixes[randSuffKey] ].join(' ');
			});
		}
	}
}
</script>