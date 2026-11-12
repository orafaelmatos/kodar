"use client";

import { useState, type CSSProperties } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Database,
  MessageSquare,
  MoveHorizontal,
  PackageCheck,
  Send,
} from "lucide-react";
import { services } from "@/content/services";
import { whatsappUrl } from "@/config/site";

const steps = [
  {
    icon: MessageSquare,
    manual: "Pedido na conversa",
    connected: "Pedido recebido",
    x: -12,
    y: -55,
    rotation: -9,
  },
  {
    icon: Database,
    manual: "Copiar para a planilha",
    connected: "Sistema atualizado",
    x: 10,
    y: 48,
    rotation: 8,
  },
  {
    icon: PackageCheck,
    manual: "Conferir o estoque",
    connected: "Estoque conferido",
    x: -8,
    y: -32,
    rotation: -5,
  },
  { icon: Send, manual: "Avisar cada pessoa", connected: "Equipe avisada", x: 6, y: 50, rotation: 9 },
];

export function Solutions() {
  const [progress, setProgress] = useState(0);
  const connected = progress >= 65;
  return (
    <section
      id="na-pratica"
      className="playground-section bg-noite text-papel"
      aria-labelledby="playground-title"
    >
      <div className="experience-container">
        <div className="playground-heading" data-reveal>
          <p className="section-index label">02 / Experimente a diferença</p>
          <div>
            <h2 id="playground-title" className="font-display text-display-l">
              O trabalho flui.
              <br />
              Você segue em frente.
            </h2>
            <p className="mt-6 max-w-md text-body-l text-papel/75">
              Uma tarefa puxa outra. A tecnologia pode cuidar do caminho entre elas.
            </p>
          </div>
        </div>
        <div
          className={`flow-experiment ${connected ? "flow-experiment--connected" : ""}`}
          style={{ "--chaos": 1 - progress / 100, "--connection": progress / 100 } as CSSProperties}
        >
          <div className="flow-state">
            <span className="label">{connected ? "Um fluxo conectado" : "Uma rotina espalhada"}</span>
            <span className="label">
              Interaja abaixo <ArrowRight size={14} aria-hidden="true" />
            </span>
          </div>
          <div
            className="flow-scene"
            aria-label={
              connected
                ? "As quatro etapas estão conectadas em um fluxo organizado"
                : "Quatro tarefas manuais estão separadas"
            }
          >
            <svg
              className="flow-path flow-path--desktop"
              viewBox="0 0 1000 360"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path d="M140 180H860" />
            </svg>
            <svg
              className="flow-path flow-path--mobile"
              viewBox="0 0 1000 360"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path d="M250 108H750V252H250" />
            </svg>
            {steps.map(({ icon: Icon, manual, connected: label, x, y, rotation }, index) => (
              <div
                key={manual}
                className={`flow-node flow-node--${index}`}
                style={
                  {
                    "--scatter-x": `${x}px`,
                    "--scatter-y": `${y}px`,
                    "--scatter-angle": `${rotation}deg`,
                  } as CSSProperties
                }
              >
                <span className="flow-node-number label">0{index + 1}</span>
                <Icon size={24} strokeWidth={1.5} aria-hidden="true" />
                <p className="text-body-s">{connected ? label : manual}</p>
                <span className="flow-node-indicator" />
              </div>
            ))}
            <div className="flow-signal" aria-hidden="true" />
          </div>
          <div className="flow-controls">
            <button
              type="button"
              className={`flow-mode text-body-s ${!connected ? "flow-mode--active" : ""}`}
              onClick={() => setProgress(0)}
            >
              Rotina manual
            </button>
            <div className="flow-range-wrap">
              <label htmlFor="flow-range" className="label">
                <MoveHorizontal size={16} aria-hidden="true" />
                Arraste para conectar
              </label>
              <input
                id="flow-range"
                type="range"
                min="0"
                max="100"
                value={progress}
                aria-label="Conectar as etapas do processo"
                aria-valuetext={`${progress}% conectado`}
                onChange={(event) => setProgress(Number(event.target.value))}
              />
            </div>
            <button
              type="button"
              className={`flow-mode text-body-s ${connected ? "flow-mode--active" : ""}`}
              onClick={() => setProgress(100)}
            >
              Rotina conectada
            </button>
          </div>
        </div>
        <div className="playground-footer">
          <p className="text-body-s text-papel/65">
            Uma simulação de automação. Na sua empresa,
            <br className="hidden sm:block" /> o fluxo começa pelo que você precisa resolver.
          </p>
          <a
            href={whatsappUrl(services[2].message)}
            target="_blank"
            rel="noopener noreferrer"
            className="experience-text-link text-body-s"
          >
            Quero simplificar minha operação
            <ArrowUpRight size={18} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
