"use client";

import { Type, Heading, Image } from 'lucide-react';

interface ComponentPaletteProps {
  onAddElement: (type: string, props?: Record<string, any>) => void;
}

const components = [
  {
    type: 'text',
    label: 'Texto',
    icon: Type,
    defaultProps: { content: 'Novo texto' },
  },
  {
    type: 'heading',
    label: 'Título',
    icon: Heading,
    defaultProps: { content: 'Novo título', level: 1 },
  },
  {
    type: 'image',
    label: 'Imagem',
    icon: Image,
    defaultProps: { src: '', alt: 'Imagem' },
  },
];

export function ComponentPalette({ onAddElement }: ComponentPaletteProps) {
  return (
    <div className="space-y-2">
      <h3 className="font-semibold mb-4">Componentes</h3>
      {components.map((component) => {
        const Icon = component.icon;
        return (
          <button
            key={component.type}
            onClick={() => onAddElement(component.type, component.defaultProps)}
            className="w-full flex items-center space-x-3 p-3 border rounded-lg hover:bg-accent transition-colors text-left"
          >
            <Icon className="w-5 h-5" />
            <span>{component.label}</span>
          </button>
        );
      })}
    </div>
  );
}

