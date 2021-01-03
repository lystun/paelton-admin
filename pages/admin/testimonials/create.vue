<template>
    <div class="container">
        <h1 class="h3 mb-5 text-gray-800">Create Testimonial</h1>

        <div class="row">
            <div class="col-md-8 mx-auto">
                <form @submit.prevent="submit">
                    <div class="form-row">
                        <div class="col-md-10 mb-5">
                            <label for="title">Testifier's Title</label>
                            <input type="text" v-model="form.title" class="form-control form-control-lg" :class="{'is-invalid': errors.status }" id="title" required>
                            <div class="invalid-feedback" v-if="errors"> {{ errors.message }} </div>
                        </div>

                        <div class="col-md-10 mb-5">
                            <label for="author">Testifier's Name</label>
                            <input type="text" v-model="form.name" class="form-control form-control-lg" id="author" required>
                        </div>

                        <div class="col-md-10 mb-4">
                            <div class="form-group">
                                <label class="form-control-label">Upload Testifier Image (Headshot)</label>
                                <input class="form-control form-control-lg"  type="file" id="file" ref="image" 
                                    @change="uploadImage" :class="{'is-invalid': imageErr }"  required >
                                <div class="invalid-feedback">{{ this.imageErr }} </div>
                            </div>
                        </div>
                        
                        <div class="col-md-10 mb-5">
                            <label for="content">Testimony</label>
                            <div class="quill-editor" 
                                :content="form.testimony"
                                @change="onEditorChange($event)"
                                v-quill:myQuillEditor="editorOption" required>
                            </div>
                        </div>

                        <div class="col-10 my-5">
                            <button type="submit" class="btn btn-primary" :disabled="status">
                                <span class="fas fa-spinner fa-spin mr-2" v-if="loading"></span>
                                Create Testimonial
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
	</div>
</template>

<script>
	export default {
        layout : 'dashboard',

        head() {
            return {
                title: this.title,
            }
        },

        data(){
            return {
                title : 'Create Testimonial | Pa Elton - Patriach of Faith',

                loading: false,

                editorOption: {
                    modules: {
                        toolbar: [
                            ['bold', 'italic', 'underline', 'strike'],
                            ['blockquote', 'code-block']
                        ]
                    }
                },

                form : {
                    title: '',
                    testimony: '',
                    name: '',
                    image: '',
                },

                imageErr: null,
                status: true,
            }
        },

        methods: {
            onEditorChange({ editor, html, text }) {
                this.form.testimony = html
            },
           
            async submit(){
                this.loading = true;

                try {
                    
                    let formData = new FormData()

                    formData.append('title', this.form.title)
                    formData.append('testimony', this.form.testimony)
                    formData.append('name', this.form.name)
                    formData.append('image', this.form.image)
                    
                    await this.$axios.$post('/testimonials', formData)
                    this.loading = false;

                    this.$toast.success("Testimonial created successfully", {
                        icon : 'check'
                    });

                    this.$router.push('/admin/testimonials')

                } catch (err) {
                    this.loading = false;
                }
            },

            uploadImage(e){
                const photo = this.$refs.image.files[0];
                this.status = true
                this.imageErr = ''

                if(photo.type.startsWith('image')){
                    this.form.image = photo
                    this.status = false
                }else {
                    this.imageErr = "File Must be of an Image format (PNG, JPG, JPEG)"
                }
            },


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