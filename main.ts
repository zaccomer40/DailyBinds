async openNextDateNote() {

    const file = this.app.workspace.getActiveFile();

    if (!file) return;

    const regex = /\d{4}-\d{2}-\d{2}/;

    const match = file.basename.match(regex);

    if (!match) {
        new Notice("No date found.");
        return;
    }

    const date = new Date(match[0]);
    date.setDate(date.getDate() + 1);

    const next =
        date.getFullYear() + "-" +
        String(date.getMonth() + 1).padStart(2,"0") + "-" +
        String(date.getDate()).padStart(2,"0");

    const newName = file.basename.replace(match[0], next);

    const target = this.app.vault
        .getMarkdownFiles()
        .find(f => f.basename === newName);

    if (!target) {
        new Notice("Next date note doesn't exist.");
        return;
    }

    await this.app.workspace.getLeaf().openFile(target);
}
