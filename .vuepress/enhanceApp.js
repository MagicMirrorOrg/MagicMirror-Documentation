export default ({ router }) => {
    router.addRoutes([
        { path: '/development/introduction.html', redirect: '/module-development/introduction.html' },
        { path: '/development/core-module-file.html', redirect: '/module-development/core-module-file.html' },
        { path: '/development/node-helper.html', redirect: '/module-development/node-helper.html' },
        { path: '/development/helper-methods.html', redirect: '/module-development/helper-methods.html' },
        { path: '/development/logger.html', redirect: '/module-development/logger.html' },
        { path: '/development/notifications.html', redirect: '/module-development/notifications.html' },
        { path: '/development/weather-provider.html', redirect: '/module-development/weather-provider.html' },
        { path: '/development/documentation.html', redirect: '/module-development/documentation.html' }
    ])
}
