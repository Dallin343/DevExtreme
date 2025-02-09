/* eslint-env node */
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    mode: 'production',
    optimization: {
        // eslint-disable-next-line spellcheck/spell-checker
        minimizer: [new TerserPlugin({
            extractComments: false,
        })],
    },
    output: {
        sourcePrefix: '    ',
        devtoolModuleFilenameTemplate: 'devextreme:///[resource-path]',
        devtoolFallbackModuleFilenameTemplate: 'devextreme:///[resource-path]?[hash]'
    },
    externals: {
        // Optional (calling through window to skip error on script load)
        'jquery': 'window.jQuery',
        'jszip': 'window.JSZip',
        'knockout': 'window.ko',
        'globalize': 'window.Globalize',
        'globalize/number': 'window.Globalize',
        'globalize/currency': 'window.Globalize',
        'globalize/date': 'window.Globalize',
        'globalize/message': 'window.Globalize',
        'devextreme-quill': 'window.DevExpress.Quill',
        'exceljs': 'window.ExcelJS',
        'jspdf': 'window.jspdf.jsPDF',
        'devexpress-diagram': 'window.DevExpress.diagram',
        'devexpress-gantt': 'window.DevExpress.Gantt',
        'luxon': 'window.luxon'
    },
    resolve: {
        alias: {
            // '@devextreme/vdom': require.resolve('@devextreme/vdom/dist/cjs/index.js'),
            '@devextreme/runtime/common': require.resolve('@devextreme/runtime/cjs/common/index.js'),
            '@devextreme/runtime/inferno': require.resolve('@devextreme/runtime/cjs/inferno/index.js'),
            '@devextreme/runtime/declarations': require.resolve('@devextreme/runtime/cjs/declarations/index.js'),
            '@devextreme/runtime/angular': require.resolve('@devextreme/runtime/cjs/angular/index.js'),
            '@devextreme/runtime/vue': require.resolve('@devextreme/runtime/cjs/vue/index.js'),
            '@devextreme/runtime/react': require.resolve('@devextreme/runtime/cjs/react/index.js')
        }
    },
};
