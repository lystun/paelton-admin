<template>
    <div class="container">
        <h1 class="h3 mb-5 text-gray-800">Create Audio</h1>

        <div class="row">
            <div class="col-md-8 mx-auto">
                <form @submit.prevent="submit">
                    <div class="form-row">
                        <div class="col-md-10 mb-5">
                            <label for="title">Audio Title</label>
                            <input type="text" v-model="form.title" class="form-control form-control-lg" :class="{'is-invalid': errors.status }" id="title" placeholder="Audio Title" required>
                            <div class="invalid-feedback" v-if="errors"> {{ errors.message }} </div>
                        </div>

                        <div class="col-md-10 mb-4">
                            <div class="form-group">
                                <label class="form-control-label">Upload Audio File</label>
                                <input class="form-control form-control-lg"  type="file" id="file" ref="audio" 
                                    @change="uploadAudio" :class="{'is-invalid': audioErr }"  required >
                                <div class="invalid-feedback">{{ this.audioErr }} </div>
                            </div>
                        </div>
                        
                        <div class="col-md-10 mb-5">
                            <label for="description">Audio Description</label>
                            <div class="quill-editor" 
                                :content="form.description"
                                @change="onEditorChange($event)"
                                v-quill:myQuillEditor="editorOption">
                            </div>
                        </div>

                        <div class="col-10 my-5">
                            <button type="submit" class="btn btn-primary" :disabled="status">
                                <span class="fas fa-spinner fa-spin mr-2" v-if="loading"></span>
                                Create Audio
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
                title : 'Create Audio | Pa Elton - Patriach of Faith',

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
                    audio: '',
                },

                audioErr: null,
                status: true,
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
                    formData.append('audio', this.form.audio)
                    
                    await this.$axios.$post('/audios', formData)
                    this.loading = false;

                    this.$toast.success("Audio created successfully", {
                        icon : 'check'
                    });

                    this.$router.push('/admin/audios')

                } catch (err) {
                    this.loading = false;
                }
            },

            uploadAudio(e){
                const audio = this.$refs.audio.files[0];
                this.status = true
                this.audioErr = ''

                if(audio.type.startsWith('audio')){
                    this.form.audio = audio
                    this.status = false
                }else {
                    this.audioErr = "File Must be of an audio format (MP3, MP4, AAC)"
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