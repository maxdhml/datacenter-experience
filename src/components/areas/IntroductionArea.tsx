import React from 'react';
import { Text } from '@react-three/drei';
import InteractiveMarker from '../three/InteractiveMarker';

/* ─── Modern Architectural Visitor Lounge & Waiting Area ─── */
function VisitorLounge({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Dark Slate Modular Leather Sofa (L-Shape / Bench) */}
      {/* Main Bench */}
      <mesh position={[0, 0.42, 0]}>
        <boxGeometry args={[3.2, 0.45, 1.0]} />
        <meshStandardMaterial color="#1e293b" roughness={0.6} />
      </mesh>
      {/* Backrest */}
      <mesh position={[0, 0.85, -0.42]}>
        <boxGeometry args={[3.2, 0.5, 0.16]} />
        <meshStandardMaterial color="#0f172a" roughness={0.5} />
      </mesh>
      {/* Plush Cushion Seating Plates */}
      {[-1.0, 0, 1.0].map((cx, idx) => (
        <mesh key={idx} position={[cx, 0.66, 0.05]}>
          <boxGeometry args={[0.95, 0.08, 0.85]} />
          <meshStandardMaterial color="#334155" roughness={0.4} />
        </mesh>
      ))}

      {/* Modern Frosted Glass Coffee Table */}
      <group position={[0, 0, 1.3]}>
        {/* Glass Top */}
        <mesh position={[0, 0.4, 0]}>
          <boxGeometry args={[1.8, 0.04, 0.9]} />
          <meshStandardMaterial color="#bae6fd" transparent opacity={0.45} roughness={0.1} />
        </mesh>
        {/* Chrome Legs */}
        {[
          [-0.8, -0.35],
          [0.8, -0.35],
          [-0.8, 0.35],
          [0.8, 0.35],
        ].map(([lx, lz], idx) => (
          <mesh key={idx} position={[lx, 0.2, lz]}>
            <cylinderGeometry args={[0.025, 0.025, 0.4, 8]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.2} />
          </mesh>
        ))}
      </group>

      {/* Modern Architectural Indoor Planters (Geometric Charcoal Box + Foliage) */}
      <group position={[-2.2, 0, 0]}>
        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[0.7, 1.0, 0.7]} />
          <meshStandardMaterial color="#0f172a" roughness={0.4} />
        </mesh>
        {/* Stylized Geometric Plant Foliage */}
        <mesh position={[0, 1.25, 0]}>
          <sphereGeometry args={[0.42, 8, 8]} />
          <meshStandardMaterial color="#15803d" roughness={0.7} />
        </mesh>
      </group>
      <group position={[2.2, 0, 0]}>
        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[0.7, 1.0, 0.7]} />
          <meshStandardMaterial color="#0f172a" roughness={0.4} />
        </mesh>
        <mesh position={[0, 1.25, 0]}>
          <sphereGeometry args={[0.42, 8, 8]} />
          <meshStandardMaterial color="#16a34a" roughness={0.7} />
        </mesh>
      </group>

      {/* Wall Mounted Interactive Welcome Kiosk */}
      <group position={[0, 2.4, -1.9]}>
        <mesh>
          <boxGeometry args={[2.0, 1.1, 0.08]} />
          <meshStandardMaterial color="#0f172a" metalness={0.8} />
        </mesh>
        <mesh position={[0, 0, 0.045]}>
          <planeGeometry args={[1.9, 1.0]} />
          <meshStandardMaterial color="#0284c7" emissive="#0284c7" emissiveIntensity={0.6} />
        </mesh>
        <Text position={[0, 0.25, 0.05]} fontSize={0.11} color="#ffffff" anchorX="center">
          BORNE D&apos;ACCUEIL VISITEURS
        </Text>
        <Text position={[0, 0.02, 0.05]} fontSize={0.075} color="#e0f2fe" anchorX="center">
          Pièce d&apos;identité requise • Port du badge obligatoire
        </Text>
        <Text position={[0, -0.22, 0.05]} fontSize={0.07} color="#34d399" anchorX="center">
          Visites accompagnées uniquement • Enregistrement OK
        </Text>
      </group>
    </group>
  );
}

