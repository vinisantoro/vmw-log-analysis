"use client";

import { useState } from 'react';

interface PropertyPanelProps {
  element: {
    id: string;
    type: string;
    props: Record<string, any>;
  };
  onUpdate: (props: Record<string, any>) => void;
}

export function PropertyPanel({ element, onUpdate }: PropertyPanelProps) {
  const [localProps, setLocalProps] = useState(element.props);

  const handleChange = (key: string, value: any) => {
    const newProps = { ...localProps, [key]: value };
    setLocalProps(newProps);
    onUpdate(newProps);
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Propriedades</h3>
      
      {element.type === 'text' && (
        <>
          <div>
            <label className="block text-sm font-medium mb-1">Conteúdo</label>
            <textarea
              value={localProps.content || ''}
              onChange={(e) => handleChange('content', e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              rows={4}
            />
          </div>
        </>
      )}

      {element.type === 'heading' && (
        <>
          <div>
            <label className="block text-sm font-medium mb-1">Conteúdo</label>
            <input
              type="text"
              value={localProps.content || ''}
              onChange={(e) => handleChange('content', e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Nível</label>
            <select
              value={localProps.level || 1}
              onChange={(e) => handleChange('level', parseInt(e.target.value))}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value={1}>H1</option>
              <option value={2}>H2</option>
              <option value={3}>H3</option>
              <option value={4}>H4</option>
            </select>
          </div>
        </>
      )}

      {element.type === 'image' && (
        <>
          <div>
            <label className="block text-sm font-medium mb-1">URL da Imagem</label>
            <input
              type="text"
              value={localProps.src || ''}
              onChange={(e) => handleChange('src', e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="https://..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Texto Alternativo</label>
            <input
              type="text"
              value={localProps.alt || ''}
              onChange={(e) => handleChange('alt', e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        </>
      )}
    </div>
  );
}

