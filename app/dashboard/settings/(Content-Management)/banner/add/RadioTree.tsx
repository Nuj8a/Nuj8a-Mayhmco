'use client';

import {
  FolderIcon,
  FolderOpenIcon,
  FileTextIcon,
  ChevronDownIcon,
  ChevronRightIcon
} from 'lucide-react';

type banner = {
  id: string;
  label: string;
  value: string;
  type?: 'file' | 'folder';
  children?: banner[];
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

  const renderbanner = (banner: banner) => {
    const isFolder = banner.type === 'folder';
    const isSelected = field.value === banner.id;
    return (
      <div
        key={banner.id}
        className={`mr-1 mt-2 flex min-w-[200px] flex-col  ${
          !(banner.label.toLowerCase() === 'root' || banner.isActive)
            ? 'text-destructive'
            : 'text-foreground'
        }`}
      >
        <div className="flex cursor-pointer items-center space-x-3">
          {isFolder ? (
            <span
              onClick={() => toggleExpand(banner.id)}
              role="button"
              aria-expanded={expanded[banner.id]}
              className="cursor-pointer"
            >
              {expanded[banner.id] ? (
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
            id={banner.id}
            name="banner"
            value={banner.id}
            checked={isSelected}
            onChange={() => handleSelection(banner.id)}
            className="mr-2"
          />
          <label
            htmlFor={banner.id}
            className={`flex cursor-pointer items-center ${
              isFolder ? 'font-semibold' : ''
            }`}
          >
            {isFolder ? (
              expanded[banner.id] ? (
                <FolderOpenIcon className="mr-2 h-5 w-5 text-yellow-500" />
              ) : (
                <FolderIcon className="mr-2 h-5 w-5 text-yellow-500" />
              )
            ) : (
              <FileTextIcon className="mr-2 h-5 w-5 text-gray-500" />
            )}
            {banner.label}
          </label>
        </div>

        {banner.children && expanded[banner.id] && (
          <div className="ml-[10px] mt-2 flex flex-row flex-wrap gap-3 border-l border-border pl-4">
            {banner.children.map((child) => renderbanner(child))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-wrap space-y-4">
      {categories.map((banner: any) => renderbanner(banner))}
    </div>
  );
}
