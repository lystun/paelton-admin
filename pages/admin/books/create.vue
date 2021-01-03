<template>
    <div class="container">
        <h1 class="h3 mb-5 text-gray-800">Create Book</h1>

        <div class="row">
            <div class="col-md-8 mx-auto">
                <form @submit.prevent="submit" class="book__for">
                    <div class="row">
                        <div class="col-md-10 mb-4">
                            <div class="form-group">
                                <label class="form-control-label">Book Title</label>
                                <input class="form-control form-control-lg" :class="{'is-invalid': errors.status }" v-model="form.title" type="text" placeholder="Book Title" required>
                                <div class="invalid-feedback" v-if="errors"> {{ errors.message }} </div>
                            </div>
                        </div>
                        <div class="col-md-10 mb-4">
                            <div class="form-group">
                                <label class="form-control-label">Book Author</label>
                                <input class="form-control form-control-lg" v-model="form.author" type="text" placeholder="Book Author" required>
                            </div>
                        </div>

                        <div class="col-md-10 mb-4">
                            <div class="form-group">
                                <label class="form-control-label">Upload Book Cover</label>
                                <input class="form-control form-control-lg"  type="file" id="file" ref="image" 
                                    @change="uploadImage" :class="{'is-invalid': imageErr }"  required >
                                <div class="invalid-feedback">{{ this.imageErr }} </div>
                            </div>
                        </div>

                        <div class="col-md-10 mb-4">
                            <div class="form-group">
                                <label class="form-control-label">Upload Book File</label>
                                <input class="form-control form-control-lg"  type="file" id="file" ref="book" 
                                    @change="uploadBook" :class="{'is-invalid': bookErr }" required  >
                                <div class="invalid-feedback">{{ this.bookErr }} </div>
                            </div>
                        </div>


                        <div class="col-md-10 mb-4">
                            <label for="description">Book Description</label>
                            <div class="quill-editor" 
                                :content="form.description"
                                v-quill:myQuillEditor="editorOption"
                                @change="onEditorChange($event)" >
                            </div>
                        </div>

                        <div class="col-md-10 my-5">
                            <button type="submit" class="btn btn-primary my-3" >
                                <span class="fas fa-spinner fa-spin mr-2" v-if="loading"></span>
                                Create Book
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
        layout: 'dashboard',

        head() {
            return {
                title: this.title,
            }
        },

        data(){
            return {
                title : 'Create Book | Pa Elton - Patriach of Faith',
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
                    description: '',
                    author: '',
                    image: '',
                    book: '',
                },

                imageErr: null,
                bookErr: null,

                bookStatus: true,
                imageStatus: true,
            }
        },

        methods: {
            onEditorChange({ editor, html, text }) {
                this.form.description = html
            },

            async submit(){
                this.loading = true;

                try {
                    
                    let formData = new FormData()
                    formData.append('title', this.form.title)
                    formData.append('description', this.form.description)
                    formData.append('author', this.form.author)
                    formData.append('image', this.form.image)
                    formData.append('book', this.form.book)

                    await this.$axios.$post('/books', formData)
                    this.loading = false;

                    this.$toast.success("Book created successfully", {
                        icon : 'check'
                    });

                    this.$router.push('/admin/books')

                } catch (err) {
                    this.loading = false;
                }
            },

            uploadImage(e){
                const photo = this.$refs.image.files[0];
                this.imageStatus = true
                this.imageErr = ''

                if(photo.type.startsWith('image')){
                    this.form.image = photo
                    this.imageStatus = false
                }else {
                    this.imageErr = "File Must be of an Image format (PNG, JPG, JPEG)"
                }
            },

            uploadBook(e){
                const book = this.$refs.book.files[0];
                this.bookStatus = true
                this.bookErr = ''

                if(book.type.startsWith('application/pdf')){
                    this.form.book = book;
                    this.bookStatus = false
                }else {
                    this.bookErr = "File Must be of an PDF format"
                }
            }
        }
        
    }
</script>

<style lang="scss" scoped>
    .book  {
        
        &__form {
            .btn {
                color: $white;
                background: $secondary;
            }

            .quill-editor {
                min-height: 200px;
                max-height: 300px;
                overflow-y: auto;
            }
        }
    }
</style>