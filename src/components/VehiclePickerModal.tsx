"use client";

import { useState } from "react";
import { useVehicleStore, type Vehicle } from "@/lib/vehicle-store";

const VEHICLE_DATA = [
  {
    make: "Volvo",
    models: [
      { name: "VNL 760", engines: ["D13TC 455 HP", "D13 500 HP", "Cummins X15 500 HP"] },
      { name: "VNL 860", engines: ["D13TC 455 HP", "Cummins X15 565 HP"] },
      { name: "VHD 300", engines: ["D11 425 HP", "D13 500 HP"] },
      { name: "VNX 630", engines: ["D13 500 HP", "Cummins X15 605 HP"] },
    ],
  },
  {
    make: "Freightliner",
    models: [
      { name: "Cascadia 126", engines: ["Detroit DD15 505 HP", "Detroit DD13 450 HP", "Cummins X15 500 HP"] },
      { name: "Cascadia 116", engines: ["Detroit DD13 450 HP", "Cummins X12 455 HP"] },
      { name: "114SD", engines: ["Detroit DD13 470 HP", "Cummins L9 350 HP"] },
      { name: "122SD", engines: ["Detroit DD16 600 HP", "Cummins X15 605 HP"] },
    ],
  },
  {
    make: "Kenworth",
    models: [
      { name: "T680", engines: ["PACCAR MX-13 455 HP", "PACCAR MX-11 430 HP", "Cummins X15 500 HP"] },
      { name: "W900L", engines: ["Cummins X15 565 HP", "PACCAR MX-13 510 HP"] },
      { name: "T880", engines: ["PACCAR MX-13 510 HP", "Cummins X15 500 HP"] },
    ],
  },
  {
    make: "Peterbilt",
    models: [
      { name: "Model 579", engines: ["PACCAR MX-13 455 HP", "Cummins X15 500 HP"] },
      { name: "Model 389", engines: ["Cummins X15 565 HP", "PACCAR MX-13 510 HP"] },
      { name: "Model 567", engines: ["PACCAR MX-13 510 HP", "PACCAR MX-11 430 HP"] },
    ],
  },
  {
    make: "Mack",
    models: [
      { name: "Anthem", engines: ["Mack MP8 505 HP", "Mack MP7 425 HP"] },
      { name: "Pinnacle", engines: ["Mack MP8-TC 445 HP", "Mack MP8 505 HP"] },
      { name: "Granite", engines: ["Mack MP8 505 HP", "Mack MP7 425 HP"] },
    ],
  },

];

const YEARS = ["2026", "2025", "2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015"];

export function VehiclePickerModal() {
  const { isPickerOpen, closePicker, selectVehicle, clearCurrentVehicle, currentVehicle } = useVehicleStore();

  if (!isPickerOpen) return null;

  return (
    <VehiclePickerModalContent
      key={`${currentVehicle?.year}-${currentVehicle?.make}-${currentVehicle?.model}-${currentVehicle?.engine}`}
      currentVehicle={currentVehicle}
      closePicker={closePicker}
      selectVehicle={selectVehicle}
      clearCurrentVehicle={clearCurrentVehicle}
    />
  );
}

