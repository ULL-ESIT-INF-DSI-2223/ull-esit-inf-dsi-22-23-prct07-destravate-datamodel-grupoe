import inquirer from 'inquirer';

const collection: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
function displayTodoList(): void {
    console.log("My Todo List");
    collection.forEach((item, index) => {
        console.log(`${index + 1}. ${item}`);
    });
}
enum Commands {
    Quit = "Quit"
}
function promptUser(): void {
    console.clear();
    displayTodoList();
    inquirer.prompt({
            type: "list",
            name: "command",
            message: "Choose option",
            choices: Object.values(Commands)
    }).then(answers => {
        if (answers["command"] !== Commands.Quit) {
            promptUser();
        }
    })
}
promptUser();