export interface Stats {
  code: string
  type: string
  color: string
  value?: number
}

export const passives = [
  "You deal 40% more damage against burning enemies",
  "You have 15% chance to freeze an enemy with any attack",
  "Critical hits deal 50% more damage against stunned enemies",
  "Your attacks have a 20% chance to apply poison",
  "Your attacks ignore 30% of the target's armor",
  "Your first attack after remaining still for 2 seconds deals double damage",
  "Killing an enemy grants you 5% movement speed for 5 seconds (stacks up to 3 times)",
  "Each kill increases your attack speed by 5% for 10 seconds (stacks up to 3 times)",
  "You have a 25% chance to cause an explosion on kill",
  "Hitting the same enemy 3 times in a row applies bleed",
]

export const elementals: Stats[] = [
  { code: "fire", type: "Fire Damage", color: "#f54a00" },
  { code: "cold", type: "Cold Damage", color: "#007595" },
  { code: "lightning", type: "Lightning Damage", color: "#d08700" },
  { code: "physical", type: "Physical Damage", color: "#314158" },
  { code: "poison", type: "Poison Damage", color: "#005f5a" },
]

export const controls: Stats[] = [
  { code: "burn", type: "Burn", color: "#f54a00" },
  { code: "poison", type: "Poison", color: "#005f5a" },
  { code: "bleed", type: "Bleed", color: "#82181a" }
]

export const getRandomStats = (list: object[] | string[]) => {
  return list[Math.floor(Math.random() * list.length)];
}

export const successlevel = (n: number) => {
  if (n <= 1) return 100
  if (n >= 1 && n <= 15) return 100 - (n - 1) * 5;
  return 20;
}

export const tryEnhance = (n: number) => {
  const rate = successlevel(n)
  return Math.random() * 100 < rate
}
