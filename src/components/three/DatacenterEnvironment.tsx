import React, { useMemo } from 'react';
import { Text } from '@react-three/drei';
import IntroductionArea from '../areas/IntroductionArea';
import ServerRoomArea from '../areas/ServerRoomArea';
import CoolingArea from '../areas/CoolingArea';
import ElectricalArea from '../areas/ElectricalArea';
import NetworkArea from '../areas/NetworkArea';
import SecurityArea from '../areas/SecurityArea';

/* ─── Wall Mounted Fire Extinguisher Station (Extincteur CO2) ─── */
function FireExtinguisherStation({ position, rotation = [0, 0, 0] }: { position: [number, number, number]; rotation?: [number, number, number] }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Red Wall Mount Plate */}
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[0.5, 0.8]} />
        <meshStandardMaterial color="#b91c1c" roughness={0.3} />
      </mesh>
      {/* CO2 Red Cylinder */}
      <mesh position={[0, -0.05, 0.14]}>
        <cylinderGeometry args={[0.08, 0.08, 0.5, 12]} />
        <meshStandardMaterial color="#dc2626" roughness={0.2} metalness={0.7} />
      </mesh>
      {/* Black Handle & Hose */}
      <mesh position={[0, 0.23, 0.14]}>
        <cylinderGeometry args={[0.02, 0.02, 0.1, 8]} />
        <meshStandardMaterial color="#0f172a" metalness={0.9} />
      </mesh>
      <Text position={[0, 0.32, 0.02]} fontSize={0.06} color="#ffffff" anchorX="center">
        EXTINCTEUR CO2
      </Text>
    </group>
  );
}

/* ─── Emergency Power Off (EPO) Push Button Station ─── */
function EmergencyStopButton({ position, rotation = [0, 0, 0] }: { position: [number, number, number]; rotation?: [number, number, number] }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Yellow Safety Wall Plate */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.3, 0.38, 0.04]} />
        <meshStandardMaterial color="#eab308" roughness={0.3} />
      </mesh>
      {/* Red Mushroom Push Button */}
      <mesh position={[0, 0, 0.045]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.08, 0.06, 0.05, 16]} />
        <meshStandardMaterial color="#dc2626" roughness={0.2} metalness={0.5} />
      </mesh>
      {/* Clear Protective Flip Guard */}
      <mesh position={[0, 0, 0.05]}>
        <boxGeometry args={[0.22, 0.22, 0.08]} />
        <meshStandardMaterial color="#38bdf8" transparent opacity={0.3} roughness={0.1} />
      </mesh>
      <Text position={[0, 0.14, 0.03]} fontSize={0.045} color="#0f172a" anchorX="center">
        ARRÊT D&apos;URGENCE
      </Text>
    </group>
  );
}

/* ─── Wall Mounted Digital Climate Sensor Station ─── */
function EnvironmentalSensorStation({ position, rotation = [0, 0, 0], temp = '20.8°C', hum = '46% RH' }: { position: [number, number, number]; rotation?: [number, number, number]; temp?: string; hum?: string }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Industrial White Housing */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.34, 0.45, 0.06]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.3} />
      </mesh>
      {/* Dark LCD Screen */}
      <mesh position={[0, 0.05, 0.032]}>
        <planeGeometry args={[0.28, 0.18]} />
        <meshBasicMaterial color="#022c22" />
      </mesh>
      {/* Glowing Green Digital Readout */}
      <Text position={[0, 0.08, 0.036]} fontSize={0.05} color="#34d399" anchorX="center">
        {temp}
      </Text>
      <Text position={[0, 0.02, 0.036]} fontSize={0.04} color="#6ee7b7" anchorX="center">
        {hum}
      </Text>
      {/* Status LED */}
      <mesh position={[-0.1, -0.12, 0.032]}>
        <circleGeometry args={[0.015, 8]} />
        <meshBasicMaterial color="#10b981" />
      </mesh>
      <Text position={[0.02, -0.12, 0.032]} fontSize={0.035} color="#475569" anchorX="center">
        SONDE CLIMATIQUE
      </Text>
    </group>
  );
}

