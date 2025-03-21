import { create } from 'zustand'
import { Stats } from '../config/weapon'

export type WeaponEvent = "failure" | "success" | "break" | ""

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
  event: WeaponEvent
  dispatchEvent: (event: WeaponEvent) => void
  getStorageWeapon: () => Weapon
  reset: () => void
}

export const defaultWeaponDurability = 4

const defaultWeapon = {
  level: 0,
  name: "Spearpoint of Baelle",
  type: "Trident",
  baseAttack: 901,
  magicAttack: -90,
  dex: 43,
  durability: defaultWeaponDurability,
  passive: "",
}

export const useWeaponStore = create<WeaponState>()((set) => ({
  weapon: undefined,
  event: "",
  setWeapon: (weapon) => {
    set({ weapon })
    localStorage.setItem("weapon", JSON.stringify(weapon))
  },
  dispatchEvent: (event: WeaponEvent) => {
    set({ event })
    setTimeout(() => {
      set({ event: "" })
    }, 1000)
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