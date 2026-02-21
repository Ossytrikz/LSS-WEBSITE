import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, GripVertical } from "lucide-react";

interface SortableListProps {
  items: Array<{ id: number; name: string; [key: string]: unknown }>;
  onReorder: (orderedIds: number[]) => void;
  renderItem: (item: { id: number; name: string; [key: string]: unknown }, index: number) => React.ReactNode;
}

export function SortableList({ items, onReorder, renderItem }: SortableListProps) {
  const [localItems, setLocalItems] = useState(items);
  const [hasChanges, setHasChanges] = useState(false);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  // Update local items when props change (but not during editing)
  useEffect(() => {
    // Only update if the items are actually different (different length or IDs)
    const currentIds = localItems.map(i => i.id).join(',');
    const newIds = items.map(i => i.id).join(',');
    if (currentIds !== newIds) {
      setLocalItems(items);
      setHasChanges(false);
    }
  }, [items]);

  const moveItem = (index: number, direction: "up" | "down") => {
    const newItems = [...localItems];
    const newIndex = direction === "up" ? index - 1 : index + 1;

    if (newIndex < 0 || newIndex >= newItems.length) return;

    // Swap items
    [newItems[index], newItems[newIndex]] = [newItems[newIndex], newItems[index]];
    setLocalItems(newItems);
    setHasChanges(true);
  };

  const handleSave = () => {
    const orderedIds = localItems.map((item) => item.id);
    onReorder(orderedIds);
    setHasChanges(false);
  };

  const handleCancel = () => {
    setLocalItems(items);
    setHasChanges(false);
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  // Drag and Drop handlers
  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', String(index));
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    
    if (draggedIndex === null || draggedIndex === index) return;
    
    // Real-time reordering during drag
    const newItems = [...localItems];
    const [draggedItem] = newItems.splice(draggedIndex, 1);
    newItems.splice(index, 0, draggedItem);
    
    setLocalItems(newItems);
    setDraggedIndex(index);
    setHasChanges(true);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  return (
    <div className="space-y-4">
      {/* Instructions */}
      <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
        <p className="font-medium text-foreground mb-1">Reorder Items</p>
        <p>Drag and drop items to reorder, or use the arrow buttons. Click "Save Order" when done.</p>
      </div>

      {/* Sortable Items */}
      <div className="space-y-2">
        {localItems.map((item, index) => (
          <div
            key={item.id}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDrop={(e) => handleDrop(e)}
            onDragEnd={handleDragEnd}
            className={`
              flex items-center gap-3 p-3 bg-card border rounded-lg 
              hover:bg-accent/50 transition-all cursor-move
              ${draggedIndex === index ? 'opacity-50 bg-primary/10 border-primary' : ''}
              ${dragOverIndex === index && draggedIndex !== index ? 'border-primary border-2 mt-4' : ''}
            `}
          >
            {/* Order Number */}
            <div className="flex items-center justify-center w-8 h-8 bg-primary/10 text-primary font-semibold rounded-full text-sm shrink-0">
              {index + 1}
            </div>

            {/* Drag Handle */}
            <GripVertical className="h-5 w-5 text-muted-foreground shrink-0 cursor-grab active:cursor-grabbing" />

            {/* Item Content */}
            <div className="flex-1 min-w-0">
              {renderItem(item, index)}
            </div>

            {/* Move Buttons */}
            <div className="flex flex-col gap-1 shrink-0">
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={() => moveItem(index, "up")}
                disabled={index === 0}
              >
                <ArrowUp className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7"
                onClick={() => moveItem(index, "down")}
                disabled={index === localItems.length - 1}
              >
                <ArrowDown className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      {hasChanges && (
        <div className="flex gap-3 pt-4 border-t">
          <Button onClick={handleSave} className="flex-1">
            Save Order
          </Button>
          <Button variant="outline" onClick={handleCancel} className="flex-1">
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
}
