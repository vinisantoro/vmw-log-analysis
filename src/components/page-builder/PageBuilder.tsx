"use client";

import { useState } from "react";
import { ComponentPalette } from "./ComponentPalette";
import { PropertyPanel } from "./PropertyPanel";
import { GripVertical, Trash2 } from "lucide-react";

interface PageElement {
  id: string;
  type: string;
  props: Record<string, any>;
}

export function PageBuilder() {
  const [elements, setElements] = useState<PageElement[]>([]);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);

  const addElement = (type: string, defaultProps: Record<string, any> = {}) => {
    const newElement: PageElement = {
      id: `element-${Date.now()}`,
      type,
      props: defaultProps,
    };
    setElements([...elements, newElement]);
    setSelectedElement(newElement.id);
  };

  const updateElement = (id: string, props: Record<string, any>) => {
    setElements(
      elements.map((el) =>
        el.id === id ? { ...el, props: { ...el.props, ...props } } : el
      )
    );
  };

  const deleteElement = (id: string) => {
    setElements(elements.filter((el) => el.id !== id));
    if (selectedElement === id) {
      setSelectedElement(null);
    }
  };

  const renderElement = (element: PageElement) => {
    switch (element.type) {
      case "text":
        return (
          <p style={element.props.style || {}}>
            {element.props.content || "Texto"}
          </p>
        );
      case "heading":
        const level = element.props.level || 1;
        const HeadingTag = `h${level}` as
          | "h1"
          | "h2"
          | "h3"
          | "h4"
          | "h5"
          | "h6";
        const HeadingComponent = HeadingTag;
        return (
          <HeadingComponent style={element.props.style || {}}>
            {element.props.content || "Título"}
          </HeadingComponent>
        );
      case "image":
        return (
          <img
            src={element.props.src || ""}
            alt={element.props.alt || ""}
            style={element.props.style || {}}
          />
        );
      default:
        return <div>Componente desconhecido</div>;
    }
  };

  return (
    <div className="flex h-screen">
      {/* Component Palette */}
      <div className="w-64 border-r bg-muted/50 p-4">
        <ComponentPalette onAddElement={addElement} />
      </div>

      {/* Canvas */}
      <div className="flex-1 overflow-auto p-8 bg-background">
        <div className="max-w-4xl mx-auto space-y-4">
          {elements.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p>Arraste componentes da paleta para começar</p>
            </div>
          ) : (
            elements.map((element) => (
              <div
                key={element.id}
                className={`relative border-2 rounded p-4 ${
                  selectedElement === element.id
                    ? "border-primary"
                    : "border-transparent hover:border-muted"
                }`}
                onClick={() => setSelectedElement(element.id)}
              >
                <div className="absolute top-2 right-2 flex space-x-2">
                  <button
                    className="p-1 hover:bg-accent rounded"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteElement(element.id);
                    }}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                {renderElement(element)}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Property Panel */}
      {selectedElement && (
        <div className="w-80 border-l bg-muted/50 p-4">
          <PropertyPanel
            element={elements.find((el) => el.id === selectedElement)!}
            onUpdate={(props) => updateElement(selectedElement, props)}
          />
        </div>
      )}
    </div>
  );
}
