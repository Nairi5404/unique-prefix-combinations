export class CombinationUtils {

    static createItemNames(items) {

        const result = [];
        let currentCharCode = 65;
        for (const count of items) {
            const prefix = String.fromCharCode(currentCharCode++);
            for (let i = 1; i <= count; i++) {
                result.push(`${prefix}${i}`);
            }
        }
        return result;
    }

    static createCombination(items, length) {
        
        const result = [];
        const itemNames = this.createItemNames(items);
        
        const backtracking = (start, combination) => {

            if (combination.length === length) {
                result.push([...combination]);
                return;
            }

            for (let i = start; i < itemNames.length; i++) {
                const current = itemNames[i];
                const currentPrefix = current[0];

                if (combination.some(item => item[0] === currentPrefix)) {
                    continue;
                }
                combination.push(current);
                backtracking(i + 1, combination);
                combination.pop();
            }
        }
        backtracking(0, []);

        return result;
    }
}