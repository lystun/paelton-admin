<template>
    <div class="container">
        <h1 class="h3 mb-4 text-gray-800">Home Page</h1>

        <div class="row">
            <div class="col-md-12"></div>
        </div>
	</div>
</template>

<script>
	export default {
        layout : 'dashboard',

        data(){
            return {
                title : 'Home | Pa Elton - Patriach of Faith',
            }
        },

        head() {
            return {
                title: this.title,
                
            }
        },

        methods : {
            
        }
	}
</script>

<style lang="scss" scoped>
	.container {
        padding: 1rem;
    }

    @media (max-width: 575.98px) {  }

    @media (min-width: 576px) and (max-width: 767.98px) {  }

    @media (min-width: 768px) and (max-width: 991.98px) {  }

    @media (min-width: 992px) and (max-width: 1199.98px) {  }

    @media (min-width: 1200px) {  }

</style>