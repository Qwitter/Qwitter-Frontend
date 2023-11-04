export function generateUsernames(email: string, n: number = 5): string[] {
    const emailWithoutNumbers: string = email.replace(/[0-9]/g, '').split('@')[0];
    const names: string[] = emailWithoutNumbers.split(/[_\\.]|(?=[A-Z])/);
    const usernames: Set<string> = new Set();

    function generatePermutations(str: string, maxChanges: number = 3): string[] {
        const permutations: Set<string> = new Set([str]);

        for (let i = 0; i < str.length; i++) {
            for (let j = i + 1; j < str.length; j++) {
                if (j - i <= Math.floor(Math.random() *maxChanges)) {
                    const chars: string[] = str.split('');
                    [chars[i], chars[j]] = [chars[j], chars[i]]; // Swap characters
                    permutations.add(chars.join(''));
                }
            }
        }

        return Array.from(permutations);
    }

    function generateRandomString(length: number): string {
        const charset: string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        let randomString: string = "";
        for (let i = 0; i < length; i++) {
            const randomIndex: number = Math.floor(Math.random() * charset.length);
            randomString += charset[randomIndex];
        }
        return randomString;
    }

    for (const name of names) {
        let cleanName: string = name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();

        while (cleanName.length < (5 + Math.floor(Math.random() * 5))) {
            cleanName += generateRandomString(1);
        }

        if (cleanName.length > 1) {
            const namePermutations: string[] = generatePermutations(cleanName, 2); // Limit changes to 2 characters
            namePermutations.forEach((e) => usernames.add(e));
        }

        for (let i = 0; i <= 9; i++) {
            usernames.add(cleanName + Math.floor(Math.random() * 100 * i).toString());
        }

        usernames.add(cleanName);
    }

    let combinedName: string = names.join('').replace(/[^a-zA-Z0-9]/g, '').toLowerCase();

    while (combinedName.length < (9 + Math.floor(Math.random() * 5))) {
        combinedName += generateRandomString(1);
    }

    if (combinedName.length > 1) {
        const combinedPermutations: string[] = generatePermutations(combinedName, 2); // Limit changes to 2 characters
        combinedPermutations.forEach((e) => usernames.add(e));
    }

    for (let i = 0; i <= 9; i++) {
        usernames.add(combinedName + Math.floor(Math.random() * 1000).toString());
    }

    usernames.add(combinedName);

    const uniqueUsernames: string[] = Array.from(usernames);

    const randomizedUsernames: string[] = [];
    while (randomizedUsernames.length < n && uniqueUsernames.length > 0) {
        const randomIndex: number = Math.floor(Math.random() * uniqueUsernames.length);
        randomizedUsernames.push(uniqueUsernames.splice(randomIndex, 1)[0]);
    }

    return randomizedUsernames;
}
