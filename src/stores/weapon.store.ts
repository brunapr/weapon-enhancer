import { create } from 'zustand'
import { Stats } from '../config/weapon'

export interface Weapon {
  level: number
  name: string
  type: string
  baseAttack: number
  magicAttack: number
  dex: number
  durability: number
  passive: string
  attributes?: {
    [key: string]: Stats;
  };
}

interface WeaponState {
  weapon: Weapon | undefined
  setWeapon: (weapon: Weapon | undefined) => void
  getStorageWeapon: () => Weapon
  reset: () => void
}

const defaultWeapon = {
  level: 0,
  name: "Spearpoint of Baelle",
  type: "Trident",
  baseAttack: 901,
  magicAttack: -90,
  dex: 43,
  durability: 4,
  passive: "",
}

export const useWeaponStore = create<WeaponState>()((set) => ({
  weapon: undefined,
  setWeapon: (weapon) => {
    set({ weapon })
    localStorage.setItem("weapon", JSON.stringify(weapon))
  },
  getStorageWeapon: () => {
    const weapon = localStorage.getItem("weapon")
    if (!weapon) localStorage.setItem("weapon", JSON.stringify(defaultWeapon))
    return weapon ? JSON.parse(weapon) : defaultWeapon
  },
  reset: () => {
    localStorage.setItem("weapon", JSON.stringify(defaultWeapon))
    set({ weapon: defaultWeapon })
  },
}))