function VehiclePickerModalContent({
  currentVehicle,
  closePicker,
  selectVehicle,
  clearCurrentVehicle,
}: {
  currentVehicle: Vehicle | null;
  closePicker: () => void;
  selectVehicle: (v: Vehicle) => void;
  clearCurrentVehicle: () => void;
}) {
  const [selectedYear, setSelectedYear] = useState<string>(currentVehicle?.year || "");
  const [selectedMake, setSelectedMake] = useState<string>(currentVehicle?.make || "");
  const [selectedModel, setSelectedModel] = useState<string>(currentVehicle?.model || "");
  const [selectedEngine, setSelectedEngine] = useState<string>(currentVehicle?.engine || "");

  const makeObj = VEHICLE_DATA.find((m) => m.make.toLowerCase() === selectedMake.toLowerCase());
  const modelObj = makeObj?.models.find((m) => m.name.toLowerCase() === selectedModel.toLowerCase());

  const handleMakeChange = (make: string) => {
    setSelectedMake(make);
    setSelectedModel("");
    setSelectedEngine("");
  };

  const handleModelChange = (model: string) => {
    setSelectedModel(model);
    setSelectedEngine("");
  };

  const isComplete = Boolean(selectedYear && selectedMake && selectedModel && selectedEngine);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isComplete) return;
    selectVehicle({
      year: selectedYear,
      make: selectedMake,
      model: selectedModel,
      engine: selectedEngine,
    });
  };

  return (
    <div className="modal fade show" style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.65)", zIndex: 1050 }}>
      <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: 540 }}>
        <div className="modal-content cf-picker-modal">
          <div className="modal-header cf-picker-header">
            <div>
              <h5 className="modal-title cf-picker-title">
                {currentVehicle ? "Change Selected Rig" : "Select Your Rig For Exact Fitment"}
              </h5>
              <div className="cf-picker-subtitle">
                {currentVehicle ? `Currently Selected: ${currentVehicle.year} ${currentVehicle.make} ${currentVehicle.model}` : "Choose your truck to verify guaranteed filter compatibility"}
              </div>
            </div>
            <button
              type="button"
              className="close cf-picker-close"
              aria-label="Close"
              onClick={closePicker}
            >
              &times;
            </button>
          </div>

          <div className="modal-body" style={{ padding: 24 }}>
            <form onSubmit={handleSave}>
              <div className="form-group mb-3">
                <label htmlFor="vehicle-picker-year" className="cf-picker-label">
                  1. Select Year *
                </label>
                <select
                  id="vehicle-picker-year"
                  className="form-control cf-picker-select"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  required
                >
                  <option value="">— Choose Year —</option>
                  {YEARS.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group mb-3">
                <label htmlFor="vehicle-picker-make" className="cf-picker-label">
                  2. Select Make *
                </label>
                <select
                  id="vehicle-picker-make"
                  className="form-control cf-picker-select"
                  value={selectedMake}
                  onChange={(e) => handleMakeChange(e.target.value)}
                  required
                >
                  <option value="">— Choose Commercial Truck Make —</option>
                  {VEHICLE_DATA.map((v) => (
                    <option key={v.make} value={v.make}>
                      {v.make}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group mb-3">
                <label htmlFor="vehicle-picker-model" className="cf-picker-label">
                  3. Select Model *
                </label>
                <select
                  id="vehicle-picker-model"
                  className="form-control cf-picker-select"
                  value={selectedModel}
                  disabled={!selectedMake || !makeObj}
                  onChange={(e) => handleModelChange(e.target.value)}
                  required
                >
                  <option value="">{selectedMake ? "— Choose Truck Model —" : "— Select Make First —"}</option>
                  {makeObj?.models.map((m) => (
                    <option key={m.name} value={m.name}>
                      {m.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group mb-4">
                <label htmlFor="vehicle-picker-engine" className="cf-picker-label">
                  4. Select Engine *
                </label>
                <select
                  id="vehicle-picker-engine"
                  className="form-control cf-picker-select"
                  value={selectedEngine}
                  disabled={!selectedModel || !modelObj}
                  onChange={(e) => setSelectedEngine(e.target.value)}
                  required
                >
                  <option value="">{selectedModel ? "— Choose Engine Configuration —" : "— Select Model First —"}</option>
                  {modelObj?.engines.map((eng) => (
                    <option key={eng} value={eng}>
                      {eng}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                <div>
                  {currentVehicle && (
                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm cf-picker-btn-clear"
                      onClick={() => {
                        clearCurrentVehicle();
                        closePicker();
                      }}
                    >
                      Clear Selected Rig
                    </button>
                  )}
                </div>
                <div style={{ display: "flex", gap: 12, marginLeft: "auto" }}>
                  <button
                    type="button"
                    className="btn cf-picker-btn-cancel"
                    onClick={closePicker}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!isComplete}
                    className="btn btn-primary cf-picker-btn-submit"
                  >
                    Save &amp; Confirm Fitment
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
