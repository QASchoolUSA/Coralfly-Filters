"use client";

import { useState } from "react";
import { useVehicleStore } from "@/lib/vehicle-store";

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
  const { isPickerOpen, closePicker, selectVehicle } = useVehicleStore();

  const [selectedYear, setSelectedYear] = useState<string>("2023");
  const [selectedMake, setSelectedMake] = useState<string>("Volvo");
  const [selectedModel, setSelectedModel] = useState<string>("VNL 760");
  const [selectedEngine, setSelectedEngine] = useState<string>("D13TC 455 HP");

  if (!isPickerOpen) return null;

  const makeObj = VEHICLE_DATA.find((m) => m.make.toLowerCase() === selectedMake.toLowerCase()) || VEHICLE_DATA[0];
  const modelObj = makeObj.models.find((m) => m.name.toLowerCase() === selectedModel.toLowerCase()) || makeObj.models[0];

  const handleMakeChange = (make: string) => {
    setSelectedMake(make);
    const found = VEHICLE_DATA.find((m) => m.make.toLowerCase() === make.toLowerCase());
    if (found && found.models.length > 0) {
      setSelectedModel(found.models[0].name);
      setSelectedEngine(found.models[0].engines[0]);
    }
  };

  const handleModelChange = (model: string) => {
    setSelectedModel(model);
    const foundModel = makeObj.models.find((m) => m.name.toLowerCase() === model.toLowerCase());
    if (foundModel && foundModel.engines.length > 0) {
      setSelectedEngine(foundModel.engines[0]);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
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
        <div className="modal-content" style={{ borderRadius: 4, overflow: "hidden" }}>
          <div className="modal-header" style={{ padding: "16px 24px", borderBottom: "1px solid #ebebeb", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <h5 className="modal-title" style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>
              Select Vehicle For Exact Fitment
            </h5>
            <button
              type="button"
              className="close"
              aria-label="Close"
              onClick={closePicker}
              style={{ background: "none", border: "none", fontSize: 24, cursor: "pointer", color: "#999", lineHeight: 1 }}
            >
              &times;
            </button>
          </div>

          <div className="modal-body" style={{ padding: 24 }}>
            <form onSubmit={handleSave}>
              <p style={{ fontSize: 14, color: "#6c757d", marginBottom: 20 }}>
                Filters will be automatically filtered and verified for compatibility with your selected rig.
              </p>

                <div className="form-group mb-3">
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#333", marginBottom: 6, display: "block" }}>
                    Select Year
                  </label>
                  <select
                    className="form-control"
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    style={{ height: 42, fontSize: 14, borderRadius: 2 }}
                  >
                    {YEARS.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group mb-3">
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#333", marginBottom: 6, display: "block" }}>
                    Select Make
                  </label>
                  <select
                    className="form-control"
                    value={selectedMake}
                    onChange={(e) => handleMakeChange(e.target.value)}
                    style={{ height: 42, fontSize: 14, borderRadius: 2 }}
                  >
                    {VEHICLE_DATA.map((v) => (
                      <option key={v.make} value={v.make}>
                        {v.make}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group mb-3">
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#333", marginBottom: 6, display: "block" }}>
                    Select Model
                  </label>
                  <select
                    className="form-control"
                    value={selectedModel}
                    onChange={(e) => handleModelChange(e.target.value)}
                    style={{ height: 42, fontSize: 14, borderRadius: 2 }}
                  >
                    {makeObj.models.map((m) => (
                      <option key={m.name} value={m.name}>
                        {m.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group mb-4">
                  <label style={{ fontSize: 13, fontWeight: 600, color: "#333", marginBottom: 6, display: "block" }}>
                    Select Engine
                  </label>
                  <select
                    className="form-control"
                    value={selectedEngine}
                    onChange={(e) => setSelectedEngine(e.target.value)}
                    style={{ height: 42, fontSize: 14, borderRadius: 2 }}
                  >
                    {modelObj.engines.map((eng) => (
                      <option key={eng} value={eng}>
                        {eng}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
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
                    className="btn btn-primary"
                    style={{ height: 42, padding: "0 24px", fontSize: 14, backgroundColor: "#0081c9", borderColor: "#0081c9" }}
                  >
                    Select Vehicle
                  </button>
                </div>
              </form>
          </div>
        </div>
      </div>
    </div>
  );
}
