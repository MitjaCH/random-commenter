const vscode = require('vscode');

const comments = [
	"TODO: Ask the rubber duck",
	"Remember to delete this line",
	"What does this even do?",
	"Is this even working?",
	"Temporary fix, pleasea ignore",
	"This is totally working (it's not)",
	"TODO: Refactor this mess",
	"FIXME: Need to handle edge cases",
	"TODO: Finish this co-",
	"TODO: Add meaningful comment here",
	"CREDITS: Made by MitjaCH :)",
]

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {


	let disposable = vscode.commands.registerCommand('random-commenter.addRandomComment', function () {
		addRandomComment();
	})


	context.subscriptions.push(disposable);

	setInterval(() => {
		addRandomComment();
	}, 30000);
}


	function addRandomComment() {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			return;
		}

		const document = editor.document;
		const languageId = document.languageId;
		const randomLine = Math.floor(Math.random() * document.lineCount);
		const randomComment = comments[Math.floor(Math.random() * comments.length)];

		let commentSyntax;
		switch(languageId) {
			case 'javascript':
			case 'typescript':
			case 'java':
			case 'c':
			case 'cpp':
			case 'csharp':
			case 'php':
				commentSyntax = '// ';
				break;
			case 'python':
			case 'perl':
			case 'ruby':
				commentSyntax = '# ';
				break;
			case 'html':
			case 'xml':
				commentSyntax = '<!-- ';
				break;
			default:
				commentSyntax = '// ';
				break;
		}

		const fullComment = commentSyntax + randomComment;
		if (commentSyntax === '<!-- ') {
			commentSyntax += '--> ';
		}

		editor.edit(editBuilder => {
			editBuilder.insert(new vscode.Position(randomLine, 0), fullComment + '\n');
		});
	}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}