/* ─── Architectural 3D Campus Scale Model Showcase (Maquette du Site) ─── */
function CampusModelShowcase({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Heavy Black Pedestal Base */}
      <mesh position={[0, 0.55, 0]}>
        <boxGeometry args={[2.4, 1.1, 1.6]} />
        <meshStandardMaterial color="#0b1120" roughness={0.3} metalness={0.7} />
      </mesh>
      {/* Brushed Metal Top Trim */}
      <mesh position={[0, 1.12, 0]}>
        <boxGeometry args={[2.46, 0.04, 1.66]} />
        <meshStandardMaterial color="#475569" metalness={0.8} />
      </mesh>

      {/* Protective Transparent Acrylic Glass Display Box */}
      <mesh position={[0, 1.55, 0]}>
        <boxGeometry args={[2.3, 0.8, 1.5]} />
        <meshStandardMaterial color="#38bdf8" transparent opacity={0.22} roughness={0.1} />
      </mesh>

      {/* ── Miniature Architectural Datacenter Campus Inside Showcase ── */}
      {/* Terrain Plate */}
      <mesh position={[0, 1.15, 0]}>
        <boxGeometry args={[2.2, 0.02, 1.4]} />
        <meshStandardMaterial color="#334155" roughness={0.8} />
      </mesh>
      {/* Main Datacenter Building Mini-Block */}
      <mesh position={[-0.3, 1.3, 0]}>
        <boxGeometry args={[1.2, 0.28, 0.8]} />
        <meshStandardMaterial color="#0284c7" emissive="#0369a1" emissiveIntensity={0.4} />
      </mesh>
      {/* High-Voltage Substation Block */}
      <mesh position={[0.65, 1.25, -0.2]}>
        <boxGeometry args={[0.4, 0.18, 0.35]} />
        <meshStandardMaterial color="#f59e0b" roughness={0.5} />
      </mesh>
      {/* Outdoor Cooling Chiller Units */}
      {[-0.3, 0, 0.3].map((cx, idx) => (
        <mesh key={idx} position={[cx, 1.46, 0]}>
          <boxGeometry args={[0.2, 0.06, 0.3]} />
          <meshStandardMaterial color="#64748b" metalness={0.8} />
        </mesh>
      ))}

      {/* Brass Label Plaque on Pedestal Front */}
      <mesh position={[0, 0.8, 0.81]}>
        <planeGeometry args={[1.6, 0.22]} />
        <meshStandardMaterial color="#ca8a04" metalness={0.9} roughness={0.2} />
      </mesh>
      <Text position={[0, 0.8, 0.82]} fontSize={0.06} color="#000000" anchorX="center" anchorY="middle">
        CAMPUS DATACENTER • SURFACE 15 000 m²
      </Text>
    </group>
  );
}

