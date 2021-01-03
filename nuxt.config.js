export default {
    // Global page headers (https://go.nuxtjs.dev/config-head)
    head: {
        title: 'Pa Elton',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            { rel: 'stylesheet', href: "https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300;0,400;0,500;0,700;0,900;1,400&display=swap" },
            { rel: 'stylesheet', href: 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css' },
            // { rel: 'stylesheet', href: 'https://unpkg.com/aos@2.3.1/dist/aos.css' },
        ],
        
        script : [
            { src: "https://kit.fontawesome.com/24b54c8fdd.js", type: 'text/javascript' },
            { src: "https://code.jquery.com/jquery-3.3.1.slim.min.js", },
            { src: "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js", },
            { src: "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js", },
            
            // { src: "https://unpkg.com/aos@2.3.1/dist/aos.js" },
        ]
    },

    // Global CSS (https://go.nuxtjs.dev/config-css)
    css: [
        '@/assets/css/styles.css',
    ],

    loading: {
        color: '#0053AC',
        height: '2px',
    },

    pageTransition: 'page',

    router: {
        middleware: [
            'clearValidationErrors',
        ]
    },

    // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
    plugins: [
        { src: '~/plugins/aos.js', mode: 'client' },
        { src: "~plugins/vue-quill-editor.js", ssr: false },
        { src: '~/plugins/axios.js' },
        { src: '~/plugins/mixins/user.js' },
        { src: '~/plugins/mixins/validation.js' },
    ],

    // Auto import components (https://go.nuxtjs.dev/config-components)
    components: true,

    // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
    buildModules: [
    ],
    
    // Modules (https://go.nuxtjs.dev/config-modules)
    modules: [
        '@nuxtjs/auth',
        '@nuxtjs/axios',
        '@nuxtjs/pwa',
        '@nuxtjs/style-resources',
        '@nuxtjs/toast',
        [ 
            'nuxt-sweetalert2', 
            {
                confirmButtonColor : '#0053AC',
                cancelButtonColor : '#273344',
            }
        ],
    ],

    // Axios module configuration (https://go.nuxtjs.dev/config-axios)
    axios: {
        baseURL : "https://paelton-api.herokuapp.com/api/v1/",
        // baseURL : "http://127.0.0.1:8080/api/v1/",
    },

    auth: {
        strategies: {
            local: {
                endpoints: {
                    login: { url: '/users/login', method: 'post', propertyName: 'token' },
                    // logout: { url: '/users/logout', method: 'post' },
                    user: { url: '/users/me', method: 'get', propertyName: 'data' },
                },
            }
        },
        
        redirect: false
    },

    // Build Configuration (https://go.nuxtjs.dev/config-build)
    build: {
    },

    styleResources: {
        scss: [
            '~assets/scss/*.scss',
            '~assets/scss/components/*.scss',
        ],
    },

    toast: {
        duration: '10000',
        iconPack: 'fontawesome'
    }
  
}
  