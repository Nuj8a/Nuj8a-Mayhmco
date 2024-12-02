import React, { useState } from 'react';
import { Badge } from './ui/badge';
import { Input } from './ui/input';

type TagsInputProps = {
  value: string[];
  onChange: (tags: string[]) => void;
};

const TagsInput: React.FC<TagsInputProps> = ({ value, onChange }) => {
  const [inputValue, setInputValue] = useState('');

  const addTag = () => {
    if (inputValue && !value.includes(inputValue)) {
      onChange([...value, inputValue]);
      setInputValue('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    onChange(value.filter((tag) => tag !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <div className="tags-input">
      {value.length > 0 && (
        <div className="tags mt-2 flex flex-wrap gap-2">
          {value.map((tag, index) => (
            <Badge
              key={index}
              className="tag-item group relative text-sm !font-normal"
            >
              <span>{tag}</span>
              <div className="hidden group-hover:block">
                <button
                  type="button"
                  className="absolute right-[-8px] top-[-8px] flex h-[18px]  w-[18px]  items-center justify-center rounded-full bg-muted pb-[1px] text-black hover:border hover:bg-card hover:shadow-md dark:text-white"
                  onClick={() => removeTag(tag)}
                >
                  &times;
                </button>
              </div>
            </Badge>
          ))}
        </div>
      )}
      <Input
        // type="text"
        // className="mt-2 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        id="tagInput"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Add product tags"
      />
    </div>
  );
};

export default TagsInput;
