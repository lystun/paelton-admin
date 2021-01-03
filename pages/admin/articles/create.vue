<template>
    <div class="container">
        <h1 class="h3 mb-5 text-gray-800">Create Article</h1>

        <div class="row">
            <div class="col-md-8 mx-auto">
                <form @submit.prevent="submit">
                    <div class="form-row">
                        <div class="col-md-10 mb-5">
                            <label for="title">Article Title</label>
                            <input type="text" v-model="form.title" class="form-control form-control-lg" :class="{'is-invalid': errors.status }" id="title" placeholder="Article Title" required>
                            <div class="invalid-feedback" v-if="errors"> {{ errors.message }} </div>
                        </div>

                        <div class="col-md-10 mb-5">
                            <label for="author">Article Author</label>
                            <input type="text" v-model="form.author" class="form-control form-control-lg" id="author" placeholder="Article Author" required>
                        </div>

                        <div class="col-md-10 mb-4">
                            <div class="form-group">
                                <label class="form-control-label">Upload Article Image</label>
                                <input class="form-control form-control-lg"  type="file" id="file" ref="image" 
                                    @change="uploadImage" :class="{'is-invalid': imageErr }"  required >
                                <div class="invalid-feedback">{{ this.imageErr }} </div>
                            </div>
                        </div>
                        
                        <div class="col-md-10 mb-5">
                            <label for="content">Article Content</label>
                            <div class="quill-editor" 
                                :content="form.content"
                                @change="onEditorChange($event)"
                                v-quill:myQuillEditor="editorOption">
                            </div>
                        </div>

                        <div class="col-10 my-5">
                            <button type="submit" class="btn btn-primary" :disabled="status">
                                <span class="fas fa-spinner fa-spin mr-2" v-if="loading"></span>
                                Create Article
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
                title : 'Create Article | Pa Elton - Patriach of Faith',

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
                    content: '',
                    author: '',
                    image: '',
                },

                imageErr: null,
                status: true,
            }
        },

        methods: {
            onEditorChange({ editor, html, text }) {
                this.form.content = html
            },
           
            async submit(){
                this.loading = true;

                try {
                    
                    let formData = new FormData()
                    formData.append('title', this.form.title)
                    formData.append('content', this.form.content)
                    formData.append('author', this.form.author)
                    formData.append('image', this.form.image)
                    
                    await this.$axios.$post('/articles', formData)
                    this.loading = false;

                    this.$toast.success("Article created successfully", {
                        icon : 'check'
                    });

                    this.$router.push('/admin/articles')

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