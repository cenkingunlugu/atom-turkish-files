'use babel';

import { CompositeDisposable } from 'atom';

const Deasciifier = require("turkish-deasciifier");
const deascii = new Deasciifier();

const AtomTurkishFiles = {
  subscriptions: null,
  activate (state) {
    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(
      atom.commands.add('atom-workspace', {
        'atom-turkish-files:convert': this.convert,
        'atom-turkish-files:convertSelection': this.convertSelection
      })
    );
  },

  deactivate () {
    this.subscriptions.dispose();
  },

  convert () {
    let editor = atom.workspace.getActiveTextEditor();

    if (editor) {
      let text = editor.getText();
      editor.setText(deascii.deasciify(text));
    }
  },

  convertSelection () {
    let editor = atom.workspace.getActiveTextEditor();

    if (editor) {
      let text = editor.getSelectedText();
      editor.insertText(deascii.deasciify(text))
    }
  }
};

export default AtomTurkishFiles;
