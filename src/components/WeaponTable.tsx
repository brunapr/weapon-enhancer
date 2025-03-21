import { useEffect } from "react";
import WeaponCard from "./WeaponCard";
import WeaponCommands from "./WeaponCommands";
import { useWeaponStore } from "../stores/weapon.store";

export default function WeaponTable() {
  const { getStorageWeapon, setWeapon } = useWeaponStore()

  useEffect(() => {
    const weapon = getStorageWeapon()
    setWeapon(weapon)
  }, [])

  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="flex space-y-4 md:space-y-0 md:space-x-6 flex-col md:flex-row">
        <WeaponCard />
        <WeaponCommands />
      </div>
    </div>
  );
}