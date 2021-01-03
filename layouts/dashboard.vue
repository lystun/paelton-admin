<template>
    <div class="body" id="page-top">
        <div id="wrapper">
            <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">
                <!-- Sidebar - Brand -->
                <nuxt-link id="brand" to="/student/dashboard" class="sidebar-brand d-flex align-items-center justify-content-center">
                    <div class="sidebar-brand-text mx-3">Pa Elton</div>
                </nuxt-link>

                <hr class="sidebar-divider my-0">

                <!-- Nav Item - Dashboard -->
                <li class="nav-item">
                    <nuxt-link to="/admin/dashboard" class="nav-link" active-class="active"> 
                        <i class="fas fa-fw fa-tachometer-alt"></i> <span>Dashboard</span>
                    </nuxt-link>
                </li>

                <hr class="sidebar-divider">
              
                <li class="nav-item">
                    <nuxt-link to="/admin/articles" class="nav-link" active-class="active">
                        <i class="fas fa-fw fa-book-reader"></i> <span>Articles</span>
                    </nuxt-link>
                </li>

                <li class="nav-item">
                    <nuxt-link to="/admin/books" class="nav-link" active-class="active"> 
                        <i class="fas fa-fw fa-book"></i> <span>Books</span>
                    </nuxt-link>
                </li>

                <li class="nav-item">
                    <nuxt-link to="/admin/audios" class="nav-link" active-class="active"> 
                        <i class="fas fa-fw fa-music"></i> <span>Audios</span>
                    </nuxt-link>
                </li>

                <li class="nav-item">
                    <nuxt-link to="/admin/testimonials" class="nav-link" active-class="active"> 
                        <i class="fas fa-fw fa-certificate"></i> <span>Testimonials</span>
                    </nuxt-link>
                </li>

                <hr class="sidebar-divider d-none d-md-block">
            </ul>

            <div id="content-wrapper" class="d-flex flex-column wrapper">
                <div id="content">
                    <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                        <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
                            <i class="fa fa-bars"></i>
                        </button>

                        <ul class="navbar-nav ml-auto">
                            <div class="topbar-divider d-none d-sm-block"></div>

                            <li class="nav-item dropdown no-arrow">
                                <a class="nav-link dropdown-toggle" href="#" @click="logout()" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <span class="mr-2 d-none d-lg-inline text-gray-600 small">Logout</span>
                                    <span class="fas fa-sign-out-alt"></span>
                                    <!-- <img class="img-profile rounded-circle" src="~assets/images/avatars/1.png"> -->
                                </a>
                            </li>

                        </ul>
                    </nav>

                    <div class="page-content">
                        <Nuxt />
                    </div>
                </div>

                <footer class="sticky-footer">
                    <div class="container my-auto">
                        <div class="copyright text-center my-auto">
                            <span>Copyright &copy; Pa Elton {{ year }} </span>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
        <a class="scroll-to-top rounded" href="#page-top">
            <i class="fas fa-angle-up"></i>
        </a>

    </div>
</template>

<script>
    
    export default {

        middleware: ['admin'],

        head () {
            return {
                title: 'Dashboard | Patriach of Faith',
                script : [
                    { src : '/js/jquery.js' },
                    { src : '/js/sb-admin.js'},
                ]
            }
        },

        data(){
            return {
                year : null
            }
        },

        created(){
            this.year = new Date().getFullYear()
        },

        methods : {
            logout(){
                this.$auth.logout()

                this.$router.push({name: 'index'})

                this.$toast.success('Successfully logged out', {
                    icon : 'check',
                    duration: 5000,
                })
            }
        }
    }

    
</script>

<style lang="scss">

    @import '~assets/css/sb-admin.css';

    #content-wrapper {
        // background: $gray;
    }

    .wrapper {
        // background-color: $gray!important;
    }

    .sidebar {
        background: $primary;

        .nav-item {

            .collapse .collapse-inner {

                .collapse-item.active {
                    color : $primary;
                }
            }   

            .nav-link {
                &.active {
                    color: #fff;
                    font-weight: 700;

                    i {
                        color: #fff;
                    }
                }
            }
        }
    }

    .btn-primary {
        background-color: $primary;
        border: 1px solid $primary;
    }

    .input-group > .form-control {
        box-shadow: none;
        border: none;
        background: rgba(gray, .1);

        &:hover {
            border: none;
        }

    }

    .btn-link {
        color: $primary;

        &:hover {
            color: $primary;
        }
    }

    .topbar .dropdown-list .dropdown-header {
        background-color: $primary;
        border: 1px solid $primary;
    }



   
</style>