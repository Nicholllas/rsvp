import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Undangan pernikahan Alin dan Richard";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#f8f4eb",
        color: "#30402d",
        border: "20px solid #fffdf7",
      }}
    >
      <div
        style={{
          fontSize: 20,
          letterSpacing: 8,
          color: "#b4975a",
          textTransform: "uppercase",
        }}
      >
        The Wedding of
      </div>
      <div style={{ fontFamily: "serif", fontSize: 108, marginTop: 24 }}>
        Alin & Richard
      </div>
      <div
        style={{
          width: 80,
          height: 2,
          background: "#b4975a",
          margin: "26px 0",
        }}
      />
      <div style={{ fontSize: 26, letterSpacing: 5 }}>26 · 06 · 2027</div>
    </div>,
    size,
  );
}
