const vscode = require('vscode');

module.exports = class PreviewPanel{
    constructor(){
        let fileName = vscode.window.activeTextEditor.document.fileName.split('/');
        let viewName = 'Preview ' + fileName[fileName.length - 1];
        let column = vscode.window.activeTextEditor.viewColumn + 1;
        this.view = vscode.window.createWebviewPanel(
            'CSLPreview',
            viewName,
            column,
            {}
        )
        this.view.onDidChangeViewState(({webviewPanel}) => {
            vscode.commands.executeCommand('setContext', 'CSLPreviewActive', webviewPanel.active);
        })
        vscode.commands.executeCommand('setContext', 'CSLPreviewActive', true);
    }
    updateContentHtml(htmlSource){
        this.view.webview.html = htmlSource;
    }
    get html(){
        return this.view.webview.html;
    }
    set html(content){
        this.view.webview.html = content;
    }
}