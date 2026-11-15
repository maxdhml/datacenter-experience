import { Text } from '@react-three/drei';
import InteractiveMarker from '../three/InteractiveMarker';

/* ─── Ultra-Detailed Industrial 42U Server Cabinet ─── */
function ServerRack({
  position,
  rotation = [0, 0, 0],
  isStorage = false,
  isSwitch = false,
  label = 'RACK-42U',
  isTarget = false,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  isStorage?: boolean;
  isSwitch?: boolean;
  label?: string;
  isTarget?: boolean;
}) {
  return (
    <group position={position} rotation={rotation}>
      {/* ── Outer Heavy Steel Enclosure (EIA-310 19" 42U) ── */}
      {/* Main Structural Cabinet Body */}
      <mesh position={[0, 1.3, 0]}>
        <boxGeometry args={[0.82, 2.58, 1.02]} />
        <meshStandardMaterial color="#0b1120" metalness={0.85} roughness={0.25} />
      </mesh>

      {/* Recessed Interior Equipment Bay */}
      <mesh position={[0, 1.3, 0.05]}>
        <boxGeometry args={[0.74, 2.44, 0.92]} />
        <meshStandardMaterial color="#030712" roughness={0.6} />
      </mesh>

      {/* ── Vertical 19" EIA Mounting Rails (Steel with Unit Markings) ── */}
      <mesh position={[-0.34, 1.3, 0.44]}>
        <boxGeometry args={[0.035, 2.42, 0.03]} />
        <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[0.34, 1.3, 0.44]}>
        <boxGeometry args={[0.035, 2.42, 0.03]} />
        <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* ── Internal Server Units (Detailed Modular Stacking) ── */}
      {/* Top 1U ToR Switch (Commutateur Top-of-Rack 100G/400G) */}
      <group position={[0, 2.36, 0.44]}>
        <mesh>
          <boxGeometry args={[0.66, 0.08, 0.04]} />
          <meshStandardMaterial color="#0284c7" metalness={0.8} roughness={0.3} />
        </mesh>
        {/* Optical Transceiver Port Cages (SFP28 / QSFP-DD) */}
        <mesh position={[0, 0, 0.022]}>
          <planeGeometry args={[0.58, 0.04]} />
          <meshStandardMaterial color="#0f172a" metalness={0.9} />
        </mesh>
        {/* Glowing Transceiver Activity Dots */}
        <mesh position={[-0.2, 0, 0.025]}>
          <boxGeometry args={[0.18, 0.015, 0.005]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>
        <mesh position={[0.1, 0, 0.025]}>
          <boxGeometry args={[0.18, 0.015, 0.005]} />
          <meshBasicMaterial color="#10b981" />
        </mesh>
      </group>

      {/* 1U High-Density Optical Patch Panel with Yellow Jumper Loop */}
      <group position={[0, 2.24, 0.44]}>
        <mesh>
          <boxGeometry args={[0.66, 0.08, 0.04]} />
          <meshStandardMaterial color="#1e293b" metalness={0.7} />
        </mesh>
        {/* Yellow fiber optic jumper cord simulation */}
        <mesh position={[0, -0.01, 0.025]}>
          <boxGeometry args={[0.54, 0.02, 0.01]} />
          <meshStandardMaterial color="#eab308" roughness={0.4} />
        </mesh>
      </group>

      {/* Compute Blade Servers or SAN Array Chassis Units */}
      {isStorage ? (
        // SAN NVMe Storage Array Matrix (High-Density Drive Trays)
        <group position={[0, 1.4, 0.44]}>
          {Array.from({ length: 4 }).map((_, i) => (
            <group key={i} position={[0, -0.55 + i * 0.38, 0]}>
              {/* 4U Storage Head Chassis */}
              <mesh>
                <boxGeometry args={[0.66, 0.34, 0.04]} />
                <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.3} />
              </mesh>
              {/* Drive slots divider matrix */}
              <mesh position={[0, 0, 0.022]}>
                <planeGeometry args={[0.60, 0.30]} />
                <meshStandardMaterial color="#0f172a" metalness={0.7} />
              </mesh>
              {/* Drive status LEDs */}
              <mesh position={[-0.22, 0.08, 0.025]}>
                <boxGeometry args={[0.08, 0.02, 0.005]} />
                <meshBasicMaterial color="#f59e0b" />
              </mesh>
              <mesh position={[0.22, 0.08, 0.025]}>
                <boxGeometry args={[0.08, 0.02, 0.005]} />
                <meshBasicMaterial color="#10b981" />
              </mesh>
            </group>
          ))}
        </group>
      ) : isSwitch ? (
        // Network Distribution Rack (Dual ToR + Management)
        <group position={[0, 1.3, 0.44]}>
          {Array.from({ length: 7 }).map((_, i) => (
            <group key={i} position={[0, -0.75 + i * 0.26, 0]}>
              <mesh>
                <boxGeometry args={[0.66, 0.22, 0.04]} />
                <meshStandardMaterial color={i % 2 === 0 ? '#0369a1' : '#1e293b'} metalness={0.8} />
              </mesh>
              {/* Port bays */}
              <mesh position={[0, 0, 0.022]}>
                <boxGeometry args={[0.56, 0.08, 0.005]} />
                <meshBasicMaterial color="#38bdf8" />
              </mesh>
            </group>
          ))}
        </group>
      ) : (
        // Standard High-Density Compute Blade Servers (2U Chassis)
        <group position={[0, 1.3, 0.44]}>
          {Array.from({ length: 6 }).map((_, i) => (
            <group key={i} position={[0, -0.8 + i * 0.31, 0]}>
              {/* Server chassis unit face */}
              <mesh>
                <boxGeometry args={[0.66, 0.26, 0.04]} />
                <meshStandardMaterial color="#1e293b" metalness={0.75} roughness={0.3} />
              </mesh>
              {/* Front dual release extraction handles */}
              <mesh position={[-0.31, 0, 0.025]}>
                <boxGeometry args={[0.02, 0.16, 0.02]} />
                <meshStandardMaterial color="#94a3b8" metalness={0.9} />
              </mesh>
              <mesh position={[0.31, 0, 0.025]}>
                <boxGeometry args={[0.02, 0.16, 0.02]} />
                <meshStandardMaterial color="#94a3b8" metalness={0.9} />
              </mesh>
              {/* Front drive bays & fan honeycomb intake */}
              <mesh position={[-0.1, 0, 0.022]}>
                <planeGeometry args={[0.36, 0.20]} />
                <meshStandardMaterial color="#0f172a" roughness={0.7} />
              </mesh>
              {/* Status LED nodes */}
              <mesh position={[0.18, 0.06, 0.025]}>
                <boxGeometry args={[0.04, 0.015, 0.005]} />
                <meshBasicMaterial color={i % 3 === 0 ? '#38bdf8' : '#10b981'} />
              </mesh>
            </group>
          ))}
        </group>
      )}

      {/* ── Vertical Structured Cable Bundles (CAT6A Blue & Fiber Yellow) ── */}
      {/* Left side: Blue CAT6A cable bundle */}
      <mesh position={[-0.35, 1.3, 0.46]}>
        <cylinderGeometry args={[0.015, 0.015, 2.3, 6]} />
        <meshStandardMaterial color="#2563eb" roughness={0.5} />
      </mesh>
      {/* Right side: Yellow optical fiber bundle */}
      <mesh position={[0.35, 1.3, 0.46]}>
        <cylinderGeometry args={[0.012, 0.012, 2.3, 6]} />
        <meshStandardMaterial color="#eab308" roughness={0.4} />
      </mesh>

      {/* ── Perforated Front Glass Door with Aluminum Frame ── */}
      <mesh position={[0, 1.3, 0.52]}>
        <planeGeometry args={[0.74, 2.45]} />
        <meshStandardMaterial
          color="#38bdf8"
          transparent
          opacity={0.16}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>
      {/* Chrome Door Handle with Integrated RFID Badge Lock */}
      <mesh position={[0.33, 1.2, 0.535]}>
        <boxGeometry args={[0.02, 0.18, 0.02]} />
        <meshStandardMaterial color="#e2e8f0" metalness={0.95} roughness={0.1} />
      </mesh>
      <mesh position={[0.33, 1.32, 0.54]}>
        <circleGeometry args={[0.012, 10]} />
        <meshBasicMaterial color="#10b981" />
      </mesh>

      {/* ── Roof Vent with Dual Cable Ingress Brush Glands ── */}
      <mesh position={[0, 2.59, 0.2]}>
        <boxGeometry args={[0.4, 0.02, 0.18]} />
        <meshStandardMaterial color="#020617" roughness={0.9} />
      </mesh>

      {/* ── Target Interactive Server Highlight & Name Sign ── */}
      {isTarget && (
        <group position={[0, 2.50, 0.53]}>
          <mesh>
            <planeGeometry args={[0.55, 0.11]} />
            <meshStandardMaterial color="#020617" />
          </mesh>
          <Text
            position={[0, 0, 0.01]}
            fontSize={0.065}
            color="#38bdf8"
            anchorX="center"
            anchorY="middle"
          >
            {label}
          </Text>
        </group>
      )}
    </group>
  );
}

