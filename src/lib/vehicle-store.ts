"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { safeLocalStorage } from "@/lib/safe-storage";

export type Vehicle = {
  year: string;
  make: string;
  model: string;
  engine: string;
};

export const ALLOWED_MAKES = ["Volvo", "Freightliner", "Kenworth", "Peterbilt", "Mack"] as const;

export function isAllowedMake(make?: string | null): boolean {
  if (!make) return false;
  return ALLOWED_MAKES.some((m) => m.toLowerCase() === make.trim().toLowerCase());
}

export const DEFAULT_VEHICLE: Vehicle = {
  year: "2023",
  make: "Volvo",
  model: "VNL 760",
  engine: "D13TC 455 HP",
};

type VehicleState = {
  currentVehicle: Vehicle | null;
  garage: Vehicle[];
  isPickerOpen: boolean;
  openPicker: () => void;
  closePicker: () => void;
  selectVehicle: (vehicle: Vehicle) => void;
  addToGarage: (vehicle: Vehicle) => void;
  removeFromGarage: (index: number) => void;
  clearCurrentVehicle: () => void;
};

export const useVehicleStore = create<VehicleState>()(
  persist(
    (set) => ({
      currentVehicle: DEFAULT_VEHICLE,
      garage: [
        DEFAULT_VEHICLE,
        {
          year: "2021",
          make: "Freightliner",
          model: "Cascadia 126",
          engine: "Detroit DD15 505 HP",
        },
      ],
      isPickerOpen: false,
      openPicker: () => set({ isPickerOpen: true }),
      closePicker: () => set({ isPickerOpen: false }),
      selectVehicle: (vehicle) => {
        if (!isAllowedMake(vehicle.make) || vehicle.make.toLowerCase() === "international") {
          return;
        }
        set((state) => {
          const exists = state.garage.some(
            (v) =>
              v.year === vehicle.year &&
              v.make.toLowerCase() === vehicle.make.toLowerCase() &&
              v.model.toLowerCase() === vehicle.model.toLowerCase() &&
              v.engine.toLowerCase() === vehicle.engine.toLowerCase()
          );
          return {
            currentVehicle: vehicle,
            garage: exists ? state.garage : [vehicle, ...state.garage],
            isPickerOpen: false,
          };
        });
      },
      addToGarage: (vehicle) => {
        if (!isAllowedMake(vehicle.make) || vehicle.make.toLowerCase() === "international") {
          return;
        }
        set((state) => {
          const exists = state.garage.some(
            (v) =>
              v.year === vehicle.year &&
              v.make.toLowerCase() === vehicle.make.toLowerCase() &&
              v.model.toLowerCase() === vehicle.model.toLowerCase() &&
              v.engine.toLowerCase() === vehicle.engine.toLowerCase()
          );
          if (exists) return state;
          return { garage: [vehicle, ...state.garage] };
        });
      },
      removeFromGarage: (index) =>
        set((state) => {
          const next = state.garage.filter((_, i) => i !== index);
          const currentDeleted =
            state.currentVehicle &&
            state.garage[index]?.year === state.currentVehicle.year &&
            state.garage[index]?.model === state.currentVehicle.model;
          return {
            garage: next,
            currentVehicle: currentDeleted ? (next[0] ?? null) : state.currentVehicle,
          };
        }),
      clearCurrentVehicle: () => set({ currentVehicle: null }),
    }),
    {
      name: "coralfly_vehicle_storage_v3",
      storage: safeLocalStorage,
      onRehydrateStorage: () => (state) => {
        if (!state) return;
        if (
          state.currentVehicle &&
          (!isAllowedMake(state.currentVehicle.make) ||
            state.currentVehicle.make.toLowerCase() === "international")
        ) {
          state.currentVehicle = DEFAULT_VEHICLE;
        }
        if (Array.isArray(state.garage)) {
          state.garage = state.garage.filter(
            (v) => isAllowedMake(v?.make) && v?.make?.toLowerCase() !== "international"
          );
          if (state.garage.length === 0) {
            state.garage = [DEFAULT_VEHICLE];
          }
        }
        if (typeof window !== "undefined") {
          try {
            window.localStorage.removeItem("coralfly_vehicle_storage");
            window.localStorage.removeItem("coralfly_vehicle_storage_v2");
          } catch {}
        }
      },
    }
  )
);
