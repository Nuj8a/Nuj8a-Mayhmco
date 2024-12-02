'use client';

import {
  FolderIcon,
  FolderOpenIcon,
  FileTextIcon,
  ChevronDownIcon,
  ChevronRightIcon
} from 'lucide-react';

type Category = {
  id: string;
  label: string;
  value: string;
  type?: 'file' | 'folder';
  children?: Category[];
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

  const renderCategory = (category: Category) => {
    const isFolder = category.type === 'folder';
    const isSelected = field.value === category.id;
    return (
      <div
        key={category.id}
        className={`mr-1 mt-2 flex min-w-[200px] flex-col  ${
          !(category.label.toLowerCase() === 'root' || category.isActive)
            ? 'text-destructive'
            : 'text-foreground'
        }`}
      >
        <div className="flex cursor-pointer items-center space-x-3">
          {isFolder ? (
            <span
              onClick={() => toggleExpand(category.id)}
              role="button"
              aria-expanded={expanded[category.id]}
              className="cursor-pointer"
            >
              {expanded[category.id] ? (
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
            id={category.id}
            name="category"
            value={category.id}
            checked={isSelected}
            onChange={() => handleSelection(category.id)}
            className="mr-2"
          />
          <label
            htmlFor={category.id}
            className={`flex cursor-pointer items-center ${
              isFolder ? 'font-semibold' : ''
            }`}
          >
            {isFolder ? (
              expanded[category.id] ? (
                <FolderOpenIcon className="mr-2 h-5 w-5 text-yellow-500" />
              ) : (
                <FolderIcon className="mr-2 h-5 w-5 text-yellow-500" />
              )
            ) : (
              <FileTextIcon className="mr-2 h-5 w-5 text-gray-500" />
            )}
            {category.label}
          </label>
        </div>

        {category.children && expanded[category.id] && (
          <div className="ml-[10px] mt-2 flex flex-row flex-wrap gap-3 border-l border-border pl-4">
            {category.children.map((child) => renderCategory(child))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-wrap space-y-4">
      {categories.map((category: any) => renderCategory(category))}
    </div>
  );
}
