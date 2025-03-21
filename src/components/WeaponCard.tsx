import { useEffect, useState } from "react";
import { defaultWeaponDurability, useWeaponStore } from "../stores/weapon.store";

type Event = "failure" | "success" | "break"

const EnhanceEvent = ({ outcome }: { outcome: Event }) => {
  const bgColors: Record<Event, string> & { default: string } = {
    success: "bg-fuchsia-600",
    failure: "bg-slate-600",
    break: "bg-red-600",
    default: "bg-black"
  };

  const bgColor = bgColors[outcome] ?? bgColors.default;

  return (
    <div className="z-10 absolute top-0 left-0 w-full h-full">
      <EventText outcome={outcome} />
      <div className={`${bgColor} opacity-0 pulse w-full h-full`} />
    </div>
  )
}

const EventText = ({ outcome }: { outcome: Event }) => {
  console.log(outcome)
  type TextOutcome = { color: string, text: string }
  const outcomes: Record<Event, TextOutcome> & { default: TextOutcome } = {
    success: { color: "text-green-800", text: "Success!" },
    failure: { color: "text-red-800", text: "Failure!" },
    break: { color: "text-slate-600", text: "Break!" },
    default: { color: "text-black", text: "" },
  };

  const { color, text } = outcomes[outcome] ?? outcomes.default;

  return (
    <span className={`${color} absolute left-0 top-[-40px] pixelify w-full text-center text-2xl slide-in`}>
      {text}
    </span>
  );
}

function StatItem({
  title,
  value,
  color,
  className,
}: {
  title: string,
  value: number,
  color?: string,
  className?: string
}) {
  return (
    <div style={{ color }} className={`${className} flex justify-between items-center w-full text-lg`}>
      <h2>{title}</h2>
      <div className="flex space-x-2 items-center">
        <span className={`
        ${value < 0 ? "rotate-90" : "rotate-270"}
        ${value == 0 ? "hidden" : ""} text-sm`}>▶</span>
        <span>{Math.abs(value)}</span>
      </div>
    </div>
  );
}

export default function WeaponCard() {
  const { weapon, reset } = useWeaponStore()
  const [event, setEvent] = useState<Event | undefined>()

  useEffect(() => {
    if (weapon && weapon.level > 0) triggerEvent("success")
  }, [weapon?.level])

  useEffect(() => {
    const checkDurability = weapon && weapon.durability < defaultWeaponDurability
    if (checkDurability) triggerEvent(weapon.durability < 0 ? "break" : "failure")
  }, [weapon?.durability])

  if (!weapon) return null

  const triggerEvent = (type: "success" | "failure" | "break") => {
    setEvent(type);
    if (type === "break") reset()
    setTimeout(() => {
      setEvent(undefined)
    }, 1000);
  };

  return (
    <div className="relative w-[300px] p-4 size-fit bg-orange-200 pixelify flex flex-col justify-center items-center">
      {
        event &&
        <EnhanceEvent outcome={event ?? "success"} />
      }
      <div className="flex justify-between w-full">
        <h1 className="text-fuchsia-950 text-xl">{weapon.name}</h1>
        {
          weapon.level > 0 &&
          <h1 className="text-fuchsia-950 text-xl">+{weapon.level}</h1>
        }
      </div>
      <h4 className="text-black w-full">{weapon.type}</h4>
      <img
        src="./baelle.webp"
        alt={weapon.name}
        className="w-40 h-auto"
      />
      <StatItem title="Base Attack" value={weapon.baseAttack} className="text-black my-4 font-bold" />
      <StatItem title="Magic Attack" value={weapon.magicAttack} className="text-black" />
      <StatItem title="DEX" value={weapon.dex} className="text-green-800" />
      {weapon.attributes &&
        Object.keys(weapon.attributes).map((key) => {
          if (!weapon.attributes) return
          const item = weapon.attributes[key];

          return (
            <StatItem
              key={item.code}
              title={item.type}
              color={item.color}
              value={item.value ?? 0}
              className={`transition slide-in`}
            />
          );
        })}
      {
        weapon.level >= 11 && !weapon.passive &&
        <div className="flex flex-col space-y-0 w-full my-2 slide-in pulse transition">
          <span className="text-fuchsia-950 w-full text-sm">▀▄▀▄▀▄▀▄▀▄▀▄▀▄▀▄</span>
          <span className="text-fuchsia-950 w-full text-sm">▀▄▀▄▀▄▀▄</span>
        </div>
      }
      {
        weapon.passive &&
        <span className="text-fuchsia-950 w-full my-2 slide-in transition">{weapon.passive}</span>
      }
      <div className="flex justify-between items-center w-full text-lg">
        <h2>Durability</h2>
        <div className="flex items-center space-x-1">
          {Array.from({ length: 4 }).map((_, index: number) => {
            return (
              <div key={index + 1} className={`${index + 1 <= weapon.durability ? "bg-green-800" : ""} w-4 h-2 inset-shadow-sm inset-shadow-slate-600/30`} />
            );
          })}
        </div>
      </div>
    </div>
  );
}