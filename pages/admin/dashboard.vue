<template>
    <div class="container">
        <h1 class="h3 mb-4 text-gray-800">Dashboard</h1>

        <div class="row">
            <div class="col-xl-3 col-md-6 mb-4">
                <div class="card border-left-primary shadow h-100 py-2">
                    <div class="card-body">
                        <div class="row no-gutters align-items-center">
                            <div class="col mr-2">
                                <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">Articles</div>
                                <div class="h5 mb-0 font-weight-bold text-gray-800">{{ articles }}</div>
                            </div>
                            <div class="col-auto">
                                <i class="fas fa-book-reader fa-2x text-gray-300"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 col-md-6 mb-4">
                <div class="card border-left-info shadow h-100 py-2">
                    <div class="card-body">
                        <div class="row no-gutters align-items-center">
                            <div class="col mr-2">
                                <div class="text-xs font-weight-bold text-info text-uppercase mb-1">Books</div>
                                <div class="h5 mb-0 font-weight-bold text-gray-800">{{ books }}</div>
                            </div>
                            <div class="col-auto">
                                <i class="fas fa-book-reader fa-2x text-gray-300"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 col-md-6 mb-4">
                <div class="card border-left-success shadow h-100 py-2">
                    <div class="card-body">
                        <div class="row no-gutters align-items-center">
                            <div class="col mr-2">
                                <div class="text-xs font-weight-bold text-success text-uppercase mb-1">audios</div>
                                <div class="h5 mb-0 font-weight-bold text-gray-800">{{ audios }}</div>
                            </div>
                            <div class="col-auto">
                                <i class="fas fa-book-reader fa-2x text-gray-300"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-xl-3 col-md-6 mb-4">
                <div class="card border-left-danger shadow h-100 py-2">
                    <div class="card-body">
                        <div class="row no-gutters align-items-center">
                            <div class="col mr-2">
                                <div class="text-xs font-weight-bold text-danger text-uppercase mb-1">Testimonials</div>
                                <div class="h5 mb-0 font-weight-bold text-gray-800">{{ testimonials }}</div>
                            </div>
                            <div class="col-auto">
                                <i class="fas fa-book-reader fa-2x text-gray-300"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
	</div>
</template>

<script>


	export default {
        layout : 'dashboard',

        data(){
            return {
                title : 'Pa Elton- Admin Dashboard',

                books: 0,
                articles: 0,
                audios: 0,
                testimonials: 0,
            }
        },

        head() {
            return {
                title: this.title,
            }
        },

        async asyncData({ $axios }){
            const articlesInfo = await $axios.get('/articles')
            const booksInfo = await $axios.get('/books')
            const audiosInfo = await $axios.get('/audios')
            const testimonialsInfo = await $axios.get('/testimonials')

            return {
                articles: articlesInfo.data.results,
                books: booksInfo.data.results,
                audios: audiosInfo.data.results,
                testimonials: testimonialsInfo.data.results,
            }
        },

        methods: {
            
        }


	}
</script>

<style lang="scss" scoped>

	.container {
        padding: 1rem;
    }

</style>