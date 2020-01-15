const stdin = process.openStdin();

stdin.addListener("data", (d) => {
    process.stdout.write(d.toString().trim().split('').reverse().join(''))
});