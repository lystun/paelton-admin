<template>
    <div class="auth">
        <div class="container auth__form">
            <div class="row">
                <div class="col-md-5 mx-auto">
                    <h2 class="mb-5 text-center text-white">Login into your Account</h2>

                    <form @submit.prevent="submit">
                        <div class="form-row">
                            <div class="col-md-12 mb-4">
                                <input type="email" v-model.trim="form.email" class="form-control form-control-lg" :class="{'is-invalid': errors.status }" id="email" placeholder="Email address" required autofocus>
                                <div class="invalid-feedback" v-if="errors"> {{ errors.message }} </div>
                            </div>
                        
                            <div class="col-md-12 mb-5">
                                <input type="password" v-model="form.password" class="form-control form-control-lg" id="password" placeholder="Password" required>
                            </div>

                            <div class="col-12 mb-5">
                                <button type="submit" class="btn btn-lg w-100 submit shadow">
                                    <span class="fas fa-spinner fa-spin mr-2" v-if="loading"></span>
                                    Login
                                </button>
                            </div>
                        </div>
                    </form>

                </div>
            </div>
        </div>
	</div>
</template>

<script>
	export default {
        layout : 'auth',
        middleware: ['guest'],

        data(){
            return {
                title : 'Login | Pa Elton - Patriach of Faith',
                form : {
                    email: '',
                    password: '',
                },
                loading: false
            }
        },

        head() {
            return {
                title: this.title,
            }
        },

        methods: {
            async submit(){
                this.loading = true
                
                try {

                    let res = await this.$auth.loginWith('local', { data: this.form });
                    this.loading = false
                    
                    // this.$auth.setUser(res.data.data.user);

                    this.$toast.success('Successfully logged in', {
                        icon : 'check',
                    })
                    
                    this.$router.push({ 
                        path: this.$route.query.redirect ||  '/admin/dashboard'
                    });

                } catch (err) {
                    this.loading = false
                    console.log(err);
                }
            }
        }
	}
</script>

<style lang="scss" scoped>
	.auth {
        background: linear-gradient(98.43deg, #0053AC 2.35%, #00438A 63.65%);
        height: 100vh;
        display: flex;
        align-items: center;

        &__form {
            .form-control {
                background: transparent;
                border: 1px solid #fff;
                color: #fff;

                &::placeholder{
                    color: #fff;
                    font-size: 1rem;
                }
            }

            .submit {
                background: #fff;
                color: $primary;

                &:hover {
                    background: $primary;
                    color: #fff;
                }
            }
        }
    }

    @media (max-width: 575.98px) {  }

    @media (min-width: 576px) and (max-width: 767.98px) {  }

    @media (min-width: 768px) and (max-width: 991.98px) {  }

    @media (min-width: 992px) and (max-width: 1199.98px) {  }

    @media (min-width: 1200px) {  }

</style>