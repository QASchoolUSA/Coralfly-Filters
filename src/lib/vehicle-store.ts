"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Vehicle = {
  year: string;
  make: string;
  model: string;
  engine: string;
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
      currentVehicle: {
        year: "2023",
        make: "Volvo",
        model: "VNL 760",
        engine: "D13TC 455 HP",
      },
      garage: [
        {
          year: "2023",
          make: "Volvo",
          model: "VNL 760",
          engine: "D13TC 455 HP",
        },
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
      selectVehicle: (vehicle) =>
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
        }),
      addToGarage: (vehicle) =>
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
        }),
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
      name: "coralfly_vehicle_storage",
    }
  )
);