/* ─── End-of-Row Power Distribution Unit (Row PDU / RPP) ─── */
function RowPDUCabinet({
  position,
  rotation = [0, 0, 0],
  label = 'PDU-A1',
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  label?: string;
}) {
  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 1.35, 0]}>
        <boxGeometry args={[0.9, 2.7, 1.05]} />
        <meshStandardMaterial color="#0b1120" metalness={0.85} roughness={0.3} />
      </mesh>
      {/* Touchscreen Status Monitor */}
      <mesh position={[0, 1.6, 0.535]}>
        <planeGeometry args={[0.52, 0.36]} />
        <meshStandardMaterial color="#0284c7" emissive="#0369a1" emissiveIntensity={0.8} />
      </mesh>
      <Text position={[0, 1.69, 0.54]} fontSize={0.045} color="#ffffff" anchorX="center">
        {`${label} • 400V / 250A`}
      </Text>
      <Text position={[0, 1.58, 0.54]} fontSize={0.055} color="#34d399" anchorX="center">
        CHARGE : 64.2 kW
      </Text>
      <Text position={[0, 1.48, 0.54]} fontSize={0.038} color="#bae6fd" anchorX="center">
        VOIE A : OK • COS φ = 0.99
      </Text>
      {/* Front Circuit Breaker Panel Grille */}
      <mesh position={[0, 0.7, 0.535]}>
        <planeGeometry args={[0.7, 0.9]} />
        <meshStandardMaterial color="#1e293b" metalness={0.6} />
      </mesh>
    </group>
  );
}

