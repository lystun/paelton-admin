<template>
    <div class="container">
        <h1 class="h3 mb-4 text-gray-800">Audios</h1>

        <div class="row">
            <div class="col-md-12">
                <div class="mb-5">
                    <nuxt-link to="/admin/audios/create" class="btn btn-primary">
                        Upload an Audio
                    </nuxt-link>
                </div>

                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Image</th>
                                <th scope="col">Title</th>
                                <th scope="col">Created On</th>
                                <th scope="col">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(audio, index) in audios" :key="index">
                                <th class="align-middle">{{ index+1 }}</th>
                                <td class="align-middle"><img src="~/assets/images/avatars/1.png" alt="" width="50px"> </td>
                                <td class="align-middle"> {{ audio.title }} </td>
                                <td class="align-middle"> {{ audio.createdAt | formatDate }} </td>
                                <td class="align-middle">
                                    <nuxt-link to="#" class="btn btn-primary">Edit</nuxt-link>
                                    <button @click="deleteAudio(audio._id)" class="btn btn-danger">Delete</button>
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
                title : 'Audios | Pa Elton - Patriach of Faith',
                audios: {}
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
            const audiosInfo = await $axios.get('/audios')


            return {
                audios: audiosInfo.data.data.data,
            }
        },

        methods : {
            deleteAudio(id){
                this.$swal.fire({
                    title: 'Are you sure?',
                    text: "You won't be able to revert this!",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Yes, delete it!'

                }).then((result) => {

                    if (result.value) {

                        this.$axios.$delete(`/audios/${id}`)
                        this.$toast.success("Audio deleted successfully", {
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