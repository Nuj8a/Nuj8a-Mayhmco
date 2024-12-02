'use client';

import {
  FolderIcon,
  FolderOpenIcon,
  FileTextIcon,
  ChevronDownIcon,
  ChevronRightIcon
} from 'lucide-react';

type highlight = {
  id: string;
  label: string;
  value: string;
  type?: 'file' | 'folder';
  children?: highlight[];
  isActive?: Boolean;
  position?: Number;
};

type FolderRadioTreeProps = {
  field: {
    value: string;
    onChange: (value: string) => void;
  };
  setExpanded: any;
  expanded: any;
  categories: any;
};

export default function FolderRadioTree({
  field,
  setExpanded,
  expanded,
  categories
}: FolderRadioTreeProps) {
  const toggleExpand = (id: string) => {
    setExpanded((prev: any) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleSelection = (id: string) => {
    field.onChange(id);
  };

  const renderhighlight = (highlight: highlight) => {
    const isFolder = highlight.type === 'folder';
    const isSelected = field.value === highlight.id;
    return (
      <div
        key={highlight.id}
        className={`mr-1 mt-2 flex min-w-[200px] flex-col  ${
          !(highlight.label.toLowerCase() === 'root' || highlight.isActive)
            ? 'text-destructive'
            : 'text-foreground'
        }`}
      >
        <div className="flex cursor-pointer items-center space-x-3">
          {isFolder ? (
            <span
              onClick={() => toggleExpand(highlight.id)}
              role="button"
              aria-expanded={expanded[highlight.id]}
              className="cursor-pointer"
            >
              {expanded[highlight.id] ? (
                <ChevronDownIcon className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronRightIcon className="h-5 w-5 text-gray-500" />
              )}
            </span>
          ) : (
            <div className="mr-[1.229rem]"></div>
          )}
          <input
            type="radio"
            id={highlight.id}
            name="highlight"
            value={highlight.id}
            checked={isSelected}
            onChange={() => handleSelection(highlight.id)}
            className="mr-2"
          />
          <label
            htmlFor={highlight.id}
            className={`flex cursor-pointer items-center ${
              isFolder ? 'font-semibold' : ''
            }`}
          >
            {isFolder ? (
              expanded[highlight.id] ? (
                <FolderOpenIcon className="mr-2 h-5 w-5 text-yellow-500" />
              ) : (
                <FolderIcon className="mr-2 h-5 w-5 text-yellow-500" />
              )
            ) : (
              <FileTextIcon className="mr-2 h-5 w-5 text-gray-500" />
            )}
            {highlight.label}
          </label>
        </div>

        {highlight.children && expanded[highlight.id] && (
          <div className="ml-[10px] mt-2 flex flex-row flex-wrap gap-3 border-l border-border pl-4">
            {highlight.children.map((child) => renderhighlight(child))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-wrap space-y-4">
      {categories.map((highlight: any) => renderhighlight(highlight))}
    </div>
  );
}