/* ─── Suspended Optical Fiber Raceway & Cable Trays ─── */
function DualCableRaceway({ zStart, zEnd, x }: { zStart: number; zEnd: number; x: number }) {
  const len = zEnd - zStart;
  const midZ = (zStart + zEnd) / 2;
  return (
    <group position={[x, 3.8, midZ]}>
      {/* Yellow Optical FiberGuide Trough */}
      <mesh position={[-0.2, 0, 0]}>
        <boxGeometry args={[0.32, 0.12, len]} />
        <meshStandardMaterial color="#eab308" roughness={0.3} metalness={0.4} />
      </mesh>
      {/* Black snap-on lid */}
      <mesh position={[-0.2, 0.065, 0]}>
        <boxGeometry args={[0.33, 0.015, len]} />
        <meshStandardMaterial color="#1e293b" roughness={0.4} />
      </mesh>

      {/* Silver Galvanized Wire-Mesh Basket Tray */}
      <mesh position={[0.25, -0.05, 0]}>
        <boxGeometry args={[0.35, 0.08, len]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Bundle of blue CAT6A cables inside basket tray */}
      <mesh position={[0.25, -0.03, 0]}>
        <boxGeometry args={[0.30, 0.04, len]} />
        <meshStandardMaterial color="#2563eb" roughness={0.6} />
      </mesh>

      {/* Suspended Unistrut Threaded Rod Hangers */}
      {[-6, 0, 6].map((offZ, idx) => (
        <mesh key={idx} position={[0, 1.1, offZ]}>
          <cylinderGeometry args={[0.008, 0.008, 2.2, 6]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.9} />
        </mesh>
      ))}

      {/* Vertical Cable Waterfall Drops entering rack roofs */}
      {[-4, 0, 4].map((offZ, idx) => (
        <group key={idx} position={[-0.2, -0.5, offZ]}>
          <mesh>
            <cylinderGeometry args={[0.035, 0.035, 0.9, 6]} />
            <meshStandardMaterial color="#eab308" roughness={0.4} />
          </mesh>
          <mesh position={[0.03, 0, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 0.95, 6]} />
            <meshStandardMaterial color="#0284c7" />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* ─── Technician Mobile Diagnostic Crash Cart ─── */
function TechnicianCrashCart({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* 3 Trays */}
      {[0.2, 0.6, 0.95].map((y, idx) => (
        <mesh key={idx} position={[0, y, 0]}>
          <boxGeometry args={[0.8, 0.04, 0.55]} />
          <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.3} />
        </mesh>
      ))}
      {/* 4 Tubular Uprights */}
      {[
        [-0.36, -0.24],
        [0.36, -0.24],
        [-0.36, 0.24],
        [0.36, 0.24],
      ].map(([ux, uz], idx) => (
        <mesh key={idx} position={[ux, 0.55, uz]}>
          <cylinderGeometry args={[0.018, 0.018, 0.9, 8]} />
          <meshStandardMaterial color="#94a3b8" metalness={0.9} />
        </mesh>
      ))}
      {/* 4 Rubber Swivel Caster Wheels */}
      {[
        [-0.36, -0.24],
        [0.36, -0.24],
        [-0.36, 0.24],
        [0.36, 0.24],
      ].map(([wx, wz], idx) => (
        <mesh key={idx} position={[wx, 0.08, wz]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial color="#0f172a" roughness={0.8} />
        </mesh>
      ))}
      {/* Diagnostic Laptop on Top Tray */}
      <group position={[0, 1.0, 0]}>
        <mesh position={[0, 0.01, 0]}>
          <boxGeometry args={[0.36, 0.015, 0.26]} />
          <meshStandardMaterial color="#1e293b" metalness={0.7} />
        </mesh>
        <mesh position={[0, 0.12, -0.12]} rotation={[-0.35, 0, 0]}>
          <boxGeometry args={[0.36, 0.24, 0.015]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
        <mesh position={[0, 0.12, -0.11]} rotation={[-0.35, 0, 0]}>
          <planeGeometry args={[0.33, 0.21]} />
          <meshBasicMaterial color="#10b981" />
        </mesh>
      </group>
      {/* Coiled Blue Patch Cord on Middle Tray */}
      <mesh position={[0, 0.65, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.15, 0.025, 8, 16]} />
        <meshStandardMaterial color="#0284c7" roughness={0.6} />
      </mesh>
    </group>
  );
}

/* ─── Heavy Steel Safety Guardrails & Row Corner Bollards ─── */
function RowProtectionBollards() {
  const bollardPositions: [number, number][] = [
    [-6.2, 1.4],
    [-4.3, 1.4],
    [-6.2, 19.6],
    [-4.3, 19.6],
    [4.3, 1.4],
    [6.2, 1.4],
    [4.3, 19.6],
    [6.2, 19.6],
  ];

  return (
    <group>
      {bollardPositions.map(([bx, bz], idx) => (
        <group key={idx} position={[bx, 0, bz]}>
          <mesh position={[0, 0.45, 0]}>
            <cylinderGeometry args={[0.07, 0.07, 0.9, 12]} />
            <meshStandardMaterial color="#eab308" metalness={0.7} roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.7, 0]}>
            <cylinderGeometry args={[0.072, 0.072, 0.1, 12]} />
            <meshStandardMaterial color="#0f172a" />
          </mesh>
          <mesh position={[0, 0.35, 0]}>
            <cylinderGeometry args={[0.072, 0.072, 0.1, 12]} />
            <meshStandardMaterial color="#0f172a" />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* ─── Wall PDU Breaker Cabinets (Right Wall x = 14.5) ─── */
function WallBreakerCabinets() {
  return (
    <group position={[14.5, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
      {[5.5, 11, 16.5].map((zPos, idx) => (
        <group key={idx} position={[zPos, 2.2, 0]}>
          <mesh>
            <boxGeometry args={[1.6, 2.4, 0.25]} />
            <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.7, 0.13]}>
            <planeGeometry args={[1.2, 0.3]} />
            <meshBasicMaterial color="#022c22" />
          </mesh>
          <Text position={[0, 0.7, 0.14]} fontSize={0.08} color="#34d399" anchorX="center">
            {`PDU-${idx + 1} : 400V • 120A`}
          </Text>
          {Array.from({ length: 4 }).map((_, rIdx) => (
            <mesh key={rIdx} position={[0, 0.3 - rIdx * 0.28, 0.13]}>
              <boxGeometry args={[1.2, 0.12, 0.04]} />
              <meshStandardMaterial color="#334155" />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

export default function ServerRoomArea() {
  // Dense 4-row layout: 5 server racks per row = 20 high-density racks (z: 0 to 22)
  // Rows 0 & 1 face Cold Aisle 1 (at x = -5.25)
  // Rows 2 & 3 face Cold Aisle 2 (at x = +5.25)
  const rows = [
    { x: -7.0, zStart: 4.0, rot: [0, Math.PI / 2, 0], prefix: 'R-A' },
    { x: -3.5, zStart: 4.0, rot: [0, -Math.PI / 2, 0], prefix: 'R-B' },
    { x: 3.5, zStart: 4.0, rot: [0, Math.PI / 2, 0], prefix: 'R-C' },
    { x: 7.0, zStart: 4.0, rot: [0, -Math.PI / 2, 0], prefix: 'R-D' },
  ];

  return (
    <group position={[0, 0, 0]}>
      {/* ── Perforated Floor Airflow Tiles in Cold Aisles ── */}
      <mesh position={[-5.25, 0.012, 10.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.5, 17]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#0284c7"
          emissiveIntensity={0.25}
          roughness={0.4}
        />
      </mesh>
      <mesh position={[5.25, 0.012, 10.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[2.5, 17]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#0284c7"
          emissiveIntensity={0.25}
          roughness={0.4}
        />
      </mesh>

      {/* ── Cold Aisle Polycarbonate Containment Canopies ── */}
      <mesh position={[-5.25, 2.65, 10.5]}>
        <boxGeometry args={[2.8, 0.03, 17]} />
        <meshStandardMaterial color="#38bdf8" transparent opacity={0.22} roughness={0.1} />
      </mesh>
      <mesh position={[5.25, 2.65, 10.5]}>
        <boxGeometry args={[2.8, 0.03, 17]} />
        <meshStandardMaterial color="#38bdf8" transparent opacity={0.22} roughness={0.1} />
      </mesh>

      {/* Sliding End Containment Doors at Aisle Heads & Ends */}
      {[-5.25, 5.25].map((aisleX, idx) => (
        <group key={idx}>
          {/* Head Door (z = 2.4) */}
          <group position={[aisleX, 1.3, 2.4]}>
            <mesh>
              <boxGeometry args={[2.7, 2.6, 0.06]} />
              <meshStandardMaterial color="#0f172a" roughness={0.4} metalness={0.7} />
            </mesh>
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[2.4, 2.3, 0.08]} />
              <meshStandardMaterial color="#7dd3fc" transparent opacity={0.35} roughness={0.1} />
            </mesh>
          </group>

          {/* End Door (z = 18.6) */}
          <group position={[aisleX, 1.3, 18.6]}>
            <mesh>
              <boxGeometry args={[2.7, 2.6, 0.06]} />
              <meshStandardMaterial color="#0f172a" roughness={0.4} metalness={0.7} />
            </mesh>
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[2.4, 2.3, 0.08]} />
              <meshStandardMaterial color="#7dd3fc" transparent opacity={0.35} roughness={0.1} />
            </mesh>
          </group>
        </group>
      ))}

      {/* ── End-of-Row Power Distribution Units (RPP / PDU) ── */}
      <RowPDUCabinet position={[-7.0, 0, 1.8]} rotation={[0, Math.PI / 2, 0]} label="PDU-A1" />
      <RowPDUCabinet position={[-3.5, 0, 1.8]} rotation={[0, -Math.PI / 2, 0]} label="PDU-B1" />
      <RowPDUCabinet position={[3.5, 0, 1.8]} rotation={[0, Math.PI / 2, 0]} label="PDU-C1" />
      <RowPDUCabinet position={[7.0, 0, 1.8]} rotation={[0, -Math.PI / 2, 0]} label="PDU-D1" />

      <RowPDUCabinet position={[-7.0, 0, 19.2]} rotation={[0, Math.PI / 2, 0]} label="PDU-A2" />
      <RowPDUCabinet position={[-3.5, 0, 19.2]} rotation={[0, -Math.PI / 2, 0]} label="PDU-B2" />
      <RowPDUCabinet position={[3.5, 0, 19.2]} rotation={[0, Math.PI / 2, 0]} label="PDU-C2" />
      <RowPDUCabinet position={[7.0, 0, 19.2]} rotation={[0, -Math.PI / 2, 0]} label="PDU-D2" />

      {/* ── High-Efficiency Server Racks Matrix (5 per row = 20 Racks) ── */}
      {rows.map((row, rIdx) => (
        <group key={rIdx}>
          {Array.from({ length: 5 }).map((_, rackIdx) => {
            const z = row.zStart + rackIdx * 2.8;
            const isStorage = rackIdx === 4 && (rIdx === 1 || rIdx === 2);
            const isSwitch = rackIdx === 1 && (rIdx === 2 || rIdx === 0);
            const isTarget = rackIdx === 1 || rackIdx === 2 || rackIdx === 4;
            const label = `${row.prefix}-${String(rackIdx + 1).padStart(2, '0')}`;
            return (
              <ServerRack
                key={rackIdx}
                position={[row.x, 0, z]}
                rotation={row.rot as [number, number, number]}
                isStorage={isStorage}
                isSwitch={isSwitch}
                label={label}
                isTarget={isTarget}
              />
            );
          })}
        </group>
      ))}

      {/* ── Suspended Dual Cable Raceways (Yellow Fiber + Silver Mesh) ── */}
      <DualCableRaceway x={-5.25} zStart={1.8} zEnd={19.2} />
      <DualCableRaceway x={5.25} zStart={1.8} zEnd={19.2} />

      {/* Cross connector bridges spanning across the room */}
      {[5.5, 10.5, 15.5].map((bridgeZ, idx) => (
        <mesh key={idx} position={[0, 4.0, bridgeZ]}>
          <boxGeometry args={[14, 0.12, 0.35]} />
          <meshStandardMaterial color="#eab308" roughness={0.3} metalness={0.4} />
        </mesh>
      ))}

      {/* Suspended Aisle Identification Signs */}
      <group position={[-5.25, 3.1, 3.0]}>
        <mesh>
          <boxGeometry args={[2.2, 0.45, 0.05]} />
          <meshStandardMaterial color="#0b1120" />
        </mesh>
        <Text position={[0, 0, 0.03]} fontSize={0.13} color="#38bdf8" anchorX="center">
          ALLÉE A • BAIES 01-10
        </Text>
      </group>

      <group position={[5.25, 3.1, 3.0]}>
        <mesh>
          <boxGeometry args={[2.2, 0.45, 0.05]} />
          <meshStandardMaterial color="#0b1120" />
        </mesh>
        <Text position={[0, 0, 0.03]} fontSize={0.13} color="#38bdf8" anchorX="center">
          ALLÉE B • BAIES 11-20
        </Text>
      </group>

      {/* Wall Main Optical Distribution Frame (ODF / Patch Panel) */}
      <group position={[-14.5, 2.4, 11]} rotation={[0, Math.PI / 2, 0]}>
        <mesh>
          <boxGeometry args={[5.5, 2.2, 0.25]} />
          <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0, 0.13]}>
          <planeGeometry args={[5.2, 1.9]} />
          <meshStandardMaterial color="#0f172a" />
        </mesh>
        <Text position={[0, 0.85, 0.15]} fontSize={0.20} color="#38bdf8" anchorX="center">
          RÉPARTITEUR DE CÂBLES ET FIBRES OPTIQUES
        </Text>
      </group>

      {/* ── Wall PDU Breaker Cabinets along Right Wall (x = 14.5) ── */}
      <WallBreakerCabinets />

      {/* ── Heavy Steel Safety Crash Bollards on Row Corners ── */}
      <RowProtectionBollards />

      {/* ── Mobile Technician Diagnostics Crash Cart ── */}
      <TechnicianCrashCart position={[-2.8, 0, 17.5]} />

      {/* ── Grounded Interactive Markers (2 Essentiels) ── */}
      <InteractiveMarker
        id="server-rack"
        name="L’Armoire de Serveurs"
        position={[-7.0, 1.4, 6.8]}
        description="Une grande armoire métallique empilant des dizaines d’ordinateurs puissants reliés par double alimentation A+B."
      />
      <InteractiveMarker
        id="network-switch"
        name="Le Switch (L’Aiguilleur)"
        position={[3.5, 1.8, 6.8]}
        description="L’aiguilleur au sommet du rack qui connecte tous les serveurs entre eux et expédie les données vers Internet."
      />
    </group>
  );
}