/* ─── 360° Ceiling Surveillance Dome Camera ─── */
function SurveillanceDome({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* White Base Mount Ring */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.16, 0.18, 0.04, 16]} />
        <meshStandardMaterial color="#f1f5f9" roughness={0.3} />
      </mesh>
      {/* Smoked Dark Tinted Dome */}
      <mesh position={[0, -0.06, 0]}>
        <sphereGeometry args={[0.12, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#090d16" roughness={0.1} metalness={0.9} transparent opacity={0.88} />
      </mesh>
      {/* Blinking Green Active Status Indicator */}
      <mesh position={[0.08, -0.02, 0.08]}>
        <sphereGeometry args={[0.012, 8, 8]} />
        <meshBasicMaterial color="#10b981" />
      </mesh>
    </group>
  );
}

/* ─── Illuminated Green Emergency Exit Sign (BAES Évacuation) ─── */
function ExitSign({ position, rotation = [0, 0, 0] }: { position: [number, number, number]; rotation?: [number, number, number] }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh>
        <boxGeometry args={[0.7, 0.28, 0.08]} />
        <meshStandardMaterial color="#166534" emissive="#22c55e" emissiveIntensity={1.2} />
      </mesh>
      <Text position={[0, 0, 0.045]} fontSize={0.11} color="#ffffff" anchorX="center" anchorY="middle">
        SORTIE ➔
      </Text>
    </group>
  );
}

/* ─── Continuous Ceiling Linear LED Light Fixtures & Cable Raceways ─── */
function CeilingLightingGrid() {
  const lightZPositions = useMemo(() => {
    return [-18, -6, 6, 18, 30, 42, 54, 66, 78, 90, 102];
  }, []);

  return (
    <group position={[0, 5.85, 0]}>
      {/* Dual linear ceiling fixtures running along the main corridors */}
      {lightZPositions.map((z, idx) => (
        <group key={idx} position={[0, 0, z]}>
          {/* Left Luminaire Troffer */}
          <mesh position={[-5, 0, 0]}>
            <boxGeometry args={[0.4, 0.08, 7.5]} />
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2.5} toneMapped={false} />
          </mesh>
          {/* Right Luminaire Troffer */}
          <mesh position={[5, 0, 0]}>
            <boxGeometry args={[0.4, 0.08, 7.5]} />
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2.5} toneMapped={false} />
          </mesh>
        </group>
      ))}

      {/* Structural Suspended Cable Tray Traversals */}
      {lightZPositions.map((z, idx) => (
        <mesh key={`strut-${idx}`} position={[0, 0.15, z]}>
          <boxGeometry args={[28, 0.08, 0.08]} />
          <meshStandardMaterial color="#64748b" metalness={0.8} roughness={0.3} />
        </mesh>
      ))}
    </group>
  );
}

