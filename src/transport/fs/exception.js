function exception_(error) {
    Fs.appendFileSync(
        Path.resolve(_directory, 'logger-exceptions.txt'),
        message_format([error])
    );
}