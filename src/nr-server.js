import RED from 'node-red'
import http from 'http'
import express from 'express'
import path from 'path'

async function loadConfig () {
    // Load the server configuration
    try {
        const { default: config } = await import('file://' + path.join(process.env.PROJECT_ROOT, 'config', 'server.js'))
        return config
    } catch (error) {
        console.log(error)
        console.error('No server configuration found.')
    }
}

export async function start (bridge) {
    let settings = {
        // Default settings
        httpAdminRoot: '/',
        httpNodeRoot: '/api',
        userDir: process.env.PROJECT_ROOT,
        flowFile: path.join(process.env.PROJECT_ROOT, 'src', 'flow.json'),
        flowFilePretty: true,
        functionGlobalContext: {},
        editorTheme: {
            projects: {
                enabled: false
            },
            page: {
                title: 'Draggable Testcase'
            }
        }
    }
    const config = await loadConfig()
    settings = { ...settings, ...config }
    settings.functionGlobalContext = { bridge }

    // Initialize express.js
    const expressApp = express()
    const server = http.createServer(expressApp)

    // Start the editor frontend only if we are running in dev mode
    if (process.argv.includes('dev') || process.env.dev === 'true') {
        process.env.dev = 'true'
        settings.disableEditor = false
    } else {
        settings.disableEditor = true
    }

    // Initialize Node-RED
    RED.init(server, settings)
    expressApp.use(settings.httpAdminRoot, RED.httpAdmin)
    expressApp.use(settings.httpNodeRoot, RED.httpNode)

    // Start Node-RED
    return new Promise((resolve, reject) => {
        const host = 'localhost'
        const port = 1880
        server.listen({ port, host }, () => {
            RED.start().then(() => {
                resolve({
                    RED,
                    host,
                    port: server.address().port,
                    globalContext: settings.functionGlobalContext
                })
            }).catch((error) => {
                reject(error)
            })
        })
    })
}