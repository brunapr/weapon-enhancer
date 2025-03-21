import { Weapon, useWeaponStore } from "../stores/weapon.store";
import { Stats, controls, elementals, getRandomStats, passives, successlevel, tryEnhance } from "../config/weapon";
import { useEffect, useState } from "react";

export default function WeaponCommands() {
  const { setWeapon, weapon, reset } = useWeaponStore()
  const [totalLuck, setTotalLuck] = useState(1)
  const [disabled, setDisabled] = useState(false)

  const triggerEvent = () => {
    setDisabled(true)
    setTimeout(() => {
      setDisabled(false)
    }, 1000);
  };

  function setStats(newWeapon: Partial<Weapon>) {
    if (!weapon) return
    if (!newWeapon.attributes) newWeapon.attributes = {};

    if (weapon.level == 5) {
      const stats = getRandomStats(elementals) as Stats
      newWeapon.attributes["0"] = stats
      newWeapon.attributes["0"].value = 56
    }

    if (weapon.level == 10) {
      const stats = getRandomStats(controls) as Stats
      newWeapon.attributes["1"] = stats
      newWeapon.attributes["1"].value = 12
    }

    if (weapon.level >= 11 && weapon.attributes) {
      const firstKey = Object.keys(weapon.attributes)[0]
      const firstStat = weapon.attributes[firstKey]
      if (firstStat.value) firstStat.value += 12
      const secondKey = Object.keys(weapon.attributes)[1]
      const secondStat = weapon.attributes[secondKey]
      if (secondStat.value) secondStat.value += 6
    }
  }

  function enhanceWeapon() {
    if (!weapon) return null

    const isSuccess = tryEnhance(weapon.level)

    if (!isSuccess) {
      const newDurability = weapon.durability - 1
      setWeapon({ ...weapon, durability: newDurability })
      triggerEvent()
      return
    }

    triggerEvent()
    const rate = successlevel(weapon.level) / 100;
    const luck = (totalLuck * rate).toFixed(4);
    setTotalLuck(parseFloat(luck));

    let newWeapon: Partial<Weapon> = {
      level: weapon.level + 1,
      baseAttack: weapon.baseAttack + 11,
      magicAttack: weapon.magicAttack + 6,
      dex: weapon.dex + 3,
      attributes: weapon.attributes
    }

    setStats(newWeapon)

    if (weapon.level == 15) {
      const newPassive = getRandomStats(passives) as string
      newWeapon["passive"] = newPassive
    }

    setWeapon({ ...weapon, ...newWeapon })
  }

  useEffect(() => {
    if (weapon && weapon?.level == 0) setTotalLuck(1)
  }, [weapon?.level])

  return (
    <div className="flex flex-col space-y-10 w-fit items-center">
      <div className="w-[300px] md:w-[220px] p-4 size-fit bg-orange-200 pixelify flex flex-col justify-center items-center">
        <div className="w-full flex justify-between items-center">
          <span>Total luck</span>
          <span>{(totalLuck * 100).toPrecision(4)}%</span>
        </div>
        <div className="w-full flex justify-between items-center mt-2">
          <span>Next enhance</span>
          <span>{successlevel(weapon ? weapon.level + 1 : 100).toPrecision(4)}%</span>
        </div>
        <div className="flex w-full justify-between mt-10">
          <button
            onClick={() => reset()}
            disabled={disabled}
            className={`${disabled ? "!pointer-events-none !bg-[#cea487]" : ""} transition py-2 px-3 bg-red-300 hover:bg-red-300/50 cursor-pointer`}>
            Reset
          </button>
          <button
            onClick={() => enhanceWeapon()}
            disabled={disabled}
            className={`${disabled ? "!pointer-events-none !bg-[#cea487]" : ""} transition py-2 px-3 bg-orange-300 hover:bg-orange-300/50 cursor-pointer`}
          >Enhance
          </button>
        </div>
      </div>
    </div>
  );
}