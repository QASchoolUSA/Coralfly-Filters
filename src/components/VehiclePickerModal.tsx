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
    <div className="modal fade show" style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.6)", zIndex: 1050 }}>
      <div className="modal-dialog modal-dialog-centered" style={{ maxWidth: 540 }}>
        <div className="modal-content" style={{ borderRadius: 6, overflow: "hidden", boxShadow: "0 10px 40px rgba(0,0,0,0.2)" }}>
          <div className="modal-header" style={{ padding: "18px 24px", borderBottom: "1px solid #ebebeb", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <h5 className="modal-title" style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>
                {currentVehicle ? "Change Selected Rig" : "Select Your Rig For Exact Fitment"}
              </h5>
              <div style={{ fontSize: 13, color: "#6c757d", marginTop: 2 }}>
                {currentVehicle ? `Currently Selected: ${currentVehicle.year} ${currentVehicle.make} ${currentVehicle.model}` : "Choose your truck to verify guaranteed filter compatibility"}
              </div>
            </div>
            <button
              type="button"
              className="close"
              aria-label="Close"
              onClick={closePicker}
              style={{ background: "none", border: "none", fontSize: 26, cursor: "pointer", color: "#999", lineHeight: 1 }}
            >
              &times;
            </button>
          </div>

          <div className="modal-body" style={{ padding: 24 }}>
            <form onSubmit={handleSave}>
              <div className="form-group mb-3">
                <label htmlFor="vehicle-picker-year" style={{ fontSize: 13, fontWeight: 600, color: "#333", marginBottom: 6, display: "block" }}>
                  1. Select Year *
                </label>
                <select
                  id="vehicle-picker-year"
                  className="form-control"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  style={{ height: 42, fontSize: 14, borderRadius: 4 }}
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
                <label htmlFor="vehicle-picker-make" style={{ fontSize: 13, fontWeight: 600, color: "#333", marginBottom: 6, display: "block" }}>
                  2. Select Make *
                </label>
                <select
                  id="vehicle-picker-make"
                  className="form-control"
                  value={selectedMake}
                  onChange={(e) => handleMakeChange(e.target.value)}
                  style={{ height: 42, fontSize: 14, borderRadius: 4 }}
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
                <label htmlFor="vehicle-picker-model" style={{ fontSize: 13, fontWeight: 600, color: "#333", marginBottom: 6, display: "block" }}>
                  3. Select Model *
                </label>
                <select
                  id="vehicle-picker-model"
                  className="form-control"
                  value={selectedModel}
                  disabled={!selectedMake || !makeObj}
                  onChange={(e) => handleModelChange(e.target.value)}
                  style={{ height: 42, fontSize: 14, borderRadius: 4, backgroundColor: !selectedMake ? "#f8f9fa" : "#ffffff" }}
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
                <label htmlFor="vehicle-picker-engine" style={{ fontSize: 13, fontWeight: 600, color: "#333", marginBottom: 6, display: "block" }}>
                  4. Select Engine *
                </label>
                <select
                  id="vehicle-picker-engine"
                  className="form-control"
                  value={selectedEngine}
                  disabled={!selectedModel || !modelObj}
                  onChange={(e) => setSelectedEngine(e.target.value)}
                  style={{ height: 42, fontSize: 14, borderRadius: 4, backgroundColor: !selectedModel ? "#f8f9fa" : "#ffffff" }}
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
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => {
                        clearCurrentVehicle();
                        closePicker();
                      }}
                      style={{ height: 40, padding: "0 16px", fontSize: 13, color: "#dc3545", borderColor: "#dc3545", backgroundColor: "transparent" }}
                    >
                      Clear Selected Rig
                    </button>
                  )}
                </div>
                <div style={{ display: "flex", gap: 12, marginLeft: "auto" }}>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={closePicker}
                    style={{ height: 42, padding: "0 20px", fontSize: 14 }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!isComplete}
                    className="btn btn-primary"
                    style={{
                      height: 42,
                      padding: "0 24px",
                      fontSize: 14,
                      fontWeight: 600,
                      backgroundColor: isComplete ? "#0081c9" : "#cbd5e1",
                      borderColor: isComplete ? "#0081c9" : "#cbd5e1",
                      cursor: isComplete ? "pointer" : "not-allowed",
                    }}
                  >
                    Save & Confirm Fitment
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
