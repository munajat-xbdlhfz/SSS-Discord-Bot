// GENSHIN IMPACT CONSTANTS

// CHARACTER RARITY
const characters5Star = ['Diluc', 'Klee', 'Hu Tao', 'Keqing', 'Jean', 'Venti', 'Xiao', 'Tartaglia', 'Mona', 'Qiqi', 'Ganyu', 'Kamisato Ayaka', 'Zhongli', 'Albedo'];
const characters4Star = ['Fischl', 'Beidou', 'Lisa', 'Razor', 'Amber', 'Xiangling', 'Bennett', 'Xinyan', 'Xingqiu', 'Barbara', 'Diona', 'Chongyun', 'Kaeya', 'Rosaria', 'Ningguang', 'Noelle', 'Sucrose']

// ALL TYPE OFF 4 STAR WEAPONS
const sword4Star = ['Favonius Sword', `Lion's Roar`, 'Sacrificial Sword', 'Sword of Descension', 'The Alley Flash', 'The Flute'];
const polearm4Star = [`Dragon's Bane`, 'Favonius Lance', 'Lithic Spear'];
const claymore4Star = ['Favonius Greatsword', 'Rainslasher', 'Sacrificial Greatsword', 'The Bell', 'Lithic Blade'];
const catalyst4Star = ['Eye of Perception', 'Favonius Codex', 'Sacrificial Fragments', 'The Widsith'];
const bows4Star = ['Favonius Warbow', 'Rust', 'Sacrificial Bow', 'The Stringless'];

// WEAPON RARITY
const weapons5Star = [
    'Aquila Favonia', 'Skyward Blade', 'Summit Shaper',
    'Primordial Jade Winged Spear', 'Skyward Spine', 'Vortex Vanquisher',
    'Skyward Pride', 'The Unforged', `Wolf's Gravestone`,
    'Lost Prayer to the Sacred Winds', 'Memory of Dust', 'Skyward Atlas',
    `Amos' Bow`, 'Skyward Harp', ' Primordial Jade Cutter', 'Staff of Homa'
]
const weapons4Star = [...bows4Star, ...catalyst4Star, ...claymore4Star, ...polearm4Star, ...sword4Star];
const weapons3Star = [
    'Skyrider Sword', 'Harbringer of Dawn', 'Cool Steel', 'Fillet Blade', 'Dark Iron Sword', 
    'Black Tessel', 'Halberd', 
    'Bloodtainted Greatsword', 'Debate Club', 'Ferrous Shadow', 'Skyrider Greatsword', 'White Iron Greatsword', 
    'Amber Catalyst', 'Emerald Orb', 'Magic Guide', 'Otherworldly Story', 'Thrilling Tales of Dragon Slayers', 'Twin Nephrite', 
    'Ebony Bow', 'Messenger', 'Raven Bow', 'Recurve Bow', `Sharpshooter's Oath`, 'Slingshot'
]

// ALL CHARACTERS AND WEAPONS
const weapons = [...weapons3Star, ...weapons4Star, ...weapons5Star]
const characters = [...characters5Star, ...characters4Star]

// GACHA BANNER
const generalBanner5Star = [...characters5Star, ...weapons5Star]
const generalBanner4Star = [...characters4Star, ...weapons4Star]
const generalBanner4StarCharacters = [...characters4Star]
const generalBanner4StarWeapons = [...weapons4Star]

module.exports = {
    characters5Star,
    characters4Star,
    bows4Star,
    catalyst4Star,
    claymore4Star,
    polearm4Star,
    sword4Star,
    weapons5Star,
    weapons4Star,
    weapons3Star,
    weapons,
    characters,
    generalBanner5Star,
    generalBanner4Star,
    generalBanner4StarCharacters,
    generalBanner4StarWeapons,
}