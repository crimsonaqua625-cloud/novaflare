const pullRates = {
    '5_star': 0.006, // 0.6%
    '4_star': 0.051, // 5.1%
    '3_star': 0.943, // 94.3%
};

const items = {
    '5_star': ['Item 5A', 'Item 5B'],
    '4_star': ['Item 4A', 'Item 4B'],
    '3_star': ['Item 3A', 'Item 3B'],
};

function getRandomItem(rarity) {
    const rarityItems = items[rarity];
    const randomIndex = Math.floor(Math.random() * rarityItems.length);
    return rarityItems[randomIndex];
}

exports.performPull = (userPity) => {
    // This is a simplified example. A full implementation would need to handle different banners and pity systems.
    const rand = Math.random();

    if (userPity.limited5 >= 80) {
        return { rarity: '5_star', item: getRandomItem('5_star') };
    } else if (userPity.limited4 >= 10) {
        return { rarity: '4_star', item: getRandomItem('4_star') };
    } else if (rand < pullRates['5_star']) {
        return { rarity: '5_star', item: getRandomItem('5_star') };
    } else if (rand < pullRates['5_star'] + pullRates['4_star']) {
        return { rarity: '4_star', item: getRandomItem('4_star') };
    } else {
        return { rarity: '3_star', item: getRandomItem('3_star') };
    }
};