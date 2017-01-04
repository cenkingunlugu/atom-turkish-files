'use babel';

import { CompositeDisposable } from 'atom';

const Deasciifier = require("deasciifier");
const deascii = new Deasciifier();

const AtomTurkishFiles = {
  subscriptions: null,
  activate (state) {
    this.subscriptions = new CompositeDisposable();

    this.subscriptions.add(
      atom.commands.add('atom-workspace', {
        'atom-turkish-files:convert': this.convert
      })
    );
  },

  deactivate () {
    this.subscriptions.dispose();
  },

  convert () {
    let editor = atom.workspace.getActiveTextEditor();

    if (editor) {
      var text = editor.getText();
      editor.setText(deascii.deasciify(text));
    }
  }
};

export default AtomTurkishFiles;
