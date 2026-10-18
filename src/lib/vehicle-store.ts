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
      currentVehicle: null,
      garage: [],
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
      name: "coralfly_vehicle_storage_v5",
      storage: safeLocalStorage,
      onRehydrateStorage: () => (state) => {
        if (!state) return;
        if (
          state.currentVehicle &&
          (!isAllowedMake(state.currentVehicle.make) ||
            state.currentVehicle.make.toLowerCase() === "international")
        ) {
          state.currentVehicle = null;
        }
        if (Array.isArray(state.garage)) {
          state.garage = state.garage.filter(
            (v) => isAllowedMake(v?.make) && v?.make?.toLowerCase() !== "international"
          );
        }
        if (typeof window !== "undefined") {
          try {
            window.localStorage.removeItem("coralfly_vehicle_storage");
            window.localStorage.removeItem("coralfly_vehicle_storage_v2");
            window.localStorage.removeItem("coralfly_vehicle_storage_v3");
            window.localStorage.removeItem("coralfly_vehicle_storage_v4");
          } catch {}
        }
      },
    }
  )
);

// Client-side immediate wipe of previous versions
if (typeof window !== "undefined") {
  try {
    window.localStorage.removeItem("coralfly_vehicle_storage");
    window.localStorage.removeItem("coralfly_vehicle_storage_v2");
    window.localStorage.removeItem("coralfly_vehicle_storage_v3");
    window.localStorage.removeItem("coralfly_vehicle_storage_v4");
  } catch {}
}
