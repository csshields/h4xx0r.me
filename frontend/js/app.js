import Vue from 'vue'
import Router from 'vue-router'
import App from './components/App.vue'
import GenerateView from './components/GenerateView.vue'
import EditView from './components/EditView.vue'

Vue.use(Router)

var router = new Router()

router.map({
	'': { component: GenerateView },
	'edit': { component: EditView }
})

router.beforeEach(() => { 
	// console.log('BEFORE'); 
})

router.start(App, '#app')