/* ─── Industrial Chilled Water Piping Network (Tuyauteries Aérauliques) ─── */
function IndustrialChilledWaterPiping() {
  return (
    <group position={[0, 0, 0]}>
      {/* Left Wall Overhead Run (z: 16 to 48) - Supply Blue Pipe */}
      <group position={[-13.8, 4.6, 32]}>
        {/* Main Blue Insulated Pipe */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.14, 0.14, 32, 16]} />
          <meshStandardMaterial color="#0284c7" metalness={0.6} roughness={0.3} />
        </mesh>
        {/* Flanged joint rings along the pipe */}
        {[-12, -4, 4, 12].map((pz, idx) => (
          <group key={idx} position={[0, 0, pz]}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.18, 0.18, 0.06, 16]} />
              <meshStandardMaterial color="#1e293b" metalness={0.9} />
            </mesh>
            {/* Red Valve Handwheel on middle joint */}
            {idx === 2 && (
              <group position={[0, 0.22, 0]}>
                <mesh rotation={[Math.PI / 2, 0, 0]}>
                  <torusGeometry args={[0.14, 0.02, 8, 16]} />
                  <meshStandardMaterial color="#dc2626" roughness={0.3} metalness={0.6} />
                </mesh>
                <mesh>
                  <cylinderGeometry args={[0.02, 0.02, 0.18, 8]} />
                  <meshStandardMaterial color="#475569" metalness={0.9} />
                </mesh>
              </group>
            )}
            {/* Round Pressure Gauge on joint 1 */}
            {idx === 1 && (
              <group position={[0, 0.18, 0]}>
                <mesh rotation={[0, 0, 0]}>
                  <cylinderGeometry args={[0.07, 0.07, 0.04, 16]} />
                  <meshStandardMaterial color="#ffffff" metalness={0.8} />
                </mesh>
                <mesh position={[0, 0, 0.022]}>
                  <circleGeometry args={[0.055, 16]} />
                  <meshBasicMaterial color="#ffffff" />
                </mesh>
              </group>
            )}
          </group>
        ))}
      </group>

      {/* Parallel Teal Return Water Pipe */}
      <group position={[-13.8, 5.15, 32]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.14, 0.14, 32, 16]} />
          <meshStandardMaterial color="#0d9488" metalness={0.6} roughness={0.3} />
        </mesh>
      </group>

      {/* Ceiling Gas Discharge Nozzles for Fire Extinction (Zones 2, 3, 6) */}
      {[10, 15, 30, 35, 75, 95, 102].map((nz, idx) => (
        <group key={`nozzle-${idx}`} position={[0, 5.75, nz]}>
          <mesh>
            <cylinderGeometry args={[0.025, 0.04, 0.12, 12]} />
            <meshStandardMaterial color="#d97706" metalness={0.9} roughness={0.2} />
          </mesh>
          <mesh position={[0, -0.07, 0]}>
            <sphereGeometry args={[0.025, 8, 8]} />
            <meshStandardMaterial color="#b45309" metalness={0.9} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* ─── Continuous Overhead Yellow FiberRunner & Wire Mesh Cable Trays ─── */
function OverheadCableInfrastructure() {
  return (
    <group position={[0, 5.1, 44]}>
      {/* Central Yellow Panduit FiberRunner Channel (z: -18 to 106 = 124m) */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.45, 0.15, 126]} />
        <meshStandardMaterial color="#eab308" roughness={0.35} metalness={0.2} />
      </mesh>
      {/* Black snap-on cover joint clips */}
      {Array.from({ length: 22 }).map((_, i) => (
        <mesh key={i} position={[0, 0.01, -60 + i * 5.8]}>
          <boxGeometry args={[0.49, 0.17, 0.12]} />
          <meshStandardMaterial color="#0f172a" metalness={0.8} />
        </mesh>
      ))}

      {/* Left & Right Galvanized Wire Mesh Trays with Blue Ethernet Cable Bundles */}
      {[-2.8, 2.8].map((trayX, idx) => (
        <group key={idx} position={[trayX, 0, 0]}>
          {/* Wire Basket Tray Frame */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.65, 0.12, 126]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.85} roughness={0.25} wireframe={false} />
          </mesh>
          {/* Internal Blue Cable Bundles */}
          <mesh position={[0, 0.03, 0]}>
            <boxGeometry args={[0.55, 0.08, 124]} />
            <meshStandardMaterial color="#0284c7" roughness={0.6} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

/* ─── Architectural Portal Signage between Zones ─── */
function AreaPortal({
  z,
  areaNumber,
  title,
  subtitle,
}: {
  z: number;
  areaNumber: string;
  title: string;
  subtitle: string;
}) {
  return (
    <group position={[0, 0, z]}>
      {/* Structural Portal Archway */}
      <mesh position={[-11, 3, 0]}>
        <boxGeometry args={[1.4, 6, 0.8]} />
        <meshStandardMaterial color="#1e293b" roughness={0.4} metalness={0.7} />
      </mesh>
      <mesh position={[11, 3, 0]}>
        <boxGeometry args={[1.4, 6, 0.8]} />
        <meshStandardMaterial color="#1e293b" roughness={0.4} metalness={0.7} />
      </mesh>

      {/* Top Header Lintel Beam */}
      <mesh position={[0, 5.6, 0]}>
        <boxGeometry args={[23.4, 0.8, 0.8]} />
        <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Modern High-Contrast Signage Backplate */}
      <mesh position={[0, 5.2, 0.42]}>
        <planeGeometry args={[14, 0.7]} />
        <meshStandardMaterial color="#0b1120" roughness={0.2} metalness={0.8} />
      </mesh>

      {/* Cyan LED Accent Trim */}
      <mesh position={[0, 4.84, 0.43]}>
        <boxGeometry args={[14, 0.04, 0.02]} />
        <meshBasicMaterial color="#38bdf8" />
      </mesh>

      {/* Clean Crisp Text Signage */}
      <Text
        position={[0, 5.35, 0.44]}
        fontSize={0.28}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.06}
      >
        {`${areaNumber} • ${title}`}
      </Text>
      <Text
        position={[0, 5.04, 0.44]}
        fontSize={0.16}
        color="#38bdf8"
        anchorX="center"
        anchorY="middle"
      >
        {subtitle}
      </Text>

      {/* Green Emergency Exit BAES on each portal */}
      <ExitSign position={[9.5, 4.6, 0.42]} />

      {/* Surveillance Dome under portal archway */}
      <SurveillanceDome position={[0, 5.15, 0.35]} />

      {/* Emergency Power Off button on left portal column */}
      <EmergencyStopButton position={[-10.2, 1.4, 0.45]} rotation={[0, 0, 0]} />

      {/* Environmental Climate Sensor Station on right portal column */}
      <EnvironmentalSensorStation position={[10.2, 1.5, 0.45]} />
    </group>
  );
}

/* ─── Compact Raised Floor with Perforated Cold Tiles ─── */
function RealisticRaisedFloor() {
  return (
    <group position={[0, 0, 44]}>
      {/* Base Light-Gray Anti-Static Technical Floor (z: -22 to 110) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[30, 134]} />
        <meshStandardMaterial
          color="#94a3b8"
          roughness={0.35}
          metalness={0.2}
        />
      </mesh>

      {/* Central Matte Walkway Corridor */}
      <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.5, 134]} />
        <meshStandardMaterial
          color="#cbd5e1"
          roughness={0.25}
          metalness={0.1}
        />
      </mesh>

      {/* High-visibility yellow safety boundary stripes */}
      <mesh position={[-2.3, 0.008, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.08, 134]} />
        <meshBasicMaterial color="#f59e0b" />
      </mesh>
      <mesh position={[2.3, 0.008, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.08, 134]} />
        <meshBasicMaterial color="#f59e0b" />
      </mesh>

      {/* Rows of Perforated Air Vent Tiles in Server Rows (x = -5.25 and +5.25) */}
      {[-5.25, 5.25].map((tileX, idx) => (
        <group key={idx}>
          {Array.from({ length: 18 }).map((_, tIdx) => (
            <group key={tIdx} position={[tileX, 0.007, -35 + tIdx * 2.8]}>
              {/* 60x60cm Perforated steel tile plate */}
              <mesh rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[1.2, 2.2]} />
                <meshStandardMaterial color="#475569" roughness={0.4} metalness={0.7} />
              </mesh>
              {/* Cold Air Intake Vent Mesh simulation */}
              <mesh position={[0, 0.001, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[1.0, 2.0]} />
                <meshStandardMaterial color="#0f172a" roughness={0.8} />
              </mesh>
              {/* Subtle Cyan Underfloor Cold Air Glow */}
              <mesh position={[0, 0.002, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[0.9, 1.8]} />
                <meshBasicMaterial color="#38bdf8" transparent opacity={0.15} />
              </mesh>
            </group>
          ))}
        </group>
      ))}

      {/* ── Executive NOC Command Center Anti-Static Flooring Inlay (z: 88.5 to 108) ── */}
      <mesh position={[0, 0.009, 54.25]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[29.2, 19.5]} />
        <meshStandardMaterial color="#0b1120" roughness={0.85} metalness={0.15} />
      </mesh>
      {/* Cyan Floor Edge Accent Line dividing Server Room from NOC */}
      <mesh position={[0, 0.011, 44.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[29.2, 0.08]} />
        <meshBasicMaterial color="#38bdf8" />
      </mesh>
    </group>
  );
}

/* ─── Ultra-Detailed Industrial Rear Wall & Emergency Exits (z = 108) ─── */
function RearSecurityWall() {
  return (
    <group position={[0, 0, 108]}>
      {/* Main Structural Perimeter Concrete & Steel Wall */}
      <mesh position={[0, 3.0, 0]}>
        <boxGeometry args={[30, 6.0, 0.6]} />
        <meshStandardMaterial color="#1e293b" roughness={0.6} />
      </mesh>

      {/* Cyan Baseboard Architectural Trim */}
      <mesh position={[0, 0.15, -0.31]}>
        <boxGeometry args={[29.8, 0.25, 0.05]} />
        <meshStandardMaterial color="#0f172a" metalness={0.8} />
      </mesh>
      <mesh position={[0, 0.28, -0.32]}>
        <boxGeometry args={[29.8, 0.03, 0.02]} />
        <meshBasicMaterial color="#38bdf8" />
      </mesh>

      {/* Dual Heavy Emergency Fire Exit Doors (x = -10.5 and +10.5) */}
      {[-10.5, 10.5].map((doorX, idx) => (
        <group key={idx} position={[doorX, 0, -0.31]}>
          {/* Heavy Steel Door Frame */}
          <mesh position={[0, 1.4, 0]}>
            <boxGeometry args={[2.4, 2.8, 0.08]} />
            <meshStandardMaterial color="#0b1120" metalness={0.9} />
          </mesh>
          {/* Double Door Leaf */}
          <mesh position={[-0.55, 1.35, 0.01]}>
            <boxGeometry args={[1.05, 2.6, 0.04]} />
            <meshStandardMaterial color="#334155" roughness={0.4} metalness={0.6} />
          </mesh>
          <mesh position={[0.55, 1.35, 0.01]}>
            <boxGeometry args={[1.05, 2.6, 0.04]} />
            <meshStandardMaterial color="#334155" roughness={0.4} metalness={0.6} />
          </mesh>
          {/* Red Emergency Panic Push Bars */}
          <mesh position={[-0.55, 1.1, 0.05]}>
            <boxGeometry args={[0.9, 0.06, 0.06]} />
            <meshStandardMaterial color="#dc2626" roughness={0.3} />
          </mesh>
          <mesh position={[0.55, 1.1, 0.05]}>
            <boxGeometry args={[0.9, 0.06, 0.06]} />
            <meshStandardMaterial color="#dc2626" roughness={0.3} />
          </mesh>
          {/* Illuminated Exit Sign */}
          <mesh position={[0, 2.95, 0.02]}>
            <boxGeometry args={[1.2, 0.35, 0.06]} />
            <meshStandardMaterial color="#166534" emissive="#22c55e" emissiveIntensity={1.2} />
          </mesh>
          <Text position={[0, 2.95, 0.06]} fontSize={0.11} color="#ffffff" anchorX="center" anchorY="middle">
            ISSUE DE SECOURS
          </Text>
        </group>
      ))}

      {/* Vertical Industrial Cable Riser Chases descending from ceiling */}
      {[-13.5, -7.5, 7.5, 13.5].map((cx, idx) => (
        <group key={idx} position={[cx, 3.0, -0.32]}>
          <mesh>
            <boxGeometry args={[0.4, 5.8, 0.08]} />
            <meshStandardMaterial color="#64748b" metalness={0.85} roughness={0.3} />
          </mesh>
          {/* Fastening Brackets */}
          {[-2.0, -0.5, 1.0, 2.2].map((by, bIdx) => (
            <mesh key={bIdx} position={[0, by, 0.04]}>
              <boxGeometry args={[0.46, 0.08, 0.03]} />
              <meshStandardMaterial color="#0f172a" metalness={0.9} />
            </mesh>
          ))}
        </group>
      ))}

      {/* Secondary Power Distribution Sub-Panel on Rear Wall */}
      <group position={[0, 1.5, -0.32]}>
        <mesh>
          <boxGeometry args={[1.2, 1.6, 0.15]} />
          <meshStandardMaterial color="#1e293b" metalness={0.7} />
        </mesh>
        <Text position={[0, 0.65, 0.09]} fontSize={0.07} color="#38bdf8" anchorX="center">
          TGBT SECOURS NOC
        </Text>
        {/* Status Pilot Lamps */}
        {[-0.3, 0, 0.3].map((lx, lIdx) => (
          <mesh key={lIdx} position={[lx, 0.45, 0.09]}>
            <circleGeometry args={[0.03, 10]} />
            <meshBasicMaterial color={lIdx === 2 ? '#eab308' : '#10b981'} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

export default function DatacenterEnvironment() {
  return (
    <group>
      {/* ── High-Performance Daylight Architectural Lighting ── */}
      <ambientLight intensity={1.35} color="#f8fafc" />

      {/* Overhead Directional Lights covering compact zones */}
      <directionalLight position={[0, 25, -12]} intensity={1.2} color="#ffffff" />
      <directionalLight position={[15, 30, 15]} intensity={1.25} color="#ffffff" />
      <directionalLight position={[-15, 30, 38]} intensity={1.2} color="#f8fafc" />
      <directionalLight position={[15, 30, 60]} intensity={1.25} color="#ffffff" />
      <directionalLight position={[-15, 30, 80]} intensity={1.2} color="#f8fafc" />
      <directionalLight position={[0, 30, 100]} intensity={1.15} color="#f0f9ff" />

      {/* ── Compact Raised Floor with Perforated Tiles ── */}
      <RealisticRaisedFloor />

      {/* ── Suspended Technical Ceiling with Lighting Grid ── */}
      <mesh position={[0, 6.0, 44]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[30, 134]} />
        <meshStandardMaterial color="#1e293b" roughness={0.8} />
      </mesh>

      {/* Continuous Luminaire & Light Lineups */}
      <CeilingLightingGrid />

      {/* Overhead Cable Trays & Yellow FiberRunner Raceway */}
      <OverheadCableInfrastructure />

      {/* Industrial Chilled Water Pipe Runs & Fire Nozzles */}
      <IndustrialChilledWaterPiping />

      {/* ── Insulated Architectural Wall Panels ── */}
      <mesh position={[-15, 3.0, 44]}>
        <boxGeometry args={[0.6, 6.0, 134]} />
        <meshStandardMaterial color="#334155" roughness={0.5} metalness={0.3} />
      </mesh>
      <mesh position={[-14.65, 0.15, 44]}>
        <boxGeometry args={[0.1, 0.3, 134]} />
        <meshStandardMaterial color="#0f172a" metalness={0.8} />
      </mesh>

      <mesh position={[15, 3.0, 44]}>
        <boxGeometry args={[0.6, 6.0, 134]} />
        <meshStandardMaterial color="#334155" roughness={0.5} metalness={0.3} />
      </mesh>
      <mesh position={[14.65, 0.15, 44]}>
        <boxGeometry args={[0.1, 0.3, 134]} />
        <meshStandardMaterial color="#0f172a" metalness={0.8} />
      </mesh>

      {/* Rear Security Wall (z = 108) with Emergency Exit Doors & Cable Chases */}
      <RearSecurityWall />

      {/* Wall Mounted Safety Stations */}
      <FireExtinguisherStation position={[-14.65, 1.6, 10]} rotation={[0, Math.PI / 2, 0]} />
      <FireExtinguisherStation position={[14.65, 1.6, 32]} rotation={[0, -Math.PI / 2, 0]} />
      <FireExtinguisherStation position={[-14.65, 1.6, 54]} rotation={[0, Math.PI / 2, 0]} />
      <FireExtinguisherStation position={[14.65, 1.6, 76]} rotation={[0, -Math.PI / 2, 0]} />
      <FireExtinguisherStation position={[-14.65, 1.6, 98]} rotation={[0, Math.PI / 2, 0]} />

      {/* ── Compact Architectural Portals Between Areas ── */}
      <AreaPortal
        z={0}
        areaNumber="ZONE 02"
        title="SALLE DES SERVEURS"
        subtitle="Baies de Serveurs • Ordinateurs de Calcul • Switchs Réseau"
      />
      <AreaPortal
        z={22}
        areaNumber="ZONE 03"
        title="REFROIDISSEMENT & CLIMATISATION"
        subtitle="Allée Froide 20°C • Climatiseurs Industriels • Gestion de la Chaleur"
      />
      <AreaPortal
        z={44}
        areaNumber="ZONE 04"
        title="INFRASTRUCTURE ÉLECTRIQUE"
        subtitle="Onduleurs & Batteries (Secours 0 ms) • Groupes Diesel (72h)"
      />
      <AreaPortal
        z={66}
        areaNumber="ZONE 05"
        title="CONNEXION INTERNET & RÉSEAU"
        subtitle="Fibres Optiques Mondiales • Multi-Opérateurs • Bouclier Pare-Feu"
      />
      <AreaPortal
        z={88}
        areaNumber="ZONE 06"
        title="SURVEILLANCE & SÉCURITÉ INCENDIE"
        subtitle="Mur d’Écrans 24/7 • Veille Humaine NOC • Extinction au Gaz sans Eau"
      />

      {/* ── 6 Main Educational Areas ── */}
      <IntroductionArea />
      <ServerRoomArea />
      <CoolingArea />
      <ElectricalArea />
      <NetworkArea />
      <SecurityArea />
    </group>
  );
}
