import { start } from './nr-server.js'
import { fileURLToPath } from 'url'
import path from 'path'
import { app, BrowserWindow } from 'electron'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load the environment configuration
process.env.PROJECT_ROOT = path.join(__dirname, '..')

function createDevWindow (url) {
    const win = new BrowserWindow({
        width: 1920,
        height: 1080
    })
    win.loadURL(url)
}

app.whenReady().then(() => {
    app.setAppUserModelId('Draggable Testcase')

    const bridge = {
        openWindow () {
            // Prepare testcase window
            const windowUrl = 'http://localhost:1881/'
            const windowOptions = {
                width: 1920,
                height: 1080,
                backgroundColor: '#262626',
                titleBarStyle: 'hidden',
                titleBarOverlay: {
                    symbolColor: 'white',
                    color: 'rgba(0,0,0,0)',
                    height: 47
                },
                show: false
            }
            const window = new BrowserWindow(windowOptions)
            window.removeMenu()
            window.loadURL(windowUrl)
            window.once('ready-to-show', () => {
                // Show window
                window.show()
                window.webContents.openDevTools()
            })
        }
    }

    // Start Node-RED
    start(bridge).then((runtime) => {
        // Open NR window
        const url = 'http://localhost:' + runtime.port
        createDevWindow(url)
    })
})