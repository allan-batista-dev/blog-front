"use client";
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export function StatusSwitch() {
  return (
    <div className="flex items-center space-x-2">
      <Switch id="is-active" />
    </div>
  )
}
