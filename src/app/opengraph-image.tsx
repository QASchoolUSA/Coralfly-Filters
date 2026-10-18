import { ImageResponse } from "next/og";
import fs from "fs";
import path from "path";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function OpenGraphImage() {
  // Load real CoralFly logo from public/brand/logo.png
  const logoPath = path.join(process.cwd(), "public/brand/logo.png");
  const logoBuffer = fs.readFileSync(logoPath);
  const logoBase64 = `data:image/png;base64,${logoBuffer.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          background: "#ffffff",
          padding: "40px 56px",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          position: "relative",
          border: "12px solid #0081c9",
        }}
      >
        {/* Section 1: Centered Real CoralFly Logo (Bigger) */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            marginTop: 6,
          }}
        >
          <img
            src={logoBase64}
            alt="CORALFLY"
            width={490}
            height={149}
            style={{
              width: 490,
              height: 149,
              objectFit: "contain",
            }}
          />
        </div>

        {/* Subtle Brand Divider */}
        <div
          style={{
            height: 2,
            width: "90%",
            background: "linear-gradient(90deg, transparent 0%, #cbd5e1 20%, #cbd5e1 80%, transparent 100%)",
            margin: "4px 0",
          }}
        />

        {/* Section 2: Main Headline & Categories (Bigger & Bold) */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              fontSize: 52,
              fontWeight: 900,
              color: "#0f172a",
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            Heavy Duty Filters for Semi Trucks
          </div>

          <div
            style={{
              fontSize: 24,
              fontWeight: 700,
              color: "#0081c9",
              marginTop: 10,
              letterSpacing: "0.01em",
            }}
          >
            Oil • Air &amp; Intake • Fuel &amp; Water Separators • Cabin HVAC
          </div>

          {/* Truck Makes Badges (Bigger & Clearer) */}
          <div
            style={{
              display: "flex",
              gap: 12,
              marginTop: 18,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {[
              "Volvo",
              "Freightliner",
              "Kenworth",
              "Peterbilt",
            ].map((make) => (
              <div
                key={make}
                style={{
                  background: "#f8fafc",
                  border: "2px solid #e2e8f0",
                  borderRadius: 10,
                  padding: "10px 26px",
                  color: "#1e293b",
                  fontSize: 18,
                  fontWeight: 800,
                  letterSpacing: "0.01em",
                }}
              >
                {make}
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Bottom Contact Strip (Bigger Elements & Matching Colors) */}
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "#f0f9ff",
            border: "2px solid #bae6fd",
            borderRadius: 16,
            padding: "16px 36px",
            marginBottom: 4,
          }}
        >
          {/* Phone */}
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: "#0081c9",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  color: "#64748b",
                  fontSize: 12,
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                Orders &amp; Inquiries
              </span>
              <span
                style={{
                  color: "#0f172a",
                  fontSize: 25,
                  fontWeight: 900,
                  letterSpacing: "0.02em",
                }}
              >
                (407) 768-1488
              </span>
            </div>
          </div>

          {/* Email */}
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: "#0081c9",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffffff"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  color: "#64748b",
                  fontSize: 12,
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                Direct Email
              </span>
              <span
                style={{
                  color: "#0081c9",
                  fontSize: 20,
                  fontWeight: 800,
                }}
              >
                support@coralflyfilters.com
              </span>
            </div>
          </div>

          {/* Web & Location */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              textAlign: "right",
            }}
          >
            <span
              style={{
                color: "#0f172a",
                fontSize: 22,
                fontWeight: 900,
                letterSpacing: "0.02em",
              }}
            >
              coralflyfilters.com
            </span>
            <span
              style={{
                color: "#64748b",
                fontSize: 14,
                fontWeight: 700,
                marginTop: 2,
              }}
            >
              Orlando / Sanford, FL
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