/* ─── High-Security Optical Turnstile Speed-Gates (Sas Portillons) ─── */
function SpeedGateTurnstiles({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* 3 Stainless Steel Turnstile Cabinets */}
      {[-2.2, 0, 2.2].map((x, idx) => (
        <group key={idx} position={[x, 0, 0]}>
          {/* Main Pedestal */}
          <mesh position={[0, 1.0, 0]}>
            <boxGeometry args={[0.3, 2.0, 1.5]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.15} />
          </mesh>
          {/* Top Black Glass Reader Cap */}
          <mesh position={[0, 2.02, 0]}>
            <boxGeometry args={[0.28, 0.04, 1.46]} />
            <meshStandardMaterial color="#0b1120" roughness={0.1} metalness={0.9} />
          </mesh>
          {/* Glowing Passage Authorization Indicator (Green Arrow / LED) */}
          <mesh position={[0, 2.04, -0.4]}>
            <boxGeometry args={[0.16, 0.01, 0.2]} />
            <meshBasicMaterial color="#10b981" />
          </mesh>
          <mesh position={[0, 2.04, 0.4]}>
            <boxGeometry args={[0.16, 0.01, 0.2]} />
            <meshBasicMaterial color="#10b981" />
          </mesh>
        </group>
      ))}

      {/* Retractable Clear Glass Swing Barrier Wings */}
      <mesh position={[-1.1, 1.0, 0]}>
        <boxGeometry args={[1.7, 1.5, 0.04]} />
        <meshStandardMaterial color="#38bdf8" transparent opacity={0.35} roughness={0.1} />
      </mesh>
      <mesh position={[1.1, 1.0, 0]}>
        <boxGeometry args={[1.7, 1.5, 0.04]} />
        <meshStandardMaterial color="#38bdf8" transparent opacity={0.35} roughness={0.1} />
      </mesh>

      {/* Lateral Chrome Guidance Barriers on Outer Perimeter */}
      {[-3.8, 3.8].map((rx, idx) => (
        <group key={idx} position={[rx, 0, 0]}>
          <mesh position={[0, 0.6, 0]}>
            <boxGeometry args={[0.08, 1.2, 2.2]} />
            <meshStandardMaterial color="#cbd5e1" metalness={0.8} roughness={0.2} />
          </mesh>
          <mesh position={[0, 1.22, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.035, 0.035, 2.2, 10]} />
            <meshStandardMaterial color="#94a3b8" metalness={0.9} />
          </mesh>
        </group>
      ))}

      {/* Floor Guidance Line */}
      <mesh position={[0, 0.008, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[7.2, 3.0]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.08} />
      </mesh>
    </group>
  );
}

