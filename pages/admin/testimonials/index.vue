<template>
    <div class="container">
        <h1 class="h3 mb-4 text-gray-800">Testimonials</h1>

        <div class="row">
            <div class="col-md-12">
                <div class="mb-5">
                    <nuxt-link to="/admin/testimonials/create" class="btn btn-primary">
                        Upload a Testimonial
                    </nuxt-link>
                </div>

                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Image</th>
                                <th scope="col">Name</th>
                                <th scope="col">Title</th>
                                <th scope="col">Created On</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(testimonial, index) in testimonials" :key="index">
                                <th class="align-middle">{{ index+1 }}</th>
                                <td class="align-middle"><img src="~/assets/images/avatars/1.png" alt="" width="50px"> </td>
                                <td class="align-middle"> {{ testimonial.name }} </td>
                                <td class="align-middle"> {{ testimonial.title }} </td>
                                <td class="align-middle"> {{ testimonial.createdAt | formatDate }} </td>
                                <td class="align-middle">
                                    <nuxt-link to="#" class="btn btn-primary">Edit</nuxt-link>
                                    <button @click="deleteTestimonial(testimonial._id)" class="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
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
                title : 'Testimonials | Pa Elton - Patriach of Faith',
                testimonials: {}
            }
        },

        head() {
            return {
                title: this.title,
                
            }
        },

        filters:{
            uppercase(value) {
                if (!value) return ''
                value = value.toString()
                return value.toUpperCase()
            },

            formatDate(value){
                return new Date(value).toDateString()
            },
        },

        async asyncData({ $axios }){
            const testimonialsInfo = await $axios.get('/testimonials')


            return {
                testimonials: testimonialsInfo.data.data.data,
            }
        },

        methods : {
            deleteTestimonial(id){
                this.$swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, delete it!'

                }).then((result) => {

                    if (result.value) {

                        this.$axios.$delete(`/testimonials/${id}`)
                        this.$toast.success("testimonial deleted successfully", {
                            icon: "check"
                        })

                        location.reload()
                    }
                })
            },
        }
	}
</script>

<style lang="scss" scoped>
	.container {
        padding: 1rem;

        a {
            color: $white;
        }
    }

    @media (max-width: 575.98px) {  }

    @media (min-width: 576px) and (max-width: 767.98px) {  }

    @media (min-width: 768px) and (max-width: 991.98px) {  }

    @media (min-width: 992px) and (max-width: 1199.98px) {  }

    @media (min-width: 1200px) {  }

</style>