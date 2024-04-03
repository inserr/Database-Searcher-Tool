const fs = require('fs');
const readline = require('readline');

// Fonction pour afficher le dessin ASCII avec un dégradé de couleurs
function afficherASCII() {
    console.log("\x1b[35m%s\x1b[0m", `          c,_.--.,y`);
    console.log("\x1b[34m%s\x1b[0m", `            7 a.a(`);
    console.log("\x1b[34m%s\x1b[0m", `           (   ,_Y)`);
    console.log("\x1b[34m%s\x1b[0m", `           :  '---;`);
    console.log("\x1b[34m%s\x1b[0m", `       ___.'\\.  - (`);
    console.log("\x1b[34m%s\x1b[0m", `     .'"""S,._'--'_2..,_`);
    console.log("\x1b[34m%s\x1b[0m", `     |    ':::::=:::::  \\`);
    console.log("\x1b[34m%s\x1b[0m", `     .     f== ;-,---.' T`);
    console.log("\x1b[34m%s\x1b[0m", `      Y.   r,-,_/_      |`);
    console.log("\x1b[34m%s\x1b[0m", `      |:\\___.---' '---./`);
    console.log("\x1b[34m%s\x1b[0m", `      |'              )`);
    console.log("\x1b[34m%s\x1b[0m", `       \\             ,`);
    console.log("\x1b[34m%s\x1b[0m", `       ':;,.________.;L`);
    console.log("\x1b[34m%s\x1b[0m", `       /  '---------' |`);
    console.log("\x1b[34m%s\x1b[0m", `       |              \\`);
    console.log("\x1b[34m%s\x1b[0m", `       L---'-,--.-'--,-'`);
    console.log("\x1b[34m%s\x1b[0m", `        T    /   \\   Y`);
    console.log("\x1b[34m%s\x1b[0m", `        |   Y    ,   |`);
    console.log("\x1b[34m%s\x1b[0m", `        |   \\    (   |`);
    console.log("\x1b[34m%s\x1b[0m", `        (   )     \\,_L`);
    console.log("\x1b[34m%s\x1b[0m", `        7-./      )  `);
    console.log("\x1b[31m%s\x1b[0m", `       /  _(      '._  \\`);
    console.log("\x1b[35m%s\x1b[0m", `       Made by insert.r on discord`);
}

// Fonction pour rechercher l'ID Discord dans le fichier database.txt
function rechercherIDDiscord(idDiscord) {
    const rl = readline.createInterface({
        input: fs.createReadStream('database.txt'),
        crlfDelay: Infinity
    });

    let found = false;

    rl.on('line', (line) => {
        const data = line.split(',');
        if (data[0] === idDiscord) {
            console.log('\x1b[32mInformations pour l\'ID Discord ' + idDiscord + ' :\x1b[0m');
            for (let i = 1; i < data.length; i++) {
                console.log('\x1b[32mInformation ' + i + ': ' + data[i] + '\x1b[0m');
            }
            found = true;
        }
    });

    rl.on('close', () => {
        if (!found) {
            console.log('\x1b[31mNon trouvé\x1b[0m');
        }
        rechercherAutreIDDiscord();
    });
}

// Fonction pour demander à l'utilisateur s'il veut rechercher une autre ID Discord
function rechercherAutreIDDiscord() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question("\x1b[31mVoulez-vous rechercher quelqu'un dans les databases ? (Oui/Non) \x1b[0m", (reponse) => {
        reponse = reponse.trim().toLowerCase(); // Supprimer les espaces et mettre en minuscules
        if (reponse === 'oui') {
            rl.question('\x1b[34m(+) Entrez l\'ID Discord à rechercher : \x1b[0m', (idDiscord) => {
                rl.close(); // Fermer le readline avant de passer à la fonction suivante pour éviter les duplications
                rechercherIDDiscord(idDiscord);
            });
        } else if (reponse === 'non') {
            console.log('Fermeture du programme.');
            rl.close();
        } else {
            console.log('Réponse invalide. Veuillez répondre par "Oui" ou "Non".');
            rl.close(); // Fermer le readline pour éviter des comportements inattendus
            rechercherAutreIDDiscord(); // Redemander la question si la réponse n'est pas valide
        }
    });
}

// Appeler la fonction pour afficher le dessin ASCII avec un dégradé de couleurs
afficherASCII();

// Appeler la fonction pour la première fois
rechercherAutreIDDiscord();