export default function IntroductionArea() {
  return (
    <group position={[0, 0, 0]}>
      {/* ── Exterior Facade (z = -22) ── */}
      <mesh position={[0, 5, -22]}>
        <boxGeometry args={[30, 10, 1.2]} />
        <meshStandardMaterial color="#1e293b" roughness={0.4} metalness={0.6} />
      </mesh>

      {/* Main Entrance Signage */}
      <group position={[0, 6.8, -21.3]}>
        <mesh>
          <boxGeometry args={[14, 1.8, 0.15]} />
          <meshStandardMaterial color="#0b1120" roughness={0.2} metalness={0.9} />
        </mesh>
        <Text
          position={[0, 0.28, 0.1]}
          fontSize={0.45}
          color="#38bdf8"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.05}
        >
          LE DATACENTER
        </Text>
        <Text
          position={[0, -0.28, 0.1]}
          fontSize={0.22}
          color="#94a3b8"
          anchorX="center"
          anchorY="middle"
        >
          BÂTIMENT SÉCURISÉ • FONCTIONNEMENT PERMANENT 24H/24
        </Text>
      </group>

      {/* Double Automatic Glazed Sliding Entrance (z = -18) */}
      <mesh position={[-6.5, 2.8, -18]}>
        <boxGeometry args={[10, 5.6, 0.2]} />
        <meshStandardMaterial color="#38bdf8" transparent opacity={0.25} roughness={0.1} />
      </mesh>
      <mesh position={[6.5, 2.8, -18]}>
        <boxGeometry args={[10, 5.6, 0.2]} />
        <meshStandardMaterial color="#38bdf8" transparent opacity={0.25} roughness={0.1} />
      </mesh>
      {/* Door Frame Structure */}
      <mesh position={[0, 2.8, -18]}>
        <boxGeometry args={[3.6, 5.6, 0.4]} />
        <meshStandardMaterial color="#334155" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Clear Glass Door Leaves */}
      <mesh position={[-0.8, 2.6, -17.9]}>
        <boxGeometry args={[1.5, 5.2, 0.06]} />
        <meshStandardMaterial color="#bae6fd" transparent opacity={0.35} roughness={0.1} />
      </mesh>
      <mesh position={[0.8, 2.6, -17.9]}>
        <boxGeometry args={[1.5, 5.2, 0.06]} />
        <meshStandardMaterial color="#bae6fd" transparent opacity={0.35} roughness={0.1} />
      </mesh>

      {/* ── Polished Lobby Flooring Inlay (z: -18 to 0) ── */}
      <mesh position={[0, 0.015, -10]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[26, 16]} />
        <meshStandardMaterial color="#e2e8f0" roughness={0.2} metalness={0.1} />
      </mesh>
      {/* Dark Granite Walkway Perimeter Trim */}
      <mesh position={[0, 0.016, -10]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[7.0, 16]} />
        <meshStandardMaterial color="#cbd5e1" roughness={0.3} />
      </mesh>

      {/* ── Reception Security Desk (z: -10) ── */}
      <group position={[0, 0, -10]}>
        <mesh position={[0, 1.1, 0]}>
          <boxGeometry args={[7.2, 1.2, 1.6]} />
          <meshStandardMaterial color="#1e293b" roughness={0.3} metalness={0.6} />
        </mesh>
        <mesh position={[0, 1.72, 0]}>
          <boxGeometry args={[7.6, 0.08, 1.8]} />
          <meshStandardMaterial color="#ffffff" roughness={0.1} />
        </mesh>
        <mesh position={[0, 0.12, 0.82]}>
          <boxGeometry args={[7.2, 0.06, 0.02]} />
          <meshBasicMaterial color="#38bdf8" />
        </mesh>
        {/* Operator Desktop Screens */}
        <mesh position={[-1.8, 2.15, -0.2]} rotation={[0, 0.15, 0]}>
          <boxGeometry args={[1.0, 0.65, 0.04]} />
          <meshStandardMaterial color="#0284c7" emissive="#0369a1" emissiveIntensity={0.8} />
        </mesh>
        <mesh position={[1.8, 2.15, -0.2]} rotation={[0, -0.15, 0]}>
          <boxGeometry args={[1.0, 0.65, 0.04]} />
          <meshStandardMaterial color="#0284c7" emissive="#0369a1" emissiveIntensity={0.8} />
        </mesh>
      </group>

      {/* ── Right Wing: Modern Visitor Lounge & Waiting Area ── */}
      <VisitorLounge position={[9.2, 0, -10]} />

      {/* ── Left Wing: Campus 3D Scale Model & Information Showcase ── */}
      <CampusModelShowcase position={[-9.2, 0, -10]} />

      {/* ── High-Security Turnstile Speed-Gates (z = -2.5) ── */}
      <SpeedGateTurnstiles position={[0, 0, -2.5]} />

      {/* Wall Overview Panel */}
      <group position={[-14.5, 3.0, -10]} rotation={[0, Math.PI / 2, 0]}>
        <mesh>
          <planeGeometry args={[6.4, 3.2]} />
          <meshStandardMaterial color="#0b1120" roughness={0.2} metalness={0.8} />
        </mesh>
        <Text position={[0, 1.1, 0.05]} fontSize={0.22} color="#ffffff" anchorX="center">
          VUE D&apos;ENSEMBLE DU SITE
        </Text>
        <Text position={[0, 0.7, 0.05]} fontSize={0.15} color="#38bdf8" anchorX="center">
          Superficie : 15 000 m² • Alimentation continue secourue
        </Text>
        <Text position={[0, 0.2, 0.05]} fontSize={0.13} color="#94a3b8" anchorX="center">
          Accès sécurisé 24h/24 • Réseau de fibres optiques mondiales
        </Text>
      </group>

      {/* ── Grounded Interactive Markers (2 Essentiels) ── */}
      <InteractiveMarker
        id="datacenter-building"
        name="Le Bâtiment Sécurisé"
        position={[0, 1.4, -18.5]}
        description="Une véritable forteresse conçue pour faire tourner Internet 24h/24 sans jamais s'arrêter."
      />
      <InteractiveMarker
        id="access-control"
        name="Le Sas de Sécurité"
        position={[0, 1.2, -2.5]}
        description="Sas à double porte interdisant de passer à deux pour bloquer tout intrus."
      />
    </group>
  );
}
